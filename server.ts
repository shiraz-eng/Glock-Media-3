import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;
const staticRoot = process.cwd();
const repoVideosDir = path.join(staticRoot, 'videos');
const firebaseApiKey =
  process.env.FIREBASE_WEB_API_KEY || 'AIzaSyAt0yOgEi6FWAnu1oidChgKvMpJEuAaYiU';
const adminEmail = (
  process.env.ADMIN_EMAIL || 'glockmedia216@gmail.com'
).toLowerCase();

// Use a portable temporary folder by default. On a persistent Node host, set
// UPLOAD_DIR to a durable location such as ./uploads/videos.
const writableVideosDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(os.tmpdir(), 'glock-media-videos');
if (!fs.existsSync(writableVideosDir)) {
  fs.mkdirSync(writableVideosDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, writableVideosDir);
  },
  filename: (req, file, cb) => {
    // Preserve original filename or clean it slightly
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }
});

// JSON middleware
app.use(express.json());

async function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authorization = req.get('authorization') || '';
  const token = authorization.startsWith('Bearer ')
    ? authorization.slice(7)
    : '';

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(firebaseApiKey)}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ idToken: token })
      }
    );
    const data = (await response.json()) as {
      users?: Array<{ email?: string; emailVerified?: boolean }>;
    };
    const user = data.users?.[0];

    if (!response.ok || user?.email?.toLowerCase() !== adminEmail) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Unable to verify Firebase session:', error);
    return res.status(503).json({ error: 'Authentication service unavailable' });
  }
}

// Keep track of deleted repository videos in this runtime session to filter them out instantly
const hiddenRepositoryVideoNames = new Set<string>();

// Dynamic video list function
function getCombinedVideos() {
  const listMap = new Map();

  // 1. Read files from the repository directory (Read-only on Cloud Run)
  if (fs.existsSync(repoVideosDir)) {
    try {
      const files = fs.readdirSync(repoVideosDir);
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (['.mp4', '.webm', '.ogg', '.mov', '.mkv'].includes(ext)) {
          // Skip if hidden in this session
          if (hiddenRepositoryVideoNames.has(file)) return;

          const filePath = path.join(repoVideosDir, file);
          const stats = fs.statSync(filePath);
          listMap.set(file, {
            id: `vid_repo_${stats.ino || Math.random().toString(36).substring(2, 9)}`,
            name: file,
            originalName: file,
            videoUrl: `/videos/${file}`,
            size: stats.size,
            uploadedAt: stats.mtimeMs,
            isReadOnly: true
          });
        }
      });
    } catch (e) {
      console.error("Error reading repository videos directory:", e);
    }
  }

  // 2. Read files from the writable tmp directory
  if (fs.existsSync(writableVideosDir)) {
    try {
      const files = fs.readdirSync(writableVideosDir);
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (['.mp4', '.webm', '.ogg', '.mov', '.mkv'].includes(ext)) {
          const filePath = path.join(writableVideosDir, file);
          const stats = fs.statSync(filePath);
          // Writable files override read-only repo files if named identically
          listMap.set(file, {
            id: `vid_tmp_${stats.ino || Math.random().toString(36).substring(2, 9)}`,
            name: file,
            originalName: file,
            videoUrl: `/videos/${file}`,
            size: stats.size,
            uploadedAt: stats.mtimeMs,
            isReadOnly: false
          });
        }
      });
    } catch (e) {
      console.error("Error reading writable videos directory:", e);
    }
  }

  return Array.from(listMap.values()).sort((a, b) => b.uploadedAt - a.uploadedAt);
}

// API: List local videos dynamically from directory
app.get('/api/local-videos', requireAdmin, (req, res) => {
  try {
    const videos = getCombinedVideos();
    res.json(videos);
  } catch (err: any) {
    console.error("Failed to list local videos:", err);
    res.status(500).json({ error: err.message });
  }
});

// API: Upload video file to local directory
app.post('/api/local-videos', requireAdmin, upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file provided" });
    }
    const filePath = path.join(writableVideosDir, req.file.filename);
    const stats = fs.statSync(filePath);
    res.json({
      success: true,
      video: {
        id: `vid_tmp_${stats.ino || Date.now()}`,
        name: req.file.filename,
        originalName: req.file.originalname,
        videoUrl: `/videos/${req.file.filename}`,
        size: stats.size,
        uploadedAt: stats.mtimeMs
      }
    });
  } catch (err: any) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// API: Delete local video file from directory
app.delete('/api/local-videos/:name', requireAdmin, (req, res) => {
  try {
    const fileName = req.params.name;
    // Prevent directory traversal attacks
    const safeName = path.basename(fileName);

    let deletedFromDisk = false;
    let isReadOnlyRepoFile = false;

    // 1. Try deleting from the writable /tmp/videos directory
    const writablePath = path.join(writableVideosDir, safeName);
    if (fs.existsSync(writablePath)) {
      try {
        fs.unlinkSync(writablePath);
        deletedFromDisk = true;
      } catch (err: any) {
        console.error(`Failed to delete ${safeName} from /tmp:`, err);
      }
    }

    // 2. Try deleting from the repository directory
    const repoPath = path.join(repoVideosDir, safeName);
    if (fs.existsSync(repoPath)) {
      isReadOnlyRepoFile = true;
      try {
        fs.unlinkSync(repoPath);
        deletedFromDisk = true;
      } catch (err: any) {
        if (err.code === 'EROFS' || err.code === 'EACCES') {
          console.log(`File system is read-only. Hiding ${safeName} in this session state.`);
          hiddenRepositoryVideoNames.add(safeName);
        } else {
          throw err;
        }
      }
    }

    if (deletedFromDisk || isReadOnlyRepoFile) {
      res.json({
        success: true,
        message: isReadOnlyRepoFile && !deletedFromDisk
          ? `File hidden in current session. (Repository files must be permanently deleted via the AI Studio sidebar/file-explorer)`
          : `Video deleted successfully`
      });
    } else {
      res.status(404).json({ error: "File not found" });
    }
  } catch (err: any) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// Serve static videos from writable temp folder first, then repository folder
app.use('/videos', express.static(writableVideosDir));
app.use('/videos', express.static(repoVideosDir));

// Keep older page references such as "l1.mp4" and "reel-1.mp4" working.
app.use(express.static(repoVideosDir));
app.use(express.static(path.join(staticRoot, 'assets', 'clips')));

const privatePaths = new Set([
  '/server.ts',
  '/package.json',
  '/package-lock.json',
  '/tsconfig.json',
  '/vercel.json',
  '/bun.lock',
  '/README.md',
  '/NOTES.txt',
  '/firebase-blueprint.json',
  '/firebase-applet-config.json'
]);

app.use((req, res, next) => {
  if (
    privatePaths.has(req.path) ||
    req.path.startsWith('/api/') ||
    req.path.startsWith('/dist/') ||
    req.path.startsWith('/scripts/')
  ) {
    return res.status(404).send('Not found');
  }
  next();
});

// The project root is the website directory.
app.use(express.static(staticRoot));

// Fallback to index.html for general paths without extensions
app.get('*', (req, res, next) => {
  if (path.extname(req.path)) {
    next();
  } else {
    res.sendFile(path.join(staticRoot, 'index.html'));
  }
});

// Vercel imports the Express app as a serverless handler. Traditional Node
// hosts (including Hostinger) start the listener normally.
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;
