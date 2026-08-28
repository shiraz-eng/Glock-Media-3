// Admin logic for the pages added on top of the original Home/Blog admin:
// About Us, Contact Us, Services (overview + 4 sub-pages), and Portfolio.
// Everything here writes into the SAME settings/website Firestore document
// used by Home, under new top-level keys (aboutPage, contactPage,
// servicesPage, servicePages, portfolioPage) — plus a `portfolio` collection
// for the individually-managed work items (mirrors how blogs/categories/
// navbar already get their own collection instead of living in that doc).
import { db, auth } from "./firebase-config.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { listPortfolioItems, savePortfolioItem, deletePortfolioItem, slugify } from "./cms-api.js";

const esc = (s) => (s == null ? "" : String(s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const val = (id) => { const el = document.getElementById(id); return el ? el.value : ""; };
const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v ?? ""; };
const linesToArray = (s) => (s || "").split("\n").map(x => x.trim()).filter(Boolean);

// ============================================================
// DEFAULT STATE — mirrors the current live copy on each page so the
// admin forms are never blank on first use, and Save always writes a
// complete record (the live-page loaders only ever overwrite non-empty
// fields, but the admin experience is better when nothing looks empty).
// ============================================================
const svcDefaults = (o) => ({
  hero: { label: o.heroLabel, titleHtml: o.heroTitle, subtitle: o.heroSub, ctaPrimaryText: "See What You Get", ctaPrimaryLink: "#features", ctaSecondaryText: o.secText, ctaSecondaryLink: "#methodology", stats: o.heroStats },
  problem: { label: "The Problem", titleHtml: o.problemTitle, paragraphs: o.problemParas, bullets: o.problemBullets, quote: o.problemQuote, image: o.problemImage },
  features: { label: o.featuresLabel, titleHtml: o.featuresTitle, subtitle: o.featuresSub, list: o.features },
  methodology: { label: o.methodLabel, titleHtml: o.methodTitle, image: o.methodImage, steps: o.methodSteps },
  deliverables: { label: "Deliverables", titleHtml: o.delivTitle, subtitle: o.delivSub, list: o.deliverables },
  faq: o.faq,
  cta: { spotsText: "5 spots left for this month", titleHtml: o.ctaTitle, desc: o.ctaDesc, btnText: o.ctaBtn, btnLink: "https://calendly.com/hammadrazakhan-glockmedia/30min" }
});

// Blank starting record for a brand-new admin-created service subcategory —
// same shape as the 4 built-in service pages (svcDefaults above) so it works
// with the exact same populateSvcPage/collectSvcPage/service-subpage-loader
// code, just with generic placeholder copy instead of hardcoded content.
function blankServicePage(name) {
  return {
    hero: {
      label: `${name} Services`,
      titleHtml: `<span class="gradient-text">${esc(name)}</span> Services`,
      subtitle: `Tell visitors what your ${name.toLowerCase()} service delivers and why it's worth booking.`,
      ctaPrimaryText: "See What You Get", ctaPrimaryLink: "#features",
      ctaSecondaryText: "Our Method", ctaSecondaryLink: "#methodology",
      stats: [{ num: "", suffix: "", label: "" }, { num: "", suffix: "", label: "" }, { num: "", suffix: "", label: "" }]
    },
    problem: { label: "The Problem", titleHtml: "", paragraphs: [], bullets: [], quote: "", image: "" },
    features: { label: `Our ${name} Services`, titleHtml: "", subtitle: "", list: [] },
    methodology: { label: "Our Process", titleHtml: "", image: "", steps: [] },
    deliverables: { label: "Deliverables", titleHtml: "", subtitle: "", list: [] },
    faq: [],
    cta: { spotsText: "5 spots left for this month", titleHtml: "", desc: "", btnText: "Book Your Free Call", btnLink: "https://calendly.com/hammadrazakhan-glockmedia/30min" }
  };
}

// Portfolio work items are grouped by "type". These 5 ship with the site
// (glock-portfolio.js has built-in tab labels/headings for them); anything
// else is a custom type the admin has added via "Manage Categories" below.
const BUILT_IN_PORTFOLIO_TYPES = [
  { id: "longform", label: "Long-Form Video" },
  { id: "shortform", label: "Short-Form Video" },
  { id: "scriptwriting", label: "Scriptwriting Sample" },
  { id: "thumbnail", label: "Thumbnail Design" },
  { id: "CaseStudy", label: "Case Study" }
];
function getAllPortfolioTypes() {
  const custom = (state.portfolioPage.customTypes || []).map(c => ({ id: c.id, label: c.label || c.id }));
  return BUILT_IN_PORTFOLIO_TYPES.concat(custom);
}

const DEFAULT_STATE = {
  // Site-wide review/testimonial slider — the ".testimonial-carousel" block
  // that appears on the About page and all 4 (or more) Service pages. It
  // used to be hardcoded HTML on every one of those pages; this list is now
  // the single source of truth, pushed out by reviews-loader.js.
  siteReviews: {
    list: [
      { quote: "Amazing efforts and willing to fix/change anything. Super on top of timing. 10/10 experience.", name: "Kara & Nate", role: "Travel YouTubers", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
      { quote: "Hammad supported my YouTube and social media project, From Pain Into Purpose, by helping manage posting and platform support across my content channels.", name: "Sarah Kim", role: "Tech Channel", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
      { quote: "Hammad did an excellent job writing YouTube scripts. He's fast, detail-oriented, and communicates clearly throughout the process.", name: "Marcus Bell", role: "Finance YouTuber", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
      { quote: "Gets the job done without me having to make any corrections. No complaints.", name: "Alex Rivera", role: "Media Company CEO", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" }
    ]
  },
  trusted: {
    list: [
      { name: "WealthPath", logo: "assets/clients/client-1.svg" },
      { name: "NovaTech Media", logo: "assets/clients/client-2.svg" },
      { name: "Apex Athletics", logo: "assets/clients/client-3.svg" },
      { name: "Midnight Files", logo: "assets/clients/client-4.svg" }
    ]
  },
  aboutPage: {
    hero: {
      titleHtml: `We Don't Just Create Content.<br>We Build Movements.`,
      subtitle: "We are a media production company, digital content agency, and multi-platform media agency specializing in YouTube, TikTok, Snapchat, Instagram, and modern content ecosystems. Founded on the belief that content should not merely exist - it should perform",
      ctaPrimaryText: "Our Story", ctaPrimaryLink: "#mission", ctaSecondaryText: "Meet the Team", ctaSecondaryLink: "#team",
      stats: [{ num: "50B+", label: "Views Generated" }, { num: "20M+", label: "Subscribers" }, { num: "10+", label: "Years Experience" }]
    },
    mission: {
      label: "The Founder Story",
      titleHtml: `The Story Behind <span class="gradient-text">Glock Media</span>`,
      paragraphs: [
        `Every content growth agency founder story starts with a problem. For <strong> Hammad Raza Khan,</strong> it was the gap between creative potential and actual results.`,
        `<strong>Hammad</strong> saw too many creators and brands pouring time and money into content that looked beautiful but failed to grow. They had aesthetics, but no audience. They had production value, but no retention. They had content, but no strategy.`,
        `That's when<strong> Glock Media </strong>was born.`,
        `What started as a one-person operation has grown into a full content agency team of strategists, writers, editors, and growth specialists. Today, we've helped creators and brands generate over 50 billion views and build audiences that don't just watch; they convert.`
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      stats: [{ num: "50", label: "Billion Views" }, { num: "20", label: "Million Subs" }, { num: "10", label: "Years Experience" }]
    },
    values: {
      label: "What We Stand For",
      titleHtml: `Our Core <span class="gradient-text">Values</span>`,
      subtitle: "The media agency values that guide every decision, every piece of content, and every client relationship.",
      list: [
        { icon: "&#9889;", title: "Retention First", desc: "Every second of content is engineered to hold attention. We don't chase vanity metrics — we build watch time, engagement, and loyalty." },
        { icon: "&#128161;", title: "Data-Driven Creativity", desc: "Art meets science. We use analytics, A/B testing, and platform insights to inform creative decisions that actually move the needle." },
        { icon: "&#128640;", title: "Move Fast, Deliver Faster", desc: "Speed without compromise. Our streamlined production pipeline means you get premium content on tight timelines, every time." },
        { icon: "&#129309;", title: "Partners, Not Vendors", desc: "We embed ourselves in your brand. Your success is our success. We don't just deliver content — we become an extension of your team." }
      ]
    },
    team: {
      label: "The Minds Behind The Movement",
      titleHtml: `Meet The <span class="gradient-text">Leadership</span>`,
      subtitle: "A collective of strategists, creators, and growth hackers obsessed with building content that performs.",
      list: [
        { img: "Hammad.jpeg", role: "Founder & CEO", name: "Hammad Raza Khan", desc: "Visionary content strategy consultant with a decade in creator economy agency. Built Glock Media from the ground up.", social: [{ icon: "instagram", url: "#" }, { icon: "linkedin", url: "#" }, { icon: "upwork", url: "#" }] },
        { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80", role: "Head of Strategy", name: "[Team Member]", desc: "Platform algorithm expert who turns data into winning content strategies.", social: [{ icon: "twitter", url: "#" }, { icon: "linkedin", url: "#" }, { icon: "youtube", url: "#" }] },
        { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80", role: "Creative Director", name: "[Team Member]", desc: "Award-winning editor and motion designer. Crafts visual stories that stop the scroll.", social: [{ icon: "twitter", url: "#" }, { icon: "linkedin", url: "#" }, { icon: "youtube", url: "#" }] }
      ]
    },
    process: {
      label: "How We Work",
      titleHtml: `Our <span class="gradient-text">Process</span>`,
      subtitle: "From first contact to final delivery, here's exactly how we work together.",
      steps: [
        { num: "01", title: "Discovery & Briefing", desc: "We uncover your brand's DNA, audience psychology, and content gaps; guided by our media agency values of transparency, creativity, and results. As a content agency team with deep industry experience, we build strategies that align with your unique vision and business goals.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
        { num: "02", title: "Strategize & Plan", desc: "Our content strategy consultants craft data-backed roadmaps designed for retention and reach. As a multi-platform media agency, we tailor every narrative for YouTube, TikTok, and Instagram, ensuring your story lands perfectly on every screen.", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80" },
        { num: "03", title: "Create & Produce", desc: "Our video production company handles scripting, filming, editing, VFX, and sound design. As a digital content agency, we transform raw footage into high-retention videos that hook viewers in the first 3 seconds and keep them watching.", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80" },
        { num: "04", title: "Optimize & Distribute", desc: "SEO optimization, metadata refinement, multi-platform distribution, and strategic repurposing for maximum reach. We operate as a retention-first content agency, ensuring every cut, caption, and thumbnail keeps audiences glued to the screen.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
        { num: "05", title: "Analyze & Scale", desc: "Data-driven decisions using our Kill / Fix / Double Down framework. As YouTube growth experts, we track performance, A/B test thumbnails, and scale what works; turning your channel into a predictable audience-building engine.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" }
      ]
    },
    cta: {
      spotsText: "5 spots left for this month",
      titleHtml: `<span class="gradient-text">Tired </span>of Content <br>That <span class="gradient-text">Flops?</span><br>let's <span class="gradient-text">Fix</span> That`,
      desc: "Get started with Glock Media with a free 30-minute discovery call. As a content and growth agency, we build content that commands attention. Learn more about Glock Media and how we turn views into revenue.",
      btnText: "Book Your Free Call", btnLink: "https://calendly.com/hammadrazakhan-glockmedia/30min"
    }
  },

  contactPage: {
    hero: {
      label: "Let's Get Started",
      titleHtml: `Start Your Path To<br>A Better <span class="gradient-text">Media Presence.</span>`,
      subtitle: "Get started with Glock Media with a free discovery call - no pressure, no obligation, just honest conversation about your goals. Build the business of your dreams with content that actually performs.",
      ctaPrimaryText: "Book a Free Call", ctaPrimaryLink: "https://calendly.com/hammadrazakhan-glockmedia/30min",
      ctaSecondaryText: "Ask a Question", ctaSecondaryLink: "mailto:hello@glockmedia.com",
      spotsText: "5 spots left for this month"
    },
    methods: [
      { icon: "&#9993;", title: "Email Us", html: `<a href="mailto:contact@glockmedia.com">contact@glockmedia.com</a>` },
      { icon: "&#128205;", title: "Location", html: "Remote-first team, serving clients worldwide" },
      { icon: "&#128336;", title: "Response Time", html: "We respond to all inquiries within 24 hours" }
    ],
    faq: [
      { q: "What happens after I submit the form?", a: "Within 24 hours, a member of our team will reach out via email to schedule a consultation - your free discovery call. During the call, we'll discuss your goals, audit your current content, and recommend the best path forward. Whether you need to hire a video editor, hire a scriptwriter, or get a content agency quote, we'll guide you." },
      { q: "Is the discovery call really free?", a: "Absolutely. The 30-minute free discovery call is completely free with no obligation. We use it to understand your needs and determine if we're the right fit for your project. No sales pressure; just honest conversation." },
      { q: "How quickly can you start working?", a: "Depending on the service, we can typically begin within 48–72 hours of onboarding. For full-service packages, we start with a book a discovery call phase that takes about a week before production begins." },
      { q: "Do you work with international clients?", a: "Yes! We're a remote-first agency with clients across the US, UK, Europe, Australia, and beyond. We operate across time zones and have systems in place for seamless communication regardless of location." },
      { q: "What if I'm not sure which service I need?", a: `No problem at all. Select "Something Else" or "Full Service Package" in the form, and we'll help you figure out the right solution during our discovery call. Many clients come to us unsure; we guide you to the right approach.` }
    ]
  },

  servicesPage: {
    hero: {
      label: "What We Do",
      titleHtml: `Full-Service<br><span class="gradient-text">Content Engine</span>`,
      subtitle: "We are a full-service content and growth agency built for creators and brands who want more than just video production. From scriptwriting services and video editing services to channel management services and growth strategy services; we handle every stage of the content lifecycle. Strategy, scripting, editing, management, and analytics. All under one roof.",
      stats: [{ num: "4", suffix: "", label: "Core Services" }, { num: "6", suffix: "+", label: "Platforms" }, { num: "1", suffix: "", label: "Obsessed Team" }]
    },
    cards: [
      { image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80", accent: "Scriptwriting", title: "Retention-First Scripts", desc: "Compelling scripts engineered for retention. Hook engineering, narrative pacing, and psychological triggers that keep viewers watching. Our scriptwriting services are the foundation of every great video.", tags: ["YouTube Scripts", "Shorts/Reels", "TikTok Hooks", "Doc Scripts"] },
      { image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80", accent: "Video Editing", title: "Cinematic Editing", desc: "Retention-first editing with motion graphics, color grading, and sound design. We offer premium video editing and video production services that transform raw footage into content people can't click away from.", tags: ["Long-Form", "Shorts/Reels", "Motion Graphics", "Color Grading"] },
      { image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80", accent: "Channel Mgmt", title: "Full Channel Operations", desc: "Data-driven growth frameworks including our Kill / Fix / Double Down methodology. Our growth strategy services turn effort into outcomes with systematic A/B testing and content strategy services that scale.", tags: ["Upload Scheduling", "Community Mgmt", "Analytics", "SEO Optimization"] },
      { image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", accent: "Growth Strategy", title: "Data-Driven Growth", desc: "Full channel management services and YouTube management services — publishing, optimization, community engagement, and audience development. We manage everything so you can focus on creating.", tags: ["A/B Testing", "Trend Analysis", "Audience Dev", "Revenue Opt"] }
    ],
    process: {
      label: "How We Deliver",
      titleHtml: `Our Production <span class="gradient-text">Pipeline</span>`,
      subtitle: "A streamlined process that takes you from raw idea to published content - fast, consistent, and at the highest quality. We are a concept-to-publish content agency that removes all the friction from content creation.",
      steps: [
        { num: "01", title: "Discovery", desc: "Deep-dive into your brand, audience, and goals. We audit your current content and identify the gaps holding you back. This is where our content strategy services begin." },
        { num: "02", title: "Strategy", desc: "Content pillars, publishing calendars, and growth KPIs. We build a roadmap tailored to your niche and platform mix. As a bespoke social media growth partner, we craft strategies that are uniquely yours" },
        { num: "03", title: "Production", desc: "Scripts, filming, editing, thumbnails, and motion graphics. Every asset is crafted with retention-first methodology. Our video production services and content production services ensure every frame performs." },
        { num: "04", title: "Distribution", desc: "Multi-platform publishing, SEO optimization, and strategic repurposing. One piece of content becomes ten. We are an end-to-end content production and distribution agency that maximizes every asset's reach." }
      ]
    },
    results: {
      label: "Results That Speak",
      titleHtml: `Numbers Don't <span class="gradient-text">Lie</span>`,
      subtitle: "Real impact from real clients across every major platform.",
      list: [
        { icon: "&#128200;", num: "50", suffix: "B+", prefix: "", label: "Total Views", desc: "Generated across all client channels and platforms combined" },
        { icon: "&#128101;", num: "20", suffix: "M+", prefix: "", label: "Subscribers", desc: "New subscribers gained for our clients through strategic growth" },
        { icon: "&#128176;", num: "200", suffix: "K+", prefix: "$", label: "Revenue", desc: "Direct revenue generated for clients through content monetization" }
      ]
    },
    faq: [
      { q: "What makes Glock Media different from other agencies?", a: "Unlike traditional marketing agencies focused on ads, we operate at the intersection of content strategy, audience psychology, storytelling, and platform algorithms. We're a done-for-you content and growth service that handles everything: strategy, production, distribution, and optimization. No handoffs, no gaps, no excuses. One team, one mission: your growth." },
      { q: "Do you work with new channels or only established ones?", a: "We work with both. For new channels, we handle everything from niche validation and branding to content planning and publishing systems. For existing channels, we focus on scaling, optimization, and revival strategies. As a creator-style content agency for brands, we combine the agility of a creator with the scalability of an agency, whether you're starting from zero or scaling to millions." },
      { q: "What platforms do you support?", a: "We support YouTube, TikTok, Instagram, Facebook, Snapchat, and X (Twitter). But we don't just post; we optimize natively for each platform's algorithm. Aspect ratios, pacing, hooks, captions; everything is tailored. That's the power of our social media content services; one piece of content, fully optimized for every ecosystem." },
      { q: "How do you measure success?", a: "We track CTR, audience retention, watch time, subscriber conversion, engagement patterns, and revenue. Every decision follows our Kill / Fix / Double Down framework, grounded in real data. This is what makes our content agency services different; we don't guess. We measure, decide, and scale with evidence." },
      { q: "What is your pricing model?", a: "We offer flexible pricing based on scope and scale. Every engagement starts with a free discovery call where we understand your goals and provide a transparent, line-item proposal. From one-off projects to full retainers, our end-to-end content production approach means no hidden fees, no surprises; just clear value for your investment." }
    ],
    cta: {
      spotsText: "5 spots left for this month",
      titleHtml: `Ready to Turn Content<br>Into Your <span class="gradient-text">Growth Engine?</span>`,
      desc: "Book a free 30-minute discovery call. We'll audit your current content and show you exactly where the opportunities are.",
      btnText: "Book Your Free Call", btnLink: "https://calendly.com/hammadrazakhan-glockmedia/30min"
    }
  },

  servicePages: {
    channelManagement: svcDefaults({
      heroLabel: "Channel Management Services",
      heroTitle: `Your Channel Deserves<br>A <span class="gradient-text">Full Operations Team.</span>`,
      heroSub: "End-to-end channel management service, upload scheduling, SEO optimization, community management, and analytics, so you can focus on creating while we run the machine that grows your audience.",
      secText: "How It Works",
      heroStats: [{ num: "30", suffix: "+", label: "Channels Managed" }, { num: "20", suffix: "M+", label: "Subscribers Grown" }, { num: "24", suffix: "h", label: "Ops Coverage" }],
      problemTitle: `Great Channel Die From <span class="gradient-text">Neglect, </span> Not Bad <span class="gradient-text">Content.</span>`,
      problemParas: [
        `You're spending 20 hours a week on everything <em>around</em> the content — uploading, tagging, scheduling, commenting, checking analytics — and maybe 4 hours actually creating. <strong>That's backwards.</strong>`,
        `Meanwhile, inconsistent uploads confuse the algorithm, unoptimized metadata buries your videos, and an ignored comments section tells your community you don't care. <strong>Channels rarely die from bad content. They die from operational chaos.</strong>`
      ],
      problemBullets: ["Inconsistent upload schedules that confuse the algorithm", "Weak titles, tags and descriptions burying great videos", "Comments and community going ignored for weeks", "Analytics you check but never actually act on", "Zero time left to focus on creating"],
      problemQuote: "Creators burn out on operations. Channels grow on systems.",
      problemImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      featuresLabel: "What You Get",
      featuresTitle: `A Channel That Runs<br><span class="gradient-text">Like A Machine</span>`,
      featuresSub: "Every operational detail handled with the same obsession we bring to content. You create. We run everything else",
      features: [
        { icon: "&#128197;", title: "Upload Scheduling & Calendar", desc: "A strategic publishing calendar with consistent, algorithm-friendly upload timing. Your channel never goes quiet and never floods. This is YouTube automation service at its best: schedules that run themselves." },
        { icon: "&#128172;", title: "Community Management", desc: "Comments answered, hearts given, conversations started. We turn your comments section into a community the algorithm loves to reward. Our community management service keeps your audience engaged and coming back" },
        { icon: "&#128270;", title: "Channel SEO & Metadata", desc: "Keyword-researched titles, descriptions, tags, and playlists engineered for search and suggested traffic. Every video gets found. We're a YouTube SEO agency that ensures your content reaches the right viewers." },
        { icon: "&#128202;", title: "Analytics & Reporting", desc: "Clear monthly reports on what grew, what stalled, and exactly why; plus the actions we're taking next. No vanity metrics. Just channel growth service data you can actually act on." },
        { icon: "&#128247;", title: "CTR Optimization", desc: "Thumbnail and title coordination to lift click-through rate across your entire catalog, including the back catalog you've forgotten about" },
        { icon: "&#129309;", title: "Brand Consistency", desc: "Banners, about sections, links, playlists, and channel layout kept sharp and consistent. Your channel page becomes a conversion funnel." }
      ],
      methodLabel: "How It Works",
      methodTitle: `Operations, Systemized<br><span class="gradient-text">End To End</span>`,
      methodImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
      methodSteps: [
        { num: "01", title: "Full Channel Audit", desc: "We tear down your entire channel: metadata, playlists, upload history, community health, CTR and retention data, and map every leak and opportunity. This is where channel revival service begins for stalled channels." },
        { num: "02", title: "Systems Setup", desc: "Publishing calendar, metadata templates, community response frameworks, and reporting dashboards. The machine gets built around your content rhythm. We handle video SEO optimization and YouTube keyword research so every upload is discoverable" },
        { num: "03", title: "Daily Operations", desc: "Uploads, optimization, comments, community, and monitoring; handled every single day. You get your 20 hours back, effective immediately. This is YouTube channel management at scale." },
        { num: "04", title: "Review & Optimize", desc: "Monthly performance reviews against KPIs. We double down on what's working, fix what's stalling, and keep the machine compounding. Whether you need TikTok growth service, Instagram growth service, or multi-platform growth service, we've got you covered" }
      ],
      delivTitle: `Everything Handled,<br><span class="gradient-text">Documented &amp; Reported</span>`,
      delivSub: "Full operational coverage with total transparency — you'll always know exactly what's happening on your channel.",
      deliverables: [
        { icon: "&#128197;", title: "Content Calendar", desc: "A rolling 30-day publishing plan aligned with your niche's peaks, trends and your production capacity." },
        { icon: "&#9889;", title: "Upload & Optimization", desc: "Every upload fully optimized — title, description, tags, end screens, cards, chapters and pinned comments." },
        { icon: "&#128172;", title: "Community Engagement", desc: "Daily comment management and engagement in your voice, following our agreed community framework." },
        { icon: "&#128202;", title: "Monthly Performance Report", desc: "Growth, retention, CTR and revenue reporting with plain-English analysis and next-month action items." },
        { icon: "&#128247;", title: "Thumbnail Coordination", desc: "CTR-focused thumbnail briefs and A/B testing coordination for every upload." },
        { icon: "&#128222;", title: "Strategy Sync Calls", desc: "Monthly call to review results, align on direction and plan the next phase of growth together." }
      ],
      faq: [
        { q: "Which platforms do you manage?", a: "YouTube is our home turf, and we also manage TikTok, Instagram, Facebook, Snapchat, and X. Multi-platform clients get a unified calendar with native optimization per platform." },
        { q: "What is a channel revival service?", a: "A channel revival service is exactly what it sounds like; we breathe new life into stalled or declining channels. We audit your catalog, re-optimize back-catalog metadata, rebuild the publishing rhythm, and use the data to find the content line worth reviving around." },
        { q: "How much access do you need to my channel?", a: "We work with channel manager permissions (no password sharing needed on YouTube) and the platform-appropriate access levels everywhere else. You keep full ownership and can revoke access anytime." },
        { q: "Will you reply to comments as me?", a: "Yes, in your voice, following a community framework we build together during onboarding. Sensitive or unusual comments get flagged to you rather than answered on your behalf." },
        { q: "How do you report results?", a: "A clear monthly report covering growth, retention, CTR, traffic sources, and revenue where applicable, plus a monthly strategy call to walk through it and plan next steps." },
        { q: "Can you revive a dead or stalled channel?", a: "That's one of our specialties. We audit the catalog, re-optimize back-catalog metadata, rebuild the publishing rhythm, and use the data to find the content line worth reviving around." },
        { q: "What's the minimum commitment?", a: "Channel management works on monthly cycles because the algorithm rewards consistency over time. Most clients see meaningful operational relief in week one and measurable growth signals within 60–90 days." },
        { q: "Do you offer faceless channel management?", a: "Yes. We specialize in faceless channel management for creators who don't appear on camera. Our systems work for any format: voiceover, animation, documentary, or AI-generated content." }
      ],
      ctaTitle: `Ready To Get Your<br><span class="gradient-text">Time Back?</span>`,
      ctaDesc: "Book a free discovery call. We'll audit your channel operations and show you exactly what a fully-managed machine looks like.",
      ctaBtn: "Let's Talk Management"
    }),

    growthStrategy: svcDefaults({
      heroLabel: "Growth Strategy Services",
      heroTitle: `Posting<span class="gradient-text"> Consistently?</span><br>But The Growth Is <span class="gradient-text">Flat?</span>`,
      heroSub: "Data-driven growth frameworks that turn effort into outcomes. Our Kill / Fix / Double Down methodology, ruthless A/B testing and trend intelligence — so every upload moves the needle, not just the upload count.",
      secText: "The Framework",
      heroStats: [{ num: "50", suffix: "B+", label: "Views Generated" }, { num: "3", suffix: "x", label: "Avg. Growth Lift" }, { num: "90", suffix: "%", label: "Client Retention" }],
      problemTitle: `Effort Isn't The Issue.<br><span class="gradient-text">Direction Is.</span>`,
      problemParas: [
        `You're publishing consistently. The content is good. But the graph is flat, and nobody can tell you why. <strong>Consistency without strategy is just scheduled disappointment.</strong>`,
        `The channels that explode aren't luckier — they're more deliberate. They know which videos to kill, which to fix and which to pour fuel on. <strong>Every upload is an experiment with a decision attached.</strong> That's the game, and that's exactly what we play for you.`
      ],
      problemBullets: ["Publishing into the void with no feedback loop", "No idea which content actually drives growth", "Chasing every trend instead of owning a lane", "Decisions made on gut feel, not data", "Revenue that doesn't match the view count"],
      problemQuote: "Growth isn't a lottery. It's a system of decisions made from data.",
      problemImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
      featuresLabel: "What You Get",
      featuresTitle: `Growth Designed,<br><span class="gradient-text">To Compound Over Time</span>`,
      featuresSub: "A full strategic operation behind your content—testing, measuring, deciding, and scaling with ruthless clarity. From channel growth strategy to growth analytics, every decision is backed by data, not assumptions.",
      features: [
        { icon: "&#9876;", title: "Kill / Fix / Double Down", desc: "Our signature framework. Every piece of content gets a verdict backed by data - kill it, fix it, or scale it. No zombie content draining your channel. This is what sets a true growth strategy agency apart." },
        { icon: "&#9878;", title: "A/B Testing Systems", desc: "Thumbnails, titles, hooks, and formats tested systematically. We find winners with evidence, not opinions. Our A/B testing service removes the guesswork from growth." },
        { icon: "&#128200;", title: "Trend & Algorithm Analysis", desc: "Platform shifts, emerging formats, and niche trends tracked and translated into opportunities before your competitors see them. YouTube analytics consulting that keeps you ahead of the curve." },
        { icon: "&#127919;", title: "Audience Development", desc: "Deep analysis of who actually watches, subscribes, and buys - then content engineered to attract more of exactly that. We're an audience development agency that builds communities, not just views." },
        { icon: "&#128176;", title: "Revenue Optimization", desc: "Monetization beyond AdSense - sponsorship positioning, product funnels, and conversion paths that turn views into income. Our revenue optimization service ensures your content pays." },
        { icon: "&#128640;", title: "Multi-Platform Scaling", desc: "Winning content systematically repurposed and scaled across platforms. One hit becomes ten assets across five platforms. This is content repurposing strategy at scale." }
      ],
      methodLabel: "The Framework",
      methodTitle: `How We Turn<br>Data Into <span class="gradient-text">Dominance</span>`,
      methodImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
      methodSteps: [
        { num: "01", title: "Deep Data Audit", desc: "We pull apart your entire content history, retention curves, CTR, traffic sources, conversion points, and find the patterns hiding in your numbers. This is a full YouTube channel audit and beyond." },
        { num: "02", title: "Hypothesis & Test", desc: "Every change becomes a controlled experiment: new hooks, formats, thumbnails, titles. In our YouTube channel audit service, we isolate variables so we know exactly what moved." },
        { num: "03", title: "Analyze & Decide", desc: "Results come in, verdicts go out: Kill / Fix / Double Down. Underperformers get cut or fixed. Winners get budget, sequels, and spin-offs. This is channel growth strategy in action." },
        { num: "04", title: "Scale The Winners", desc: "Proven formats get systemized into repeatable series, repurposed across platforms, continuously optimized, and amplified—turning unpredictable growth into scalable, repeatable success." }
      ],
      delivTitle: `Your Growth,<br><span class="gradient-text">Documented &amp; Directed</span>`,
      delivSub: "Strategy you can actually execute — clear verdicts, clear priorities and a roadmap that compounds.",
      deliverables: [
        { icon: "&#128202;", title: "Growth Audit Report", desc: "A full teardown of your channel and content performance; what's working, what's dead weight, and where the biggest opportunities hide." },
        { icon: "&#9878;", title: "Testing Roadmap", desc: "A prioritized experiment backlog outlining what we're testing, why it matters, the success metrics we're tracking, and which results trigger confident scale decisions." },
        { icon: "&#128200;", title: "Analytics Dashboard", desc: "A single source of truth for the metrics that matter—retention, CTR, conversions, revenue, and audience behavior—updated monthly with actionable insights." },
        { icon: "&#128222;", title: "Monthly Strategy Sessions", desc: "Deep-dive calls where we review the data, deliver Kill / Fix / Double Down verdicts, and set the next month's battle plan." },
        { icon: "&#128373;", title: "Competitor Intelligence", desc: "Ongoing tracking of your niche's winners through continuous competitive analysis—revealing what's working and where opportunities exist." },
        { icon: "&#128218;", title: "Scale Playbooks", desc: "Documented, repeatable systems for every winning format—supported by a scalable content repurposing strategy." }
      ],
      faq: [
        { q: "What does a content strategy agency actually do for creators and brands?", a: "A content strategy agency like Glock Media builds data-driven systems that turn effort into outcomes. We audit your channel, test variables, analyze performance, and scale what works. We don't guess - we decide based on evidence." },
        { q: "What's included in a channel audit and growth strategy?", a: "Our channel audit and growth strategy service analyzes your entire content history, retention curves, CTR, traffic sources, conversion points, and audience behavior. We identify what's working, what's dead weight, and where your biggest opportunities hide." },
        { q: "How does a growth analytics service help improve performance?", a: "A growth analytics service goes beyond basic views and subscribers. We track retention curves, CTR, traffic sources, conversion points, and revenue metrics; then translate that data into actionable decisions." },
        { q: "What is UGC strategy for brands and why does it matter?", a: "UGC strategy for brands means leveraging user-generated content as a growth asset. We help brands source, curate, and optimize authentic customer content, turning real voices into powerful social proof." },
        { q: "Do you provide content strategy consulting for creators?", a: "Absolutely. Our content strategy consulting for creators gives you a clear roadmap; what to publish, when to publish, and how to scale. We analyze your niche, competitors, and audience to build a custom content framework." }
      ],
      ctaTitle: `Ready To Grow<br><span class="gradient-text">On Purpose?</span>`,
      ctaDesc: "Book a free discovery call. We'll pull your data apart live and show you exactly what's holding your growth hostage.",
      ctaBtn: "Let's Talk Growth"
    }),

    scriptWriting: svcDefaults({
      heroLabel: "Scriptwriting Service",
      heroTitle: `<span class="gradient-text">ScriptWriting</span> Services<br>Scripts That Hook, <span class="gradient-text">Hold & Convert</span>`,
      heroSub: "Retention-first scripts engineered for maximum watch time. Scroll-stopping hooks, narrative pacing, curiosity loops, and psychological triggers that keep viewers glued from the first second to the final CTA.",
      secText: "Our Method",
      heroStats: [{ num: "20", suffix: "K+", label: "Scripts Delivered" }, { num: "24", suffix: "h", label: "Avg. Turnaround" }, { num: "50", suffix: "%", label: "Avg. Retention Lift" }],
      problemTitle: `Most Scripts Kill Retention<br>Before The <span class="gradient-text">First Minute</span>`,
      problemParas: [
        `Here's the hard truth: <strong>70% of viewers click away within the first 30 seconds.</strong> Not because your content is bad — because your script didn't grab them, didn't promise value, and didn't open the curiosity gap that demands they keep watching.`,
        `Weak hooks and flat pacing are silently destroying your channel's potential. <strong>Every second a viewer leaves</strong> is a subscriber you'll never gain, a conversion you'll never make, and revenue you'll never see.`
      ],
      problemBullets: ["Weak hooks that fail to stop the scroll", "No narrative structure — just information dumps", "Zero psychological triggers or curiosity loops", "Scripts that sound robotic, not conversational", "No consideration for platform-specific algorithms"],
      problemQuote: "The algorithm doesn't reward good content. It rewards content people can't stop watching.",
      problemImage: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80",
      featuresLabel: "Our Scriptwriting Services",
      featuresTitle: `<span class="gradient-text">Professional </span>Scriptwriting<br>For <span class="gradient-text"> Every</span> Format`,
      featuresSub: "Every script we deliver is engineered using proven psychological frameworks and platform-specific optimization. This is writing as a growth weapon.",
      features: [
        { icon: "&#128165;", title: "YouTube Scriptwriting Service", desc: "Full-length YouTube scripts optimized for retention, watch time, and algorithm performance. Every script includes hook engineering, narrative structure, and strategic CTA placement." },
        { icon: "&#128220;", title: "Hook Writing Service", desc: "Dedicated hook writing service crafting irresistible openings that maximize audience retention, boost click-through rates, and stop viewers from scrolling away." },
        { icon: "&#129504;", title: "Video Scriptwriter", desc: "Professional video script writer for any format: explainers, product demos, brand stories, ads, corporate videos, and more. Clear, conversational, and conversion-focused." },
        { icon: "&#127919;", title: "TikTok & Shorts Script Writer", desc: "Expert TikTok and Shorts script writer producing fast-paced, platform-native scripts engineered for completion rate, engagement, and repeat viewers." },
        { icon: "&#128218;", title: "Podcast Script Writer/Consultant", desc: "Experienced podcast script writer and video script consultant helping brands develop engaging episodes, stronger messaging, and audience-focused storytelling." },
        { icon: "&#9889;", title: "Documentary Scriptwriter", desc: "Research-driven documentary script writer delivering compelling narratives, structured storytelling, visual direction, and factual accuracy for long-form productions." }
      ],
      methodLabel: "Our Method",
      methodTitle: `How We Craft<br><span class="gradient-text">Scripts That Convert</span>`,
      methodImage: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80",
      methodSteps: [
        { num: "01", title: "Audience Deep Dive", desc: "We analyze your target demographics, pain points, content consumption patterns and the exact language that resonates with them. Every script speaks directly to the viewer." },
        { num: "02", title: "Hook Engineering", desc: "Multiple hook variations pressure-tested against your niche's top performers. We craft openings that create immediate curiosity and promise clear value." },
        { num: "03", title: "Narrative Blueprint", desc: "Story arc mapping with retention checkpoints, transition phrases and B-roll callouts. Every beat is planned for maximum engagement." },
        { num: "04", title: "Polish & Optimize", desc: "Final pass for pacing, tone consistency, CTA placement and algorithm-friendly phrasing. The script is ready to perform the moment you hit record." }
      ],
      delivTitle: `Everything Included,<br><span class="gradient-text">Nothing Missing</span>`,
      delivSub: "Everything you need to go from idea to recorded content — no guesswork, no missing pieces.",
      deliverables: [
        { icon: "&#128221;", title: "Full Video Script", desc: "Complete word-for-word script with timing cues, tone directions and natural conversational flow." },
        { icon: "&#127909;", title: "B-Roll Callouts", desc: "Detailed visual direction for editors — what footage to capture, stock to source and graphics to create." },
        { icon: "&#128227;", title: "Title & Thumbnail Concepts", desc: "3–5 high-CTR title options plus thumbnail concept descriptions to maximize click-through rate." },
        { icon: "&#128172;", title: "Description & Tags", desc: "SEO-optimized video description with timestamps, links and keyword-rich tags for discoverability." },
        { icon: "&#128200;", title: "Retention Strategy Notes", desc: "Notes on the pacing, curiosity loops and engagement triggers used throughout, for your reference." },
        { icon: "&#128260;", title: "Revision Rounds", desc: "Two full revision rounds included. We refine until the script perfectly matches your voice and vision." }
      ],
      faq: [
        { q: "Can you give a video scriptwriter for hire for just one project?", a: "Yes. Whether you need a single video scriptwriter for hire for one project or ongoing monthly support, we're flexible. No long-term commitments required unless you want them." },
        { q: "What exactly is a hook writing service, and how does it improve retention", a: "A hook writing service focuses specifically on crafting the first 3–10 seconds of your video; the critical window where most viewers decide whether to stay or scroll away. But we go beyond hooks — we engineer every beat, pacing element, and curiosity loop throughout the entire script." },
        { q: "Why should I choose a script writing agency over hiring a freelancer?", a: "A full script writing agency gives you consistency, scalability, and accountability. As a script writing agency, we provide a dedicated team, built-in quality control, revision rounds, and a reliable 48–72-hour turnaround." },
        { q: "Do you offer video script consultant services for creators who write their own scripts?", a: "Yes. We offer video script consultant services for creators who want to write their own scripts but need expert feedback and strategic direction — retention analysis, hook improvements, pacing refinement, and platform optimization." },
        { q: "Do you write podcast scripts and show notes?", a: "Absolutely. We're a dedicated podcast scriptwriter for creators and brands who want structured, engaging podcast episodes, complete with show notes, timestamps, and SEO-optimized episode descriptions." }
      ],
      ctaTitle: `<span class="gradient-text">Tired </span>of Content <br>That <span class="gradient-text">Flops?</span><br>let's <span class="gradient-text">Fix</span> That`,
      ctaDesc: "Get started with Glock Media with a free 30-minute discovery call. As a content and growth agency, we build content that commands attention. Learn more about Glock Media and how we turn views into revenue.",
      ctaBtn: "Book Your Free Call"
    }),

    videoEditing: svcDefaults({
      heroLabel: "Video Editing Services",
      heroTitle: `Views Dying In First 30 Seconds?<br>Check Our YouTube <span class="gradient-text"> Video Editing</span> Services`,
      heroSub: "Cinematic editing engineered for retention. Precision pacing, motion graphics, video color grading, and sound design that transform raw footage into content people physically can't click away from.",
      secText: "Our Process",
      heroStats: [{ num: "1000", suffix: "+", label: "Videos Edited" }, { num: "72", suffix: "h", label: "Avg. Turnaround" }, { num: "4K", suffix: "", label: "Cinematic Delivery" }],
      problemTitle: `Great Footage Is Being<br><span class="gradient-text">Murdered</span> By Bad Edits`,
      problemParas: [
        `You filmed something worth watching. But between the timeline and the export, something died. <strong>Retention graphs don't lie</strong> — viewers are leaving in droves, and it's rarely the content's fault. It's the cut.`,
        `Choppy pacing, dead air, flat color and silence where energy should be — these are the killers. <strong>Every awkward second</strong> is an invitation to click away, and the algorithm remembers every single exit.`
      ],
      problemBullets: ["Dead air and pacing that drags viewers to the exit", "Jarring cuts with no flow or rhythm", "Flat, lifeless color that looks amateur", "Silent or mismatched audio that kills energy", "One export forced onto every platform"],
      problemQuote: "Editing isn't assembly. It's the difference between watched and abandoned.",
      problemImage: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=800&q=80",
      featuresLabel: "What You Get",
      featuresTitle: `Editing That Holds<br><span class="gradient-text">Attention Hostage</span>`,
      featuresSub: "Every cut, every transition, every sound is placed with intent. This is post-production as a retention strategy.",
      features: [
        { icon: "&#9986;", title: "Retention-First Pacing", desc: "Cuts timed to attention spans, not arbitrary beats. We edit against the retention curve; tightening, accelerating, and breathing exactly where the data says to." },
        { icon: "&#127752;", title: "Motion Graphics & Visual Effects", desc: "Custom animations, kinetic typography, and visual effects that add polish without stealing focus from the story." },
        { icon: "&#127912;", title: "Cinematic Color & Sound", desc: "Professional video color grading that gives your footage a signature look; moody, vibrant, or clean. Paired with broadcast-quality sound design and mixing." },
        { icon: "&#128066;", title: "Platform-Native Editing", desc: "Expert short-form video editing for TikTok, Reels, and Shorts. Complete podcast video editing with multicam sync and dynamic graphics. Premium long-form editing with narrative pacing." },
        { icon: "&#127916;", title: "Video Clipping & Repurposing", desc: "A dedicated video clipping service that extracts the best moments from long-form content and repurposes them into platform-optimized Shorts, Reels, and TikToks." },
        { icon: "&#128241;", title: "High CTR Thumbnail Designing", desc: "High-impact thumbnail design service and specialized YouTube thumbnail design that stops the scroll, with bold faces and curiosity-gap text." }
      ],
      methodLabel: "Our Process",
      methodTitle: `From Raw Footage<br>To <span class="gradient-text">Viral-Ready Cut</span>`,
      methodImage: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80",
      methodSteps: [
        { num: "01", title: "Assembly & Rough Cut", desc: "We log every second, select the strongest takes, and build a compelling narrative foundation where every edit serves clarity, pacing, story, and maximum viewer retention." },
        { num: "02", title: "Fine Cut & Pacing", desc: "Frame-by-frame refinement. Tighten pauses, sharpen transitions, tune rhythm until retention has nowhere to dip." },
        { num: "03", title: "Graphics, Color & Sound", desc: "Motion graphics, VFX, video color grading, and professional audio mixing enhance every frame with purpose, clarity, polish, and lasting visual quality." },
        { num: "04", title: "Thumbnails & Multi-Platform Export", desc: "Custom thumbnail design service delivering high-CTR thumbnails alongside platform-optimized exports, ensuring every video performs across YouTube, Shorts, TikTok, and beyond." }
      ],
      delivTitle: `What Lands<br><span class="gradient-text">In Your Inbox</span>`,
      delivSub: "Everything you need to publish with confidence — master files, platform versions and zero loose ends.",
      deliverables: [
        { icon: "&#127909;", title: "Final Master File", desc: "Broadcast-quality export in up to 4K, ready to upload. Color graded, mixed and mastered." },
        { icon: "&#127752;", title: "Motion Graphics Pack", desc: "Intros, lower thirds, subscribe animations and transitions — yours to reuse across future content." },
        { icon: "&#128066;", title: "Audio Master", desc: "Clean, professional sound. Music licensed, SFX layered, levels mixed to platform standards." },
        { icon: "&#128241;", title: "Multi-Platform Versions", desc: "Vertical, square and horizontal cuts — each reframed and re-paced, not just cropped." },
        { icon: "&#128200;", title: "Retention Notes", desc: "A quick brief on the pacing decisions and engagement techniques used, so you learn as we edit." },
        { icon: "&#128260;", title: "Revision Rounds", desc: "Two full revision rounds included. We adjust until the cut matches exactly what you saw in your head." }
      ],
      faq: [
        { q: "What's the difference between your YouTube video editing service and standard editing?", a: "Our YouTube video editing service is specifically optimized for the YouTube algorithm. We edit against retention curves, engineer pacing checkpoints, and apply psychological triggers that keep viewers watching." },
        { q: "Do you offer short-form TikTok and Reels video editing?", a: "Yes. We specialize in short-form video editing for TikTok, Instagram Reels, and YouTube Shorts, plus a video clipping service that extracts highlight moments from your long-form content." },
        { q: "What platforms do you handle for video editing?", a: "We handle YouTube (long-form and Shorts), TikTok, Instagram Reels, Facebook, LinkedIn, and podcasts. Each platform gets a native export with optimized aspect ratios, pacing, and captions." },
        { q: "Do you provide thumbnail design service as well?", a: "Absolutely. We offer a dedicated thumbnail design service and YouTube thumbnail design that drives high CTR — bold faces, emotional expressions, curiosity-gap text, and color psychology." },
        { q: "What's included in your long-form video editing for creators?", a: "Our long-form video editing for creators includes full narrative structure, retention pacing, B-roll integration, motion graphics, video color grading, sound design, and multi-platform exports." }
      ],
      ctaTitle: `Ready For Edits That<br>Hold <span class="gradient-text">Attention?</span>`,
      ctaDesc: "Book a free discovery call. Send us your toughest footage — we'll show you exactly what a retention-first edit looks like.",
      ctaBtn: "Let's Talk Editing"
    })
  },

  portfolioPage: {
    customTypes: [],
    niches: [],
    hero: {
      label: "Our Work",
      titleHtml: `Work That Speaks In <span class="gradient-text">Views.</span>`,
      subtitle: `<strong>50B+ views generated</strong> across documentaries, Shorts systems, and thumbnail design. This isn't a content agency portfolio built on glossy mockups; it's a video production portfolio backed by real numbers, real retention curves, and real social media growth results.`
    },
    results: [
      { num: "50", suffix: "B+", label: "Views Generated" },
      { num: "20", suffix: "M+", label: "Subscribers Won" },
      { num: "11", suffix: "%", label: "Avg. Thumbnail CTR" },
      { num: "90", suffix: "%", label: "Client Retention" }
    ],
    marquee: [
      { clip: "assets/clips/reel-1.mp4", orientation: "v", platform: "TikTok", stats: ["2M+ Views", "200K+ Likes"] },
      { clip: "assets/clips/reel-2.mp4", orientation: "h", platform: "YouTube", stats: ["10M+ Views", "500K+ Subs"] },
      { clip: "assets/clips/reel-3.mp4", orientation: "v", platform: "Instagram", stats: ["500K+ Views", "50K+ Shares"] },
      { clip: "assets/clips/reel-4.mp4", orientation: "h", platform: "Netflix", stats: ["3M+ Views", "50K+ Comments"] },
      { clip: "assets/clips/reel-5.mp4", orientation: "v", platform: "Raw Footage", stats: ["1M+ Views", "50K+ Likes"] },
      { clip: "assets/clips/reel-6.mp4", orientation: "h", platform: "Edited", stats: ["5M+ Views", "100K+ Likes"] },
      { clip: "assets/clips/reel-7.mp4", orientation: "v", platform: "Snapchat", stats: ["800K+ Views", "90K+ Shares"] },
      { clip: "assets/clips/reel-8.mp4", orientation: "h", platform: "YouTube", stats: ["12M+ Views", "700K+ Subs"] }
    ],
    testimonials: [
      { shot: "assets/testimonials/review-1.png", client: "Upwork Client", project: "YouTube Automation Channel", rating: 5 },
      { shot: "assets/testimonials/review-2.png", client: "Upwork Client", project: "Documentary Edit + Thumbnails", rating: 5 },
      { shot: "assets/testimonials/review-3.png", client: "Upwork Client", project: "30 Shorts Monthly Retainer", rating: 5 },
      { shot: "assets/testimonials/review-4.png", client: "Upwork Client", project: "Channel Rebrand + Key Art", rating: 5 }
    ],
    clients: [
      { name: "WealthPath", logo: "assets/clients/client-1.svg" },
      { name: "NovaTech Media", logo: "assets/clients/client-2.svg" },
      { name: "Apex Athletics", logo: "assets/clients/client-3.svg" },
      { name: "Midnight Files", logo: "assets/clients/client-4.svg" },
      { name: "Lumen Co.", logo: "assets/clients/client-5.svg" },
      { name: "The Deep Dive Pod", logo: "assets/clients/client-6.svg" },
      { name: "Courtside Clips", logo: "assets/clients/client-7.svg" },
      { name: "LearnFast", logo: "assets/clients/client-8.svg" }
    ],
    cta: {
      spotsText: "5 spots left for this month",
      titleHtml: `Your Channel Could Be<br>The Next <span class="gradient-text">Case Study</span>`,
      desc: "Every channel in our content agency case studies started exactly where you are right now; good content, flat growth, and no clear path forward.",
      btnText: "Start Your Project", btnLink: "https://calendly.com/hammadrazakhan-glockmedia/30min"
    }
  },

  customServices: []
};

let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
let portfolioItemsCache = [];
let editingPortfolioItemId = "";
let editingCustomSvcKey = "";
const extraReady = {};
function markReady(name) { extraReady[name] = true; }

// ============================================================
// Generic list-manager renderers
// ============================================================
function renderIconCards(containerId, list, cardClass) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.innerHTML = list.map((it, i) => `
    <div class="admin-item-card ${cardClass}" data-idx="${i}">
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div><label class="admin-label">Icon (emoji/HTML entity)</label><input class="admin-input f-icon" value="${esc(it.icon || "")}"></div>
        <div class="sm:col-span-3"><label class="admin-label">Title</label><input class="admin-input f-title" value="${esc(it.title || "")}"></div>
      </div>
      <div class="mt-3"><label class="admin-label">Description</label><textarea rows="2" class="admin-textarea f-desc">${esc(it.desc || "")}</textarea></div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('${containerId}', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectIconCards(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} .admin-item-card`)).map(card => ({
    icon: card.querySelector(".f-icon").value,
    title: card.querySelector(".f-title").value,
    desc: card.querySelector(".f-desc").value
  })).filter(x => x.title);
}

function renderStepCards(containerId, list, hasImage) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.innerHTML = list.map((it, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div><label class="admin-label">Number</label><input class="admin-input f-num" value="${esc(it.num || "")}"></div>
        <div class="sm:col-span-3"><label class="admin-label">Title</label><input class="admin-input f-title" value="${esc(it.title || "")}"></div>
      </div>
      <div class="mt-3"><label class="admin-label">Description</label><textarea rows="2" class="admin-textarea f-desc">${esc(it.desc || "")}</textarea></div>
      ${hasImage ? `<div class="mt-3"><label class="admin-label\">Image URL <span class=\"text-neutral-600 font-normal\">(URL, Drive/Dropbox link, or file path)</span></label><input class=\"admin-input f-image\" value="${esc(it.image || "")}"></div>` : ""}
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('${containerId}', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectStepCards(containerId, hasImage) {
  return Array.from(document.querySelectorAll(`#${containerId} .admin-item-card`)).map(card => {
    const o = { num: card.querySelector(".f-num").value, title: card.querySelector(".f-title").value, desc: card.querySelector(".f-desc").value };
    if (hasImage) o.image = card.querySelector(".f-image").value;
    return o;
  }).filter(x => x.title);
}

function renderFaqCards(containerId, list) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.innerHTML = list.map((it, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div><label class="admin-label">Question</label><input class="admin-input f-q" value="${esc(it.q || "")}"></div>
      <div class="mt-3"><label class="admin-label">Answer</label><textarea rows="2" class="admin-textarea f-a">${esc(it.a || "")}</textarea></div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('${containerId}', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectFaqCards(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} .admin-item-card`)).map(card => ({
    q: card.querySelector(".f-q").value, a: card.querySelector(".f-a").value
  })).filter(x => x.q);
}

function renderStatTriplet(containerId, stats, withSuffix) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.innerHTML = stats.map((s, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <label class="admin-label">Number</label><input class="admin-input f-num" value="${esc(s.num || "")}">
      ${withSuffix ? `<label class="admin-label mt-2">Suffix</label><input class="admin-input f-suffix" value="${esc(s.suffix || "")}">` : ""}
      <label class="admin-label mt-2">Label</label><input class="admin-input f-label" value="${esc(s.label || "")}">
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('${containerId}', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectStatTriplet(containerId, withSuffix) {
  return Array.from(document.querySelectorAll(`#${containerId} .admin-item-card`)).map(card => {
    const o = { num: card.querySelector(".f-num").value, label: card.querySelector(".f-label").value };
    if (withSuffix) o.suffix = card.querySelector(".f-suffix").value;
    return o;
  });
}

window.removeCard = function (containerId, idx) {
  const listMap = getListMap();
  const entry = listMap[containerId];
  if (!entry) return;
  entry.list.splice(idx, 1);
  entry.render();
};

// Maps each manager container to its backing array + render fn, built fresh
// each time so it always points at the current `state`.
function getListMap() {
  const sp = state.servicePages;
  const map = {
    "ab-hero-stats-manager": { list: state.aboutPage.hero.stats, render: () => renderStatTriplet("ab-hero-stats-manager", state.aboutPage.hero.stats, false) },
    "ab-mission-stats-manager": { list: state.aboutPage.mission.stats, render: () => renderStatTriplet("ab-mission-stats-manager", state.aboutPage.mission.stats, false) },
    "sm-hero-stats-manager": { list: state.servicesPage.hero.stats, render: () => renderStatTriplet("sm-hero-stats-manager", state.servicesPage.hero.stats, true) },
    "ab-values-manager": { list: state.aboutPage.values.list, render: () => renderIconCards("ab-values-manager", state.aboutPage.values.list, "") },
    "ab-team-manager": { list: state.aboutPage.team.list, render: renderAboutTeam },
    "ab-process-manager": { list: state.aboutPage.process.steps, render: () => renderStepCards("ab-process-manager", state.aboutPage.process.steps, true) },
    "ct-methods-manager": { list: state.contactPage.methods, render: renderContactMethods },
    "ct-faq-manager": { list: state.contactPage.faq, render: () => renderFaqCards("ct-faq-manager", state.contactPage.faq) },
    "sm-process-manager": { list: state.servicesPage.process.steps, render: () => renderStepCards("sm-process-manager", state.servicesPage.process.steps, false) },
    "sm-results-manager": { list: state.servicesPage.results.list, render: renderSmResults },
    "sm-faq-manager": { list: state.servicesPage.faq, render: () => renderFaqCards("sm-faq-manager", state.servicesPage.faq) },
    "pf-results-manager": { list: state.portfolioPage.results, render: () => renderStatTriplet("pf-results-manager", state.portfolioPage.results, true) },
    "pf-marquee-manager": { list: state.portfolioPage.marquee, render: renderPfMarquee },
    "pf-testimonials-manager": { list: state.portfolioPage.testimonials, render: renderPfTestimonials },
    "pf-clients-manager": { list: state.portfolioPage.clients, render: renderPfClients },
    "home-trusted-manager": { list: state.trusted.list, render: renderHomeTrusted },
    "site-reviews-manager": { list: state.siteReviews.list, render: renderSiteReviewsManager }
  };
  ["cm", "gs", "sw", "ve"].forEach(p => {
    const key = { cm: "channelManagement", gs: "growthStrategy", sw: "scriptWriting", ve: "videoEditing" }[p];
    const sec = sp[key];
    if (!sec) return;
    map[`${p}-hero-stats-manager`] = { list: sec.hero.stats, render: () => renderStatTriplet(`${p}-hero-stats-manager`, sec.hero.stats, true) };
    map[`${p}-features-manager`] = { list: sec.features.list, render: () => renderIconCards(`${p}-features-manager`, sec.features.list, "") };
    map[`${p}-deliverables-manager`] = { list: sec.deliverables.list, render: () => renderIconCards(`${p}-deliverables-manager`, sec.deliverables.list, "") };
    map[`${p}-methodology-manager`] = { list: sec.methodology.steps, render: () => renderStepCards(`${p}-methodology-manager`, sec.methodology.steps, false) };
    map[`${p}-faq-manager`] = { list: sec.faq, render: () => renderFaqCards(`${p}-faq-manager`, sec.faq) };
  });
  if (editingCustomSvcKey && sp[editingCustomSvcKey]) {
    const sec = sp[editingCustomSvcKey];
    map["cx-hero-stats-manager"] = { list: sec.hero.stats, render: () => renderStatTriplet("cx-hero-stats-manager", sec.hero.stats, true) };
    map["cx-features-manager"] = { list: sec.features.list, render: () => renderIconCards("cx-features-manager", sec.features.list, "") };
    map["cx-deliverables-manager"] = { list: sec.deliverables.list, render: () => renderIconCards("cx-deliverables-manager", sec.deliverables.list, "") };
    map["cx-methodology-manager"] = { list: sec.methodology.steps, render: () => renderStepCards("cx-methodology-manager", sec.methodology.steps, false) };
    map["cx-faq-manager"] = { list: sec.faq, render: () => renderFaqCards("cx-faq-manager", sec.faq) };
  }
  return map;
}

window.addAboutValue = () => { state.aboutPage.values.list.push({ icon: "", title: "", desc: "" }); renderIconCards("ab-values-manager", state.aboutPage.values.list, ""); };
window.addAboutProcessStep = () => { state.aboutPage.process.steps.push({ num: "", title: "", desc: "", image: "" }); renderStepCards("ab-process-manager", state.aboutPage.process.steps, true); };
window.addContactMethod = () => { state.contactPage.methods.push({ icon: "", title: "", html: "" }); renderContactMethods(); };
window.addContactFaq = () => { state.contactPage.faq.push({ q: "", a: "" }); renderFaqCards("ct-faq-manager", state.contactPage.faq); };
window.addSmProcessStep = () => { state.servicesPage.process.steps.push({ num: "", title: "", desc: "" }); renderStepCards("sm-process-manager", state.servicesPage.process.steps, false); };
window.addSmResult = () => { state.servicesPage.results.list.push({ icon: "", num: "", suffix: "", prefix: "", label: "", desc: "" }); renderSmResults(); };
window.addSmFaq = () => { state.servicesPage.faq.push({ q: "", a: "" }); renderFaqCards("sm-faq-manager", state.servicesPage.faq); };
window.addPfResult = () => { state.portfolioPage.results.push({ num: "", suffix: "", label: "" }); renderStatTriplet("pf-results-manager", state.portfolioPage.results, true); };
window.addPfMarquee = () => { state.portfolioPage.marquee.push({ clip: "", orientation: "h", platform: "", stats: [] }); renderPfMarquee(); };
window.addPfTestimonial = () => { state.portfolioPage.testimonials.push({ shot: "", client: "", project: "", rating: 5 }); renderPfTestimonials(); };
window.addPfClient = () => { state.portfolioPage.clients.push({ name: "", logo: "" }); renderPfClients(); };
window.addHomeTrustedClient = () => { state.trusted.list.push({ name: "", logo: "" }); renderHomeTrusted(); };

const SVC_KEY = { cm: "channelManagement", gs: "growthStrategy", sw: "scriptWriting", ve: "videoEditing" };
function svcKeyFor(prefix) {
  if (prefix === "cx") return editingCustomSvcKey;
  return SVC_KEY[prefix];
}
window.addSvcListItem = (prefix, section) => {
  const key = svcKeyFor(prefix);
  if (!key || !state.servicePages[key]) return;
  const sec = state.servicePages[key][section];
  sec.list.push({ icon: "", title: "", desc: "" });
  renderIconCards(`${prefix}-${section}-manager`, sec.list, "");
};
window.addSvcMethodStep = (prefix) => {
  const key = svcKeyFor(prefix);
  if (!key || !state.servicePages[key]) return;
  const steps = state.servicePages[key].methodology.steps;
  steps.push({ num: "", title: "", desc: "" });
  renderStepCards(`${prefix}-methodology-manager`, steps, false);
};
window.addSvcFaq = (prefix) => {
  const key = svcKeyFor(prefix);
  if (!key || !state.servicePages[key]) return;
  const faq = state.servicePages[key].faq;
  faq.push({ q: "", a: "" });
  renderFaqCards(`${prefix}-faq-manager`, faq);
};

// ---------- Bespoke renderers (team / methods / results-with-icon / marquee / testimonials) ----------
function renderAboutTeam() {
  const list = state.aboutPage.team.list;
  const wrap = document.getElementById("ab-team-manager");
  if (!wrap) return;
  wrap.innerHTML = list.map((m, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label class="admin-label\">Photo URL <span class=\"text-neutral-600 font-normal\">(URL, Drive/Dropbox link, or file path)</span></label><input class=\"admin-input f-img\" value="${esc(m.img || "")}"></div>
        <div><label class="admin-label">Role</label><input class="admin-input f-role" value="${esc(m.role || "")}"></div>
        <div><label class="admin-label">Name</label><input class="admin-input f-name" value="${esc(m.name || "")}"></div>
        <div><label class="admin-label">Social Links (icon:url, comma separated — icons: instagram, linkedin, youtube, twitter, upwork)</label><input class="admin-input f-social" value="${esc((m.social || []).map(s => `${s.icon}:${s.url}`).join(", "))}"></div>
      </div>
      <div class="mt-3"><label class="admin-label">Bio</label><textarea rows="2" class="admin-textarea f-desc">${esc(m.desc || "")}</textarea></div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('ab-team-manager', ${i})">Remove</button></div>
    </div>
  `).join("");
}
window.addAboutTeamMember = () => { state.aboutPage.team.list.push({ img: "", role: "", name: "", desc: "", social: [] }); renderAboutTeam(); };
function collectAboutTeam() {
  return Array.from(document.querySelectorAll("#ab-team-manager .admin-item-card")).map(card => ({
    img: card.querySelector(".f-img").value,
    role: card.querySelector(".f-role").value,
    name: card.querySelector(".f-name").value,
    desc: card.querySelector(".f-desc").value,
    social: card.querySelector(".f-social").value.split(",").map(s => s.trim()).filter(Boolean).map(s => {
      const [icon, ...rest] = s.split(":"); return { icon: (icon || "").trim(), url: rest.join(":").trim() || "#" };
    })
  })).filter(x => x.name);
}

function renderContactMethods() {
  const list = state.contactPage.methods;
  const wrap = document.getElementById("ct-methods-manager");
  if (!wrap) return;
  wrap.innerHTML = list.map((m, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div><label class="admin-label">Icon (emoji/HTML entity)</label><input class="admin-input f-icon" value="${esc(m.icon || "")}"></div>
        <div class="sm:col-span-2"><label class="admin-label">Title</label><input class="admin-input f-title" value="${esc(m.title || "")}"></div>
      </div>
      <div class="mt-3"><label class="admin-label">Content (HTML allowed, e.g. a mailto link)</label><input class="admin-input f-html" value="${esc(m.html || "")}"></div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('ct-methods-manager', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectContactMethods() {
  return Array.from(document.querySelectorAll("#ct-methods-manager .admin-item-card")).map(card => ({
    icon: card.querySelector(".f-icon").value, title: card.querySelector(".f-title").value, html: card.querySelector(".f-html").value
  })).filter(x => x.title);
}

function renderSmResults() {
  const list = state.servicesPage.results.list;
  const wrap = document.getElementById("sm-results-manager");
  if (!wrap) return;
  wrap.innerHTML = list.map((r, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div><label class="admin-label">Icon</label><input class="admin-input f-icon" value="${esc(r.icon || "")}"></div>
        <div><label class="admin-label">Prefix (e.g. $)</label><input class="admin-input f-prefix" value="${esc(r.prefix || "")}"></div>
        <div><label class="admin-label">Number</label><input class="admin-input f-num" value="${esc(r.num || "")}"></div>
        <div><label class="admin-label">Suffix</label><input class="admin-input f-suffix" value="${esc(r.suffix || "")}"></div>
      </div>
      <div class="mt-3"><label class="admin-label">Label</label><input class="admin-input f-label" value="${esc(r.label || "")}"></div>
      <div class="mt-3"><label class="admin-label">Description</label><input class="admin-input f-desc" value="${esc(r.desc || "")}"></div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('sm-results-manager', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectSmResults() {
  return Array.from(document.querySelectorAll("#sm-results-manager .admin-item-card")).map(card => ({
    icon: card.querySelector(".f-icon").value, prefix: card.querySelector(".f-prefix").value,
    num: card.querySelector(".f-num").value, suffix: card.querySelector(".f-suffix").value,
    label: card.querySelector(".f-label").value, desc: card.querySelector(".f-desc").value
  })).filter(x => x.label);
}

function renderPfMarquee() {
  const list = state.portfolioPage.marquee;
  const wrap = document.getElementById("pf-marquee-manager");
  if (!wrap) return;
  wrap.innerHTML = list.map((m, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div><label class="admin-label\">Clip Path/URL <span class=\"text-neutral-600 font-normal\">(file path, direct URL, or Drive/Dropbox link)</span></label><input class=\"admin-input f-clip\" value="${esc(m.clip || "")}"></div>
        <div><label class="admin-label">Orientation</label>
          <select class="admin-input f-orient">
            <option value="h" ${m.orientation === "h" ? "selected" : ""}>Horizontal</option>
            <option value="v" ${m.orientation === "v" ? "selected" : ""}>Vertical</option>
          </select>
        </div>
        <div><label class="admin-label">Platform Badge</label><input class="admin-input f-platform" value="${esc(m.platform || "")}"></div>
      </div>
      <div class="mt-3"><label class="admin-label">Stat Pills (comma separated)</label><input class="admin-input f-stats" value="${esc((m.stats || []).join(", "))}"></div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('pf-marquee-manager', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectPfMarquee() {
  return Array.from(document.querySelectorAll("#pf-marquee-manager .admin-item-card")).map(card => ({
    clip: card.querySelector(".f-clip").value, orientation: card.querySelector(".f-orient").value,
    platform: card.querySelector(".f-platform").value,
    stats: card.querySelector(".f-stats").value.split(",").map(s => s.trim()).filter(Boolean)
  })).filter(x => x.clip);
}

function renderPfTestimonials() {
  const list = state.portfolioPage.testimonials;
  const wrap = document.getElementById("pf-testimonials-manager");
  if (!wrap) return;
  wrap.innerHTML = list.map((t, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div class="sm:col-span-2"><label class="admin-label\">Screenshot URL <span class=\"text-neutral-600 font-normal\">(URL, Drive/Dropbox link, or file path)</span></label><input class=\"admin-input f-shot\" value="${esc(t.shot || "")}"></div>
        <div><label class="admin-label">Client Label</label><input class="admin-input f-client" value="${esc(t.client || "")}"></div>
        <div><label class="admin-label">Rating (1-5)</label><input type="number" min="1" max="5" class="admin-input f-rating" value="${esc(t.rating || 5)}"></div>
      </div>
      <div class="mt-3"><label class="admin-label">Project</label><input class="admin-input f-project" value="${esc(t.project || "")}"></div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('pf-testimonials-manager', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectPfTestimonials() {
  return Array.from(document.querySelectorAll("#pf-testimonials-manager .admin-item-card")).map(card => ({
    shot: card.querySelector(".f-shot").value, client: card.querySelector(".f-client").value,
    project: card.querySelector(".f-project").value, rating: parseInt(card.querySelector(".f-rating").value) || 5
  })).filter(x => x.shot);
}

function renderPfCategories() {
  const wrap = document.getElementById("pf-categories-manager");
  if (!wrap) return;
  const custom = state.portfolioPage.customTypes || [];
  const builtInHtml = BUILT_IN_PORTFOLIO_TYPES.map(t =>
    `<span class="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400">${esc(t.label)} <span class="text-neutral-600 font-mono">(${esc(t.id)})</span></span>`
  ).join("");
  const customHtml = custom.map((c, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label class="admin-label">Category ID <span class="text-neutral-600 font-normal">(no spaces, used internally, e.g. "podcast")</span></label><input class="admin-input f-catid" value="${esc(c.id || "")}"></div>
        <div><label class="admin-label">Display Label <span class="text-neutral-600 font-normal">(shown as the tab name, e.g. "Podcast Clips")</span></label><input class="admin-input f-catlabel" value="${esc(c.label || "")}"></div>
      </div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removePfCategory(${i})">Remove</button></div>
    </div>
  `).join("");
  wrap.innerHTML = `
    <div class="flex flex-wrap gap-2">${builtInHtml}</div>
    ${custom.length ? `<div class="space-y-4 pt-2">${customHtml}</div>` : ""}
  `;
}
function collectPfCategories() {
  return Array.from(document.querySelectorAll("#pf-categories-manager .admin-item-card")).map(card => ({
    id: card.querySelector(".f-catid").value.trim(), label: card.querySelector(".f-catlabel").value.trim()
  })).filter(x => x.id);
}
window.addPfCategory = () => { state.portfolioPage.customTypes = state.portfolioPage.customTypes || []; state.portfolioPage.customTypes.push({ id: "", label: "" }); renderPfCategories(); };
window.removePfCategory = (i) => {
  state.portfolioPage.customTypes = collectPfCategories();
  state.portfolioPage.customTypes.splice(i, 1);
  renderPfCategories();
};

function renderPfClients() {
  const list = state.portfolioPage.clients;
  const wrap = document.getElementById("pf-clients-manager");
  if (!wrap) return;
  wrap.innerHTML = list.map((c, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label class="admin-label">Client Name</label><input class="admin-input f-name" value="${esc(c.name || "")}"></div>
        <div><label class="admin-label\">Logo URL <span class=\"text-neutral-600 font-normal\">(URL, Drive/Dropbox link, or file path)</span></label><input class=\"admin-input f-logo\" value="${esc(c.logo || "")}"></div>
      </div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('pf-clients-manager', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectPfClients() {
  return Array.from(document.querySelectorAll("#pf-clients-manager .admin-item-card")).map(card => ({
    name: card.querySelector(".f-name").value, logo: card.querySelector(".f-logo").value
  })).filter(x => x.name);
}

// Site-wide Reviews manager — the ".testimonial-carousel" slider shown on
// the About page and every Service page. One list, edited in one place,
// pushed out everywhere by reviews-loader.js.
function renderSiteReviewsManager() {
  const list = state.siteReviews.list;
  const wrap = document.getElementById("site-reviews-manager");
  if (!wrap) return;
  wrap.innerHTML = list.map((r, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div class="grid grid-cols-1 gap-3">
        <div><label class="admin-label">Quote</label><textarea rows="2" class="admin-textarea f-quote">${esc(r.quote || "")}</textarea></div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div><label class="admin-label">Client Name</label><input class="admin-input f-name" value="${esc(r.name || "")}"></div>
          <div><label class="admin-label">Role / Company</label><input class="admin-input f-role" value="${esc(r.role || "")}"></div>
          <div><label class="admin-label">Avatar URL</label><input class="admin-input f-avatar" value="${esc(r.avatar || "")}"></div>
        </div>
      </div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('site-reviews-manager', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectSiteReviews() {
  return Array.from(document.querySelectorAll("#site-reviews-manager .admin-item-card")).map(card => ({
    quote: card.querySelector(".f-quote").value,
    name: card.querySelector(".f-name").value,
    role: card.querySelector(".f-role").value,
    avatar: card.querySelector(".f-avatar").value
  })).filter(x => x.quote && x.name);
}
window.addSiteReview = () => { state.siteReviews.list.push({ quote: "", name: "", role: "", avatar: "" }); renderSiteReviewsManager(); };

function renderHomeTrusted() {
  const list = state.trusted.list;
  const wrap = document.getElementById("home-trusted-manager");
  if (!wrap) return;
  wrap.innerHTML = list.map((c, i) => `
    <div class="admin-item-card" data-idx="${i}">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label class="admin-label">Client Name</label><input class="admin-input f-name" value="${esc(c.name || "")}"></div>
        <div><label class="admin-label">Logo URL <span class="text-neutral-600 font-normal">(URL, Drive/Dropbox link, or file path)</span></label><input class="admin-input f-logo" value="${esc(c.logo || "")}"></div>
      </div>
      <div class="mt-3 text-right"><button type="button" class="admin-remove-btn" onclick="removeCard('home-trusted-manager', ${i})">Remove</button></div>
    </div>
  `).join("");
}
function collectHomeTrusted() {
  return Array.from(document.querySelectorAll("#home-trusted-manager .admin-item-card")).map(card => ({
    name: card.querySelector(".f-name").value, logo: card.querySelector(".f-logo").value
  })).filter(x => x.name || x.logo);
}

function renderSmCards() {
  const wrap = document.getElementById("sm-cards-manager");
  if (!wrap) return;
  wrap.innerHTML = state.servicesPage.cards.map((c, i) => `
    <div class="admin-item-card">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label class="admin-label">Image URL <span class="text-neutral-600 font-normal">(URL, Drive/Dropbox link, or file path)</span></label><input id="sm-card-${i}-image" class="admin-input" value="${esc(c.image || "")}"></div>
        <div><label class="admin-label">Accent Badge</label><input id="sm-card-${i}-accent" class="admin-input" value="${esc(c.accent || "")}"></div>
        <div><label class="admin-label">Title</label><input id="sm-card-${i}-title" class="admin-input" value="${esc(c.title || "")}"></div>
        <div><label class="admin-label">Tags (comma separated)</label><input id="sm-card-${i}-tags" class="admin-input" value="${esc((c.tags || []).join(", "))}"></div>
      </div>
      <div class="mt-3"><label class="admin-label">Description</label><textarea id="sm-card-${i}-desc" rows="2" class="admin-textarea">${esc(c.desc || "")}</textarea></div>
    </div>
  `).join("");
}
function collectSmCards() {
  return state.servicesPage.cards.map((c, i) => ({
    image: val(`sm-card-${i}-image`), accent: val(`sm-card-${i}-accent`), title: val(`sm-card-${i}-title`),
    desc: val(`sm-card-${i}-desc`), tags: val(`sm-card-${i}-tags`).split(",").map(s => s.trim()).filter(Boolean)
  }));
}

// ============================================================
// Service Subcategories — admin-created Services dropdown pages.
// Lives in state.customServices (list metadata: key/slug/name/order) plus
// state.servicePages[key] (the actual page content, same shape as the 4
// built-in service pages). Editing re-uses the existing "cx-*" fields /
// svc-custom-page tab and the generic populateSvcPage/collectSvcPage("cx")
// functions above — this block only needs to manage the list itself and
// point `editingCustomSvcKey` at whichever one is open.
// ============================================================
function renderCustomServicesManager() {
  const wrap = document.getElementById("custom-services-manager");
  if (!wrap) return;
  const list = state.customServices || [];
  if (!list.length) {
    wrap.innerHTML = `<p class="text-xs text-neutral-600">No subcategories yet — add one below to create a new Services dropdown page.</p>`;
    return;
  }
  wrap.innerHTML = list.map((c) => `
    <div class="admin-item-card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <div class="text-sm font-medium text-neutral-200">${esc(c.name)}</div>
        <div class="text-xs text-neutral-500 mt-0.5">/Services/Service.html?slug=${esc(c.slug)} &middot; appears in the Services navbar dropdown</div>
      </div>
      <div class="flex gap-2">
        <button type="button" class="admin-add-btn" onclick="editCustomServicePage('${esc(c.key)}')">Edit</button>
        <button type="button" class="admin-remove-btn" onclick="removeCustomServicePage('${esc(c.key)}')">Remove</button>
      </div>
    </div>
  `).join("");
}

window.addCustomServicePage = function () {
  const nameInput = document.getElementById("custom-svc-name");
  const name = (nameInput ? nameInput.value : "").trim();
  if (!name) { alert("Enter a name for the new subcategory first (e.g. Thumbnail Design)."); return; }
  state.customServices = state.customServices || [];
  let base = slugify(name) || `service-${Date.now()}`;
  let key = base, n = 2;
  const taken = (k) => !!state.servicePages[k] || state.customServices.some(c => c.key === k);
  while (taken(key)) key = `${base}-${n++}`;
  state.customServices.push({ key, slug: key, name, order: state.customServices.length });
  state.servicePages[key] = blankServicePage(name);
  if (nameInput) nameInput.value = "";
  renderCustomServicesManager();
  editCustomServicePage(key);
};

window.editCustomServicePage = function (key) {
  if (!state.servicePages[key]) return;
  editingCustomSvcKey = key;
  const meta = (state.customServices || []).find(c => c.key === key);
  const heading = document.getElementById("cx-page-heading");
  const urlHint = document.getElementById("cx-page-url");
  if (heading) heading.textContent = `SERVICES — ${(meta && meta.name ? meta.name : key).toUpperCase()}`;
  if (urlHint) urlHint.textContent = `/Services/Service.html?slug=${meta ? meta.slug : key} — also live in the navbar Services dropdown`;
  populateSvcPage("cx");
  if (typeof window.switchTab === "function") window.switchTab("svc-custom-page");
};

window.removeCustomServicePage = function (key) {
  if (!confirm("Remove this subcategory? This deletes its page content and its navbar link on next save.")) return;
  state.customServices = (state.customServices || []).filter(c => c.key !== key);
  delete state.servicePages[key];
  if (editingCustomSvcKey === key) editingCustomSvcKey = "";
  renderCustomServicesManager();
};

// ============================================================
// Populate + Collect per page
// ============================================================
function populateAbout() {
  markReady("about");
  const p = state.aboutPage;
  setVal("ab-hero-title", p.hero.titleHtml); setVal("ab-hero-subtitle", p.hero.subtitle);
  setVal("ab-hero-ctaPrimaryText", p.hero.ctaPrimaryText); setVal("ab-hero-ctaPrimaryLink", p.hero.ctaPrimaryLink);
  setVal("ab-hero-ctaSecondaryText", p.hero.ctaSecondaryText); setVal("ab-hero-ctaSecondaryLink", p.hero.ctaSecondaryLink);
  renderStatTriplet("ab-hero-stats-manager", p.hero.stats, false);
  setVal("ab-mission-label", p.mission.label); setVal("ab-mission-title", p.mission.titleHtml);
  setVal("ab-mission-paragraphs", p.mission.paragraphs.join("\n")); setVal("ab-mission-image", p.mission.image);
  renderStatTriplet("ab-mission-stats-manager", p.mission.stats, false);
  setVal("ab-values-label", p.values.label); setVal("ab-values-title", p.values.titleHtml); setVal("ab-values-subtitle", p.values.subtitle);
  renderIconCards("ab-values-manager", p.values.list, "");
  setVal("ab-team-label", p.team.label); setVal("ab-team-title", p.team.titleHtml); setVal("ab-team-subtitle", p.team.subtitle);
  renderAboutTeam();
  setVal("ab-process-label", p.process.label); setVal("ab-process-title", p.process.titleHtml); setVal("ab-process-subtitle", p.process.subtitle);
  renderStepCards("ab-process-manager", p.process.steps, true);
  setVal("ab-cta-spotsText", p.cta.spotsText); setVal("ab-cta-title", p.cta.titleHtml); setVal("ab-cta-desc", p.cta.desc);
  setVal("ab-cta-btnText", p.cta.btnText); setVal("ab-cta-btnLink", p.cta.btnLink);
  renderSiteReviewsManager();
}
function collectAbout() {
  if (!extraReady.about) return;
  const p = state.aboutPage;
  p.hero.titleHtml = val("ab-hero-title"); p.hero.subtitle = val("ab-hero-subtitle");
  p.hero.ctaPrimaryText = val("ab-hero-ctaPrimaryText"); p.hero.ctaPrimaryLink = val("ab-hero-ctaPrimaryLink");
  p.hero.ctaSecondaryText = val("ab-hero-ctaSecondaryText"); p.hero.ctaSecondaryLink = val("ab-hero-ctaSecondaryLink");
  p.hero.stats = collectStatTriplet("ab-hero-stats-manager", false);
  p.mission.label = val("ab-mission-label"); p.mission.titleHtml = val("ab-mission-title");
  p.mission.paragraphs = linesToArray(val("ab-mission-paragraphs")); p.mission.image = val("ab-mission-image");
  p.mission.stats = collectStatTriplet("ab-mission-stats-manager", false);
  p.values.label = val("ab-values-label"); p.values.titleHtml = val("ab-values-title"); p.values.subtitle = val("ab-values-subtitle");
  p.values.list = collectIconCards("ab-values-manager");
  p.team.label = val("ab-team-label"); p.team.titleHtml = val("ab-team-title"); p.team.subtitle = val("ab-team-subtitle");
  p.team.list = collectAboutTeam();
  p.process.label = val("ab-process-label"); p.process.titleHtml = val("ab-process-title"); p.process.subtitle = val("ab-process-subtitle");
  p.process.steps = collectStepCards("ab-process-manager", true);
  p.cta.spotsText = val("ab-cta-spotsText"); p.cta.titleHtml = val("ab-cta-title"); p.cta.desc = val("ab-cta-desc");
  p.cta.btnText = val("ab-cta-btnText"); p.cta.btnLink = val("ab-cta-btnLink");
}

function populateContact() {
  markReady("contact");
  const p = state.contactPage;
  setVal("ct-hero-label", p.hero.label); setVal("ct-hero-title", p.hero.titleHtml); setVal("ct-hero-subtitle", p.hero.subtitle);
  setVal("ct-hero-ctaPrimaryText", p.hero.ctaPrimaryText); setVal("ct-hero-ctaPrimaryLink", p.hero.ctaPrimaryLink);
  setVal("ct-hero-ctaSecondaryText", p.hero.ctaSecondaryText); setVal("ct-hero-ctaSecondaryLink", p.hero.ctaSecondaryLink);
  setVal("ct-hero-spotsText", p.hero.spotsText);
  renderContactMethods();
  renderFaqCards("ct-faq-manager", p.faq);
}
function collectContact() {
  if (!extraReady.contact) return;
  const p = state.contactPage;
  p.hero.label = val("ct-hero-label"); p.hero.titleHtml = val("ct-hero-title"); p.hero.subtitle = val("ct-hero-subtitle");
  p.hero.ctaPrimaryText = val("ct-hero-ctaPrimaryText"); p.hero.ctaPrimaryLink = val("ct-hero-ctaPrimaryLink");
  p.hero.ctaSecondaryText = val("ct-hero-ctaSecondaryText"); p.hero.ctaSecondaryLink = val("ct-hero-ctaSecondaryLink");
  p.hero.spotsText = val("ct-hero-spotsText");
  p.methods = collectContactMethods();
  p.faq = collectFaqCards("ct-faq-manager");
}

function populateServicesMain() {
  markReady("services");
  const p = state.servicesPage;
  setVal("sm-hero-label", p.hero.label); setVal("sm-hero-title", p.hero.titleHtml); setVal("sm-hero-subtitle", p.hero.subtitle);
  renderStatTriplet("sm-hero-stats-manager", p.hero.stats, true);
  renderSmCards();
  setVal("sm-process-label", p.process.label); setVal("sm-process-title", p.process.titleHtml); setVal("sm-process-subtitle", p.process.subtitle);
  renderStepCards("sm-process-manager", p.process.steps, false);
  setVal("sm-results-label", p.results.label); setVal("sm-results-title", p.results.titleHtml); setVal("sm-results-subtitle", p.results.subtitle);
  renderSmResults();
  renderFaqCards("sm-faq-manager", p.faq);
  setVal("sm-cta-spotsText", p.cta.spotsText); setVal("sm-cta-title", p.cta.titleHtml); setVal("sm-cta-desc", p.cta.desc);
  setVal("sm-cta-btnText", p.cta.btnText); setVal("sm-cta-btnLink", p.cta.btnLink);
  renderCustomServicesManager();
}
function collectServicesMain() {
  if (!extraReady.services) return;
  const p = state.servicesPage;
  p.hero.label = val("sm-hero-label"); p.hero.titleHtml = val("sm-hero-title"); p.hero.subtitle = val("sm-hero-subtitle");
  p.hero.stats = collectStatTriplet("sm-hero-stats-manager", true);
  p.cards = collectSmCards();
  p.process.label = val("sm-process-label"); p.process.titleHtml = val("sm-process-title"); p.process.subtitle = val("sm-process-subtitle");
  p.process.steps = collectStepCards("sm-process-manager", false);
  p.results.label = val("sm-results-label"); p.results.titleHtml = val("sm-results-title"); p.results.subtitle = val("sm-results-subtitle");
  p.results.list = collectSmResults();
  p.faq = collectFaqCards("sm-faq-manager");
  p.cta.spotsText = val("sm-cta-spotsText"); p.cta.titleHtml = val("sm-cta-title"); p.cta.desc = val("sm-cta-desc");
  p.cta.btnText = val("sm-cta-btnText"); p.cta.btnLink = val("sm-cta-btnLink");
}

function populateSvcPage(prefix) {
  const key = svcKeyFor(prefix);
  const p = state.servicePages[key];
  if (!p) return;
  markReady("svc-" + prefix);
  setVal(`${prefix}-hero-label`, p.hero.label); setVal(`${prefix}-hero-title`, p.hero.titleHtml); setVal(`${prefix}-hero-subtitle`, p.hero.subtitle);
  setVal(`${prefix}-hero-ctaPrimaryText`, p.hero.ctaPrimaryText); setVal(`${prefix}-hero-ctaPrimaryLink`, p.hero.ctaPrimaryLink);
  setVal(`${prefix}-hero-ctaSecondaryText`, p.hero.ctaSecondaryText); setVal(`${prefix}-hero-ctaSecondaryLink`, p.hero.ctaSecondaryLink);
  renderStatTriplet(`${prefix}-hero-stats-manager`, p.hero.stats, true);
  setVal(`${prefix}-problem-label`, p.problem.label); setVal(`${prefix}-problem-title`, p.problem.titleHtml);
  setVal(`${prefix}-problem-paragraphs`, p.problem.paragraphs.join("\n")); setVal(`${prefix}-problem-bullets`, p.problem.bullets.join("\n"));
  setVal(`${prefix}-problem-quote`, p.problem.quote); setVal(`${prefix}-problem-image`, p.problem.image);
  setVal(`${prefix}-features-label`, p.features.label); setVal(`${prefix}-features-title`, p.features.titleHtml); setVal(`${prefix}-features-subtitle`, p.features.subtitle);
  renderIconCards(`${prefix}-features-manager`, p.features.list, "");
  setVal(`${prefix}-methodology-label`, p.methodology.label); setVal(`${prefix}-methodology-title`, p.methodology.titleHtml); setVal(`${prefix}-methodology-image`, p.methodology.image);
  renderStepCards(`${prefix}-methodology-manager`, p.methodology.steps, false);
  setVal(`${prefix}-deliverables-label`, p.deliverables.label); setVal(`${prefix}-deliverables-title`, p.deliverables.titleHtml); setVal(`${prefix}-deliverables-subtitle`, p.deliverables.subtitle);
  renderIconCards(`${prefix}-deliverables-manager`, p.deliverables.list, "");
  renderFaqCards(`${prefix}-faq-manager`, p.faq);
  setVal(`${prefix}-cta-spotsText`, p.cta.spotsText); setVal(`${prefix}-cta-title`, p.cta.titleHtml); setVal(`${prefix}-cta-desc`, p.cta.desc);
  setVal(`${prefix}-cta-btnText`, p.cta.btnText); setVal(`${prefix}-cta-btnLink`, p.cta.btnLink);
}
function collectSvcPage(prefix) {
  const key = svcKeyFor(prefix);
  const p = state.servicePages[key];
  if (!p || !extraReady["svc-" + prefix]) return;
  p.hero.label = val(`${prefix}-hero-label`); p.hero.titleHtml = val(`${prefix}-hero-title`); p.hero.subtitle = val(`${prefix}-hero-subtitle`);
  p.hero.ctaPrimaryText = val(`${prefix}-hero-ctaPrimaryText`); p.hero.ctaPrimaryLink = val(`${prefix}-hero-ctaPrimaryLink`);
  p.hero.ctaSecondaryText = val(`${prefix}-hero-ctaSecondaryText`); p.hero.ctaSecondaryLink = val(`${prefix}-hero-ctaSecondaryLink`);
  p.hero.stats = collectStatTriplet(`${prefix}-hero-stats-manager`, true);
  p.problem.label = val(`${prefix}-problem-label`); p.problem.titleHtml = val(`${prefix}-problem-title`);
  p.problem.paragraphs = linesToArray(val(`${prefix}-problem-paragraphs`)); p.problem.bullets = linesToArray(val(`${prefix}-problem-bullets`));
  p.problem.quote = val(`${prefix}-problem-quote`); p.problem.image = val(`${prefix}-problem-image`);
  p.features.label = val(`${prefix}-features-label`); p.features.titleHtml = val(`${prefix}-features-title`); p.features.subtitle = val(`${prefix}-features-subtitle`);
  p.features.list = collectIconCards(`${prefix}-features-manager`);
  p.methodology.label = val(`${prefix}-methodology-label`); p.methodology.titleHtml = val(`${prefix}-methodology-title`); p.methodology.image = val(`${prefix}-methodology-image`);
  p.methodology.steps = collectStepCards(`${prefix}-methodology-manager`, false);
  p.deliverables.label = val(`${prefix}-deliverables-label`); p.deliverables.titleHtml = val(`${prefix}-deliverables-title`); p.deliverables.subtitle = val(`${prefix}-deliverables-subtitle`);
  p.deliverables.list = collectIconCards(`${prefix}-deliverables-manager`);
  p.faq = collectFaqCards(`${prefix}-faq-manager`);
  p.cta.spotsText = val(`${prefix}-cta-spotsText`); p.cta.titleHtml = val(`${prefix}-cta-title`); p.cta.desc = val(`${prefix}-cta-desc`);
  p.cta.btnText = val(`${prefix}-cta-btnText`); p.cta.btnLink = val(`${prefix}-cta-btnLink`);
}

function populatePortfolioPage() {
  markReady("portfolio");
  const p = state.portfolioPage;
  setVal("pf-hero-label", p.hero.label); setVal("pf-hero-title", p.hero.titleHtml); setVal("pf-hero-subtitle", p.hero.subtitle);
  renderStatTriplet("pf-results-manager", p.results, true);
  renderPfMarquee();
  renderPfTestimonials();
  renderPfClients();
  renderPfCategories();
  renderPfNiches();
  setVal("pf-cta-spotsText", p.cta.spotsText); setVal("pf-cta-title", p.cta.titleHtml); setVal("pf-cta-desc", p.cta.desc);
  setVal("pf-cta-btnText", p.cta.btnText); setVal("pf-cta-btnLink", p.cta.btnLink);
  renderPortfolioItemsManager();
}
function collectPortfolioPage() {
  if (!extraReady.portfolio) return;
  const p = state.portfolioPage;
  p.hero.label = val("pf-hero-label"); p.hero.titleHtml = val("pf-hero-title"); p.hero.subtitle = val("pf-hero-subtitle");
  p.results = collectStatTriplet("pf-results-manager", true);
  p.marquee = collectPfMarquee();
  p.testimonials = collectPfTestimonials();
  p.clients = collectPfClients();
  p.customTypes = collectPfCategories();
  p.cta.spotsText = val("pf-cta-spotsText"); p.cta.titleHtml = val("pf-cta-title"); p.cta.desc = val("pf-cta-desc");
  p.cta.btnText = val("pf-cta-btnText"); p.cta.btnLink = val("pf-cta-btnLink");
}

// ============================================================
// Portfolio WORK ITEMS — its own Firestore collection + modal editor,
// same pattern as Blog Posts.
// ============================================================
window.renderPortfolioItemsManager = function () {
  const wrap = document.getElementById("pf-items-manager");
  if (!wrap) return;

  // Keep the Type / Niche filter dropdowns in sync with the live data —
  // this is what makes them automatically cover any category or niche the
  // admin has ever used, including brand-new custom categories, with no
  // hardcoded list to maintain.
  const typeSel = document.getElementById("pf-item-type-filter");
  if (typeSel) {
    const current = typeSel.value;
    const types = getAllPortfolioTypes();
    typeSel.innerHTML = `<option value="">All Types</option>` +
      types.map(t => `<option value="${esc(t.id)}">${esc(t.label)}</option>`).join("");
    typeSel.value = current;
  }
  const nicheSel = document.getElementById("pf-item-niche-filter");
  if (nicheSel) {
    const current = nicheSel.value;
    const niches = Array.from(new Set(portfolioItemsCache.map(i => (i.niche || "").trim()).filter(Boolean))).sort();
    nicheSel.innerHTML = `<option value="">All Niches</option>` +
      niches.map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join("");
    nicheSel.value = current;
  }

  const typeFilter = val("pf-item-type-filter");
  const nicheFilter = val("pf-item-niche-filter");
  const searchFilter = (val("pf-item-search") || "").trim().toLowerCase();

  let items = portfolioItemsCache;
  if (typeFilter) items = items.filter(i => i.type === typeFilter);
  if (nicheFilter) items = items.filter(i => (i.niche || "") === nicheFilter);
  if (searchFilter) {
    items = items.filter(i =>
      (i.title || "").toLowerCase().includes(searchFilter) ||
      (i.client || "").toLowerCase().includes(searchFilter) ||
      (i.niche || "").toLowerCase().includes(searchFilter) ||
      (i.description || "").toLowerCase().includes(searchFilter)
    );
  }

  if (!items.length) {
    const hasAnyFilter = typeFilter || nicheFilter || searchFilter;
    wrap.innerHTML = `<div class="text-center p-8 bg-neutral-950/20 border border-neutral-900 rounded-xl text-xs text-neutral-500">${
      hasAnyFilter ? "No work items match this filter/search." : `No work items yet. Click "Add Work Item" or "Import Existing Items" above.`
    }</div>`;
    return;
  }
  wrap.innerHTML = items.map(it => `
    <div class="flex items-center justify-between gap-3 bg-neutral-950/40 border border-neutral-900 p-4 rounded-xl">
      <div class="min-w-0">
        <div class="text-sm font-semibold text-neutral-200 truncate">${esc(it.title)}</div>
        <div class="text-[10px] text-neutral-500 font-mono uppercase mt-0.5">${esc(it.type)} &middot; ${esc(it.niche || "")} ${it.client ? "&middot; " + esc(it.client) : ""}</div>
      </div>
      <div class="flex gap-2 flex-shrink-0">
        <button type="button" onclick="openPortfolioItemEditor('${it.id}')" class="px-3 py-1.5 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs text-neutral-300 rounded-lg transition">Edit</button>
        <button type="button" onclick="deletePortfolioItemConfirm('${it.id}')" class="px-3 py-1.5 bg-neutral-900 border border-neutral-800 hover:bg-red-950/40 hover:border-red-900 text-xs text-neutral-400 hover:text-red-400 rounded-lg transition">Delete</button>
      </div>
    </div>
  `).join("");
};

async function refreshPortfolioItemsCache() {
  try { portfolioItemsCache = await listPortfolioItems(); }
  catch (err) { console.error("Failed to load portfolio items:", err); portfolioItemsCache = []; }
  window.renderPortfolioItemsManager();
}

window.deletePortfolioItemConfirm = async function (id) {
  if (!confirm("Delete this portfolio item? This cannot be undone.")) return;
  await deletePortfolioItem(id);
  await refreshPortfolioItemsCache();
};

// Bulk-clear utility — mainly for recovering from the id-collision import
// bug (leftover collapsed "war"/"sports"/"cars"/etc. placeholder docs).
// Requires typing a confirmation phrase since it deletes everything at once.
window.deleteAllPortfolioItems = async function () {
  const count = portfolioItemsCache.length;
  if (!count) { alert("There are no work items to delete."); return; }
  const typed = prompt(`This will permanently delete ALL ${count} portfolio work items from Firestore. This cannot be undone.\n\nType DELETE to confirm:`);
  if (typed !== "DELETE") { if (typed !== null) alert("Cancelled — you must type DELETE exactly."); return; }
  for (const it of portfolioItemsCache) await deletePortfolioItem(it.id);
  await refreshPortfolioItemsCache();
  alert("All work items deleted. Use \"Import Existing Items\" to re-import a clean copy from js/data.js.");
};

window.openPortfolioItemEditor = function (id = "") {
  const item = id ? portfolioItemsCache.find(i => i.id === id) : null;
  editingPortfolioItemId = id;
  const modal = document.getElementById("cms-modal");
  const inner = document.getElementById("cms-modal-inner");
  inner.innerHTML = `
    <div class="flex items-center justify-between mb-5">
      <h3 class="text-lg font-bold font-space text-neutral-200">${id ? "Edit" : "Add"} Portfolio Item</h3>
      <button onclick="closePortfolioItemEditor()" class="p-1.5 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 rounded-lg transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label class="admin-label">Type <span class="text-neutral-600 font-normal">(parent category)</span></label>
          <select id="pfi-type" class="admin-input" onchange="refreshPortfolioItemNicheOptions()">
            ${getAllPortfolioTypes().map(t => `<option value="${esc(t.id)}">${esc(t.label)}</option>`).join("")}
          </select>
        </div>
        <div><label class="admin-label">Title</label><input id="pfi-title" class="admin-input"></div>
        <div><label class="admin-label">Niche <span class="text-neutral-600 font-normal">(pick an existing one for this Type, or type a new one)</span></label>
          <input id="pfi-niche" class="admin-input" list="pfi-niche-options">
          <datalist id="pfi-niche-options"></datalist>
        </div>
        <div><label class="admin-label">Client</label><input id="pfi-client" class="admin-input"></div>
        <div><label class="admin-label\">Video URL <span class=\"text-neutral-600 font-normal\">(YouTube, Drive, Vimeo, direct URL, or file path)</span></label><input id=\"pfi-video\" class="admin-input"></div>
        <div><label class="admin-label\">Doc URL <span class=\"text-neutral-600 font-normal\">(scriptwriting only — Google Docs, Drive, or any document link)</span></label><input id=\"pfi-doc\" class="admin-input"></div>
        <div><label class="admin-label\">Cover Image URL <span class=\"text-neutral-600 font-normal\">(URL, Drive/Dropbox link, or file path)</span></label><input id=\"pfi-image\" class="admin-input"></div>
        <div><label class="admin-label\">Variants <span class=\"text-neutral-600 font-normal\">(comma-separated: URLs, Drive/Dropbox links, or file paths, for A/B thumbnails)</span></label><input id=\"pfi-variants\" class="admin-input"></div>
        <div><label class="admin-label">Views (e.g. 2.4M)</label><input id="pfi-views" class="admin-input"></div>
        <div><label class="admin-label">Duration (e.g. 0:45)</label><input id="pfi-duration" class="admin-input"></div>
        <div><label class="admin-label">Pages (scriptwriting only)</label><input id="pfi-pages" class="admin-input"></div>
        <div><label class="admin-label">CTR (thumbnails only, e.g. 11%)</label><input id="pfi-ctr" class="admin-input"></div>
      </div>
      <div><label class="admin-label">Stat Pills (comma separated)</label><input id="pfi-stats" class="admin-input"></div>
      <div><label class="admin-label">Description</label><textarea id="pfi-description" rows="3" class="admin-textarea"></textarea></div>
    </div>
    <div class="mt-6 flex justify-end gap-3">
      <button onclick="closePortfolioItemEditor()" class="px-4 py-2 text-xs text-neutral-400 hover:text-neutral-200 transition">Cancel</button>
      <button onclick="savePortfolioItemFromModal()" class="px-5 py-2 rounded-lg text-xs font-semibold text-white red-gradient border border-[#8b1a1a]/40 hover:brightness-110 transition">Save Item</button>
    </div>
  `;
  if (item) {
    setVal("pfi-type", item.type); setVal("pfi-title", item.title); setVal("pfi-client", item.client);
    setVal("pfi-video", item.video); setVal("pfi-doc", item.doc); setVal("pfi-image", item.image);
    setVal("pfi-variants", (item.variants || []).join(", ")); setVal("pfi-views", item.views); setVal("pfi-duration", item.duration);
    setVal("pfi-pages", item.pages); setVal("pfi-ctr", item.ctr); setVal("pfi-stats", (item.stats || []).join(", ")); setVal("pfi-description", item.description);
  }
  window.refreshPortfolioItemNicheOptions();
  if (item) setVal("pfi-niche", item.niche);
  modal.classList.remove("hidden");
};

// Keeps the Niche field's suggestions scoped to whichever parent category
// (Type) is currently selected in the modal — only niches the admin has
// actually created under that Type show up, and the list updates live as
// soon as a new one is saved (portfolioItemsCache is the source of truth,
// same list the Niche filter dropdown above the table uses).
window.refreshPortfolioItemNicheOptions = function () {
  const dl = document.getElementById("pfi-niche-options");
  const typeSel = document.getElementById("pfi-type");
  if (!dl || !typeSel) return;
  const type = typeSel.value;
  const niches = Array.from(new Set(
    portfolioItemsCache.filter(i => i.type === type).map(i => (i.niche || "").trim()).filter(Boolean)
  )).sort();
  dl.innerHTML = niches.map(n => `<option value="${esc(n)}"></option>`).join("");
};
window.closePortfolioItemEditor = function () {
  document.getElementById("cms-modal").classList.add("hidden");
  editingPortfolioItemId = "";
};
window.savePortfolioItemFromModal = async function () {
  const data = {
    type: val("pfi-type"), title: val("pfi-title"), niche: val("pfi-niche"), client: val("pfi-client"),
    video: val("pfi-video"), doc: val("pfi-doc"), image: val("pfi-image"),
    variants: val("pfi-variants").split(",").map(s => s.trim()).filter(Boolean),
    views: val("pfi-views"), duration: val("pfi-duration"), pages: val("pfi-pages"), ctr: val("pfi-ctr"),
    stats: val("pfi-stats").split(",").map(s => s.trim()).filter(Boolean),
    description: val("pfi-description")
  };
  if (!data.title) { alert("Title is required."); return; }
  await savePortfolioItem(data, editingPortfolioItemId || undefined);
  window.closePortfolioItemEditor();
  await refreshPortfolioItemsCache();
  alert("Portfolio item saved!");
};

// Firestore doc IDs must be unique, but many items in js/data.js reuse the
// SAME `id` field across an entire niche group (e.g. every "war" documentary
// script has id:"war", every sports niche shares id:"sports"). Using that
// raw id as the Firestore doc id silently collapsed each group down to
// whichever item saved last. Instead we derive a per-item id from the
// item's array position, which is still unique even when many items share
// a source id, and stays stable across re-imports as long as data.js's
// item order doesn't change (so re-running the import updates in place
// instead of duplicating).
function importSafeId(rawId, index) {
  const base = String(rawId || "item").trim().replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "item";
  return `${base}-${index}`;
}

window.importPortfolioFromDataJs = async function () {
  const G = window.GLOCK || {};
  const legacyItems = G.portfolio || [];
  const legacyMarquee = G.marquee || [];
  const legacyTesti = G.testimonials || [];
  const legacyClients = G.clients || [];
  if (!legacyItems.length && !legacyMarquee.length && !legacyTesti.length && !legacyClients.length) {
    alert("No data found in js/data.js (window.GLOCK.portfolio / .marquee / .testimonials / .clients)."); return;
  }
  const parts = [];
  if (legacyItems.length) parts.push(`${legacyItems.length} work item(s)`);
  if (legacyMarquee.length) parts.push(`${legacyMarquee.length} marquee clip(s)`);
  if (legacyTesti.length) parts.push(`${legacyTesti.length} testimonial(s)`);
  if (legacyClients.length) parts.push(`${legacyClients.length} client logo(s)`);
  if (!confirm(`Import ${parts.join(", ")} from js/data.js? Marquee/testimonials/client logos will replace the current lists in the form (click Save Changes to persist them).\n\nNote: the client-logo list isn't currently rendered anywhere on the live site — Portfolio.html's "Trusted By" strip is driven separately by trusted-marquee.js reading images/trusted/. This just makes the data.js list editable/saved.`)) return;
  for (let i = 0; i < legacyItems.length; i++) {
    await savePortfolioItem(legacyItems[i], importSafeId(legacyItems[i].id, i));
  }
  if (legacyMarquee.length) { state.portfolioPage.marquee = legacyMarquee; renderPfMarquee(); }
  if (legacyTesti.length) { state.portfolioPage.testimonials = legacyTesti; renderPfTestimonials(); }
  if (legacyClients.length) { state.portfolioPage.clients = legacyClients; renderPfClients(); }
  await refreshPortfolioItemsCache();
  alert(`Imported ${parts.join(", ")}.\n\nIf you'd already run "Import Existing Items" before this fix, a handful of old collapsed entries (e.g. one item literally titled/id'd "war", "sports", "cars" etc.) may still be sitting in the Work Items list below — those were the overwritten group placeholders from the bug. Scroll through and delete any that look like a bare category name rather than a real title.`);
};

// ============================================================
// "Sync From Live Page" — scrapes the CURRENT hardcoded HTML (via fetch +
// DOMParser, using the same selectors the loaders write to) straight into
// the admin form. Lets you hand-edit a page's HTML directly and pull that
// text into the CMS/admin instead of retyping it, or re-sync after the
// page's static copy has changed.
// ============================================================
async function fetchDoc(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`${url} responded with ${res.status}`);
  const html = await res.text();
  return new DOMParser().parseFromString(html, "text/html");
}
const qText = (root, sel) => { const el = root.querySelector(sel); return el ? el.textContent.trim() : ""; };
const qHtml = (root, sel) => { const el = root.querySelector(sel); return el ? el.innerHTML.trim() : ""; };
const qAttr = (root, sel, attr) => { const el = root.querySelector(sel); return el ? (el.getAttribute(attr) || "") : ""; };
function btnText(root, sel) {
  const el = root.querySelector(sel);
  if (!el) return "";
  const clone = el.cloneNode(true);
  const lastSpan = clone.querySelector("span:last-child");
  if (lastSpan) lastSpan.remove();
  return clone.textContent.trim();
}
function statsFromDataCount(root, containerSel, itemSel) {
  const container = root.querySelector(containerSel);
  if (!container) return [];
  return Array.from(container.querySelectorAll(itemSel)).map(item => {
    const span = item.querySelector("[data-count]");
    return {
      num: span ? (span.getAttribute("data-count") || "") : "",
      suffix: span ? (span.getAttribute("data-suffix") || "") : "",
      label: qText(item, ".hero-stat-label, .lbl, .label")
    };
  });
}
function guessSocialIcon(a) {
  const lucide = a.querySelector("[data-lucide]");
  if (lucide) return lucide.getAttribute("data-lucide");
  const img = a.querySelector("img");
  if (img) {
    const src = (img.getAttribute("src") || "").toLowerCase();
    if (src.includes("ig") || src.includes("instagram")) return "instagram";
    if (src.includes("in.png") || src.includes("linkedin")) return "linkedin";
    if (src.includes("upwork")) return "upwork";
    if (src.includes("youtube") || src.includes("yt")) return "youtube";
    if (src.includes("twitter") || src.includes("/x.")) return "twitter";
  }
  return "link";
}
function extractCta(doc) {
  return {
    spotsText: qText(doc, ".cta-section .cta-spots-text"),
    titleHtml: qHtml(doc, ".cta-section .cta-title"),
    desc: qText(doc, ".cta-section .cta-desc"),
    btnText: btnText(doc, ".cta-section .cta-btn"),
    btnLink: qAttr(doc, ".cta-section .cta-btn", "href")
  };
}

function extractAbout(doc) {
  return {
    hero: {
      titleHtml: qHtml(doc, "#about-hero .hero-title"),
      subtitle: qText(doc, "#about-hero .hero-subtitle"),
      ctaPrimaryText: btnText(doc, "#about-hero .hero-cta-primary"),
      ctaPrimaryLink: qAttr(doc, "#about-hero .hero-cta-primary", "href"),
      ctaSecondaryText: btnText(doc, "#about-hero .hero-cta-secondary"),
      ctaSecondaryLink: qAttr(doc, "#about-hero .hero-cta-secondary", "href"),
      stats: Array.from(doc.querySelectorAll("#about-hero .hero-stats .hero-stat")).map(item => ({
        num: qText(item, ".hero-stat-number"), label: qText(item, ".hero-stat-label")
      }))
    },
    mission: {
      label: qText(doc, "#mission .section-label"),
      titleHtml: qHtml(doc, "#mission h2.section-title"),
      paragraphs: Array.from(doc.querySelectorAll("#mission .mission-paragraphs p")).map(p => p.innerHTML.trim()),
      image: qAttr(doc, "#mission .mission-visual img", "src"),
      stats: Array.from(doc.querySelectorAll("#mission .mission-stat .mission-stat-item")).map(item => {
        const numEl = item.querySelector(".num");
        return { num: numEl ? (numEl.getAttribute("data-count") || numEl.textContent.trim()) : "", label: qText(item, ".label") };
      })
    },
    values: {
      label: qText(doc, "#values .section-label"),
      titleHtml: qHtml(doc, "#values h2.section-title"),
      subtitle: qText(doc, "#values > div.reveal > p"),
      list: Array.from(doc.querySelectorAll("#values .values-grid .value-card")).map(c => ({
        icon: qHtml(c, ".value-icon"), title: qText(c, "h3"), desc: qText(c, "p")
      }))
    },
    team: {
      label: qText(doc, "#team .section-label"),
      titleHtml: qHtml(doc, "#team h2.section-title"),
      subtitle: qText(doc, "#team > div.reveal > p"),
      list: Array.from(doc.querySelectorAll("#team .team-grid .team-card")).map(c => ({
        img: qAttr(c, ".team-card-img img", "src"), role: qText(c, ".role"), name: qText(c, ".name"), desc: qText(c, ".desc"),
        social: Array.from(c.querySelectorAll(".team-card-social a")).map(a => ({ icon: guessSocialIcon(a), url: a.getAttribute("href") || "#" }))
      }))
    },
    process: {
      label: qText(doc, "#process .section-label"),
      titleHtml: qHtml(doc, "#process h2.section-title"),
      subtitle: qText(doc, "#process > div.reveal > p"),
      steps: Array.from(doc.querySelectorAll("#process .process-timeline .process-step")).map(s => ({
        num: qText(s, ".process-step-num"), title: qText(s, "h3"), desc: qText(s, "p"), image: qAttr(s, ".process-step-visual img", "src")
      }))
    },
    cta: extractCta(doc)
  };
}

function extractContact(doc) {
  return {
    hero: {
      label: qText(doc, "#contact-hero .scramble-text"),
      titleHtml: qHtml(doc, "#contact-hero .hero-title"),
      subtitle: qText(doc, "#contact-hero .hero-subtitle"),
      ctaPrimaryText: btnText(doc, "#contact-hero .hero-cta-primary"),
      ctaPrimaryLink: qAttr(doc, "#contact-hero .hero-cta-primary", "href"),
      ctaSecondaryText: btnText(doc, "#contact-hero .hero-cta-secondary"),
      ctaSecondaryLink: qAttr(doc, "#contact-hero .hero-cta-secondary", "href"),
      spotsText: qText(doc, "#contact-hero .hero-spots-text")
    },
    methods: Array.from(doc.querySelectorAll(".contact-methods .contact-method")).map(m => ({
      icon: qHtml(m, ".contact-method-icon"), title: qText(m, "h4"), html: qHtml(m, ".contact-method-content p")
    })),
    faq: Array.from(doc.querySelectorAll("#contact-faq .faq-item")).map(item => ({
      q: qText(item, ".faq-question h3"), a: qHtml(item, ".faq-answer p")
    }))
  };
}

function extractServicesMain(doc) {
  return {
    hero: {
      label: qText(doc, "#svc-main-hero .scramble-text"),
      titleHtml: qHtml(doc, "#svc-main-hero .hero-title"),
      subtitle: qText(doc, "#svc-main-hero .hero-subtitle"),
      stats: statsFromDataCount(doc, "#svc-main-hero .hero-stats", ".hero-stat")
    },
    cards: Array.from(doc.querySelectorAll("#services .service-card")).map(c => ({
      image: qAttr(c, "img", "src"), accent: qText(c, ".service-card-accent"), title: qText(c, "h3"),
      desc: qText(c, ".service-card-content > p"),
      tags: Array.from(c.querySelectorAll(".service-card-features span")).map(s => s.textContent.trim())
    })),
    process: {
      label: qText(doc, "#process .section-label"),
      titleHtml: qHtml(doc, "#process h2.section-title"),
      subtitle: qText(doc, "#process .section-desc"),
      steps: Array.from(doc.querySelectorAll("#process .process-steps .process-step-card")).map(s => ({
        num: qText(s, ".process-step-num"), title: qText(s, "h3"), desc: qText(s, "p")
      }))
    },
    results: {
      label: qText(doc, "#svc-main-results .section-label"),
      titleHtml: qHtml(doc, "#svc-main-results h2.section-title"),
      subtitle: qText(doc, "#svc-main-results .section-desc"),
      list: Array.from(doc.querySelectorAll("#svc-main-results .results-grid .result-card")).map(c => {
        const numberEl = c.querySelector(".number");
        const span = numberEl ? numberEl.querySelector("[data-count]") : null;
        let prefix = "";
        if (numberEl && span) {
          const clone = numberEl.cloneNode(true);
          const spanClone = clone.querySelector("[data-count]");
          if (spanClone) spanClone.remove();
          prefix = clone.textContent.trim();
        }
        return {
          icon: qHtml(c, ".icon"), prefix,
          num: span ? (span.getAttribute("data-count") || "") : "",
          suffix: span ? (span.getAttribute("data-suffix") || "") : "",
          label: qText(c, ".label"), desc: qText(c, ".desc")
        };
      })
    },
    faq: Array.from(doc.querySelectorAll("#svc-main-faq .faq-list .faq-item")).map(item => ({
      q: qText(item, ".faq-question h3"), a: qHtml(item, ".faq-answer p")
    })),
    cta: extractCta(doc)
  };
}

function extractSvcSubpage(doc) {
  return {
    hero: {
      label: qText(doc, "#svc-hero .scramble-text"),
      titleHtml: qHtml(doc, "#svc-hero .hero-title"),
      subtitle: qText(doc, "#svc-hero .hero-subtitle"),
      ctaPrimaryText: btnText(doc, "#svc-hero .hero-cta-primary"),
      ctaPrimaryLink: qAttr(doc, "#svc-hero .hero-cta-primary", "href"),
      ctaSecondaryText: btnText(doc, "#svc-hero .hero-cta-secondary"),
      ctaSecondaryLink: qAttr(doc, "#svc-hero .hero-cta-secondary", "href"),
      stats: statsFromDataCount(doc, "#svc-hero .hero-stats", ".hero-stat")
    },
    problem: {
      label: qText(doc, "#svc-problem .section-label"),
      titleHtml: qHtml(doc, "#svc-problem h2.section-title"),
      paragraphs: Array.from(doc.querySelectorAll("#svc-problem .problem-paragraphs p")).map(p => p.innerHTML.trim()),
      bullets: Array.from(doc.querySelectorAll("#svc-problem .problem-text ul li")).map(li => li.textContent.trim()),
      quote: qText(doc, "#svc-problem .problem-visual-quote"),
      image: qAttr(doc, "#svc-problem .problem-visual img", "src")
    },
    features: {
      label: qText(doc, "#features .section-label"),
      titleHtml: qHtml(doc, "#features h2.section-title"),
      subtitle: qText(doc, "#features .section-desc"),
      list: Array.from(doc.querySelectorAll("#features .features-grid .feature-card")).map(c => ({
        icon: qHtml(c, ".feature-icon"), title: qText(c, "h3"), desc: qText(c, "p")
      }))
    },
    methodology: {
      label: qText(doc, "#methodology .section-label"),
      titleHtml: qHtml(doc, "#methodology h2.section-title"),
      image: qAttr(doc, "#methodology .methodology-visual img", "src"),
      steps: Array.from(doc.querySelectorAll("#methodology .methodology-steps .method-step")).map(s => ({
        num: qText(s, ".method-step-num"), title: qText(s, "h4"), desc: qText(s, "p")
      }))
    },
    deliverables: {
      label: qText(doc, "#svc-deliverables .section-label"),
      titleHtml: qHtml(doc, "#svc-deliverables h2.section-title"),
      subtitle: qText(doc, "#svc-deliverables .section-desc"),
      list: Array.from(doc.querySelectorAll("#svc-deliverables .deliverables-grid .deliverable-card")).map(c => ({
        icon: qHtml(c, ".deliverable-icon"), title: qText(c, ".deliverable-content h4"), desc: qText(c, ".deliverable-content p")
      }))
    },
    faq: Array.from(doc.querySelectorAll("#svc-faq .faq-list .faq-item")).map(item => ({
      q: qText(item, ".faq-question h3"), a: qHtml(item, ".faq-answer p")
    })),
    cta: extractCta(doc)
  };
}

function extractPortfolioPage(doc) {
  return {
    hero: {
      label: qText(doc, "#pf-hero .scramble-text"),
      titleHtml: qHtml(doc, "#pf-hero .hero-title"),
      subtitle: qText(doc, "#pf-hero .hero-subtitle")
    },
    results: Array.from(doc.querySelectorAll("#pf-results .pf-results .pf-result")).map(c => {
      const span = c.querySelector("[data-count]");
      return { num: span ? (span.getAttribute("data-count") || "") : "", suffix: span ? (span.getAttribute("data-suffix") || "") : "", label: qText(c, ".lbl") };
    }),
    cta: extractCta(doc)
  };
}

async function syncPageGeneric(url, extractor, applyFn, populateFn) {
  if (!confirm(`Pull the current hardcoded content from ${url} into this form? This overwrites what's shown here (nothing is saved to Firestore until you click "Save Changes").`)) return;
  try {
    const doc = await fetchDoc(url);
    applyFn(extractor(doc));
    populateFn();
    alert(`Synced from ${url}. Review the fields below, then click "Save Changes" to persist them.`);
  } catch (err) {
    console.error("Sync from live page failed:", err);
    alert("Sync failed: " + err.message);
  }
}
window.syncAboutFromHtml = () => syncPageGeneric("/About-Us.html", extractAbout, (d) => { state.aboutPage = d; }, populateAbout);
window.syncContactFromHtml = () => syncPageGeneric("/Contact-Us.html", extractContact, (d) => { state.contactPage = d; }, populateContact);
window.syncServicesMainFromHtml = () => syncPageGeneric("/Services/Services.html", extractServicesMain, (d) => { state.servicesPage = d; }, populateServicesMain);
window.syncSvcPageFromHtml = (prefix) => {
  const urls = { cm: "/Services/Channel-Management.html", gs: "/Services/Growth-Strategy.html", sw: "/Services/Script-Writing.html", ve: "/Services/Video-Editing.html" };
  const key = SVC_KEY[prefix];
  syncPageGeneric(urls[prefix], extractSvcSubpage, (d) => { state.servicePages[key] = d; }, () => populateSvcPage(prefix));
};
window.syncPortfolioPageFromHtml = () => syncPageGeneric("/Portfolio.html", extractPortfolioPage, (d) => {
  state.portfolioPage.hero = d.hero;
  if (d.results && d.results.length) state.portfolioPage.results = d.results;
  state.portfolioPage.cta = d.cta;
}, populatePortfolioPage);

// ============================================================
// Wire into the existing admin shell (tab switching + Save Changes button)
// ============================================================
const PAGE_POPULATE = {
  "about-page": populateAbout, "contact-page": populateContact, "services-main-page": populateServicesMain,
  "svc-channelManagement-page": () => populateSvcPage("cm"), "svc-growthStrategy-page": () => populateSvcPage("gs"),
  "svc-scriptWriting-page": () => populateSvcPage("sw"), "svc-videoEditing-page": () => populateSvcPage("ve"),
  "portfolio-page": populatePortfolioPage
};

window.onExtraTabSwitch = function (tabName) {
  const fn = PAGE_POPULATE[tabName];
  if (fn) fn();
};

// Which top-level Firestore keys were actually present in the saved
// document — used below to decide which sections still need a one-time
// auto-sync from their live static page (never overwrites real saved data).
async function loadExtraState() {
  let savedKeys = new Set();
  try {
    const snap = await getDoc(doc(db, "settings", "website"));
    if (snap.exists()) {
      const data = snap.data();
      ["aboutPage", "contactPage", "servicesPage", "servicePages", "portfolioPage", "trusted", "siteReviews", "customServices"].forEach(key => {
        if (data[key]) { state[key] = deepMerge(state[key], data[key]); savedKeys.add(key); }
      });
    }
  } catch (err) {
    console.error("Failed to load extra page settings, using defaults:", err);
  }
  await autoSyncUnsavedPages(savedKeys);
  renderHomeTrusted();
  await refreshPortfolioItemsCache();
}

// Replaces the old manual "Sync From Live Page" buttons: the first time a
// page's Firestore data doesn't exist yet, silently pull its current
// hardcoded HTML content into the CMS fields — exactly what the button used
// to do, minus the confirm/alert dialogs and the extra click. Once the admin
// clicks "Save Changes" the section gets a real Firestore entry and this
// never runs for it again, so nothing here can ever clobber an edit.
async function autoSyncUnsavedPages(savedKeys) {
  const jobs = [];
  if (!savedKeys.has("aboutPage")) jobs.push(["/About-Us.html", extractAbout, d => { state.aboutPage = d; }]);
  if (!savedKeys.has("contactPage")) jobs.push(["/Contact-Us.html", extractContact, d => { state.contactPage = d; }]);
  if (!savedKeys.has("servicesPage")) jobs.push(["/Services/Services.html", extractServicesMain, d => { state.servicesPage = d; }]);
  if (!savedKeys.has("portfolioPage")) jobs.push(["/Portfolio.html", extractPortfolioPage, d => {
    state.portfolioPage.hero = d.hero;
    if (d.results && d.results.length) state.portfolioPage.results = d.results;
    state.portfolioPage.cta = d.cta;
  }]);
  if (!savedKeys.has("servicePages")) {
    const urls = { cm: "/Services/Channel-Management.html", gs: "/Services/Growth-Strategy.html", sw: "/Services/Script-Writing.html", ve: "/Services/Video-Editing.html" };
    Object.keys(urls).forEach(prefix => {
      jobs.push([urls[prefix], extractSvcSubpage, d => { state.servicePages[SVC_KEY[prefix]] = d; }]);
    });
  }
  for (const [url, extractor, applyFn] of jobs) {
    try { applyFn(extractor(await fetchDoc(url))); }
    catch (err) { console.warn(`Auto-sync from ${url} skipped:`, err); }
  }
}

function deepMerge(base, incoming) {
  if (Array.isArray(incoming)) return incoming;
  if (incoming && typeof incoming === "object") {
    const out = { ...base };
    Object.keys(incoming).forEach(k => { out[k] = deepMerge(base ? base[k] : undefined, incoming[k]); });
    return out;
  }
  return incoming === undefined ? base : incoming;
}

async function saveExtraPages() {
  collectAbout(); collectContact(); collectServicesMain();
  collectSvcPage("cm"); collectSvcPage("gs"); collectSvcPage("sw"); collectSvcPage("ve");
  // Capture whichever custom subcategory is currently open in the "cx" editor
  // before persisting — otherwise unsaved edits to it would be dropped.
  if (editingCustomSvcKey) collectSvcPage("cx");
  collectPortfolioPage();
  state.trusted.list = collectHomeTrusted();
  state.siteReviews.list = collectSiteReviews();
  await setDoc(doc(db, "settings", "website"), {
    aboutPage: state.aboutPage,
    contactPage: state.contactPage,
    servicesPage: state.servicesPage,
    servicePages: state.servicePages,
    portfolioPage: state.portfolioPage,
    trusted: state.trusted,
    siteReviews: state.siteReviews,
    customServices: state.customServices
  }, { merge: true });
}

function installSaveHook() {
  if (window.saveWebsiteData && window.saveWebsiteData.__extraHooked) return;
  if (typeof window.saveWebsiteData !== "function") {
    setTimeout(installSaveHook, 200);
    return;
  }
  const original = window.saveWebsiteData;
  const wrapped = async function () {
    await original();
    try { await saveExtraPages(); } catch (err) { console.error("Failed to save extra page settings:", err); }
  };
  wrapped.__extraHooked = true;
  window.saveWebsiteData = wrapped;
}

onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  await loadExtraState();
  installSaveHook();
  // If the admin is already sitting on one of our tabs on load, populate it.
  const activeTab = document.querySelector(".tab-pane:not(.hidden)");
  if (activeTab) {
    const name = activeTab.getAttribute("data-section");
    if (PAGE_POPULATE[name]) PAGE_POPULATE[name]();
  }
});
