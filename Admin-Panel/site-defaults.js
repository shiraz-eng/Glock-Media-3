// Single source of truth for the Home page's fallback content — the values
// the live site (via dynamic-loader.js) shows when Firestore has nothing
// yet, and what the admin panel's "Sync From Site Defaults" buttons pull
// from. Kept in its own module (no side effects) so it can be imported by
// both dynamic-loader.js and admin.html without either one triggering the
// other's page-load behavior.
export const DEFAULT_CONFIG = {
  hero: {
    tagline: "Content should not merely exist — it should <span>perform</span>.",
    desc: "A digital-first media production & content growth agency specializing in YouTube, TikTok, Snapchat, Instagram & modern content ecosystems.",
    primaryBtnText: "Start Your Growth",
    primaryBtnLink: "#contact",
    secondaryBtnText: "View Projects",
    secondaryBtnLink: "#showcase",
    videoUrl: "GM_Hero_Video.mp4.mp4",
    stats: [
      { num: "50B+", label: "Views Generated" },
      { num: "20M+", label: "Subscribers" },
      { num: "10+", label: "Years Experience" }
    ]
  },
  showcase: {
    videos: [
      { src: "P1.mp4", badge: "Raw Footage", stat1: "1M+ Views", stat2: "50K+ Likes", landscape: false },
      { src: "l1.mp4", badge: "Edited", stat1: "5M+ Views", stat2: "100K+ Likes", landscape: true },
      { src: "p2.mp4", badge: "TikTok", stat1: "2M+ Views", stat2: "200K+ Likes", landscape: false },
      { src: "l2.mp4", badge: "YouTube", stat1: "10M+ Views", stat2: "500K+ Subs", landscape: true },
      { src: "p3.mp4", badge: "Instagram", stat1: "500K+ Views", stat2: "50K+ Shares", landscape: false },
      { src: "l3.mp4", badge: "Doc", stat1: "3M+ Views", stat2: "50K+ Comments", landscape: true }
    ]
  },
  about: {
    badge: "Introduction",
    title: "Who We <span class=\"g-text\">Are</span>",
    text: "We're a dedicated content growth agency helping creators and brands build a powerful presence across every platform.",
    stats: [
      { num: "50B+", label: "Views Generated" },
      { num: "20M+", label: "Subscribers Gained" },
      { num: "$200K+", label: "Client Revenue" }
    ],
    features: [
      {
        title: "Revisions",
        desc: "Not happy? We'll fix it. Every project comes with multiple revision rounds until it's perfect.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`
      },
      {
        title: "24/7 Support",
        desc: "Questions don't wait, and neither do we. Our team is always just a message away.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
      },
      {
        title: "Fast Delivery",
        desc: "Zero compromise on speed. Your content, delivered on time, every time.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`
      }
    ],
    phoneVideos: [
      { src: "l1.mp4", badge: "1M+ Views" },
      { src: "l2.mp4", badge: "500K+ Likes" },
      { src: "l3.mp4", badge: "Raw Footage" },
      { src: "L5.mp4", badge: "2M+ Views" },
      { src: "L6.mp4", badge: "Edited" }
    ]
  },
  services: {
    title: "Core <span class=\"g-text\">Services</span>",
    subtitle: "End-to-end content operations from ideation to distribution.",
    list: [
      {
        title: "Content Strategy",
        desc: "Audience identification, competitor analysis, trend mapping, and growth forecasting.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>`
      },
      {
        title: "YouTube Growth",
        desc: "Channel launches, scaling, and revivals. Optimize CTR, AVD, watch time, and revenue.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>`
      },
      {
        title: "Scriptwriting",
        desc: "Retention-first scripts with strong hooks, narrative pacing, and curiosity loops.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.5 8.6"/><path d="M22 22l-5.5-5.5"/></svg>`
      },
      {
        title: "Video Editing",
        desc: "Long-form, Shorts, Reels, TikTok editing. Motion graphics, VFX, and color grading.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>`
      },
      {
        title: "Thumbnail Design",
        desc: "Marketing-asset thumbnails with psychological triggers and high CTR optimization.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`
      },
      {
        title: "SEO & Discoverability",
        desc: "Keyword research, metadata optimization, content clustering, and ranking strategies.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
      },
      {
        title: "Multi-Platform",
        desc: "Strategic distribution across YouTube, TikTok, Instagram, Facebook, Snapchat, and X.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`
      },
      {
        title: "Growth Analytics",
        desc: "Data-driven decisions. CTR, retention, viewer behavior, and engagement analysis.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`
      },
      {
        title: "Audience Development",
        desc: "Channel audits, content repurposing, consulting, and community building.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
      }
    ]
  },
  process: {
    title: "How We <span class=\"g-text\">Work</span>",
    subtitle: "From first contact to final delivery, here's exactly how we work together.",
    steps: [
      {
        num: "01",
        title: "Discovery Call",
        desc: "We learn about your brand, goals, and content needs to make sure we're the perfect fit. We analyze your current content, audience, competitors, and platform performance.",
        video: "Discovery.mp4"
      },
      {
        num: "02",
        title: "Strategize & Plan",
        desc: "We build a comprehensive content strategy with defined pillars, publishing systems, and measurable growth objectives.",
        video: "Strategy.mp4"
      },
      {
        num: "03",
        title: "Create & Produce",
        desc: "Our team handles scriptwriting, research, video production, editing, thumbnail design, and motion graphics with retention-first methodology.",
        video: "Create.mp4"
      },
      {
        num: "04",
        title: "Optimize & Distribute",
        desc: "SEO optimization, metadata refinement, multi-platform distribution, and strategic repurposing for maximum reach.",
        video: "Optimise.mp4"
      },
      {
        num: "05",
        title: "Analyze & Scale",
        desc: "Data-driven decisions using our Kill / Fix / Double Down framework. Performance analytics, A/B testing, and scaling what works.",
        video: "Analyse.mp4"
      }
    ]
  },
  testimonials: {
    title: "What Clients <span class=\"g-text\">Say</span>",
    list: [
      {
        name: "James Carter",
        role: "Fitness Creator",
        text: "Working with this team completely transformed my content. My engagement tripled within the first month. The retention-first approach is game-changing.",
        rating: 5,
        avatar: "JC"
      },
      {
        name: "Kara & Nate",
        role: "Travel YouTubers",
        text: "Working with Glock Media literally changed the future trajectory of our business! We can't wait to hire them again honestly. The ROI speaks for itself.",
        rating: 5,
        avatar: "KN"
      },
      {
        name: "Sarah Kim",
        role: "Tech Channel",
        text: "The scriptwriting team understands audience psychology better than anyone. Our average view duration increased by 40% after working with them.",
        rating: 5,
        avatar: "SK"
      }
    ],
    phoneReels: [
      "T1.mp4",
      "T2.mp4",
      "T3.mp4",
      "T4.mp4",
      "T5.mp4",
      "T6.mp4"
    ]
  },
  industries: {
    title: "Who We <span class=\"g-text\">Are</span>",
    list: [
      {
        title: "Finance",
        desc: "Personal finance, investing, entrepreneurship, wealth creation.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`
      },
      {
        title: "Technology",
        desc: "Consumer tech, software, startups, platforms, and innovation.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`
      },
      {
        title: "Sports",
        desc: "Football, basketball, volleyball, combat sports.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`
      },
      {
        title: "Education",
        desc: "Online learning, academic content, tutorials.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.24 3 5 3s5-1.34 5-3v-5"/></svg>`
      },
      {
        title: "Entertainment",
        desc: "Celebrity content, pop culture, commentary.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
      },
      {
        title: "Documentary",
        desc: "Historical documentaries, investigative, geopolitical.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
      },
      {
        title: "True Crime",
        desc: "Criminal investigations, court cases, historical crime.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`
      },
      {
        title: "Health & Wellness",
        desc: "Fitness, nutrition, mental health, lifestyle.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
      },
      {
        title: "Gaming",
        desc: "Esports, game reviews, streaming, walkthroughs.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><path d="M12 12h.01"/><path d="M8 12h.01"/><path d="M16 12h.01"/></svg>`
      },
      {
        title: "Real Estate",
        desc: "Property tours, market analysis, investment guides.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
      },
      {
        title: "Automotive",
        desc: "Car reviews, restoration, racing, industry news.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`
      },
      {
        title: "Food & Culinary",
        desc: "Recipes, restaurant reviews, cooking tutorials.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.072-2.143-3-4-.928 1.857-1.928 1.857-3 4-.5 1-1 1.62-1 3a2.5 2.5 0 0 0 2.5 2.5Z"/><path d="M12 22c4.97 0 9-4.03 9-9V7.5c0-1.66-1.34-3-3-3h-12c-1.66 0-3 1.34-3 3V13c0 4.97 4.03 9 9 9Z"/></svg>`
      },
      {
        title: "Fashion & Beauty",
        desc: "Style guides, product reviews, makeup tutorials.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.4a1.6 1.6 0 0 0-2.24 0l-1.2 1.2a1.6 1.6 0 0 1-2.24 0l-1.2-1.2a1.6 1.6 0 0 0-2.24 0l-1.2 1.2a1.6 1.6 0 0 1-2.24 0l-1.2-1.2a1.6 1.6 0 0 0-2.24 0L2.6 5.8a1.6 1.6 0 0 0 0 2.24l1.2 1.2a1.6 1.6 0 0 1 0 2.24l-1.2 1.2a1.6 1.6 0 0 0 0 2.24l1.2 1.2a1.6 1.6 0 0 1 0 2.24l-1.2 1.2a1.6 1.6 0 0 0 0 2.24l2.4 2.4a1.6 1.6 0 0 0 2.24 0l1.2-1.2a1.6 1.6 0 0 1 2.24 0l1.2 1.2a1.6 1.6 0 0 0 2.24 0l1.2-1.2a1.6 1.6 0 0 1 2.24 0l1.2 1.2a1.6 1.6 0 0 0 2.24 0l2.4-2.4a1.6 1.6 0 0 0 0-2.24l-1.2-1.2a1.6 1.6 0 0 1 0-2.24l1.2-1.2a1.6 1.6 0 0 0 0-2.24l-1.2-1.2a1.6 1.6 0 0 1 0-2.24l-1.2-1.2a1.6 1.6 0 0 0 0-2.24l-2.4-2.4Z"/></svg>`
      },
      {
        title: "Music & Arts",
        desc: "Music production, artist profiles, creative showcases.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`
      },
      {
        title: "Travel & Adventure",
        desc: "Vlogs, destination guides, adventure stories.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`
      },
      {
        title: "Science & Nature",
        desc: "Exploration, wildlife, space, environmental content.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-3.09A2.9 2.9 0 0 0 4.5 16.5Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`
      }
    ]
  },
  faq: {
    title: "Frequently Asked <span class=\"g-text\">Questions</span>",
    list: [
      {
        q: "What platforms do you produce content for?",
        a: "We specialize in YouTube (long-form & Shorts), TikTok, Instagram Reels, Snapchat Spotlight, and Facebook. We build native systems optimized for each specific platform's algorithm."
      },
      {
        q: "How does the revisions process work?",
        a: "We provide multiple revision rounds on all deliverables. Using our frame-by-frame collaboration workspace, you can easily point out edits or adjustment points to keep things completely seamless."
      },
      {
        q: "What is your typical turnaround time?",
        a: "Turnaround depends on the scope. Standard Short-form content is delivered within 48-72 hours. Highly edited Long-form videos typically take 5-7 business days."
      },
      {
        q: "How do we communicate throughout the project?",
        a: "You'll have a dedicated account manager and access to a shared workspace where you can upload assets, give real-time video feedback, and track delivery statuses 24/7."
      }
    ]
  },
  cta: {
    badge: "Limited Availability",
    title: "Start Scaling Your <span class=\"g-text\">Media Assets</span> Today",
    desc: "We work with a highly select group of creators and enterprise brands to build long-term, high-performing content ecosystems. Secure your growth discovery call now.",
    spots: "Only 2 client spots remaining for this month",
    calendlyUrl: "https://calendly.com/shahriyarkhan593/new-meeting"
  },
  footer: {
    desc: "A digital-first media production and content growth agency helping creators and brands build scalable media assets.",
    founder: "Hammad Raza Khan",
    email: "contact@glockmedia.com",
    youtube: "#",
    instagram: "#",
    twitter: "#",
    linkedin: "#"
  }
};
