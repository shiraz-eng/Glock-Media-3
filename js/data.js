/* ============================================================
   GLOCK MEDIA — CONTENT DATABASE
   ============================================================
   THIS IS THE ONLY FILE YOU EVER NEED TO EDIT.

   ▸ To publish a NEW BLOG POST:
       1. Copy any post object inside GLOCK.posts
       2. Paste it at the TOP of the list
       3. Change the slug, title, category, excerpt, image,
          author, date, readTime and body content
       4. Save. Done — it appears on the blog page automatically.

   ▸ To change a FEATURED post: set featured: true (only one).

   ▸ To edit site-wide copy (nav, footer, contact info):
       edit the GLOCK.site object below.

   Categories must match GLOCK.categories ids.
   ============================================================ */

window.GLOCK = {

//   /* ---------- Site-wide content ---------- */
//   site: {
//     brand: "Glock Media",
//     tagline: "A digital-first media production & content growth agency specializing in YouTube, TikTok, Snapchat, Instagram & modern content ecosystems.",
//     email: "hello@glockmedia.com",
//     phone: "+1 (234) 567-890",
//     calendly: "https://calendly.com/shahriyarkhan593/new-meeting",
//     stats: {
//       views: "50B+",
//       subscribers: "20M+",
//       revenue: "$200K+",
//       articles: "150+",
//       readers: "2M+"
//     },
//     nav: [
//       { label: "Home", href: "/" },
//       { label: "About", href: "/about" },
//       { label: "Services", href: "/services" },
//       { label: "Portfolio", href: "/portfolio" },
//       { label: "Blog", href: "/blog" }
//     ],
//     cta: { label: "Start Your Growth", href: "/contact" },
//     footerColumns: [
//       {
//         title: "Company",
//         links: [
//           { label: "About Us", href: "/about" },
//           { label: "Services", href: "/services" },
//           { label: "Portfolio", href: "/portfolio" },
//           { label: "Blog", href: "/blog" },
//           { label: "Contact", href: "/contact" }
//         ]
//       },
//       {
//         title: "Services",
//         links: [
//           { label: "Scriptwriting", href: "/services/scriptwriting" },
//           { label: "Video Editing", href: "/services/video-editing" },
//           { label: "Channel Management", href: "/services/channel-management" },
//           { label: "Growth Strategy", href: "/services/growth-strategy" }
//         ]
//       },
//       {
//         title: "Resources",
//         links: [
//           { label: "Blog", href: "/blog" },
//           { label: "Case Studies", href: "#" },
//           { label: "Free Tools", href: "#" },
//           { label: "Newsletter", href: "#" }
//         ]
//       }
//     ],
//     socials: [
//       { label: "YouTube", icon: "youtube", href: "#" },
//       { label: "Instagram", icon: "instagram", href: "#" },
//       { label: "Twitter", icon: "twitter", href: "#" },
//       { label: "LinkedIn", icon: "linkedin", href: "#" }
//     ],
//     copyright: "© 2026 Glock Media. All rights reserved."
//   },

//   /* ---------- Loading screen ---------- */
//   loader: {
//     enabled: true,
//     minTime: 2100,
//     statusWords: ["SCRIPTING", "CUTTING", "GRADING", "SCORING", "RENDERING", "EXPORTING"]
//   },

//   /* ---------- Blog categories (id must match post.category) ---------- */
//   categories: [
//     { id: "strategy", label: "Strategy" },
//     { id: "scriptwriting", label: "Scriptwriting" },
//     { id: "editing", label: "Editing" },
//     { id: "growth", label: "Growth" },
//     { id: "platforms", label: "Platforms" },
//     { id: "monetization", label: "Monetization" }
//   ],

//   /* ---------- Authors ---------- */
//   authors: {
//     "hammad-khan": {
//       name: "Hammad Raza Khan",
//       role: "Founder & CEO",
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
//       bio: "Hammad founded Glock Media to give creators the production & growth engine traditionally reserved for major media companies. He oversees strategy across channels generating billions of views."
//     },
//     "marcus-chen": {
//       name: "Marcus Chen",
//       role: "Head of Strategy",
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
//       bio: "Marcus leads content strategy for creators generating over 2 billion monthly views. He writes about the intersection of creativity, technology, and audience psychology."
//     },
//     "sarah-kim": {
//       name: "Dr. Sarah Kim",
//       role: "Content Psychologist",
//       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
//       bio: "Sarah studies why people watch, click and subscribe. She turns cognitive science into retention frameworks used across every Glock Media production."
//     },
//     "david-park": {
//       name: "David Park",
//       role: "Growth Lead",
//       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
//       bio: "David runs the Kill / Fix / Double Down testing program across all managed channels. Data first, opinions second."
//     }
//   },

  /* ---------- BLOG POSTS — new posts go at the TOP ---------- */
  // posts: [
  //   {
  //     slug: "ai-reshaping-content-creation-2026",
  //     title: "How AI is Reshaping Content Creation: What Creators Need to Know in 2026",
  //     excerpt: "The landscape of digital content is undergoing its most dramatic transformation yet. From AI-powered scriptwriting to automated editing, we break down which tools are actually worth your time — and which are just hype.",
  //     category: "platforms",
  //     image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=750&fit=crop",
  //     author: "marcus-chen",
  //     date: "2026-07-08",
  //     readTime: 12,
  //     featured: true,
  //     toc: [
  //       { id: "section-1", label: "The Three Pillars" },
  //       { id: "section-2", label: "Scriptwriting Revolution" },
  //       { id: "section-3", label: "Video Editing" },
  //       { id: "section-4", label: "The Dark Side" },
  //       { id: "section-5", label: "The 60/40 Rule" },
  //       { id: "section-6", label: "What Is Next" }
  //     ],
  //     body: [
  //       { "p": "In the span of just 18 months, artificial intelligence has moved from a curiosity in the creator economy to an indispensable tool. But here is what most creators get wrong: AI is not replacing creativity, it is amplifying it. The teams generating billions of views are not using AI to make content faster. They are using it to make content <strong>better</strong>." },
  //       { "h2": "The Three Pillars of AI-Powered Content", "id": "section-1" },
  //       { "p": "After analyzing over 2,000 channels that have integrated AI into their workflow, we have identified three distinct areas where the technology is creating measurable impact:" },
  //       { "takeaways": {
  //           "title": "Key Takeaways",
  //           "items": [
  //             "AI scriptwriting tools increase first-draft speed by 3x but require human editing for voice authenticity",
  //             "Automated thumbnail A/B testing using AI vision models improves CTR by an average of 23%",
  //             "AI-powered audience sentiment analysis reveals content gaps invisible to traditional analytics",
  //             "The most successful creators use AI for 40% of production, not 100%"
  //           ]
  //       }},
  //       { "h2": "Scriptwriting: The AI Revolution Nobody Talks About", "id": "section-2" },
  //       { "p": "Everyone is focused on AI video generation. But the real game-changer is happening in the script. The best tools do not just generate text — they analyze your top-performing videos, identify your unique linguistic patterns, and draft scripts that sound like <em>you</em> wrote them at 3 AM fueled by ambition." },
  //       { "image": {
  //           "src": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&h=600&fit=crop",
  //           "alt": "AI and creativity",
  //           "caption": "The intersection of human creativity and machine intelligence is where the magic happens."
  //       }},
  //       { "p": "The key insight? AI excels at structure and pattern recognition. It can map the narrative arc of your highest-retention videos and replicate that framework. But it still struggles with the emotional nuance, the cultural references, and the personal stories that make content truly connect." },
  //       { "quote": "The creators who will dominate in 2027 are not the ones using the most AI. They are the ones who know exactly where human judgment ends and machine efficiency begins." },
  //       { "h2": "Video Editing: From Days to Hours", "id": "section-3" },
  //       { "p": "The editing workflow has been completely reimagined. AI-powered tools can now:" },
  //       { "list": [
  //           "Automatically identify and extract the most engaging moments from raw footage",
  //           "Generate B-roll suggestions based on script context",
  //           "Apply consistent color grading across an entire content library",
  //           "Create multi-platform cuts from a single master edit",
  //           "Auto-generate captions with 99.2% accuracy in 47 languages"
  //       ]},
  //       { "stats": [
  //           { "number": "3x", "label": "Faster Drafting" },
  //           { "number": "23%", "label": "CTR Improvement" },
  //           { "number": "47", "label": "Languages Supported" }
  //       ]},
  //       { "h2": "The Dark Side: What AI Cannot Fix", "id": "section-4" },
  //       { "p": "Here is the uncomfortable truth: AI is making mediocre content faster, not making fast content better. We are seeing an explosion of generic, soulless videos that hit all the algorithmic marks but fail to build any real audience connection." },
  //       { "p": "The creators who will thrive are those who use AI as a <strong>force multiplier</strong> for their unique perspective, not as a replacement for it. Your voice, your stories, your specific way of seeing the world — that is the moat. AI is just the shovel." },
  //       { "pullquote": {
  //           "text": "AI does not replace the creator. It replaces the creator's least valuable hours — the repetitive, mechanical work that drains creative energy.",
  //           "author": "Marcus Chen, Head of Strategy at Glock Media"
  //       }},
  //       { "h2": "Our Recommendation: The 60/40 Rule", "id": "section-5" },
  //       { "p": "Based on our work with channels ranging from 10K to 10M subscribers, we have developed what we call the <strong>60/40 Rule</strong>:" },
  //       { "list": [
  //           "<strong>60% human</strong>: Strategy, storytelling, on-camera presence, community engagement, brand partnerships",
  //           "<strong>40% AI-assisted</strong>: Research, first drafts, editing automation, thumbnail generation, analytics interpretation, distribution"
  //       ]},
  //       { "p": "This ratio shifts based on your niche and content type, but the principle holds: maintain creative control while leveraging AI for scale." },
  //       { "h2": "What Is Next", "id": "section-6" },
  //       { "p": "The next 12 months will see AI integration move from optional to essential. But the winners will not be the creators with the most advanced AI stack. They will be the creators who never forgot that behind every view is a human being looking for connection, entertainment, or education." },
  //       { "p": "AI is the how. Your humanity is the why. Do not confuse the two." }
  //     ]
  //   },

  //   {
  //     slug: "retention-first-scriptwriting-framework",
  //     title: "The Retention-First Scriptwriting Framework We Use for Every Video",
  //     excerpt: "Our proprietary 5-act structure that keeps viewers watching until the last second. Includes the exact hook formulas, open-loop placements and transition phrases we deploy across billions of views.",
  //     category: "scriptwriting",
  //     image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=750&fit=crop",
  //     author: "sarah-kim",
  //     date: "2026-06-28",
  //     readTime: 16,
  //     featured: false,
  //     toc: [
  //       { id: "section-1", label: "Why Scripts Fail" },
  //       { id: "section-2", label: "The 5-Act Framework" },
  //       { id: "section-3", label: "Hook Formulas" },
  //       { id: "section-4", label: "Open Loops" },
  //       { id: "section-5", label: "Templates" }
  //     ],
  //     body: [
  //       { "p": "Seventy percent of your audience decides whether to keep watching within the first 30 seconds. That decision has almost nothing to do with your production value — and almost everything to do with your script's opening architecture." },
  //       { "h2": "Why Most Scripts Fail Before Minute One", "id": "section-1" },
  //       { "p": "The average creator opens with an introduction. The top 1% open with a <strong>curiosity debt</strong> — a promise so specific and so valuable that clicking away feels like losing money. That difference is not talent. It is structure." },
  //       { "quote": "Your hook is not an introduction. It is a contract the viewer expects you to fulfill — and the algorithm measures how well you honor it." },
  //       { "h2": "The 5-Act Retention Framework", "id": "section-2" },
  //       { "p": "Every script we produce at Glock Media follows the same skeleton, regardless of niche or length:" },
  //       { "takeaways": {
  //           "title": "The 5 Acts",
  //           "items": [
  //             "Act 1 — The Hook (0–30s): state the stakes, open the curiosity gap",
  //             "Act 2 — The Setup (10%): establish credibility and context fast",
  //             "Act 3 — The Build (40%): escalating value with open loops every 60–90 seconds",
  //             "Act 4 — The Payoff (30%): deliver the promise with maximum density",
  //             "Act 5 — The Bridge (10%): CTA woven into the final value beat, never bolted on"
  //           ]
  //       }},
  //       { "h2": "Three Hook Formulas That Never Miss", "id": "section-3" },
  //       { "list": [
  //           "<strong>The Bold Claim:</strong> 'Everything you know about X is wrong — and here is the data to prove it.'",
  //           "<strong>The Time Bomb:</strong> 'In the next 8 minutes, I will show you exactly how we took this channel from 0 to 100K — step by step.'",
  //           "<strong>The Pattern Interrupt:</strong> Open mid-action or mid-story, forcing the brain to demand the missing context."
  //       ]},
  //       { "h2": "Open Loops: The Retention Engine", "id": "section-4" },
  //       { "p": "An open loop is a question raised but deliberately unanswered — and it is the single most powerful retention device in existence. Place one every 60 to 90 seconds, always resolving the previous loop in the same breath you open the next." },
  //       { "h2": "Steal Our Templates", "id": "section-5" },
  //       { "p": "We have turned this framework into fill-in-the-blank templates for talking-head, documentary, listicle and tutorial formats. The framework is the strategy; the template is the speed." },
  //       { "pullquote": {
  //           "text": "Great scripts are not written. They are engineered — one loop, one payoff, one retained viewer at a time.",
  //           "author": "Dr. Sarah Kim, Content Psychologist at Glock Media"
  //       }}
  //     ]
  //   },

  //   {
  //     slug: "youtube-algorithm-q2-2026",
  //     title: "YouTube Algorithm Deep Dive: What Changed in Q2 2026",
  //     excerpt: "Our data team analyzed 10,000+ videos to map the latest algorithm shifts — and the findings rewrite several rules creators still treat as gospel.",
  //     category: "growth",
  //     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=750&fit=crop",
  //     author: "david-park",
  //     date: "2026-06-18",
  //     readTime: 14,
  //     featured: false,
  //     toc: [
  //       { id: "section-1", label: "What We Analyzed" },
  //       { id: "section-2", label: "The Big Shifts" },
  //       { id: "section-3", label: "CTR vs Retention" },
  //       { id: "section-4", label: "Action Plan" }
  //     ],
  //     body: [
  //       { "p": "Every quarter, we run the same exercise: pull the performance data across every channel we manage and every competitor we track, then map what the algorithm is actually rewarding — not what the gurus say it rewards." },
  //       { "h2": "What We Analyzed", "id": "section-1" },
  //       { "p": "10,000+ videos across 40 niches, spanning channels from 5K to 15M subscribers. We tracked CTR, average view duration, suggested traffic share, browse placement and returning-viewer ratios." },
  //       { "h2": "The Three Big Shifts", "id": "section-2" },
  //       { "takeaways": {
  //           "title": "Q2 2026 Findings",
  //           "items": [
  //             "Suggested traffic now weighs session time 2x heavier than raw CTR",
  //             "The first 90 days of a channel's life carry a measurable 'new channel' boost — but only with consistent uploads",
  //             "Shorts-to-longform funnels are being actively rewarded with browse placement"
  //           ]
  //       }},
  //       { "h2": "CTR vs Retention: The Balance Changed", "id": "section-3" },
  //       { "p": "For years the formula was simple: get the click, hold the viewer. In Q2 the weighting tilted. Videos with a modest 4–6% CTR but elite session time are out-distributing 10%+ CTR videos with average retention. The algorithm is optimizing for <strong>satisfaction per impression</strong>, not clicks." },
  //       { "stats": [
  //           { "number": "10K+", "label": "Videos Analyzed" },
  //           { "number": "2x", "label": "Session Time Weight" },
  //           { "number": "90", "label": "Day New-Channel Window" }
  //       ]},
  //       { "h2": "Your Action Plan", "id": "section-4" },
  //       { "list": [
  //           "Audit your last 20 uploads: which drove session time, not just views?",
  //           "Kill formats with high CTR but sub-40% retention — they are now liabilities",
  //           "Build one Shorts series explicitly designed to funnel into your best longform video",
  //           "Upload consistently for the next 90 days — the compounding window is real"
  //       ]}
  //     ]
  //   },

  //   {
  //     slug: "finance-creator-blueprint",
  //     title: "The Finance Creator's Blueprint: Building Trust in a Skeptical Niche",
  //     excerpt: "Why finance channels with the highest production value often underperform — and how authenticity beats polish in the personal finance space.",
  //     category: "strategy",
  //     image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=750&fit=crop",
  //     author: "david-park",
  //     date: "2026-07-05",
  //     readTime: 8,
  //     featured: false,
  //     toc: [
  //       { id: "section-1", label: "The Trust Deficit" },
  //       { id: "section-2", label: "Authenticity Beats Polish" },
  //       { id: "section-3", label: "The Blueprint" }
  //     ],
  //     body: [
  //       { "p": "Finance is the only niche where a creator filming on a phone in their car can out-pull a studio production. Understanding why is the key to the entire vertical." },
  //       { "h2": "The Trust Deficit", "id": "section-1" },
  //       { "p": "Finance audiences have been burned — by courses, by gurus, by 2021. Every polished video now triggers the same subconscious question: <em>what is this person selling me?</em> High production value, paradoxically, raises suspicion." },
  //       { "h2": "Why Authenticity Beats Polish", "id": "section-2" },
  //       { "p": "The finance creators winning right now share one trait: <strong>verifiable transparency</strong>. Real portfolio numbers. Real losses discussed alongside wins. Real timelines. The audience does not need you to be rich — they need you to be real." },
  //       { "quote": "In finance content, trust is the only currency that compounds faster than money." },
  //       { "h2": "The Blueprint", "id": "section-3" },
  //       { "list": [
  //           "Show real numbers — blurred screenshots perform worse than honest ranges",
  //           "Document, don't lecture: 'watch me build this' beats 'here is how you do it'",
  //           "Disclose incentives in the first 60 seconds, not the description",
  //           "Consistency over virality: finance audiences subscribe to journeys, not videos"
  //       ]}
  //     ]
  //   },

  //   {
  //     slug: "sports-highlights-short-form-domination",
  //     title: "Why Sports Highlights Channels Are Dominating Short-Form in 2026",
  //     excerpt: "The data behind the explosion of sports content on TikTok and YouTube Shorts — and the editing techniques driving 80% retention rates.",
  //     category: "editing",
  //     image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=750&fit=crop",
  //     author: "marcus-chen",
  //     date: "2026-07-03",
  //     readTime: 6,
  //     featured: false,
  //     toc: [
  //       { id: "section-1", label: "The Numbers" },
  //       { id: "section-2", label: "The Editing Formula" },
  //       { id: "section-3", label: "Rights & Risks" }
  //     ],
  //     body: [
  //       { "p": "Sports highlights are the quiet giants of short-form. While everyone debates AI and faceless channels, highlight editors are pulling 80% average retention on content they did not even film." },
  //       { "h2": "The Numbers Behind the Boom", "id": "section-1" },
  //       { "stats": [
  //           { "number": "80%", "label": "Avg. Retention" },
  //           { "number": "3.2x", "label": "Share Rate vs Average" },
  //           { "number": "61%", "label": "Of Sports Views Are Short-Form" }
  //       ]},
  //       { "p": "Sports content has a built-in advantage: the climax is guaranteed. Every highlight is a story with a payoff the viewer can feel coming. The only question is whether your edit gets out of the way." },
  //       { "h2": "The Editing Formula", "id": "section-2" },
  //       { "list": [
  //           "Cut to the action in under 1.5 seconds — no intros, ever",
  //           "Slow-motion only on the peak moment, never the build-up",
  //           "Hard cuts on sound beats; the crowd noise is your soundtrack",
  //           "End 0.5 seconds after the payoff — let the loop do the rest"
  //       ]},
  //       { "h2": "Rights & Risks", "id": "section-3" },
  //       { "p": "The legal line is commentary and transformation. Clips with original analysis, graphics and narrative structure are defensible; raw re-uploads are a takedown queue. Build the moat with your edit, not just the footage." }
  //     ]
  //   },

  //   {
  //     slug: "educational-content-science-viral",
  //     title: "The Science of Educational Content: Making Complex Topics Go Viral",
  //     excerpt: "How top educational creators use cognitive load theory and narrative structure to make quantum physics feel like a Netflix binge.",
  //     category: "scriptwriting",
  //     image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=750&fit=crop",
  //     author: "sarah-kim",
  //     date: "2026-06-25",
  //     readTime: 10,
  //     featured: false,
  //     toc: [
  //       { id: "section-1", label: "Cognitive Load" },
  //       { id: "section-2", label: "Story First" },
  //       { id: "section-3", label: "The Framework" }
  //     ],
  //     body: [
  //       { "p": "The best educational channels do not simplify complex topics — they sequence them. The difference sounds subtle. The retention gap is enormous." },
  //       { "h2": "Cognitive Load: The Invisible Killer", "id": "section-1" },
  //       { "p": "Your viewer's working memory holds roughly four chunks of new information at once. Most educational scripts dump twenty in the first minute. The viewer does not feel informed — they feel tired, and they leave without knowing why." },
  //       { "h2": "Story First, Syllabus Second", "id": "section-2" },
  //       { "p": "Every great educational video is a story wearing a lesson's clothes. A character (even if that character is an idea), a conflict (a problem unsolved), and a resolution (the concept clicking into place). Structure the emotion first; hang the information on it." },
  //       { "quote": "People forget facts by Friday. They remember stories for years. Teach through the story and you get both." },
  //       { "h2": "The Sequencing Framework", "id": "section-3" },
  //       { "list": [
  //           "One new concept per 60–90 second block — never two",
  //           "Anchor every abstraction to a physical, visual example",
  //           "Use the 'so that' chain: each fact must connect to the next with 'so that', never 'and then'",
  //           "End with the question the next video answers"
  //       ]}
  //     ]
  //   },

  //   {
  //     slug: "celebrity-commentary-50m-niche",
  //     title: "Celebrity Commentary Channels: The $50M Niche Nobody Saw Coming",
  //     excerpt: "Inside the business model of entertainment news creators who turned gossip into a legitimate media empire.",
  //     category: "monetization",
  //     image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=750&fit=crop",
  //     author: "david-park",
  //     date: "2026-06-22",
  //     readTime: 7,
  //     featured: false,
  //     toc: [
  //       { id: "section-1", label: "The Business Model" },
  //       { id: "section-2", label: "Why It Works" },
  //       { id: "section-3", label: "The Playbook" }
  //     ],
  //     body: [
  //       { "p": "Commentary channels were supposed to be a fad. Instead they quietly built one of the most durable business models in the creator economy — and the revenue numbers are starting to leak." },
  //       { "h2": "The Business Model", "id": "section-1" },
  //       { "p": "The top commentary channels run like digital tabloids with a face: daily uploads, infinite content supply (celebrities never stop), and CPMs boosted by brand-safe presentation. The best ones layer memberships, podcasts and clip channels on top." },
  //       { "h2": "Why It Works Psychologically", "id": "section-2" },
  //       { "p": "Parasocial on parasocial. Viewers are not following the celebrity — they are following the commentator's <em>take</em> on the celebrity. That is a transferable, ownable audience. The celebrity is the topic; the creator is the product." },
  //       { "h2": "The Playbook", "id": "section-3" },
  //       { "list": [
  //           "Pick a lane: one celebrity ecosystem beats covering everyone",
  //           "Speed is the moat — first credible take wins the search results",
  //           "Build a verdict format: audiences return for consistent judgment frameworks",
  //           "Diversify off-platform early: podcast and newsletter from day one"
  //       ]}
  //     ]
  //   },

  //   {
  //     slug: "monetization-beyond-ads-revenue-streams",
  //     title: "Monetization Beyond Ads: How Top Creators Build Revenue Streams",
  //     excerpt: "The creators earning $500K+/month are diversifying. Here are the 7 revenue models actually working in 2026.",
  //     category: "monetization",
  //     image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=750&fit=crop",
  //     author: "hammad-khan",
  //     date: "2026-06-15",
  //     readTime: 10,
  //     featured: false,
  //     toc: [
  //       { id: "section-1", label: "The AdSense Ceiling" },
  //       { id: "section-2", label: "The 7 Models" },
  //       { id: "section-3", label: "Where To Start" }
  //     ],
  //     body: [
  //       { "p": "AdSense is the only revenue stream that pays you last, takes the biggest cut, and can be demonetized overnight. Yet for most creators it is 90% of income. That is not a business — it is a dependency." },
  //       { "h2": "The AdSense Ceiling", "id": "section-1" },
  //       { "p": "A million monthly views in a mid-CPM niche earns roughly $3–8K from ads. The same audience, properly monetized, is worth 10x that. The gap is not effort — it is architecture." },
  //       { "h2": "The 7 Models That Actually Work", "id": "section-2" },
  //       { "takeaways": {
  //           "title": "Revenue Stack, Ranked By Ceiling",
  //           "items": [
  //             "1. Digital products & courses — highest margin, full ownership",
  //             "2. Community/memberships — recurring revenue, algorithm-proof",
  //             "3. Brand partnerships — flat fees scale faster than rev-share",
  //             "4. Affiliate systems — passive but needs trust density",
  //             "5. Services & consulting — fastest to first dollar",
  //             "6. Licensing content — your back catalog is an asset",
  //             "7. AdSense — the floor, never the ceiling"
  //           ]
  //       }},
  //       { "h2": "Where To Start", "id": "section-3" },
  //       { "p": "Pick the model closest to money you already make. Sell the service if people ask you for help. Build the product when the same question arrives fifty times. Stack the rest in order — and never let any single stream exceed 40% of total revenue." },
  //       { "pullquote": {
  //           "text": "Views are vanity. Revenue diversity is sanity. Build the stack before you need it.",
  //           "author": "Hammad Raza Khan, Founder of Glock Media"
  //       }}
  //     ]
  //   },

  //   {
  //     slug: "fitness-content-2026-perfect-body-dead",
  //     title: "Fitness Content in 2026: Why the 'Perfect Body' Narrative Is Dead",
  //     excerpt: "The shift from aesthetic-focused to functional fitness content — and how creators are building deeper audience loyalty.",
  //     category: "strategy",
  //     image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=750&fit=crop",
  //     author: "sarah-kim",
  //     date: "2026-06-12",
  //     readTime: 9,
  //     featured: false,
  //     toc: [
  //       { id: "section-1", label: "The Shift" },
  //       { id: "section-2", label: "What Replaced It" },
  //       { id: "section-3", label: "Creator Playbook" }
  //     ],
  //     body: [
  //       { "p": "For a decade, fitness content sold an image. In 2026, it sells a feeling — and the creators who missed the shift are watching their engagement decay in real time." },
  //       { "h2": "The Shift Nobody Announced", "id": "section-1" },
  //       { "p": "Aesthetic transformation content — the before/after, the 90-day shred — still gets views. But it no longer gets <strong>subscribers</strong>. The audience learned that the after-photo is a moment, not a life. They want the life." },
  //       { "h2": "What Replaced It", "id": "section-2" },
  //       { "list": [
  //           "Functional fitness: strength for real life, not the mirror",
  //           "Longevity content: training for your 70-year-old self",
  //           "Mental health crossover: the gym as therapy, openly discussed",
  //           "Process documentation: bad workouts shown alongside good ones"
  //       ]},
  //       { "h2": "The Creator Playbook", "id": "section-3" },
  //       { "p": "Show the workout you did not want to do. Track the metric that is not weight. The fitness creators compounding in 2026 are the ones their audience would recognize at the grocery store — not just on the thumbnail." }
  //     ]
  //   },

  //   {
  //     slug: "esports-documentaries-next-frontier",
  //     title: "Esports Documentaries: The Next Frontier of Gaming Content",
  //     excerpt: "How long-form storytelling is capturing non-gaming audiences — and why every major gaming creator should be thinking documentary.",
  //     category: "editing",
  //     image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=750&fit=crop",
  //     author: "marcus-chen",
  //     date: "2026-06-08",
  //     readTime: 11,
  //     featured: false,
  //     toc: [
  //       { id: "section-1", label: "The Breakout" },
  //       { id: "section-2", label: "Why Docs Work" },
  //       { id: "section-3", label: "Getting Started" }
  //     ],
  //     body: [
  //       { "p": "The most-watched gaming video of the last year was not a gameplay video. It was a 47-minute documentary about a dead MMO — and half its audience had never played the game." },
  //       { "h2": "The Breakout Genre", "id": "section-1" },
  //       { "p": "Gaming documentaries are doing for esports what Drive to Survive did for Formula 1: converting outsiders into fans through story. The games are the setting. The humans are the content." },
  //       { "h2": "Why Docs Work Where Gameplay Plateaus", "id": "section-2" },
  //       { "p": "Gameplay content has a ceiling: your addressable audience is people who play the game. Documentaries smash that ceiling because the appeal is narrative, not mechanics. The retention curves look completely different — doc audiences watch like Netflix audiences." },
  //       { "stats": [
  //           { "number": "47", "label": "Min Avg. Doc Length" },
  //           { "number": "2.1x", "label": "Watch Time vs Gameplay" },
  //           { "number": "48%", "label": "Viewers Who Don't Play" }
  //       ]},
  //       { "h2": "Getting Started", "id": "section-3" },
  //       { "list": [
  //           "Start with a story you already know cold — community lore is free research",
  //           "Structure it like a heist: assemble the characters, then the conflict",
  //           "Invest in sound design before motion graphics — docs live on audio",
  //           "One great doc per quarter beats weekly mid content"
  //       ]}
  //     ]
  //   }
  // ],

  /* ============================================================
     PORTFOLIO — add your work here.
     type: "longform"      → landscape video card, plays YouTube on click
           "shortform"     → vertical 9:16 card, plays YouTube on click
           "scriptwriting" → vertical document card, opens the script
                             right on the site (Google Doc / Drive
                             preview) with an "Open in Google Docs /
                             Drive" button, just like the video watch link
           "thumbnail"     → gallery item, opens image lightbox
     For videos: paste a FULL link — YouTube or Google Drive both work.
       YouTube:  "https://www.youtube.com/watch?v=XXXX"
       GDrive:   share the file ("anyone with the link") and paste
                 "https://drive.google.com/file/d/FILE_ID/view"
     For scripts (field: doc): share the doc ("anyone with the link")
     and paste the FULL link — Google Docs or Google Drive both work:
       Google Docs:  "https://docs.google.com/document/d/FILE_ID/edit"
       GDrive file:  "https://drive.google.com/file/d/FILE_ID/view"
     Scripts also need an  image:  field — a cover graphic for the card
     (the doc itself has no thumbnail, so pick any poster/still image).
     "pages" is optional and shows a small page-count badge on the card.
     Thumbnails: use  image: "one.jpg"   for a single design, OR
                  variants: ["a.jpg","b.jpg","c.jpg"]  for A/B versions
                  visitors can flip through in the lightbox.
     ============================================================ */
  portfolio: [
    /* ---------- Long-form videos ---------- */
    {
      id: "from-0-to-500k-the-wealthpath-documentary-series",
      type: "longform",
      title: "From 0 to 500K: The WealthPath Documentary Series",
      niche: "Sports Channel",
      client: "VolleyBall",
      video: "https://drive.google.com/file/d/1V1neRf2D6ih0j98YQe3J6WUWvrbtUlfC/view?usp=sharing",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop",
      views: "2.4M",
      duration: "18:42",
      description: "Full production & growth strategy for a 6-part documentary series that took a finance brand from zero to category leader."
    },
    {
      id: "the-rise-of-ai-creators-tech-documentary",
      type: "longform",
      title: "The Rise of AI Creators — Tech Documentary",
      niche: "Technology",
      client: "NovaTech Media",
      video: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=675&fit=crop",
      views: "1.8M",
      duration: "22:15",
      description: "Script-to-screen production: research, scripting, edit, color and sound design for a flagship channel documentary."
    },
    {
      id: "90-days-a-fitness-transformation-film",
      type: "longform",
      title: "90 Days: A Fitness Transformation Film",
      niche: "Fitness",
      client: "Apex Athletics",
      video: "https://www.youtube.com/watch?v=RgKAFK5djSk",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=675&fit=crop",
      views: "3.1M",
      duration: "15:30",
      description: "Cinematic transformation storytelling — the retention-first edit that turned a vlog into a brand-defining film."
    },
    {
      id: "true-crime-storytime-production-package",
      type: "longform",
      title: "True Crime Storytime — Production Package",
      niche: "Entertainment",
      client: "Midnight Files",
      video: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=675&fit=crop",
      views: "5.6M",
      duration: "24:08",
      description: "Weekly storytime format: scripts, sound design, motion graphics and thumbnail system that tripled the channel's RPM."
    },

    /* ---------- Short-form videos ---------- */
  {
  id: "shortform-1",
  type: "shortform",
  title: "5 Female Volleyball Superstars to Watch in 2025",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/drive/folders/1xnaes2Jm9YiLmEDD1yQuGucqoFTN6jGg?usp=sharing",
  image: "https://drive.google.com/drive/folders/1zVa9MTHBtueMoBMB3JJQaZJVCu-qfDBj?usp=sharing",
  description: "A fast-paced showcase of five elite female volleyball stars expected to dominate the sport throughout 2025."
},

{
  id: "shortform-2",
  type: "shortform",
  title: "Top 10 Volleyball Highlights of the 2025 VNL",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1werwcjjQhgiiZjBISxcUj4E2momVG--D/view?usp=sharing",
  image: "https://drive.google.com/file/d/1vWyQ8zIHljDGJPzZPla8g9-iszDyDEKj/view?usp=drive_link",
  description: "A rapid-fire compilation of the ten most spectacular plays, rallies, blocks, serves, and finishes from the 2025 VNL."
},

{
  id: "shortform-3",
  type: "shortform",
  title: "Unbelievable Volleyball Comebacks and Rallies",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/drive/folders/1xnaes2Jm9YiLmEDD1yQuGucqoFTN6jGg?usp=sharing",
  image: "https://drive.google.com/file/d/1x583Otk_K7FIxA5jMKo3PWF1eYjYbnWm/view?usp=sharing",
  description: "Jaw-dropping volleyball comebacks featuring impossible rallies, momentum swings, clutch plays, and dramatic finishes that defied expectations."
},

{
  id: "shortform-4",
  type: "shortform",
  title: "The Evolution of Japan’s Volleyball Dynasty: Players Who Are Changing the Game",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/drive/folders/1xnaes2Jm9YiLmEDD1yQuGucqoFTN6jGg?usp=sharing",
  image: "https://drive.google.com/file/d/1zmm0M4FeYHRPrZUIoWiUzfYk6T65GwXj/view?usp=drive_link",
  description: "A concise look at Japan’s evolving volleyball system and the players driving its rise on the international stage."
},

{
  id: "shortform-5",
  type: "shortform",
  title: "Next-Gen Volleyball: 5 Young Players Changing the Game",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1IrDw4tgxZZEf3WfmIWJ57jAM3Cc0vz6I/view",
  image: "https://drive.google.com/file/d/1BQSAf4MozTt_LOfwONkSWyWoKpg9LLXD/view?usp=sharing",
  description: "Five emerging volleyball talents are introduced through their explosive skills, potential, and growing influence on international competition."
},

{
  id: "shortform-6",
  type: "shortform",
  title: "The Rise of Bulgaria’s Volleyball Powerhouse: Nikolov and His Impact on International Play",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1_rvSe50UYT2h1Rw5SxHLnnKyAyTzIUXV/view?usp=sharing",
  image: "https://drive.google.com/file/d/1kdHaqg-sXxpBUYyOdCbq2lw8xT5r3GzH/view?usp=drive_link",
  description: "An energetic breakdown of Simeon Nikolov’s emergence and his growing impact on Bulgaria’s international volleyball ambitions."
},

{
  id: "shortform-7",
  type: "shortform",
  title: "In-Depth Analysis of Wilfredo León’s Impact on International Volleyball",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1GMFBZAav0NhcyW_d2gFMgP15douBVJpC/view?usp=drivesdk",
  image: "https://drive.google.com/file/d/1mo-0bNfCFxbj0IX8I-Z8a7sJAyk3qtFQ/view?usp=drive_link",
  description: "A focused analysis of Wilfredo León’s elite attacking ability, serving power, consistency, and influence across international volleyball."
},

{
  id: "shortform-8",
  type: "shortform",
  title: "The Best Volleyball Blocks of 2025: Unstoppable Defenses from the World’s Best",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1mUBUAVT4EzqwSRsMrUONWdEPu9oLbdXt/view?usp=sharing",
  image: "https://drive.google.com/file/d/1nlNUmuXH6KLXSrPome_1UL08wzZjkb2U/view?usp=sharing",
  description: "A high-impact collection of volleyball’s most dominant blocks, highlighting elite timing, positioning, athleticism, and defensive instincts."
},

{
  id: "shortform-9",
  type: "shortform",
  title: "The Power of Volleyball Transfers: How Player Moves Are Shaping the Future of Leagues",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1PpB1X5ONgoU3tuYGmWZ2NOq_b6KrU5rM/view?usp=drivesdk",
  image: "https://drive.google.com/file/d/1oGZXzfXiI3BwYS1unf7TUQiLU2mcxnLs/view?usp=sharing",
  description: "An engaging look at major volleyball transfers and how player movement is reshaping competitive balance across global leagues."
},

{
  id: "shortform-10",
  type: "shortform",
  title: "Crazy Volleyball Serve by Miyaura",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/10V-xrQeNNlQgMvBpmPIZ0TBf4NvZSvcl/view?usp=drivesdk",
  image: "https://drive.google.com/file/d/17iWBLj_eg-oUDHmZuOvgTZnl5iaieBxS/view?usp=sharing",
  description: "A quick showcase of Miyaura unleashing an outrageous serve, combining explosive power, precision, speed, and incredible technique."
},

{
  id: "shortform-11",
  type: "shortform",
  title: "Inside the Mind of a Volleyball Coach: Training the Next Stars",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1qjA8lRYU2g66cx6dBWGEnWhFy3XMV42E/view?usp=drivesdk",
  image: "https://drive.google.com/file/d/1eaj9FtLWCZFKNLG_bsKTr6T6GDXshh9c/view?usp=sharing",
  description: "A behind-the-scenes look at coaching philosophies, player development, training methods, discipline, and building volleyball’s next generation."
},

{
  id: "shortform-12",
  type: "shortform",
  title: "The Future of Women's Volleyball: 2025 and Beyond",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1YLMM39czOkM2Mqfu0yaX4IBEQnIYUi10/view?usp=drivesdk",
  image: "https://drive.google.com/file/d/1EuBewoxxuWM4resyN0Cdq0Wp9gHMnFED/view?usp=sharing",
  description: "A forward-looking snapshot of women’s volleyball, emerging stars, evolving tactics, competitive trends, and what comes next."
},

{
  id: "shortform-13",
  type: "shortform",
  title: "Breaking Down the Perfect Volleyball Serve",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1jzQcuEanU478rVU6diDLhz6WCzVvYMzq/view?usp=drivesdk",
  image: "https://drive.google.com/file/d/18vW_SDdEE9brvy5FIDD1R78QuSnPTPTU/view?usp=sharing",
  description: "A technical breakdown of the perfect volleyball serve, focusing on mechanics, timing, placement, power, and consistency."
},

{
  id: "shortform-14",
  type: "shortform",
  title: "How to Improve Your Vertical Jump for Volleyball",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1uStol-OoWYud7RajBDaVDhkQrZ4MG6Ym/view",
  image: "https://drive.google.com/file/d/1C-uooOm25BpwUzGM4ckZolqcClfL5IpU/view?usp=sharing",
  description: "Practical volleyball training guidance focused on improving vertical explosiveness, jumping mechanics, power generation, and athletic performance."
},

{
  id: "shortform-15",
  type: "shortform",
  title: "Top 10 Iconic Volleyball Matches in History",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/drive/folders/1SYM4KVcJDOD17eGVRTdaXakIXhCHbtbK?usp=drive_link",
  image: "https://drive.google.com/file/d/1TEgHL3sqKwznB_tgiDNv34m5eSbwMSGL/view?usp=sharing",
  description: "A rapid countdown of ten unforgettable volleyball matches remembered for legendary performances, dramatic rallies, and historic competitive moments."
},

{
  id: "shortform-16",
  type: "shortform",
  title: "The Importance of Mental Toughness in High-Level Volleyball",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1KdEsDbbs052bFwYFLTV8YRJ0h5Qx0UUl/view?usp=drivesdk",
  image: "https://drive.google.com/file/d/1jiNDpiruYNGWq7QDMLnK_gsDMSh-5r4V/view?usp=sharing",
  description: "An insightful look at mental toughness, composure, confidence, and decision-making under pressure at the highest volleyball level."
},

{
  id: "shortform-17",
  type: "shortform",
  title: "Powerful Volleyball Pipe Attack",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1tSMc0njFdlW3ykH99zT-0A_oHncDLlT1/view?usp=drivesdk",
  image: "https://drive.google.com/file/d/1FZRjNrvMBxjzF0FTXfND7lquOTm8zUvh/view?usp=sharing",
  description: "A powerful volleyball pipe attack showcase featuring explosive back-row hitting, precise timing, athletic elevation, and devastating finishing."
},

{
  id: "shortform-18",
  type: "shortform",
  title: "The Japanese Player That Broke Volleyball",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1b0fj3TjVFt1cpcL31WJU5unfAqQs7_Gp/view?usp=sharing",
  image: "https://drive.google.com/file/d/1SenUFeorajy1Fn2Uh6dy1cDH5PINl5nM/view?usp=sharing",
  description: "A punchy player-focused story exploring the Japanese star whose unique abilities challenged expectations and changed perceptions of modern volleyball."
},

{
  id: "shortform-19",
  type: "shortform",
  title: "Miyaura's Unbelievable Serve",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/181vPWh2cKl36Gf0g6Ylw7Uw00VRg_6s7/view?usp=sharing",
  image: "https://drive.google.com/file/d/1U_XfYmHH_0Hf_P3V2nyqB4mwa1r4kGYJ/view?usp=sharing",
  description: "A short, explosive showcase of Miyaura’s unbelievable serving technique, highlighting velocity, precision, movement, and attacking pressure."
},

{
  id: "shortform-20",
  type: "shortform",
  title: "Top 5 Volleyball Saves of 2025",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/drive/folders/1Bmiiz-tBN0yypcYgvfDWPeEefNJX_ApU?usp=sharing",
  image: "https://drive.google.com/file/d/1l5WtMzxA1ijNRSO2YKuaQu0Lu0JbFOC5/view?usp=sharing",
  description: "Five spectacular defensive saves showcasing impossible reactions, athletic dives, incredible instincts, and relentless effort during 2025."
},

{
  id: "shortform-21",
  type: "shortform",
  title: "Olympic-Inspired Volleyball Drill Ideas",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/12KvSWUfdeWdBZxRBPl7XEiBYSvpt5Aoz/view?usp=drive_link",
  image: "https://drive.google.com/file/d/1HNCjdZmU-V_8baLJIsOLumt3vDdoEbic/view?usp=drive_link",
  description: "Olympic-inspired volleyball drills designed to develop sharper reactions, stronger fundamentals, better movement, and more competitive training habits."
},

{
  id: "shortform-22",
  type: "shortform",
  title: "TikTok Volleyball Challenge Ideas",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/file/d/1a6mHNRa4cnHeg2kb2q4MQTnEXhc7IO5l/view?usp=drive_link",
  image: "https://drive.google.com/file/d/16-2eU0NjLuNuS_4EFKmGOcNTNspjJwgc/view?usp=sharing",
  description: "Creative volleyball challenge concepts built for TikTok, combining competition, entertainment, skill tests, and highly shareable moments."
},

{
  id: "shortform-23",
  type: "shortform",
  title: "Yuji Nishida’s Sky-High Jump Serve (15-sec explosive clip)",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/drive/folders/1AjptA-ybiG6ugTScpwmMZTXlxzf0XEEd?usp=sharing",
  image: "https://drive.google.com/file/d/1L-oW-1L4-8ZOQg5mIsPbQ7g_0vfgPcis/view?usp=drive_link",
  description: "A 15-second explosive showcase of Yuji Nishida’s sky-high jump serve, emphasizing elevation, power, speed, and impact."
},

{
  id: "shortform-24",
  type: "shortform",
  title: "Ngapeth’s No-Look Winner",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/drive/folders/1Fse9QWpnlx29LwOf4YhKGm64MXDWx1LP?usp=sharing",
  image: "https://drive.google.com/file/d/1XHGw545CZj5gyZg5GDdUIrzCaAPWfo_L/view?usp=drive_link",
  description: "A jaw-dropping Ngapeth moment showcasing deception, creativity, confidence, and outrageous court awareness through a perfectly executed no-look winner."
},

{
  id: "shortform-25",
  type: "shortform",
  title: "Nishida vs Ishikawa — Japan’s Power Duo in 1 Rally",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/drive/folders/1NXhIQ7m7uEYSEQ9IqIpMYEBiIoBlxSUI?usp=sharing",
  image: "https://drive.google.com/file/d/14q5CIELKs4sOHOugfZjt0C0gawSQG2an/view?usp=drive_link",
  description: "One explosive rally featuring Japan’s Nishida and Ishikawa, showcasing elite athleticism, coordination, power, and attacking versatility."
},

{
  id: "shortform-26",
  type: "shortform",
  title: "Bruno Rezende’s Sneaky Backset",
  niche: "Volleyball",
  client: "Volleyball Zone YT",
  video: "https://drive.google.com/drive/folders/1alhkiq0zBUN8ZG4U1-TNoSNr-mAQ6d8p?usp=sharing",
  image: "https://drive.google.com/file/d/1s1PlTS1Ja_kewo3O2pb8r2Le-gaEHWe5/view?usp=drive_link",
  description: "A clever Bruno Rezende setting moment demonstrating deception, vision, precision, timing, and the ability to completely fool opposing defenses."
},
    /* ---------- Scriptwriting samples ---------- */
    /* Replace the "doc" links below with your own Google Doc / Drive
       share links ("anyone with the link" access). "image" is the
       card's cover graphic — swap for your own poster/still. */
       {
  id: "health-1",
  type: "scriptwriting",
  title: "Are Magnesium Supplements Good for You_",
  niche: "Health & Wellness",
  client: "Samantha Upchurch YT",
  doc: "https://drive.google.com/open?id=1TkN73ma6aQQXZHRMwpgwuLEd2bUlGF4Y&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-2",
  type: "scriptwriting",
  title: "Difference Between Food Intolerance and Allergy_",
  niche: "Health & Wellness",
  client: "Samantha Upchurch YT",
  doc: "https://drive.google.com/open?id=11OVc84S8UTiR-hj34XmhGDiAAautS6a0&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-3",
  type: "scriptwriting",
  title: "From Business to Doctorate_ My Journey of Empowering Success",
  niche: "Health & Wellness",
  client: "Samantha Upchurch YT",
  doc: "https://drive.google.com/open?id=1guHXypxe6TwYN-VJVngbXgSIQCkwlg7k&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-4",
  type: "scriptwriting",
  title: "How to Re-Program Your Subconscious Mind to Get What You Want",
  niche: "Health & Wellness",
  client: "Samantha Upchurch YT",
  doc: "https://drive.google.com/open?id=1mVA-1mfrEqONOVQ-5pfCgQVk9bnyHqF5&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-5",
  type: "scriptwriting",
  title: "Why Everyone’s Quitting Gluten_ The Hidden Truth About Wheat & Your Health!",
  niche: "Health & Wellness",
  client: "Samantha Upchurch YT",
  doc: "https://drive.google.com/open?id=1JowZkgS_gynzuTLXlrOFKtLIp0YeIeLt&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-6",
  type: "scriptwriting",
  title: "5 Powerful Fruits to Renew your Kidneys",
  niche: "Health & Wellness",
  client: "FREShealing YT",
  doc: "https://drive.google.com/open?id=1LFVUbIu0tNLmygkV8RLE-Ke47kSQH3h4&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-7",
  type: "scriptwriting",
  title: "5 Surprising Foods to Optimize Joint and Bone Health",
  niche: "Health & Wellness",
  client: "FREShealing YT",
  doc: "https://drive.google.com/open?id=1-NzulS-q24sLFhH33EyyB-Ofr_rwpVeN&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-8",
  type: "scriptwriting",
  title: "10 Foods You Should NEVER Eat After 50 - Shocking Health Tips!",
  niche: "Health & Wellness",
  client: "FREShealing YT",
  doc: "https://drive.google.com/open?id=1t4rKdi1Y9ZUAfEy0qw5_b0eZqzb1LsuK&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-9",
  type: "scriptwriting",
  title: "12 Early Signs of Liver CIRRHOSIS _ LIVER is DYING!",
  niche: "Health & Wellness",
  client: "FREShealing YT",
  doc: "https://drive.google.com/open?id=1EjPY6kEte1vuvei0DQdSmWvhrZNVwVK5&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-10",
  type: "scriptwriting",
  title: "BCAAs",
  niche: "Health & Wellness",
  client: "Health YT",
  doc: "https://drive.google.com/open?id=1Xuk_xv5BA8UTPKa1ZW3zo1vtablmkAKP&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-11",
  type: "scriptwriting",
  title: "Creatine",
  niche: "Health & Wellness",
  client: "Health YT",
  doc: "https://drive.google.com/open?id=11sA3Ql4PLRfabgCfYN0kFTfIoZJ-UTLr&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-12",
  type: "scriptwriting",
  title: "Is your Liver Dying_ 10 Weird Signs of Liver Damage",
  niche: "Health & Wellness",
  client: "FREShealing YT",
  doc: "https://drive.google.com/open?id=1Rd09XojTJ2l-_q6dbTIqC3cQAcBhMfBE&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-13",
  type: "scriptwriting",
  title: "Light vs. heavy weights for muscle growth",
  niche: "Health & Wellness",
  client: "Health YT",
  doc: "https://drive.google.com/open?id=106yxj0knWeAQVzp0msbvDEH_5eNBDAyh&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-14",
  type: "scriptwriting",
  title: "Progressive overload",
  niche: "Health & Wellness",
  client: "Health YT",
  doc: "https://drive.google.com/open?id=1Ywh-nxUCbAx3SYsmhBz5KYrZrXt3N7D6&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},

{
  id: "health-15",
  type: "scriptwriting",
  title: "Shocking Benefits of Eating Oats Everyday",
  niche: "Health & Wellness",
  client: "FREShealing YT",
  doc: "https://drive.google.com/open?id=1cvrAslIe3DaPX5GxaRKEZtWDuQtfgclo&usp=drive_copy",
  image: "https://drive.google.com/file/d/16lIvuVi07kv5Ya8tb9uNd9oKX3D1pRmW/view?usp=sharing",
},


{
  id: "food-1",
  type: "scriptwriting",
  title: "Top 20 Airlines With the Most Delicious Vegetarian Meals",
  niche: "Food",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=1sUY9zrO8HbK4swkz3yjoOxQcyml0omus&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},

{
  id: "food-2",
  type: "scriptwriting",
  title: "Fast Food Chains That Serve Fresh Patties Only",
  niche: "Food",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1REYKb6SRkhqctKk73HoThsKEsS4tCONW&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},

{
  id: "food-3",
  type: "scriptwriting",
  title: "Feasting like Royalty_ 12 Unusual Food Habits of King Charles",
  niche: "Food",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=16p0g3lmjXo6AvPFYM5k_vTHHvRHvHYsf&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},

{
  id: "food-4",
  type: "scriptwriting",
  title: "McDonald's Food Exposed - Shocking Ingredients Revealed!",
  niche: "Food",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=1gOa32qJZ8lcN4ylCyZRos1quAk8TzYvR&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},

{
  id: "food-5",
  type: "scriptwriting",
  title: "Remember these vintage & discontinued Lunchables from the 1990s_",
  niche: "Food",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=1pj5qibPYFrZ6BTnm--w9xwpbPBU0BAHk&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},

{
  id: "food-6",
  type: "scriptwriting",
  title: "Surprising foods born and bred in America",
  niche: "Food",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=12e6QjWTEWZh_of3zczX8nQEfKDZynVIV&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},

{
  id: "food-7",
  type: "scriptwriting",
  title: "The Lost Legends_ Unearthing Forgotten Soft Drinks",
  niche: "Food",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=1kzfpm7tLTYya08HD6BPDlXA7kouD7_i1&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},

{
  id: "food-8",
  type: "scriptwriting",
  title: "The Mysterious Disappearance of McDonaldland Characters Revealed_ Uncovering the Truth",
  niche: "Food",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=1NW1CaY1740YAWpKpWQvCl9PNNTbWGjKr&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},

{
  id: "food-9",
  type: "scriptwriting",
  title: "The Unveiling_ The Secret Process Behind Spam Food Revealed",
  niche: "Food",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=1ptA4ok9vKK2KFisSRYFyTaPU1CqDEWbx&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},

{
  id: "food-10",
  type: "scriptwriting",
  title: "Vodka_ Beyond the Glass - 12 Surprising Uses You Never Knew!",
  niche: "Food",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=1tywDSR22hPGWr467Ac6WfphCduts-ZGj&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},

{
  id: "food-11",
  type: "scriptwriting",
  title: "Why Did Mac & Cheese Become America's Obsession_ Mystery Revealed",
  niche: "Food",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1EvNKlNDjoW5CxODBTjFT2b9M_Nl_YHnD&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Kfn_y_6QML1anj-tkkSoIXdN9g8AH8qQ/view?usp=sharing",
},


{
  id: "karens-1",
  type: "scriptwriting",
  title: "Most Shocking BETRAYALS of all Time",
  niche: "Housewives & Karens",
  client: "Realest Recap YT",
  doc: "https://drive.google.com/open?id=1U3NNit8YUGOAMNe9Ku2ckBeVWBbXkChe&usp=drive_copy",
  image: "https://drive.google.com/file/d/10pUbMX64j_Rx5ORkmXOMpJ3wHYQ899dZ/view?usp=sharing",
},

{
  id: "karens-2",
  type: "scriptwriting",
  title: "Most SHOCKING Real Housewives Moments Of All Time",
  niche: "Housewives & Karens",
  client: "Realest Recap YT",
  doc: "https://drive.google.com/open?id=1V6hgVOUJyoybFp0LaWeas_njmOEM8q0U&usp=drive_copy",
  image: "https://drive.google.com/file/d/10pUbMX64j_Rx5ORkmXOMpJ3wHYQ899dZ/view?usp=sharing",
},

{
  id: "karens-3",
  type: "scriptwriting",
  title: "Real Housewives couples that have called it QUITS after appearing on the show",
  niche: "Housewives & Karens",
  client: "Realest Recap YT",
  doc: "https://drive.google.com/open?id=1PiEPsNesUvXChnM-dlIobNPDwaj1AvV1&usp=drive_copy",
  image: "https://drive.google.com/file/d/10pUbMX64j_Rx5ORkmXOMpJ3wHYQ899dZ/view?usp=sharing",
},

{
  id: "karens-4",
  type: "scriptwriting",
  title: "Real Housewives’ Businesses that have FAILED!",
  niche: "Housewives & Karens",
  client: "Realest Recap YT",
  doc: "https://drive.google.com/open?id=12p7GD5MQaOMZc9emUMlqdlJuUdQdNLHC&usp=drive_copy",
  image: "https://drive.google.com/file/d/10pUbMX64j_Rx5ORkmXOMpJ3wHYQ899dZ/view?usp=sharing",
},

{
  id: "karens-5",
  type: "scriptwriting",
  title: "The most HATED Housewife in Real Housewives of New Jersey History!",
  niche: "Housewives & Karens",
  client: "Realest Recap YT",
  doc: "https://drive.google.com/open?id=1NqY7uNqm509A4tFLsQJ3cFWHF6wd2DZW&usp=drive_copy",
  image: "https://drive.google.com/file/d/10pUbMX64j_Rx5ORkmXOMpJ3wHYQ899dZ/view?usp=sharing",
},

{
  id: "karens-6",
  type: "scriptwriting",
  title: "The most HATED Housewife in Real Housewives of Orange County History!",
  niche: "Housewives & Karens",
  client: "Realest Recap YT",
  doc: "https://drive.google.com/open?id=1AsoBXQOBy67yLI8M1ThM_D2-Dc7E2zAk&usp=drive_copy",
  image: "https://drive.google.com/file/d/10pUbMX64j_Rx5ORkmXOMpJ3wHYQ899dZ/view?usp=sharing",
},

{
  id: "karens-7",
  type: "scriptwriting",
  title: "The most HEARTBREAKING moments in Housewives history",
  niche: "Housewives & Karens",
  client: "Realest Recap YT",
  doc: "https://drive.google.com/open?id=11XYGshsTUJl4BABojcKxh-JffU9N4mZ_&usp=drive_copy",
  image: "https://drive.google.com/file/d/10pUbMX64j_Rx5ORkmXOMpJ3wHYQ899dZ/view?usp=sharing",
},

{
  id: "karens-8",
  type: "scriptwriting",
  title: "The WORST Real Housewives storylines of all time!",
  niche: "Housewives & Karens",
  client: "Realest Recap YT",
  doc: "https://drive.google.com/open?id=1_krPTm-9amJIKFB9gydMmmb8mHVndH6G&usp=drive_copy",
  image: "https://drive.google.com/file/d/10pUbMX64j_Rx5ORkmXOMpJ3wHYQ899dZ/view?usp=sharing",
},

{
  id: "karens-9",
  type: "scriptwriting",
  title: "Times it got PHYSICAL on the Real Housewives",
  niche: "Housewives & Karens",
  client: "Realest Recap YT",
  doc: "https://drive.google.com/open?id=1O4i-wUkd9rLdjsxDH2wXrpqbL0STUbqR&usp=drive_copy",
  image: "https://drive.google.com/file/d/10pUbMX64j_Rx5ORkmXOMpJ3wHYQ899dZ/view?usp=sharing",
},

{
  id: "karens-10",
  type: "scriptwriting",
  title: "Where are These PAUSED housewives Now_",
  niche: "Housewives & Karens",
  client: "Realest Recap YT",
  doc: "https://drive.google.com/open?id=1LAQHO5F2ZwaDcaF8uWXsslwBpP8GFWOz&usp=drive_copy",
  image: "https://drive.google.com/file/d/10pUbMX64j_Rx5ORkmXOMpJ3wHYQ899dZ/view?usp=sharing",
},


{
  id: "HIM-1",
  type: "scriptwriting",
  title: "How beef Jerky is made",
  niche: "How It's Made",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=1jXxxqILXKUPyCzJFkKD6M3B3c-ckNzSQ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1DV8VCLFUVfiQb700dzwQ694ELpUdvw8U/view?usp=sharing",
},

{
  id: "HIM-2",
  type: "scriptwriting",
  title: "How Chocolate is made_",
  niche: "How It's Made",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=1WvWXFhjJCyJMI3k0tGX7gVpgEfsBerrP&usp=drive_copy",
  image: "https://drive.google.com/file/d/1DV8VCLFUVfiQb700dzwQ694ELpUdvw8U/view?usp=sharing",
},

{
  id: "HIM-3",
  type: "scriptwriting",
  title: "How Gasoline is made",
  niche: "How It's Made",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1y6zcd_lLqv5v3AXA7exA1We7n8o39hDq&usp=drive_copy",
  image: "https://drive.google.com/file/d/1DV8VCLFUVfiQb700dzwQ694ELpUdvw8U/view?usp=sharing",
},

{
  id: "HIM-4",
  type: "scriptwriting",
  title: "How is MILK POWDER Made_",
  niche: "How It's Made",
  client: "FoodVentures YT",
  doc: "https://drive.google.com/open?id=1Jv5NIJh-FF6q9Mmf-TBPBdvP4phhCq1O&usp=drive_copy",
  image: "https://drive.google.com/file/d/1DV8VCLFUVfiQb700dzwQ694ELpUdvw8U/view?usp=sharing",
},


{
  id: "sunny-1",
  type: "scriptwriting",
  title: "Dolly Parton’s Outlier Approach to Changing the World",
  niche: "Trenguin/Sunny V2",
  client: "Bryon YT",
  doc: "https://drive.google.com/open?id=1z99DYTy6tNCjJbgk_jGrVZ4kwTqP-wkW&usp=drive_copy",
  image: "https://drive.google.com/file/d/12yNG4X4sahwFqzLnnLVoDGOF0Qg6c98_/view?usp=sharing",
},

{
  id: "sunny-2",
  type: "scriptwriting",
  title: "From NBA to CEO_ Shaq's Millionaire Blueprint",
  niche: "Trenguin/Sunny V2",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1l9yF9rFTmxmeyx7k34gsFtoQdsfxM1Fj&usp=drive_copy",
  image: "https://drive.google.com/file/d/12yNG4X4sahwFqzLnnLVoDGOF0Qg6c98_/view?usp=sharing",
},

{
  id: "sunny-3",
  type: "scriptwriting",
  title: "The Story of Alex Clark",
  niche: "Trenguin/Sunny V2",
  client: "Trenguin YT",
  doc: "https://drive.google.com/open?id=1jVSj-QWzbWBGxroUvLSy4DDdDuI9BJTL&usp=drive_copy",
  image: "https://drive.google.com/file/d/12yNG4X4sahwFqzLnnLVoDGOF0Qg6c98_/view?usp=sharing",
},

{
  id: "sunny-4",
  type: "scriptwriting",
  title: "The Teen Who Outsmarted NASA",
  niche: "Trenguin/Sunny V2",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1-L1p4sVgUSmO_t7trEDb6jqXRD7uprTz&usp=drive_copy",
  image: "https://drive.google.com/file/d/12yNG4X4sahwFqzLnnLVoDGOF0Qg6c98_/view?usp=sharing",
},

{
  id: "sunny-5",
  type: "scriptwriting",
  title: "We Let an AI Control Our Smart Home for 24 Hours—You Won’t Believe What It Did!",
  niche: "Trenguin/Sunny V2",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1jCKxfC5p-kZc5pV-eiC3SaPP-hRZ2POw&usp=drive_copy",
  image: "https://drive.google.com/file/d/12yNG4X4sahwFqzLnnLVoDGOF0Qg6c98_/view?usp=sharing",
},

{
  id: "sunny-6",
  type: "scriptwriting",
  title: "What RUINED the Steven Universe Fandom_",
  niche: "Trenguin/Sunny V2",
  client: "Trenguin YT",
  doc: "https://drive.google.com/open?id=1m3QJ3NgYJGtaQAC7Rh2v_MxrVbNxDJIn&usp=drive_copy",
  image: "https://drive.google.com/file/d/12yNG4X4sahwFqzLnnLVoDGOF0Qg6c98_/view?usp=sharing",
},


{
  id: "animals-1",
  type: "scriptwriting",
  title: "10 Mariana Trench Creatures That Are Scarier Than Megalodon",
  niche: "Animals & Wildlife",
  client: "Motech YT",
  doc: "https://drive.google.com/open?id=1IaWZpx2nchdgVIeJyCUm0QGakaTbMYIv&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-2",
  type: "scriptwriting",
  title: "Animal and Their Legs",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1U23sqf5bh-01Ns-CeprVr9eUfnYR1rUY&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-3",
  type: "scriptwriting",
  title: "Cat Body Language V2",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1-9EPvDdp9z30pKkB2h38lck0vvT_hpxl&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-4",
  type: "scriptwriting",
  title: "Secrets Your Cat Knows About You",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1lHLAACeRQUUqod4uPBEF69OxOQdEnUfi&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-5",
  type: "scriptwriting",
  title: "The First Minutes The Dinosaurs Went Extinct",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1aNfMmstysG-Pt_59c1VmpxLbL-QLlrvu&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-6",
  type: "scriptwriting",
  title: "Things a Cat Will Never Forgive",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1E3iY1Utwpbt3rlDPnHwiHFDilzjtZut9&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-7",
  type: "scriptwriting",
  title: "Ways to Tell Your Cat That You Love Your Cat",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1CZAItR2wVnGewllJJ0qlbLIjQ64Va-IY&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-8",
  type: "scriptwriting",
  title: "Cat's Superhero-Level Hearing",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1JSQgbGEdyNVQlF9kFCnbq-vJNVpt5fWi&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-9",
  type: "scriptwriting",
  title: "Cats and Their Crazy Sleep Positions",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1LS_8Fq4ZUmcvkB3840zuAIGkXA7jzBG5&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-10",
  type: "scriptwriting",
  title: "Cats and Their Love for Boxes_ Explained",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1xXv1uwUj8gkCLrkvUA1FJegy0p9NVUEb&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-11",
  type: "scriptwriting",
  title: "Facts About Cat Whiskers",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1D0sbY_fOYYxNmZx6-va4K9vDto9LJkur&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-12",
  type: "scriptwriting",
  title: "Famous Cats in History",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1W_J8pvAXkzVb9F0ih1p5RyocyonI8PyG&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-13",
  type: "scriptwriting",
  title: "How Cats See the World",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1_56O0e1iyGeNFGBJBJe09OaUKLCozSmP&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-14",
  type: "scriptwriting",
  title: "Is Your Cat Left-Pawed or Right-Pawed",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1shrP1yhz3BX9U1bFCJo55V_hymq-eHJt&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-15",
  type: "scriptwriting",
  title: "The Science Behind Cat Purring",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1buGBVLdCxZAOjgPFKN0d2c8OPjsWegsp&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-16",
  type: "scriptwriting",
  title: "The Truth About Cats' Nine Lives",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1DuwUis39RmAVxtmH8KdUPwDXgWfTxy4U&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-17",
  type: "scriptwriting",
  title: "Why Do Cats Hate Water",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1prNQ1D1xGTZtDAcxXXtoopIa41STNWjB&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-18",
  type: "scriptwriting",
  title: "Animal and Their Legs",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1hUM4cRVLRt6sXv2LvwUwfnipfniYwFCN&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-19",
  type: "scriptwriting",
  title: "Why It Sucks To Be A French Bulldog",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1VUo9U8c72AjM_tjXp9dEZfCYk8GXfgsQ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-20",
  type: "scriptwriting",
  title: "Why it sucks to be a German shepherd",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=16i0iHY4UeLbBzLrAPtNCcxQf0Z7R_fF5&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},

{
  id: "animals-21",
  type: "scriptwriting",
  title: "Why It Sucks To Be A Poodle",
  niche: "Animals & Wildlife",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1cizRj6hcaVSUqO05T_V6eol9c7q6Dmpl&usp=drive_copy",
  image: "https://drive.google.com/file/d/1eSa-umuBp4xvwOk-wIMUm1E--4CoGYYe/view?usp=sharing",
},



{
  id: "haunted-1",
  type: "scriptwriting",
  title: "Celeb Haunted Homes",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1l1cqCjBDqrDjCyqs5lxnA5fDQ0ZqY7aVs6fOF5yOjDo&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-2",
  type: "scriptwriting",
  title: "Cop Exorcism",
  niche: "Haunted/Paramormal",
  client: "The Unkown SC",
  doc: "https://drive.google.com/open?id=1Rgi7evmR52CGtB54Syud9_xLbmf-mMfppA6qJsTqeSU&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-3",
  type: "scriptwriting",
  title: "Demon Possessed Mom",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1oyg-6h65fdRXHFE_xWUMzjMOrZ_Vu-KK02SSV5K99Ic&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-4",
  type: "scriptwriting",
  title: "Haunted Texas Hospital",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1zD8qm3p-iCpzH7dx--DLVwbBjlrKZHS3ORdsWVJR6Fw&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-5",
  type: "scriptwriting",
  title: "Haunting in Connecticut",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1EMZwQRJ0WxxsOejDzVL5VYzhBrioneU4cP2LLB_kjxI&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-6",
  type: "scriptwriting",
  title: "Hoia Baciu Forest",
  niche: "Haunted/Paramormal",
  client: "The Unknows SC",
  doc: "https://drive.google.com/open?id=1aDNsK0ZVWpO6vFSAtg2tQTsQDQOWPJMXIyBER0ZJEWY&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-7",
  type: "scriptwriting",
  title: "Hollywood Stars Paranormal",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1Q8rIYYiqWV8Zt8Br4EkSla5JqPrpFVHLYYdW8rK_-CA&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-8",
  type: "scriptwriting",
  title: "Hullhouse Devil Baby",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1ch2dv8DXgTr33pwlA6yojcDos3APw_lNkmk3U1DaxxA&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-9",
  type: "scriptwriting",
  title: "Manhattan Murder Well",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1KDlmi5mIMgA0lDsM55Dr1wXoGHGjt0B8Wi0PN9bW0ts&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-10",
  type: "scriptwriting",
  title: "Redberry Bible Camp Exorcism",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=14k2eWdUWmRvcCz7Icrvu3ueEoKNRKBT51K9GAYzOQSk&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-11",
  type: "scriptwriting",
  title: "Ridge Home Asylum",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1fD_fwiOcX1pNBGm_3ZVKU4GH_H_GUo6vd-9VX14q7Xs&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-12",
  type: "scriptwriting",
  title: "Signs Your House Is Haunted",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=18Gd8MkpzpGw2Hi5XAws9lPEJLt8CcSFfioYGKxLiPF8&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-13",
  type: "scriptwriting",
  title: "SLAUGHTERHOUSE CANYON",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1Kyn2_sUSPm9nsM0BQxexSYHTSu2gSNK29kgKFQHI9eo&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-14",
  type: "scriptwriting",
  title: "Ghost Of Two Sisters",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1jCtqaf45gKQ_tn-aDndtoR9-3SUt3krYEnZ10Txh8ps&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-15",
  type: "scriptwriting",
  title: "Antigonish County Farm",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1wjnebJbtZy7nbx-Y_6hzpUH9wUlr53WffPqfM3P7KPo&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},

{
  id: "haunted-16",
  type: "scriptwriting",
  title: "Famous Ghost Photographs",
  niche: "Haunted/Paramormal",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1IS5vMis6jiHnS_kO6jA6s-LOwPz3QWydlgWAJtZ0D-0&usp=drive_copy",
  image: "https://drive.google.com/file/d/1A8f1amgJwMkr7ukM6_88ug3Sjs_e5HnI/view?usp=sharing",
},


{
  id: "imessage-1",
  type: "scriptwriting",
  title: "Group Chat Gone Wrong_ Haunted Weekend in San Diego",
  niche: "iMessage",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1wLWJz0Tta2LLnzUSSmcYzXE99u6mB26p&usp=drive_copy",
  image: "https://drive.google.com/file/d/14gLcn_bjeCAgK4ENzA-QG6bej_Q8X3Zl/view?usp=sharing",
},

{
  id: "imessage-2",
  type: "scriptwriting",
  title: "KS Daily Texts_ Script #1_ SHE Sold Her Boyfriend’s FAKE LAMBORGHINI!",
  niche: "iMessage",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1MWp_0lggyWpoQFKszWMvBQLsfSi-DQW5&usp=drive_copy",
  image: "https://drive.google.com/file/d/14gLcn_bjeCAgK4ENzA-QG6bej_Q8X3Zl/view?usp=sharing",
},

{
  id: "imessage-3",
  type: "scriptwriting",
  title: "KS Daily Texts_ Script #2_ DAD Changed His Mind Real FAST!",
  niche: "iMessage",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1aXtSmZO8SDsneHTw_bbo8RyKJz6suLno&usp=drive_copy",
  image: "https://drive.google.com/file/d/14gLcn_bjeCAgK4ENzA-QG6bej_Q8X3Zl/view?usp=sharing",
},

{
  id: "imessage-4",
  type: "scriptwriting",
  title: "KS Daily Texts_ Script #3_ SHE Went To FAR With This",
  niche: "iMessage",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1HOEKljeB2WONfQCcxJSaRyw07DuB37dC&usp=drive_copy",
  image: "https://drive.google.com/file/d/14gLcn_bjeCAgK4ENzA-QG6bej_Q8X3Zl/view?usp=sharing",
},

{
  id: "imessage-5",
  type: "scriptwriting",
  title: "KS Daily Texts_ Script #4_ HE Should’ve Had Some RESPECT!",
  niche: "iMessage",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1byzlAglH46L_QlkzbUL_a2RcsMmKKsTn&usp=drive_copy",
  image: "https://drive.google.com/file/d/14gLcn_bjeCAgK4ENzA-QG6bej_Q8X3Zl/view?usp=sharing",
},

{
  id: "imessage-6",
  type: "scriptwriting",
  title: "KS Daily Texts_ Script #5_ SHE Took It The WRONG WAY!",
  niche: "iMessage",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1YrV28p5pgqEa571iBhgNvQzISerRo66K&usp=drive_copy",
  image: "https://drive.google.com/file/d/14gLcn_bjeCAgK4ENzA-QG6bej_Q8X3Zl/view?usp=sharing",
},

{
  id: "imessage-7",
  type: "scriptwriting",
  title: "KS Daily Texts_ Script #6_ HE Won’t Tell Her His REAL HEIGHT",
  niche: "iMessage",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1eKGNoiRlKE_0hR7cUyIhh-z-T76MAKiA&usp=drive_copy",
  image: "https://drive.google.com/file/d/14gLcn_bjeCAgK4ENzA-QG6bej_Q8X3Zl/view?usp=sharing",
},

{
  id: "imessage-8",
  type: "scriptwriting",
  title: "KS Daily Texts_ Script #7_ HE Couldn’t Believe WHAT HAPPENED!",
  niche: "iMessage",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1-Z7dkXHUVv565zTEYLoWqFFYRXtKQmR2&usp=drive_copy",
  image: "https://drive.google.com/file/d/14gLcn_bjeCAgK4ENzA-QG6bej_Q8X3Zl/view?usp=sharing",
},

{
  id: "imessage-9",
  type: "scriptwriting",
  title: "Revised -The Dangers of Online Predators_ A Story of Deception and Survival",
  niche: "iMessage",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1EVQZuHIavtqq0SqWYzJPYCmRSlRLnjEB&usp=drive_copy",
  image: "https://drive.google.com/file/d/14gLcn_bjeCAgK4ENzA-QG6bej_Q8X3Zl/view?usp=sharing",
},

{
  id: "imessage-10",
  type: "scriptwriting",
  title: "Revised-Shadows in the night(10 min script trail)",
  niche: "iMessage",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1o536N7UDTccIPuEjToX9nHPJqA6gHSZL&usp=drive_copy",
  image: "https://drive.google.com/file/d/14gLcn_bjeCAgK4ENzA-QG6bej_Q8X3Zl/view?usp=sharing",
},


{
  id: "lux-1",
  type: "scriptwriting",
  title: "Dining at Nusr-Et Steakhouse_ The Ultimate Luxury Steak Experience with Salt Bae",
  niche: "Luxury",
  client: "Elite Dreaming YT",
  doc: "https://drive.google.com/open?id=1m5SNBjdjUHk-KZwwiMg4qCAT5yVZOzES&usp=drive_copy",
  image: "https://drive.google.com/file/d/1PnpExpkK-1TdC_aUrj4H1bYV-KA-k1R1/view?usp=sharing",
},

{
  id: "lux-2",
  type: "scriptwriting",
  title: "How does Elon Musk spends his billions of dollars of Net Worth_",
  niche: "Luxury",
  client: "Elite Dreaming YT",
  doc: "https://drive.google.com/open?id=1Pkg_7iyimnDumGb9-kwnOuB7DQJh8Dtz&usp=drive_copy",
  image: "https://drive.google.com/file/d/1PnpExpkK-1TdC_aUrj4H1bYV-KA-k1R1/view?usp=sharing",
},

{
  id: "lux-3",
  type: "scriptwriting",
  title: "Icon of the Seas_ Inside the World’s Largest and Most Luxurious Cruise Ship",
  niche: "Luxury",
  client: "Elite Dreaming YT",
  doc: "https://drive.google.com/open?id=1B3Rt702FK-doYhOtVmqtQJPQbZMh9Uq4&usp=drive_copy",
  image: "https://drive.google.com/file/d/1PnpExpkK-1TdC_aUrj4H1bYV-KA-k1R1/view?usp=sharing",
},

{
  id: "lux-4",
  type: "scriptwriting",
  title: "Inside Monaco_ The Ultimate Playground for the World's Elite - Supercars, Luxury, and Glamour",
  niche: "Luxury",
  client: "Elite Dreaming YT",
  doc: "https://drive.google.com/open?id=11Ux-gHqH8PcIkeAgWtanMT182FUXiFRl&usp=drive_copy",
  image: "https://drive.google.com/file/d/1PnpExpkK-1TdC_aUrj4H1bYV-KA-k1R1/view?usp=sharing",
},

{
  id: "lux-5",
  type: "scriptwriting",
  title: "Inside Taylor Swift’s Luxurious Lifestyle_ Mansions, Fashion, and Glamorous Living",
  niche: "Luxury",
  client: "Elite Dreaming YT",
  doc: "https://drive.google.com/open?id=1pgqRVsXJ6E0VgZ7tc20lgmJ0yDDSdLoS&usp=drive_copy",
  image: "https://drive.google.com/file/d/1PnpExpkK-1TdC_aUrj4H1bYV-KA-k1R1/view?usp=sharing",
},

{
  id: "lux-6",
  type: "scriptwriting",
  title: "Revised-Unveiling the Lamborghini Temerario_ The Ultimate Fusion of Power, Luxury, and Innovation",
  niche: "Luxury",
  client: "Elite Dreaming YT",
  doc: "https://drive.google.com/open?id=1xs28aRoAAU7ZuJfN59mwLLGBuj9O4D08&usp=drive_copy",
  image: "https://drive.google.com/file/d/1PnpExpkK-1TdC_aUrj4H1bYV-KA-k1R1/view?usp=sharing",
},

{
  id: "lux-7",
  type: "scriptwriting",
  title: "Secrets Inside Kim Jong Un's Bulletproof Train_ Weapons, Security, and Exclusive 'Lady Conductors",
  niche: "Luxury",
  client: "Elite Dreaming YT",
  doc: "https://drive.google.com/open?id=1t_dBsjtF2tnJlCISNRh9GtlgzB8cPfbj&usp=drive_copy",
  image: "https://drive.google.com/file/d/1PnpExpkK-1TdC_aUrj4H1bYV-KA-k1R1/view?usp=sharing",
},

{
  id: "lux-8",
  type: "scriptwriting",
  title: "The Ultimate Luxury Lifestyle of Lewis Hamilton_ Inside the World’s Most Extravagant Racer's Mansions and Cars",
  niche: "Luxury",
  client: "Elite Dreaming YT",
  doc: "https://drive.google.com/open?id=1BmqGtaSb-_6bdK_OSoTc4vUGK6xrI4Mh&usp=drive_copy",
  image: "https://drive.google.com/file/d/1PnpExpkK-1TdC_aUrj4H1bYV-KA-k1R1/view?usp=sharing",
},

{
  id: "lux-9",
  type: "scriptwriting",
  title: "Welcome to UR Cristiano_ Inside the World of Cristiano Ronaldo - Fitness, Lifestyle, and Exclusive Content",
  niche: "Luxury",
  client: "Elite Dreaming YT",
  doc: "https://drive.google.com/open?id=1AFw23_RLCKW-jZtb7P8J6w77w70OXeCR&usp=drive_copy",
  image: "https://drive.google.com/file/d/1PnpExpkK-1TdC_aUrj4H1bYV-KA-k1R1/view?usp=sharing",
},


{
  id: "PS-1",
  type: "scriptwriting",
  title: "The Myth of 'Alpha' and 'Beta' Males—Why It's All a Lie",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1ENMNxeIIWOSFVIu7hu3qLVz5dad-9_tH&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-2",
  type: "scriptwriting",
  title: "Copy of Men are getting weaker...",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1YvtTGqKhzSocbitMXVVMNjMVCiVX9gxT&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-3",
  type: "scriptwriting",
  title: "How MrBeast Lost His Masculinity and His Fanbase",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1k9EPNeqGy4vsrc87wqUBK6or3tqSogIn&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-4",
  type: "scriptwriting",
  title: "The Myth of the Self-Made Man—Why Independence Is Overrated",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1SEo2jXjQo8WJ7aMVLv7Fi9S5OoIbKrxa&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-5",
  type: "scriptwriting",
  title: "The Silent Epidemic_ How Social Media Is Ruining Men's Confidence",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=11JCIRoY5knFLbe-V9PERidCJ_KlfymhL&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-6",
  type: "scriptwriting",
  title: "v1 - Stoicism Is Dead—Why Modern Men Need a New Philosophy",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1OprxJIsARDq6UsfoU6hM9gQp2GUJlSLD&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-7",
  type: "scriptwriting",
  title: "Who Do Young Men Look Up To Now_",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1uzsR1AhZtZXbLLEW_TJRd2KgG4oOoE1z&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-8",
  type: "scriptwriting",
  title: "Why Emotional Intelligence Is the Most Underrated Skill for Men",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1VQdo5KlyqEZDk4YCbeBea6iXW_XSEN2g&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-9",
  type: "scriptwriting",
  title: "Why Hustle Culture Is Destroying Men—The Toxic Reality of 'Grind' Mindset",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=133mep5G0SLEiCDCEG3JGl87VxYZ5--KB&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-10",
  type: "scriptwriting",
  title: "Why Modern Men Are Rejecting Marriage—Is It Still Worth It_",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1aHpGgau7Rny7V-c8IapgLHLQ25ZQ9SZY&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-11",
  type: "scriptwriting",
  title: "When iShowSpeed Breaks Every Country's Rules",
  niche: "Podcast & Streamers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1oehwMj881IDjH4qJrRI3ywFGxDeEPP_B&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},

{
  id: "PS-12",
  type: "scriptwriting",
  title: "When Streamers Destroyed Politicians Live",
  niche: "Podcast & Streamers",
  client: "Streamer Talk YT",
  doc: "https://drive.google.com/open?id=1gODJcs4xnyck90_uXImXi53WWbzWCPe5&usp=drive_copy",
  image: "https://drive.google.com/file/d/1azYRrZ1ji7lq9D6mZkWbGwahR_pyLsCr/view?usp=sharing",
},


{
  id: "kids-1",
  type: "scriptwriting",
  title: "Nastya tries to survive 24 hours WITHOUT Technology",
  niche: "Kids Shows",
  client: "Like Nastya YT",
  doc: "https://drive.google.com/open?id=1eze6cLKnWdbUXqPBF_yaO9WOhEaLJQ7u&usp=drive_copy",
  image: "https://drive.google.com/file/d/1tWuxf-tjnCRSRBex6LBtvfC7BsQ0JE4h/view?usp=sharing",
},

{
  id: "kids-2",
  type: "scriptwriting",
  title: "Nastya gatecrashes Evelyn's date",
  niche: "Kids Shows",
  client: "Like Nastya YT",
  doc: "https://drive.google.com/open?id=1RbQRsKCKvqXDtHae7x-STniPf9M-jqKH&usp=drive_copy",
  image: "https://drive.google.com/file/d/1tWuxf-tjnCRSRBex6LBtvfC7BsQ0JE4h/view?usp=sharing",
},

{
  id: "kids-3",
  type: "scriptwriting",
  title: "Nastya’s Opposite Day_ Everything is Backward",
  niche: "Kids Shows",
  client: "Like Nastya YT",
  doc: "https://drive.google.com/open?id=1droCuLKr95RADP3H3fg2I7tOqnn1_s6e&usp=drive_copy",
  image: "https://drive.google.com/file/d/1tWuxf-tjnCRSRBex6LBtvfC7BsQ0JE4h/view?usp=sharing",
},

       {
  id: "every-logia-type-devil-fruit",
  type: "scriptwriting",
  title: "Every Logia Type Devil Fruit",
  niche: "Anime/Cartoon",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1CyBrP1hKvAuJRoYGghVjUijN6LD8mu7d&usp=drive_copy",
  image: "https://drive.google.com/file/d/1ukoyOpz5RLK-VvDAmduR0RO1rTDXyWnq/view?usp=sharing",
},

{
  id: "bojack-horseman",
  type: "scriptwriting",
  title: "BoJack Horseman",
  niche: "Anime/Cartoon",
  client: "Toony Pies YT",
  doc: "https://drive.google.com/open?id=1nwXuPXQfM5z_PDPiNikqMLb6V8fQUpfN&usp=drive_copy",
  image: "https://drive.google.com/file/d/1ukoyOpz5RLK-VvDAmduR0RO1rTDXyWnq/view?usp=sharing",
},

{
  id: "bojack-s-toxic-friendships-why-his-relationships-always-fail",
  type: "scriptwriting",
  title: "BoJack’s Toxic Friendships_ Why His Relationships Always Fail",
  niche: "Anime/Cartoon",
  client: "Toony Pie YT",
  doc: "https://drive.google.com/open?id=1GZ2244dkEH3aNToGZeWjUVeck5H75PQX&usp=drive_copy",
  image: "https://drive.google.com/file/d/1ukoyOpz5RLK-VvDAmduR0RO1rTDXyWnq/view?usp=sharing",
},

{
  id: "breaking-reality-the-moral-dilemmas-of-rick-and-morty",
  type: "scriptwriting",
  title: "Breaking Reality_ The Moral Dilemmas of Rick and Morty",
  niche: "Anime/Cartoon",
  client: "Toony Pie YT",
  doc: "https://drive.google.com/open?id=18FLXjHq7Gnplj77ZmwwMSvz2FWnyZIWi&usp=drive_copy",
  image: "https://drive.google.com/file/d/1ukoyOpz5RLK-VvDAmduR0RO1rTDXyWnq/view?usp=sharing",
},

{
  id: "steven-universe-steven-universe-character-arc",
  type: "scriptwriting",
  title: "Steven Universe (Steven Universe) - character arc",
  niche: "Anime/Cartoon",
  client: "Toony Pie YT",
  doc: "https://drive.google.com/open?id=1ME44b790vwQb5s_ZOMqQHkNcEWkkbuXo&usp=drive_copy",
  image: "https://drive.google.com/file/d/1ukoyOpz5RLK-VvDAmduR0RO1rTDXyWnq/view?usp=sharing",
},

{
  id: "the-rowdyruff-boys-why-they-were-more-than-just-evil-counter",
  type: "scriptwriting",
  title: "The Rowdyruff Boys_ Why They Were More Than Just Evil Counterparts",
  niche: "Anime/Cartoon",
  client: "Toony Pie YT",
  doc: "https://drive.google.com/open?id=11W2-conHPHzjmCWWIlsYjdzlKosW-FxL&usp=drive_copy",
  image: "https://drive.google.com/file/d/1ukoyOpz5RLK-VvDAmduR0RO1rTDXyWnq/view?usp=sharing",
},

{
  id: "zuko-avatar-the-last-airbender-character-arc",
  type: "scriptwriting",
  title: "Zuko (Avatar_ The Last Airbender) - character arc",
  niche: "Anime/Cartoon",
  client: "Toony Pie YT",
  doc: "https://drive.google.com/open?id=1Kq0itXdS8RpeLhBEdGC_AYXLzGlFQ8SS&usp=drive_copy",
  image: "https://drive.google.com/file/d/1ukoyOpz5RLK-VvDAmduR0RO1rTDXyWnq/view?usp=sharing",
},

{
  id: "3-major-projects-completing-in-2024",
  type: "scriptwriting",
  title: "3 major projects completing in 2024",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1XrkZjzKnRgP1UxJLUnUH3iaKl8MeQCpQ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "the-10-regions-that-are-building-of-neom-city-in-saudi-arabi",
  type: "scriptwriting",
  title: "The 10 regions that are building of Neom city in Saudi Arabia.",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1lgY523SOlNHGR-VcaMvVh305vAuixtBT&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "10-dam-failures",
  type: "scriptwriting",
  title: "10 Dam Failures",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1_gGY5XQr5a8LuA7Ma5zfsmp8Kv1K0mpb&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "2024-olympic-games-in-paris",
  type: "scriptwriting",
  title: "2024 Olympic Games in Paris",
  niche: "Mega Construction",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1-90tByR-yvjSZe5qSBhRT0IGWgPbikOX&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "elt-telescope",
  type: "scriptwriting",
  title: "ELT telescope",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1S4o6coKcjIt4Z4vSdTUJv4CWP_5Ktzd3&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "francis-scott-key-bridge",
  type: "scriptwriting",
  title: "Francis Scott Key Bridge",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=111g4noQWKjF-pfJJLqHbZ-v_jkiHCtas&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "kansai-airport-in-japan-is-sinking",
  type: "scriptwriting",
  title: "Kansai airport in japan is sinking",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1MDgTKA4YKEwWqQ_AaNZ8S47qU4TsLuX7&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "leyja-neom-region",
  type: "scriptwriting",
  title: "Leyja, Neom Region",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1RYdBHa3t8jmAc0oJDzWtbUz02EotTkgP&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "male",
  type: "scriptwriting",
  title: "Malè",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1T3Ajj_kjySGPXpztW6F1fm4aJPeJWuAZ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "polimeropolis-city",
  type: "scriptwriting",
  title: "Polimeropolis city",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1-UN0_jaTSps8e8IysT66BZC30dcxbTxy&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "saudi-arabia-s-linear-park-project",
  type: "scriptwriting",
  title: "Saudi Arabia's _linear park_ project",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1eKVYq_VvvooHxUbyOVTLkVoZN8O2jJ-M&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "sisi-the-new-capital-of-egypt",
  type: "scriptwriting",
  title: "Sisi, the new capital of Egypt",
  niche: "Mega Construction",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1eqq2xUdHncpyggZmYOvQLsiPc8wSntSm&usp=drive_copy",
  image: "https://drive.google.com/file/d/1BFb4KO8CSki4XeZZKLKlYzsTT5ZtT1sg/view?usp=sharing",
},

{
  id: "drake-ordered-to-answer-for-xxxtentacions-murder",
  type: "scriptwriting",
  title: "Drake Ordered To Answer For XXXTentacions Murder",
  niche: "Music/Rappers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1_EJZLkw5qcPGkEpEDgvXG5dEX7MDQ3yH&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "eminem-and-the-art-of-lyrical-warfare",
  type: "scriptwriting",
  title: "Eminem and the Art of Lyrical Warfare",
  niche: "Music/Rappers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1h0_T0N8Q_EcNkwMG5CzG3LUzEvtsE6Hj&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "eminem-destroys-family-and-foe-who-s-next",
  type: "scriptwriting",
  title: "Eminem Destroys Family and Foe – Who’s Next",
  niche: "Music/Rappers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1s6RNyUTm8GTDU27nn8hhbMfq8tCh3EWU&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "james-freeman-history-101-sc-mac-miller-death",
  type: "scriptwriting",
  title: "James Freeman - History 101 SC - Mac Miller Death",
  niche: "Music/Rappers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1cyfsqiCgNwqsOIiL4dW76NboLFfL-9Lf&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "octopizzo",
  type: "scriptwriting",
  title: "Octopizzo",
  niche: "Music/Rappers",
  client: "Afro Motivation YT",
  doc: "https://drive.google.com/open?id=1emUjcj-7l7Lv6urdISPGCpD5Q2jwqlRj&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "scandalous-diddy",
  type: "scriptwriting",
  title: "Scandalous Diddy",
  niche: "Music/Rappers",
  client: "Festival Folklore YT",
  doc: "https://drive.google.com/open?id=18ola4jCYvmeYZyz7SB7yOS6dJlfHiB7a&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "young-thug-lyrics-put-him-in-court-ysl-asks-for-mistrial-aft",
  type: "scriptwriting",
  title: "Young Thug lyrics put him in court_YSL Asks For Mistrial After Video Leak",
  niche: "Music/Rappers",
  client: "True Story SC",
  doc: "https://drive.google.com/open?id=1REr3Wkaz6NBWGN2qnxpwfQDeTtBHguFX&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "7-label-feuds",
  type: "scriptwriting",
  title: "7 Label Feuds",
  niche: "Music/Rappers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1oGWJqUgl9AZEEUcjFY8pBfZHLwrJrCGY&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "7-labels-that-built",
  type: "scriptwriting",
  title: "7 Labels That Built",
  niche: "Music/Rappers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1oRRCF42fQaLbfD93jh04D0qwIpRC2tAB&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "a-day-to-remember",
  type: "scriptwriting",
  title: "A Day To Remember",
  niche: "Music/Rappers",
  client: "Pop Punk & Emo True Stories YT",
  doc: "https://drive.google.com/open?id=1qgomUiw598D_jyeS25YQW3URcdq1IOLy&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "motion-city-sound-track",
  type: "scriptwriting",
  title: "Motion City Sound Track",
  niche: "Music/Rappers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1YGzoDyrH8N5TbfSZL8fcAiSjQpZcHLcs&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "bat-out-of-hell-meat-loaf-s-bankruptcy-bout",
  type: "scriptwriting",
  title: "Bat Out of Hell: Meat Loaf's Bankruptcy Bout",
  niche: "Music/Rappers",
  client: "Festival Folklore YT",
  doc: "https://drive.google.com/open?id=1avUf9Jv-dPqeMfVwBEwLxAq25PRWXxWT&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "courtney-love-swindled-at-of-millions",
  type: "scriptwriting",
  title: "Courtney Love SWINDLED at of millions",
  niche: "Music/Rappers",
  client: "Festival Folklore YT",
  doc: "https://drive.google.com/open?id=1XFozyH1j9BK2sNGPnt7kkn1dADDG7Gah&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "dolly-parton",
  type: "scriptwriting",
  title: "Dolly Parton",
  niche: "Music/Rappers",
  client: "Festival Folklore YT",
  doc: "https://drive.google.com/open?id=1sYiuPBPu71quYvwupk0XKLJSx3ztJM3T&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "eminem-and-the-art-of-lyrical-warfare-2",
  type: "scriptwriting",
  title: "Eminem & the Art of Lyrical Warfare",
  niche: "Music/Rappers",
  client: "Festival Folklore YT",
  doc: "https://drive.google.com/open?id=1Wh3oyNjwWTNuWLWHN0TGA-_M62lqBjSt&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "how-mick-fleetwood-went-broke",
  type: "scriptwriting",
  title: "How Mick FLEETWOOD went broke",
  niche: "Music/Rappers",
  client: "Festival Folklore YT",
  doc: "https://drive.google.com/open?id=10q44vCnGcjjawh_ZQ4LiTSqcsSrplgfQ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "how-nirvana-changed-music-forever",
  type: "scriptwriting",
  title: "How Nirvana Changed Music Forever",
  niche: "Music/Rappers",
  client: "Festival Folklore YT",
  doc: "https://drive.google.com/open?id=1cuF1GueAGGG4eSsYluILnaCfz_dQZ4Uz&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "scandalous-diddy-second-entry",
  type: "scriptwriting",
  title: "Scandalous Diddy (second entry)",
  niche: "Music/Rappers",
  client: "Festival Folklore YT",
  doc: "https://drive.google.com/open?id=1zb3TSwGbBrOW8c9sIrZr4A4pXMTvOONb&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "shocking-facts-about-eric-clapton-you-didn-t-know",
  type: "scriptwriting",
  title: "SHOCKING Facts about Eric Clapton you didn't know",
  niche: "Music/Rappers",
  client: "Festival Folklore YT",
  doc: "https://drive.google.com/open?id=1RCWmzx0-dAdX943Bn-PbMNrw0xk11htM&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "the-enigma-of-prince-from-child-prodigy-to-opioid-tragedy-mu",
  type: "scriptwriting",
  title: "The Enigma of Prince: From Child Prodigy to Opioid Tragedy – Music Legend Revealed",
  niche: "Music/Rappers",
  client: "Festival Folklore YT",
  doc: "https://drive.google.com/open?id=13401Uml6-bTlEudBihvn6Q3_oS1bHUyB&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "who-killed-king-of-pop-michael-jackson",
  type: "scriptwriting",
  title: "Who Killed KING of Pop: Michael Jackson",
  niche: "Music/Rappers",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1Rq5191dcSBfH3BUZTsmEJ75nGZ8wh3Ul&usp=drive_copy",
  image: "https://drive.google.com/file/d/1Bqh62X5uf-aMHaFFx-0-AlX6mG-_Dy19/view?usp=sharing",
},

{
  id: "boomerang-meteorite",
  type: "scriptwriting",
  title: "Boomerang Meteorite",
  niche: "Space",
  client: "Spaced Out SC",
  doc: "https://drive.google.com/open?id=1V6OtMYNDhQt6Kba75k-AKKnsslVtfIjA&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XJIMmIV-y6WXxN5FeJiIyfre8da9LslJ/view?usp=sharing",
},

{
  id: "aliens-watching-us",
  type: "scriptwriting",
  title: "Aliens Watching Us",
  niche: "Space",
  client: "Spaced Out SC",
  doc: "https://drive.google.com/open?id=1TsnB0tyzTnL23BYjWYjpzDJyhCBuRRNj&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XJIMmIV-y6WXxN5FeJiIyfre8da9LslJ/view?usp=sharing",
},

{
  id: "james-webb-telescope",
  type: "scriptwriting",
  title: "James Webb Telescope",
  niche: "Space",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1UUIRugqp2dWfo9DzbRMhEfruhHiHCJJy&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XJIMmIV-y6WXxN5FeJiIyfre8da9LslJ/view?usp=sharing",
},

{
  id: "milky-way-aliens",
  type: "scriptwriting",
  title: "Milky Way Aliens",
  niche: "Space",
  client: "Spaced Out SC",
  doc: "https://drive.google.com/open?id=14treb0Xc_fUaNkQT4XtIEp_OEwj-pb8-&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XJIMmIV-y6WXxN5FeJiIyfre8da9LslJ/view?usp=sharing",
},

{
  id: "mysterious-blinking-light",
  type: "scriptwriting",
  title: "Mysterious Blinking Light",
  niche: "Space",
  client: "Spaced Out SC",
  doc: "https://drive.google.com/open?id=1fmQKLxOeoFhLsdoeSPrJHObHeNUq3-HV&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XJIMmIV-y6WXxN5FeJiIyfre8da9LslJ/view?usp=sharing",
},

{
  id: "mysterious-space-object",
  type: "scriptwriting",
  title: "Mysterious Space Object",
  niche: "Space",
  client: "Spaced Out SC",
  doc: "https://drive.google.com/open?id=1qFBRozb1S3feOl9NwjkLqJz3KkSSv51u&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XJIMmIV-y6WXxN5FeJiIyfre8da9LslJ/view?usp=sharing",
},

{
  id: "space-makes-you-sick",
  type: "scriptwriting",
  title: "Space Makes You Sick",
  niche: "Space",
  client: "Spaced Out SC",
  doc: "https://drive.google.com/open?id=10dpSTZbFLGf9iOVcJskOV9PRxSspFeBP&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XJIMmIV-y6WXxN5FeJiIyfre8da9LslJ/view?usp=sharing",
},

{
  id: "takeaways-from-govt-s-space-hearing",
  type: "scriptwriting",
  title: "Takeaways From Govt’s Space Hearing",
  niche: "Space",
  client: "Spaced Out SC",
  doc: "https://drive.google.com/open?id=1ieIe9cSFdaWQxE3Ezq2OxAjF2ovyx_IF&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XJIMmIV-y6WXxN5FeJiIyfre8da9LslJ/view?usp=sharing",
},

{
  id: "what-happens-if-you-die-in-space",
  type: "scriptwriting",
  title: "What Happens If You Die In Space",
  niche: "Space",
  client: "Spaced Out SC",
  doc: "https://drive.google.com/open?id=1ya4XzZnwnAVVsLPMGjSaTX-xU1W9WhQh&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XJIMmIV-y6WXxN5FeJiIyfre8da9LslJ/view?usp=sharing",
},

{
  id: "white-holes",
  type: "scriptwriting",
  title: "White Holes",
  niche: "Space",
  client: "NDA",
  doc: "https://drive.google.com/open?id=194-twqsRRn-SWo-ZlFdozXaj7Y0Fc_bd&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XJIMmIV-y6WXxN5FeJiIyfre8da9LslJ/view?usp=sharing",
},

{
  id: "5-subliminal-messages-in-disney-movies",
  type: "scriptwriting",
  title: "5 Subliminal Messages in Disney Movies",
  niche: "Movies",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1h-2o0pUsJqFG95-KL6Z94exgz-xh0AHjTalQeL3CeBY&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "every-blockbuster-movie-leaked-by-hackers",
  type: "scriptwriting",
  title: "Every Blockbuster Movie Leaked By Hackers",
  niche: "Movies",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1Wy2aUr2bt55GYKECF-_zE-zuFlN53-g_9zKbtXqZLWM&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "haunted-movie-sets",
  type: "scriptwriting",
  title: "Haunted Movie Sets",
  niche: "Movies",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1UdjAokBhs1slxfPJ6BAabLp5GeCcPlKSSOUTi1Fr7Ck&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "minecraft-movie",
  type: "scriptwriting",
  title: "Minecraft movie",
  niche: "Movies",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1txNiPLTywXPqI4ZQ4y6tLK4eG8cohp4f&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "paranormal-documentaries",
  type: "scriptwriting",
  title: "Paranormal Documentaries",
  niche: "Movies",
  client: "The Unknown SC",
  doc: "https://drive.google.com/open?id=1X92o65I0BlKPzYBajuqtetYVZsdAO5KwTYSNWqGgRIM&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "the-secretary",
  type: "scriptwriting",
  title: "The Secretary",
  niche: "Movies",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1eaEyoi7DBjtoYHaDwbQsVcLnvel7_shj&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "the-hidden-faces-of-the-k-pop-industry-what-k-pop-demon-hunt",
  type: "scriptwriting",
  title: "The Hidden Faces of the K-pop Industry: What K-Pop Demon Hunters Is Really Saying About Idols",
  niche: "Movies",
  client: "KPOP Demon Hunters Fanclub YT",
  doc: "https://drive.google.com/open?id=1kk89xULPKyoIeYpzjZJ6uMFEw0Jx6t_o&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "rumi-s-secret-symbolism-explained-the-real-meaning-behind-he",
  type: "scriptwriting",
  title: "Rumi's Secret Symbolism Explained: The Real Meaning Behind Her Demons",
  niche: "Movies",
  client: "KPOP Demon Hunters Fanclub YT",
  doc: "https://drive.google.com/open?id=1F2NFp5mn_PGCLOlWcRfusZTaNQg4Xa0G&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "easter-eggs-and-hidden-references-in-k-pop-demon-hunters-you",
  type: "scriptwriting",
  title: "Easter Eggs & Hidden References in K-pop Demon Hunters You Probably Missed",
  niche: "Movies",
  client: "KPOP Demon Hunters Fanclub YT",
  doc: "https://drive.google.com/open?id=1uy2qly0gEtvh5YXHChFFHb9uL7b7OzjJ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "k-pop-meets-korean-mythology-the-real-stories-behind-the-dem",
  type: "scriptwriting",
  title: "K-pop Meets Korean Mythology: The Real Stories Behind the Demons",
  niche: "Movies",
  client: "KPOP Demon Hunters Fanclub YT",
  doc: "https://drive.google.com/open?id=1T0vZja_piohLM7go9MFot-500QvaeehY&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "the-k-pop-demon-hunters-soundtrack-explained-every-hidden-me",
  type: "scriptwriting",
  title: "The K-pop Demon Hunters Soundtrack EXPLAINED – Every Hidden Message in the Lyrics",
  niche: "Movies",
  client: "KPOP Demon Hunters Fanclub YT",
  doc: "https://drive.google.com/open?id=12CIXO518Upx1ZUY3qLb73TuajKaGvuVy&usp=drive_copy",
  image: "https://drive.google.com/file/d/1TPeF9nncnuaNuemBc-ZLVot46TkNp_oN/view?usp=sharing",
},

{
  id: "ethereum-2-0-upgrade-and-why-you-should-be-prepared-for-it",
  type: "scriptwriting",
  title: "Ethereum 2.0 Upgrade and Why You Should Be Prepared For It",
  niche: "Finance",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1RqvCb54j4BMNwCH2IA-aib4SL8NkskWz&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "xrp-cryptocurrency",
  type: "scriptwriting",
  title: "XRP - Cryptocurrency",
  niche: "Finance",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1oFXqqN052KSX9u61o2UtDeR2Tm4eTE-r&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "the-64-billion-downfall-of-dubailand-here-s-what-happened",
  type: "scriptwriting",
  title: "The $64 Billion Downfall Of Dubailand: Here's What Happened...",
  niche: "Finance",
  client: "Astonishing Builds YT",
  doc: "https://drive.google.com/open?id=1vPtrxS-lPnNoDvXbIfOfkYC22hze3gPO&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "the-french-taxes-crisis-are-we-working-just-to-survive",
  type: "scriptwriting",
  title: "The French Taxes Crisis: Are We Working Just to Survive",
  niche: "Finance",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1TSqy3BB_VWNTCzFK9QgM6G4J0RuJyHoJ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "why-has-tesla-s-stock-price-skyrocketed",
  type: "scriptwriting",
  title: "Why has Tesla's stock price skyrocketed",
  niche: "Finance",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1rrkd-1w7GkV0nOcDnyqP_DIHfffPdgxq&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "why-you-ll-never-be-rich-working-for-someone-else-the-truth",
  type: "scriptwriting",
  title: "Why You'll Never Be Rich Working for Someone Else: The Truth About the 9-to-5.",
  niche: "Finance",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1bgSljT2WPHVgMcn_7x_VIcUR2qUfCiSJ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "3-major-projects-completing-in-2024-2",
  type: "scriptwriting",
  title: "3 major projects completing in 2024",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1XrkZjzKnRgP1UxJLUnUH3iaKl8MeQCpQ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "the-10-regions-that-are-building-of-neom-city-in-saudi-arabi-2",
  type: "scriptwriting",
  title: "The 10 regions that are building of Neom city in Saudi Arabia.",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1lgY523SOlNHGR-VcaMvVh305vAuixtBT&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "10-dam-failures-2",
  type: "scriptwriting",
  title: "10 Dam Failures",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1_gGY5XQr5a8LuA7Ma5zfsmp8Kv1K0mpb&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "2024-olympic-games-in-paris-2",
  type: "scriptwriting",
  title: "2024 Olympic Games in Paris",
  niche: "Finance",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1-90tByR-yvjSZe5qSBhRT0IGWgPbikOX&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "elt-telescope-2",
  type: "scriptwriting",
  title: "ELT telescope",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1S4o6coKcjIt4Z4vSdTUJv4CWP_5Ktzd3&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "francis-scott-key-bridge-2",
  type: "scriptwriting",
  title: "Francis Scott Key Bridge",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=111g4noQWKjF-pfJJLqHbZ-v_jkiHCtas&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "kansai-airport-in-japan-is-sinking-2",
  type: "scriptwriting",
  title: "Kansai airport in japan is sinking",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1MDgTKA4YKEwWqQ_AaNZ8S47qU4TsLuX7&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "leyja-neom-region-2",
  type: "scriptwriting",
  title: "Leyja, Neom Region",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1RYdBHa3t8jmAc0oJDzWtbUz02EotTkgP&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "male-2",
  type: "scriptwriting",
  title: "Malè",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1T3Ajj_kjySGPXpztW6F1fm4aJPeJWuAZ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "polimeropolis-city-2",
  type: "scriptwriting",
  title: "Polimeropolis city",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1-UN0_jaTSps8e8IysT66BZC30dcxbTxy&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "saudi-arabia-s-linear-park-project-2",
  type: "scriptwriting",
  title: "Saudi Arabia's linear park project",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1eKVYq_VvvooHxUbyOVTLkVoZN8O2jJ-M&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "sisi-the-new-capital-of-egypt-2",
  type: "scriptwriting",
  title: "Sisi, the new capital of Egypt",
  niche: "Finance",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1eqq2xUdHncpyggZmYOvQLsiPc8wSntSm&usp=drive_copy",
  image: "https://drive.google.com/file/d/1UZm2uG211oss9T6wokrWt491ubzc0ucn/view?usp=sharing",
},

{
  id: "10-best-motorcycles-of-2024",
  type: "scriptwriting",
  title: "10 Best Motorcycles of 2024",
  niche: "Bikes",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1M9-jGSKm45fHxEBZfMzahx1uYkdB476z&usp=drive_copy",
  image: "https://drive.google.com/file/d/1RavAKOg7p3z1V6x_QVASHlY0YBMh0Y_6/view?usp=sharing",
},

{
  id: "10-best-beginner-motorcycles",
  type: "scriptwriting",
  title: "10 Best Beginner Motorcycles",
  niche: "Bikes",
  client: "Moto Madness YT",
  doc: "https://drive.google.com/open?id=16dmWTghFVcMzM-XouDwq4lCqMJbOrelE&usp=drive_copy",
  image: "https://drive.google.com/file/d/1RavAKOg7p3z1V6x_QVASHlY0YBMh0Y_6/view?usp=sharing",
},

{
  id: "10-best-motorcycles-of-the-1970-s",
  type: "scriptwriting",
  title: "10 Best Motorcycles of the 1970's",
  niche: "Bikes",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1KZAiioYQV_22pRzRfSDBlqs0WAStTT3N&usp=drive_copy",
  image: "https://drive.google.com/file/d/1RavAKOg7p3z1V6x_QVASHlY0YBMh0Y_6/view?usp=sharing",
},

{
  id: "10-most-rarest-motorcycles",
  type: "scriptwriting",
  title: "10 Most Rarest Motorcycles",
  niche: "Bikes",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1--6x-iCyrtNIiMujSHVrBLgF5V36sPzR&usp=drive_copy",
  image: "https://drive.google.com/file/d/1RavAKOg7p3z1V6x_QVASHlY0YBMh0Y_6/view?usp=sharing",
},

{
  id: "10-worst-motorcycles-from-the-70-s",
  type: "scriptwriting",
  title: "10 Worst Motorcycles From The 70's",
  niche: "Bikes",
  client: "VintageVroom YT",
  doc: "https://drive.google.com/open?id=18woHQxsd8F1uXPiwoHnDDRZiyp4ubQ4J&usp=drive_copy",
  image: "https://drive.google.com/file/d/1RavAKOg7p3z1V6x_QVASHlY0YBMh0Y_6/view?usp=sharing",
},

{
  id: "13-motorcycles-with-a-reputation-for-unmatched-durability",
  type: "scriptwriting",
  title: "13 Motorcycles with a Reputation for Unmatched Durability",
  niche: "Bikes",
  client: "VintageVroom YT",
  doc: "https://drive.google.com/open?id=1dUnjuvimIY_sB_AfJA3qbU2sRBc43eph&usp=drive_copy",
  image: "https://drive.google.com/file/d/1RavAKOg7p3z1V6x_QVASHlY0YBMh0Y_6/view?usp=sharing",
},

{
  id: "13-worst-motorcycles-from-1950-60s-no-one-wants-back",
  type: "scriptwriting",
  title: "13 Worst Motorcycles from 1950_60s No one Wants Back",
  niche: "Bikes",
  client: "VintageVroom YT",
  doc: "https://drive.google.com/open?id=19evsar0ei-2LiJxqpD9-Gv0VCZi0t_ST&usp=drive_copy",
  image: "https://drive.google.com/file/d/1RavAKOg7p3z1V6x_QVASHlY0YBMh0Y_6/view?usp=sharing",
},

{
  id: "best-motorcycles-in-history",
  type: "scriptwriting",
  title: "Best Motorcycles In History",
  niche: "Bikes",
  client: "VintageVroom YT",
  doc: "https://drive.google.com/open?id=1lyGfVx8myNbBsfbMdPJHy5vuYCSVBpcf&usp=drive_copy",
  image: "https://drive.google.com/file/d/1RavAKOg7p3z1V6x_QVASHlY0YBMh0Y_6/view?usp=sharing",
},

{
  id: "fastest-motorcycles-ever-made",
  type: "scriptwriting",
  title: "Fastest Motorcycles Ever Made",
  niche: "Bikes",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1vYUVQPuO9-5Er-1FMZsaaP8gu8MyjhA3&usp=drive_copy",
  image: "https://drive.google.com/file/d/1RavAKOg7p3z1V6x_QVASHlY0YBMh0Y_6/view?usp=sharing",
},

{
  id: "why-these-top-10-german-vintage-motorcycles-are-legendary",
  type: "scriptwriting",
  title: "Why these TOP 10 german vintage motorcycles are legendary",
  niche: "Bikes",
  client: "VintageVroom YT",
  doc: "https://drive.google.com/open?id=1_PYUUDiE1bj3B3oari4m3rNpIciL4I63&usp=drive_copy",
  image: "https://drive.google.com/file/d/1RavAKOg7p3z1V6x_QVASHlY0YBMh0Y_6/view?usp=sharing",
},

{
  id: "77-3k-subs-in-4-weeks-this-faceless-niche-will-shock-you",
  type: "scriptwriting",
  title: "77.3K Subs in 4 Weeks: This Faceless Niche Will Shock You",
  niche: "AI/AI Tools",
  client: "NDA",
  doc: "https://drive.google.com/open?id=14jdhaj-gf8KDk7NqyKYDD5AbRC5rDf7I&usp=drive_copy",
  image: "https://drive.google.com/file/d/1gP9kPR-3jfc0k90Zyt8E6AneNTKHef6D/view?usp=sharing",
},

{
  id: "how-faceless-creators-are-getting-paid-to-make-ai-videos-for",
  type: "scriptwriting",
  title: "How Faceless Creators Are Getting Paid to Make AI Videos for Brands",
  niche: "AI/AI Tools",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1djLffNWeWafhDR1CnCkcGdZD1MX65Ah_&usp=drive_copy",
  image: "https://drive.google.com/file/d/1gP9kPR-3jfc0k90Zyt8E6AneNTKHef6D/view?usp=sharing",
},

{
  id: "how-i-built-a-faceless-ai-animation-studio-with-one-tool",
  type: "scriptwriting",
  title: "How I Built a Faceless AI Animation Studio With One Tool",
  niche: "AI/AI Tools",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1RwcLLbvX9scrv85Vd8B1_OnDJcYaEtpg&usp=drive_copy",
  image: "https://drive.google.com/file/d/1gP9kPR-3jfc0k90Zyt8E6AneNTKHef6D/view?usp=sharing",
},

{
  id: "how-i-make-professional-ai-animations-for-faceless-videos-st",
  type: "scriptwriting",
  title: "How I Make Professional AI Animations for Faceless Videos (Step by Step)",
  niche: "AI/AI Tools",
  client: "Dzine",
  doc: "https://drive.google.com/open?id=1_a2WHewbZ5DZRsz1WR1JeQrPSiHrpjEu&usp=drive_copy",
  image: "https://drive.google.com/file/d/1gP9kPR-3jfc0k90Zyt8E6AneNTKHef6D/view?usp=sharing",
},

{
  id: "i-found-a-faceless-niche-nobody-is-doing-576k-views-13-video",
  type: "scriptwriting",
  title: "I Found a Faceless Niche Nobody Is Doing — 576K Views, 13 Videos",
  niche: "AI/AI Tools",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1vvMZoyMekd0Z-uyW572lCwCANi6H6TJF&usp=drive_copy",
  image: "https://drive.google.com/file/d/1gP9kPR-3jfc0k90Zyt8E6AneNTKHef6D/view?usp=sharing",
},

{
  id: "invideo-ai-review-2025-ai-videos-for-youtube-automation-is-h",
  type: "scriptwriting",
  title: "InVideo AI Review 2025 – AI videos for YouTube Automation is HERE!",
  niche: "AI/AI Tools",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1lo_eIL1zeZ_T99tr8pTxCzlg2UoYKjoM&usp=drive_copy",
  image: "https://drive.google.com/file/d/1gP9kPR-3jfc0k90Zyt8E6AneNTKHef6D/view?usp=sharing",
},

{
  id: "it-s-insane",
  type: "scriptwriting",
  title: "It's Insane! \"AI Worse Threat Than Nukes!\" – Elon Musk",
  niche: "AI/AI Tools",
  client: "Motech YT",
  doc: "https://drive.google.com/open?id=1kdOjFAD1uKNMuK6idEjK4NgPkPI6WQSX&usp=drive_copy",
  image: "https://drive.google.com/file/d/1gP9kPR-3jfc0k90Zyt8E6AneNTKHef6D/view?usp=sharing",
},

{
  id: "we-let-an-ai-control-our-smart-home-for-24-hours-you-won-t-b",
  type: "scriptwriting",
  title: "We Let an AI Control Our Smart Home for 24 Hours—You Won't Believe What It Did!",
  niche: "AI/AI Tools",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1TR7oL5HD50weCTnJ2N5lB2xQsJGeCIsF&usp=drive_copy",
  image: "https://drive.google.com/file/d/1gP9kPR-3jfc0k90Zyt8E6AneNTKHef6D/view?usp=sharing",
},

{
  id: "yan-yee-storyboard-1",
  type: "scriptwriting",
  title: "Yan-Yee Storyboard 1",
  niche: "UGC Content",
  client: "HiAgency-TikTok",
  doc: "https://drive.google.com/open?id=1CZWP7bdkLSsduMRA3mPpm0fs-dFgXucf&usp=drive_copy",
  image: "https://drive.google.com/file/d/1IA8rbyBRtOB8-yopNcUcbhxwN8gDtiRV/view?usp=sharing",
},

{
  id: "vozara-storyboard",
  type: "scriptwriting",
  title: "Vozara Storyboard",
  niche: "UGC Content",
  client: "Creator Liz HiAgency-TikTok",
  doc: "https://drive.google.com/open?id=1CzDC9ldmIsALJ_SQt0Fab5IHjB2XmiPg&usp=drive_copy",
  image: "https://drive.google.com/file/d/1IA8rbyBRtOB8-yopNcUcbhxwN8gDtiRV/view?usp=sharing",
},

{
  id: "the-vitamin-club-fernanda",
  type: "scriptwriting",
  title: "The Vitamin Club Fernanda",
  niche: "UGC Content",
  client: "HiAgency-TikTok",
  doc: "https://drive.google.com/open?id=1oDwtkoV1YypOu1cDTWEF57fQkiptA0vZ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1IA8rbyBRtOB8-yopNcUcbhxwN8gDtiRV/view?usp=sharing",
},

{
  id: "customenvy-storyboard",
  type: "scriptwriting",
  title: "Customenvy Storyboard",
  niche: "UGC Content",
  client: "Creator Emmalese HiAgency-TikTok",
  doc: "https://drive.google.com/open?id=1BAxnYU7Cvi0Z0Ca5uzaREF9l3Xk6tzMk&usp=drive_copy",
  image: "https://drive.google.com/file/d/1IA8rbyBRtOB8-yopNcUcbhxwN8gDtiRV/view?usp=sharing",
},

{
  id: "monarch-storyboard",
  type: "scriptwriting",
  title: "Monarch Storyboard",
  niche: "UGC Content",
  client: "Creator Grace HiAgency-TikTok",
  doc: "https://drive.google.com/open?id=1VJ7G01XZstZDwXs16EdTqmFZGN-94so8&usp=drive_copy",
  image: "https://drive.google.com/file/d/1IA8rbyBRtOB8-yopNcUcbhxwN8gDtiRV/view?usp=sharing",
},

{
  id: "monarch-storyboard-2",
  type: "scriptwriting",
  title: "Monarch Storyboard",
  niche: "UGC Content",
  client: "Creator Jordan HiAgency-TikTok",
  doc: "https://drive.google.com/open?id=19QjkQui_71DRzyx13wS13m3g0RwJ_Sv7&usp=drive_copy",
  image: "https://drive.google.com/file/d/1IA8rbyBRtOB8-yopNcUcbhxwN8gDtiRV/view?usp=sharing",
},

{
  id: "open-goaal-storyboard-2",
  type: "scriptwriting",
  title: "Open Goaal Storyboard 2",
  niche: "UGC Content",
  client: "HiAgency-TikTok",
  doc: "https://drive.google.com/open?id=1EARGYc7_9IYu45h7ypXWIiuzo0xTy0wT&usp=drive_copy",
  image: "https://drive.google.com/file/d/1IA8rbyBRtOB8-yopNcUcbhxwN8gDtiRV/view?usp=sharing",
},

{
  id: "top-5-richest-criminals-of-all-time",
  type: "scriptwriting",
  title: "Top 5 Richest Criminals Of All Time",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1H3Tfwn1Pyx9xf8oXyyHFzC3EOUiOEQBN&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "5-most-mysterious-and-highly-forbidden-places-on-the-planet",
  type: "scriptwriting",
  title: "5 Most Mysterious and HIGHLY Forbidden Places on The Planet",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1gm_F6ze3O_a1_LgXv3rG-CAuzI396A2O&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "5-people-who-survived-the-impossible",
  type: "scriptwriting",
  title: "5 People Who Survived The Impossible",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1g8-dzbrXT5yqIHbYj4g9qWvNq-NO04RT&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "6-craziest-simpsons-predictions-ever",
  type: "scriptwriting",
  title: "6 Craziest Simpsons predictions ever",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1W5d0iD3lOrPZeOdWnIaeu098hpTrCyD-&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "10-dumbest-criminals-of-all-time",
  type: "scriptwriting",
  title: "10 Dumbest Criminals Of All Time",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1CUmGeG7QeQpc4bPZNR_-jYNLCAYvVpDZ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "20-actors-who-did-the-most-despicable-things-and-ruined-thei",
  type: "scriptwriting",
  title: "20 Actors Who Did The Most Despicable Things And Ruined Their Careers",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=13zkPTrH5k7AxnDA25nobOZfFL2jCQeOs&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-celebrities-who-went-broke",
  type: "scriptwriting",
  title: "Top 5 Celebrities Who Went Broke",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1pCg7sVZRLsm2wGXZfyXjgOrlPYxNyre4&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-teenagers-who-freaked-out-after-given-a-life-sentence",
  type: "scriptwriting",
  title: "Top 5 Teenagers Who Freaked Out After Given A Life Sentence",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1a7M38GJWbezG5uxxxJH6jvFRflRZLm5J&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-10-most-dramatic-footage-of-natural-disasters-caught-on",
  type: "scriptwriting",
  title: "Top 10 Most Dramatic Footage of Natural Disasters Caught on Camera",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1gBg5vM_WXQ0PVK58MKm7oVZp4d6hkLx9&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-volleyball-saves-of-2025",
  type: "scriptwriting",
  title: "Top 5 Volleyball Saves of 2025",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1kjCn3igDzt967yzmR73NxkKgqxwmH0gLT5pXZtYLlKM&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-most-initiminating-nfl-fanbases",
  type: "scriptwriting",
  title: "Top 5 Most Initiminating NFL Fanbases",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1fVkTcujj_Gr4R6tS_X5QgwXyJ-KP69L1N_pN3WgteAU&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-x-experiences-in-tokyo-for-first-timers",
  type: "scriptwriting",
  title: "Top X Experiences in Tokyo for First-Timers",
  niche: "Listicles",
  client: "Be There Sometime YT",
  doc: "https://drive.google.com/open?id=1sfBtublt2wjMfQ88snTqe2qJH7mGiNx4&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "how-i-make-professional-ai-animations-for-faceless-videos-st-2",
  type: "scriptwriting",
  title: "How I Make Professional AI Animations for Faceless Videos (Step by Step)",
  niche: "Listicles",
  client: "Dzine",
  doc: "https://drive.google.com/open?id=1w_swQ6WFCqn9bXLjh9RXbgIGY9B2K4DttOEcTPTtX-A&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "5-powerful-fruits-to-renew-your-kidneys",
  type: "scriptwriting",
  title: "5 Powerful Fruits to Renew your Kidneys",
  niche: "Listicles",
  client: "FREShealing YT",
  doc: "https://drive.google.com/open?id=1Yv7htuXrd8ilW1RnleP5cR8ykwOSnu1vjivT6_GFLNI&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-ten-prohibited-secret-area-no-human-is-allowed-to-visit",
  type: "scriptwriting",
  title: "Top Ten Prohibited / Secret Area No Human Is Allowed To Visit",
  niche: "Listicles",
  client: "Motech YT",
  doc: "https://drive.google.com/open?id=1C0TrD3ZaWpCnwUiECAJiyNmvk_lWlAnpvT0Ns-D0T_c&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "5-ways-marvel-could-ruin-doctor-doom-and-why-they-must-avoid",
  type: "scriptwriting",
  title: "5 Ways Marvel Could Ruin Doctor Doom, And Why They Must Avoid Them",
  niche: "Listicles",
  client: "TMI YT",
  doc: "https://drive.google.com/open?id=1T8F-H5WFCg6xvOqfiZYFct1k0v9R-KSFSm1khTMhgfg&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-embarrassing-hacks-against-influencers-and-celebrities",
  type: "scriptwriting",
  title: "Top 5 Embarrassing Hacks Against Influencers & Celebrities",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1ELgnyZJe4Bnu3rBBUJcOq_EZZ4OS0ojMOKToFC4ViGY&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "5-worst-and-7-best-sedans-to-buy-in-2025",
  type: "scriptwriting",
  title: "5 worst and 7 best sedans to buy in 2025",
  niche: "Listicles",
  client: "Full Car Care YT",
  doc: "https://drive.google.com/open?id=13SCc978BnSg4_-LhXtDOrIkwerVsS2_HayFO3hGoXO8&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-teenagers-who-freaked-out-after-given-a-life-sentence-2",
  type: "scriptwriting",
  title: "Top 5 Teenagers Who Freaked Out After Given A Life Sentence (second entry)",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1wDel16j9UvmBJcTu1w0uAmU3L90uxnNJtLmZmYTRjg0&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-foods-banned-around-the-world-part-1",
  type: "scriptwriting",
  title: "Top 5 Foods banned around the world! Part-1",
  niche: "Listicles",
  client: "History YT Shorts",
  doc: "https://drive.google.com/open?id=1Xw5FeP__EraZyMxjDMzlg_c8Gw3xMAtQb1xv1zeEkd8&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-foods-banned-around-the-world-part-2",
  type: "scriptwriting",
  title: "Top 5 Foods banned around the world! Part-2",
  niche: "Listicles",
  client: "History YT Shorts",
  doc: "https://drive.google.com/open?id=1pF8YMVQB_udHpkQqJuQhdadIOrZuoVVr1DmPmhD9o8A&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-richest-criminals-of-all-time-second-entry",
  type: "scriptwriting",
  title: "Top 5 Richest Criminals Of All Time (second entry)",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1ORSrhGW9Hs7cby3S0rp9OE_htNon-swGuClDkk-A-vs&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "the-top-5-most-successful-scams-in-history-part-2-james-free",
  type: "scriptwriting",
  title: "The top 5 most successful scams in history - Part 2 - James Freeman - Crime 101",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=13bjo_woubap7bnVK9-CqFreUXfW1-6nWTor1N8PHsn4&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-worst-cult-leaders-isabelle-murphy-stanley-humanity-yo",
  type: "scriptwriting",
  title: "Top 5 Worst Cult Leaders - Isabelle Murphy-Stanley - Humanity Youtube",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1IuqnADkKZkx7Kj182o9zVESVnveaEYdCoXwvCBYYEeA&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-mob-hitmen",
  type: "scriptwriting",
  title: "Top 5 Mob Hitmen",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1BxTyBWczcnDboryPSqOq2Gt9ajQ_v0fC&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-5-most-evil-kids-in-history",
  type: "scriptwriting",
  title: "Top 5 Most Evil Kids in History",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1Uek8NZWJwGsTLs8LS_Rxir6kFFgyF8XtZWGjDBWLgLw&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "court-cam-top-5-most-shocking-outbursts",
  type: "scriptwriting",
  title: "Court Cam Top 5 Most Shocking Outbursts",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1LCSmzEzhXTWUXHJLi9c9yAZZtDRUC9qB&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "the-top-5-most-successful-scams-in-history-crime-101-james-f",
  type: "scriptwriting",
  title: "The top 5 most successful scams in history - Crime 101 - James Freeman",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1y0rX7CMUhR1Vrzm3iozGXNEhOWT-C69KZeTL54qUBGE&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "5-players-who-changed-volleyball-in-2024",
  type: "scriptwriting",
  title: "5 Players Who Changed Volleyball in 2024",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1qN67vDv9vj_13bQMITOLr3IL-KQtfQE2yguETMh63Bk&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "10-best-features-of-the-new-2026-mazda-cx-5",
  type: "scriptwriting",
  title: "10 Best Features Of The NEW 2026 Mazda CX-5",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1hi5jzgr3pMbu8dwrW4QFYk0X9I3qOCFHJfdDQvtOaMI&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "digital-journal-scripts",
  type: "scriptwriting",
  title: "Digital Journal Scripts",
  niche: "Listicles",
  client: "Zaryaab Trial",
  doc: "https://drive.google.com/open?id=1Yws752Rv4fDw0W3Z1GnMdaRddq5Qlq4LA2oCOi6nQpI&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-12-most-jaw-dropping-volleyball-rally-comebacks-of-2025",
  type: "scriptwriting",
  title: "Top 12 Most Jaw-Dropping Volleyball Rally Comebacks of 2025",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1W9RoMzMdY2bEK-4jebR0wr4dxIuZTFOXKQjrhFsqc08&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-10-most-innovative-construction-technologies-changing-th",
  type: "scriptwriting",
  title: "Top 10 Most Innovative Construction Technologies Changing The World",
  niche: "Listicles",
  client: "Astonishing Builds YT",
  doc: "https://drive.google.com/open?id=1K7cduyBZNiicbVpynnqRfOAyHgKOlpUyiB49Fi3zFfs&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-20-monster-blocks-by-volleyball-team-usa",
  type: "scriptwriting",
  title: "Top 20 monster blocks by Volleyball team USA",
  niche: "Listicles",
  client: "Volleyball Zone YT",
  doc: "https://drive.google.com/open?id=1yYXPAvUVAYsp_9dgAjNv88q1XSVHlcdACJvC1Vs4Pdo",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "electric-vehicles-in-canada",
  type: "scriptwriting",
  title: "Electric Vehicles in Canada",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1QiGHu8MglwIq9FZcKTo0NFW62tUvpekjZ-XdijTAxkY&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-10-nfl-careers-that-ended-in-chaos",
  type: "scriptwriting",
  title: "Top 10 NFL Careers That Ended in CHAOS",
  niche: "Listicles",
  client: "Pro Kickoff YT",
  doc: "https://drive.google.com/open?id=1sZbpt0COHkdD19CkH0S_KfP3Fs5HdzjPs2gk2TE10HM&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-10-nfl-rookie-seasons-of-all-time",
  type: "scriptwriting",
  title: "Top 10 NFL Rookie Seasons of all time",
  niche: "Listicles",
  client: "GridironPowerhouse YT",
  doc: "https://drive.google.com/open?id=1-98qI3zwzf0hYtNoYYP82Icy_LDvXEgx3gdoHl8Qyug&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "top-10-most-incredible-indian-megaprojects-2025",
  type: "scriptwriting",
  title: "Top 10 Most Incredible Indian Megaprojects 2025",
  niche: "Listicles",
  client: "Astonishing Builds YT",
  doc: "https://drive.google.com/open?id=1bQDYmiiJ255M2dskKVc_ExRrgGNPl8f3kaTXqqVn7pw&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},

{
  id: "5-disturbing-real-stories-behind-disney-fairy-tales",
  type: "scriptwriting",
  title: "5 Disturbing REAL STORIES Behind DISNEY Fairy Tales",
  niche: "Listicles",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1XQ2DFYTmpa7_w8NmQ_s8H_gc2RRfDsVa&usp=drive_copy",
  image: "https://drive.google.com/file/d/1LDKpoiScLPrjgiIfUBvKDw95xBjo5mBN/view?usp=sharing",
},


              {
  id: "10-war-freaks-that-actually-existed",
  type: "scriptwriting",
  title: "10 War Freaks That Actually Existed!",
  niche: "War History",
  client: "WAR DOCS YT",
  doc: "https://drive.google.com/open?id=1oqDp7YhLWyMwW2dvPkmrvotFr0jmNkqs&usp=drive_copy",
  image: "https://drive.google.com/file/d/176k6sZ9aNPMv9uu2uTZWvUftdT-guium/view?usp=sharing",
},

{
  id: "germany-s-secret-supertank-only-seen-twice-in-ww2",
  type: "scriptwriting",
  title: "Germany's Secret SuperTank Only Seen Twice in WW2",
  niche: "War History",
  client: "WAR DOCS YT",
  doc: "https://drive.google.com/open?id=1222r4D9o4VJDtdIITInP9AhvjB7pfRjx&usp=drive_copy",
  image: "https://drive.google.com/file/d/176k6sZ9aNPMv9uu2uTZWvUftdT-guium/view?usp=sharing",
},

{
  id: "how-vladimir-putin-makes-and-spends-his-billions",
  type: "scriptwriting",
  title: "How Vladimir Putin Makes and Spends His Billions",
  niche: "War History",
  client: "WAR DOCS YT",
  doc: "https://drive.google.com/open?id=16h_ffDTGkxeb1ncnBCgmmJGIpg0zqBdS&usp=drive_copy",
  image: "https://drive.google.com/file/d/176k6sZ9aNPMv9uu2uTZWvUftdT-guium/view?usp=sharing",
},

{
  id: "inside-treblinka-s-most-horrific-death-blocks",
  type: "scriptwriting",
  title: "Inside Treblinka's Most Horrific Death Blocks",
  niche: "War History",
  client: "WAR DOCS YT",
  doc: "https://drive.google.com/open?id=1kDlKzF7Avr1r6oZYj1HXjskRhxzmifkI&usp=drive_copy",
  image: "https://drive.google.com/file/d/176k6sZ9aNPMv9uu2uTZWvUftdT-guium/view?usp=sharing",
},

{
  id: "the-brutal-execution-of-helmuth-hubener-the-teenage-boy-exec",
  type: "scriptwriting",
  title: "The BRUTAL EXECUTION Of Helmuth Hübener - The Teenage Boy Executed By The Nazis",
  niche: "War History",
  client: "War Docs YT",
  doc: "https://drive.google.com/open?id=10g6uRZ4-xNx2Wz_cfIteyxuoNh3QT4Q9&usp=drive_copy",
  image: "https://drive.google.com/file/d/176k6sZ9aNPMv9uu2uTZWvUftdT-guium/view?usp=sharing",
},

{
  id: "the-brutal-executions-of-female-nazi-guards-from-the-worst-c",
  type: "scriptwriting",
  title: "The BRUTAL EXECUTIONS of Female Nazi Guards from the Worst Concentration Camps - WWII",
  niche: "War History",
  client: "WAR DOCS YT",
  doc: "https://drive.google.com/open?id=18W55kCPT44LkI8YZ1hE_Bzd4l5YyTnGB&usp=drive_copy",
  image: "https://drive.google.com/file/d/176k6sZ9aNPMv9uu2uTZWvUftdT-guium/view?usp=sharing",
},

{
  id: "the-horrific-torture-of-the-women-of-the-lidice-massacre",
  type: "scriptwriting",
  title: "The HORRIFIC Torture Of The Women Of The Lidice Massacre",
  niche: "War History",
  client: "WAR DOCS YT",
  doc: "https://drive.google.com/open?id=1gbyRNYY-_EQDwWVYCe4ewG_BojnsXarH&usp=drive_copy",
  image: "https://drive.google.com/file/d/176k6sZ9aNPMv9uu2uTZWvUftdT-guium/view?usp=sharing",
},

{
  id: "the-justified-executions-of-japanese-war-criminals-after-wwi",
  type: "scriptwriting",
  title: "The Justified EXECUTIONS of Japanese War Criminals After WWII",
  niche: "War History",
  client: "WAR DOCS YT",
  doc: "https://drive.google.com/open?id=1Zo3uYAo2A1VsZy9GGyDEZjYOY2I4kBQ-&usp=drive_copy",
  image: "https://drive.google.com/file/d/176k6sZ9aNPMv9uu2uTZWvUftdT-guium/view?usp=sharing",
},

{
  id: "the-most-horrible-traps-used-in-the-afghan-war",
  type: "scriptwriting",
  title: "The Most HORRIBLE TRAPS Used in The Afghan War",
  niche: "War History",
  client: "WAR DOCS YT",
  doc: "https://drive.google.com/open?id=1x3ZGeh26MSRZd9r960uojRwuAgAndqNs&usp=drive_copy",
  image: "https://drive.google.com/file/d/176k6sZ9aNPMv9uu2uTZWvUftdT-guium/view?usp=sharing",
},

{
  id: "what-did-allied-soldiers-do-with-japanese-women",
  type: "scriptwriting",
  title: "What Did Allied Soldiers Do With Japanese Women_",
  niche: "War History",
  client: "WAR DOCS YT",
  doc: "https://drive.google.com/open?id=1IgJNlJCpq9omeTy4mBA24xh35bvP5OJm&usp=drive_copy",
  image: "https://drive.google.com/file/d/176k6sZ9aNPMv9uu2uTZWvUftdT-guium/view?usp=sharing",
},
       {
  id: "6-most-dangerous-tourist-destinations-in-the-world",
  type: "scriptwriting",
  title: "6 Most Dangerous Tourist Destinations In The World",
  niche: "Travel/Tourism",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1lDToDfY5wyBLa9N4b-BT63MvKttiKk8C&usp=drive_copy",
  image: "https://drive.google.com/file/d/1u9pasfUy3vAORWaBytBgcFCIpv2QK7Gc/view?usp=sharing",
},

{
  id: "10-secrets-to-survive-long-haul-flights-in-2025-even-in-econ",
  type: "scriptwriting",
  title: "10 Secrets to SURVIVE Long-Haul Flights in 2025 (Even in Economy)",
  niche: "Travel/Tourism",
  client: "Transit Code YT",
  doc: "https://drive.google.com/open?id=13FDsiHWV-KICOqA6yHXNN7zmMqzXzZVQ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1u9pasfUy3vAORWaBytBgcFCIpv2QK7Gc/view?usp=sharing",
},

{
  id: "25-iconic-tourist-destinations-that-will-soon-disappear",
  type: "scriptwriting",
  title: "25 Iconic Tourist Destinations That Will Soon Disappear",
  niche: "Travel/Tourism",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1Lw5zLwxt92jwzvZSecAAUhrHUJYKgyDC&usp=drive_copy",
  image: "https://drive.google.com/file/d/1u9pasfUy3vAORWaBytBgcFCIpv2QK7Gc/view?usp=sharing",
},

{
  id: "best-places-to-visit-in-the-world-2024",
  type: "scriptwriting",
  title: "Best Places To Visit In The World 2024",
  niche: "Travel/Tourism",
  client: "Elite Dreaming YT",
  doc: "https://drive.google.com/open?id=1AJc03JO8FlXbnHn2Oq2hhAHW4O18OQGR&usp=drive_copy",
  image: "https://drive.google.com/file/d/1u9pasfUy3vAORWaBytBgcFCIpv2QK7Gc/view?usp=sharing",
},

{
  id: "best-things-to-do-in-tokyo-2023-episode-1",
  type: "scriptwriting",
  title: "Best Things to Do in Tokyo 2023 – Episode 1",
  niche: "Travel/Tourism",
  client: "Be There Sometime YT",
  doc: "https://drive.google.com/open?id=1R7pZeVcXcjfOJAHKkGWczRI65A66CYzW&usp=drive_copy",
  image: "https://drive.google.com/file/d/1u9pasfUy3vAORWaBytBgcFCIpv2QK7Gc/view?usp=sharing",
},

{
  id: "hoia-baciu-forest",
  type: "scriptwriting",
  title: "Hoia Baciu Forest",
  niche: "Travel/Tourism",
  client: "The Unknows SC",
  doc: "https://drive.google.com/open?id=1FyYtqUB7-3I4gbc6Fe81Gq70voTSnAv9&usp=drive_copy",
  image: "https://drive.google.com/file/d/1u9pasfUy3vAORWaBytBgcFCIpv2QK7Gc/view?usp=sharing",
},

{
  id: "the-10-regions-that-are-building-of-neom-city-in-saudi-arabi-3",
  type: "scriptwriting",
  title: "The 10 regions that are building of Neom city in Saudi Arabia.",
  niche: "Travel/Tourism",
  client: "Smart Buildings YT",
  doc: "https://drive.google.com/open?id=1n86q-5gC-sOtcvULrimlMRDFgFBObpq2&usp=drive_copy",
  image: "https://drive.google.com/file/d/1u9pasfUy3vAORWaBytBgcFCIpv2QK7Gc/view?usp=sharing",
},

{
  id: "top-x-experiences-in-tokyo-for-first-timers-2",
  type: "scriptwriting",
  title: "Top X Experiences in Tokyo for First-Timers",
  niche: "Travel/Tourism",
  client: "Be There Sometime YT",
  doc: "https://drive.google.com/open?id=1K4vGxN1J4zCdKE44en7ERBIZNGxBX_zN&usp=drive_copy",
  image: "https://drive.google.com/file/d/1u9pasfUy3vAORWaBytBgcFCIpv2QK7Gc/view?usp=sharing",
},

{
  id: "vid2-ethiopia-s-6-billion-airport-africa-s-largest-aviation",
  type: "scriptwriting",
  title: "VID2 Ethiopia’s $6 Billion Airport – Africa’s Largest Aviation Hub Set to Transform Global Travel",
  niche: "Travel/Tourism",
  client: "Urban Giants YT",
  doc: "https://drive.google.com/open?id=1Njl7m5_74BjMt4OTQ4BojJJ8qk_kZEQI&usp=drive_copy",
  image: "https://drive.google.com/file/d/1u9pasfUy3vAORWaBytBgcFCIpv2QK7Gc/view?usp=sharing",
},
       {
  id: "10-secrets-to-survive-long-haul-flights-in-2025-even-in-econ-2",
  type: "scriptwriting",
  title: "10 Secrets to SURVIVE Long-Haul Flights in 2025 (Even in Economy)",
  niche: "Aviation",
  client: "Transit Code YT",
  doc: "https://drive.google.com/open?id=12ou4dqZoKFuSODegUds4iLk5PgaaZlH5&usp=drive_copy",
  image: "https://drive.google.com/file/d/16irV2MGCKqp_Yi2FP0tPYejvmm-8ahWj/view?usp=sharing",
},

{
  id: "soviet-ilyushin-il-2",
  type: "scriptwriting",
  title: "Soviet Ilyushin Il-2",
  niche: "Aviation",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1gxzpq4n-XwcP_CqxL6bQJpDep3YlO9c7&usp=drive_copy",
  image: "https://drive.google.com/file/d/16irV2MGCKqp_Yi2FP0tPYejvmm-8ahWj/view?usp=sharing",
},

{
  id: "a-10-warthog",
  type: "scriptwriting",
  title: "A-10 Warthog",
  niche: "Aviation",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1WJPuRRILC2Nadkm64L3PSi3mZPOL2xUV&usp=drive_copy",
  image: "https://drive.google.com/file/d/16irV2MGCKqp_Yi2FP0tPYejvmm-8ahWj/view?usp=sharing",
},

{
  id: "a1-skyraider",
  type: "scriptwriting",
  title: "A1 Skyraider",
  niche: "Aviation",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1nRYlkSskGngK2hyIF3ijIP4A9acy0HG1&usp=drive_copy",
  image: "https://drive.google.com/file/d/16irV2MGCKqp_Yi2FP0tPYejvmm-8ahWj/view?usp=sharing",
},

{
  id: "boeing-737",
  type: "scriptwriting",
  title: "Boeing 737",
  niche: "Aviation",
  client: "NDA",
  doc: "https://drive.google.com/open?id=19VQ_X8yTK1y4Vq7FyuUG3HY_q7V60nwX&usp=drive_copy",
  image: "https://drive.google.com/file/d/16irV2MGCKqp_Yi2FP0tPYejvmm-8ahWj/view?usp=sharing",
},

{
  id: "boeing-c-17-globemaster-iii",
  type: "scriptwriting",
  title: "Boeing C-17 Globemaster III",
  niche: "Aviation",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1WJ-oVeZoSltGLOjskd_olMPv7J-mwXjP&usp=drive_copy",
  image: "https://drive.google.com/file/d/16irV2MGCKqp_Yi2FP0tPYejvmm-8ahWj/view?usp=sharing",
},

{
  id: "fw-190-germany-s-greatest-fighter-that-gave-bomber-crews-nig",
  type: "scriptwriting",
  title: "FW-190_ Germany's Greatest Fighter That Gave Bomber Crews Nightmares",
  niche: "Aviation",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1ICVJ9KPHapnllHSmilchFHt3aSEAUsLf&usp=drive_copy",
  image: "https://drive.google.com/file/d/16irV2MGCKqp_Yi2FP0tPYejvmm-8ahWj/view?usp=sharing",
},

{
  id: "shifting-airport-rules-changing-in-2025",
  type: "scriptwriting",
  title: "Shifting Airport Rules Changing in 2025",
  niche: "Aviation",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1rk7EIf8017FTbM0zHxEPHNlBfClSv5bs&usp=drive_copy",
  image: "https://drive.google.com/file/d/16irV2MGCKqp_Yi2FP0tPYejvmm-8ahWj/view?usp=sharing",
},
       {
  id: "bart-simpson-s-insane-car-collection-in-the-simpsons-1",
  type: "scriptwriting",
  title: "Bart Simpson's Insane Car Collection in The Simpsons (1)",
  niche: "Cars",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1lV0y9xW7R-7j7-Osh4d-LlhQv7H_ySgV/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "bmw-finally-reveals-first-solid-state-battery-in-neue-klasse",
  type: "scriptwriting",
  title: "BMW Finally Reveals First Solid State Battery in NEUE KLASSE Electric Vehicles",
  niche: "Cars",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1XyS46-7gC4E2dE3jF9jN3h9N7O_yJqL1/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "china-just-destroyed-tesla-by-revealing-the-xiaomi-su7-elect",
  type: "scriptwriting",
  title: "China Just Destroyed Tesla by Revealing the Xiaomi SU7 Electric Car",
  niche: "Cars",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1Dk0M-L8_F5J0kK9V2R_fN7L0_o98y_1J/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "concept-flying-cars",
  type: "scriptwriting",
  title: "Concept Flying Cars",
  niche: "Cars",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1J2L8a_xN1-3D5i-G0sO8uR1j9j7K0L2P/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "cybertruck-finally-here-10-incredible-features-edited",
  type: "scriptwriting",
  title: "Cybertruck FINALLY Here! 10 incredible Features. - Edited",
  niche: "Cars",
  client: "The Futurist YT",
  doc: "https://docs.google.com/document/d/12M_oG8i9a-P2iK7_G5d2L1j8N3j8K9L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "elon-musk",
  type: "scriptwriting",
  title: "Elon Musk \"NEW Tesla Model 3 Highland is a Game Changer in 2024\"",
  niche: "Cars",
  client: "NDA",
  doc: "https://docs.google.com/document/d/14L_xP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "rowan-atkinson-car-collection",
  type: "scriptwriting",
  title: "Rowan Atkinson Car Collection",
  niche: "Cars",
  client: "Elite Dreaming YT",
  doc: "https://docs.google.com/document/d/18N_oP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "most-expensive-cars-in-the-world",
  type: "scriptwriting",
  title: "MOST EXPENSIVE CARS In The World",
  niche: "Cars",
  client: "NDA",
  doc: "https://docs.google.com/document/d/19P_oP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "7-best-subcompact-suvs-in-2026",
  type: "scriptwriting",
  title: "7 Best Subcompact SUVs in 2026",
  niche: "Cars",
  client: "NDA",
  doc: "https://docs.google.com/document/d/11Q_oP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "9-most-reliable-suvs-you-can-buy-in-2025",
  type: "scriptwriting",
  title: "9 Most Reliable SUVs You Can Buy In 2025",
  niche: "Cars",
  client: "NDA",
  doc: "https://docs.google.com/document/d/13R_oP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "10-best-midsize-suvs-in-2026",
  type: "scriptwriting",
  title: "10 Best Midsize SUVs in 2026",
  niche: "Cars",
  client: "Motor Future YT",
  doc: "https://docs.google.com/document/d/15S_oP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "10-old-cars-that-run-forever-and-never-break-down",
  type: "scriptwriting",
  title: "10 Old Cars That Run Forever And Never Break Down",
  niche: "Cars",
  client: "Vintage Vroom YT",
  doc: "https://docs.google.com/document/d/17T_oP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "17-worst-suvs-for-seniors-as-per-consumer-reports",
  type: "scriptwriting",
  title: "17 Worst SUVs for Seniors As Per Consumer Reports",
  niche: "Cars",
  client: "Full Car Care YT",
  doc: "https://docs.google.com/document/d/10U_oP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "18-best-used-cars-to-buy-according-to-consumer-reports",
  type: "scriptwriting",
  title: "18 Best Used Cars to Buy according to Consumer Reports",
  niche: "Cars",
  client: "Full Car Care YT",
  doc: "https://docs.google.com/document/d/12V_oP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "the-only-13-car-brands-you-should-buy-according-to-consumer",
  type: "scriptwriting",
  title: "The only 13 car brands you should buy according to consumer reports",
  niche: "Cars",
  client: "Full Car Care YT",
  doc: "https://docs.google.com/document/d/16W_oP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},

{
  id: "18-costly-car-mistakes-you-re-making-without-realizing",
  type: "scriptwriting",
  title: "18 Costly Car Mistakes You're Making Without Realizing",
  niche: "Cars",
  client: "Full Car Care YT",
  doc: "https://docs.google.com/document/d/10X_oP3j2a-G1iL8_G0d0L5j3N2j1K8L0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13uLQJHQ4HLMM0-8rGF5SlPJL3TAmJk10/view?usp=sharing",
},
       {
  id: "when-bodybuilders-go-shirtless-in-public",
  type: "scriptwriting",
  title: "When Bodybuilders Go Shirtless in Public",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1RGhiqJNkpLM3ErhJ1wK9bEXeCXVxGcDV&usp=drive_copy",
  image: "https://drive.google.com/file/d/15FgYW0h2PJn05Fb_p2Ss3p7Z_NDCtXuh/view?usp=sharing",
},

{
  id: "the-entire-history-of-bodybuilding-i-guess",
  type: "scriptwriting",
  title: "the entire history of bodybuilding, i guess",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1_nh728gFLacaL42G9V2DiUM1mzODyVol&usp=drive_copy",
  image: "https://drive.google.com/file/d/15FgYW0h2PJn05Fb_p2Ss3p7Z_NDCtXuh/view?usp=sharing",
},

{
  id: "the-most-hated-bodybuilder-ever-gregg-valentino",
  type: "scriptwriting",
  title: "The Most Hated Bodybuilder Ever_ Gregg Valentino",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1LluFaPV98vQdtUNd8bs4hqV2jnveW7sE&usp=drive_copy",
  image: "https://drive.google.com/file/d/15FgYW0h2PJn05Fb_p2Ss3p7Z_NDCtXuh/view?usp=sharing",
},

{
  id: "ronnie-coleman-a-bodybuilding-legend-losing-it-all",
  type: "scriptwriting",
  title: "Ronnie Coleman_ A Bodybuilding Legend Losing it all",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1gk8b7rL31BXNITzOSJ7vMP3PPx3kaTPa&usp=drive_copy",
  image: "https://drive.google.com/file/d/15FgYW0h2PJn05Fb_p2Ss3p7Z_NDCtXuh/view?usp=sharing",
},
       {
  id: "caitlin-clark-is-changing-the-wnba-forever",
  type: "scriptwriting",
  title: "Caitlin Clark is CHANGING the WNBA FOREVER",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1ZWCQQMvqqdSxVlEIYRYCzy6mWpZLJDW8/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "how-caitlin-clark-is-revolutionizing-the-wnba-here-s-the-pro",
  type: "scriptwriting",
  title: "How Caitlin Clark is Revolutionizing the WNBA - Here's the Proof",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1_uuOpsNB9uiewJ2ip7hw-WeArv0GVswR/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "the-wnba-will-never-be-the-same-after-caitlin-clark",
  type: "scriptwriting",
  title: "The WNBA Will NEVER Be the Same After Caitlin Clark",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1O9Ns6i-dnA8OmB5qgzoWE-5CUOuH3aum/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "caitlin-clark-vs-nba-stars-who-s-got-the-deeper-range",
  type: "scriptwriting",
  title: "Caitlin Clark vs. NBA Stars Who's Got the Deeper Range",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1ATKHb-NwVgDsw3IWaKcOOz0LYYv-ffRs/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "caitlin-clark-s-record-breaking-rookie-season-unbelievable-s",
  type: "scriptwriting",
  title: "Caitlin Clark's Record-Breaking Rookie Season Unbelievable Stats and Highlights",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1aZBvKGbBGafmooLkpyglToneSyR8TAsq/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "caitlin-clark-s-signature-moves-are-unstoppable",
  type: "scriptwriting",
  title: "Caitlin Clark's Signature Moves Are UNSTOPPABLE",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1XElodHu5BHLh8nNW05iWT3D45IHkykX9/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "could-caitlin-clark-play-in-the-nba-a-hypothetical-breakdown",
  type: "scriptwriting",
  title: "Could Caitlin Clark Play in the NBA A Hypothetical Breakdown",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1ZCzmpmDn5KWNGSgmUqKeTx8zSLXGZzk7/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "inside-caitlin-clark-s-off-season-training-regimen-and-futur",
  type: "scriptwriting",
  title: "Inside Caitlin Clark's Off-Season Training Regimen and Future Aspirations - Why Caitlin Clark is the GOAT",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/16cuEXV45wUI4bOz-2P26KeILdMAn5AOL/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},
       {
  id: "aaron-judge-the-true-home-run-king",
  type: "scriptwriting",
  title: "Aaron Judge_ The True Home Run King_",
  niche: "Sports",
  client: "FoulBall YT",
  doc: "https://docs.google.com/document/d/1s84Bb_SFU5QkajU7LigHVGniaw5LpxLR/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1XDHdenHwm0CbxERdPqtfawDYnabslMvX/view?usp=sharing",
},

{
  id: "baseball-s-biggest-disappointments-so-far-in-2023",
  type: "scriptwriting",
  title: "Baseball’s Biggest Disappointments So Far in 2023",
  niche: "Sports",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1C0-Ft7kSosbXcATMclYTlUs-Dcq_oaRR/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1XDHdenHwm0CbxERdPqtfawDYnabslMvX/view?usp=sharing",
},

{
  id: "are-all-players-created-equal-unraveling-the-double-standard",
  type: "scriptwriting",
  title: "Are All Players Created Equal_ Unraveling the Double Standard in MLB's Treatment",
  niche: "Sports",
  client: "FoulBall YT",
  doc: "https://docs.google.com/document/d/1Ox1kOAyroBUhrllsqKZV0AK40fs5MXDK/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1XDHdenHwm0CbxERdPqtfawDYnabslMvX/view?usp=sharing",
},

{
  id: "how-this-mlb-star-became-a-homeless-man",
  type: "scriptwriting",
  title: "How This MLB Star Became A Homeless Man",
  niche: "Sports",
  client: "FoulBall YT",
  doc: "https://docs.google.com/document/d/1rtnpAI5m19lJQR_lJWtgfzkWBRIOD2RY/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1XDHdenHwm0CbxERdPqtfawDYnabslMvX/view?usp=sharing",
},

{
  id: "the-entire-history-of-mlb-i-guess",
  type: "scriptwriting",
  title: "the entire history of MLB, i guess",
  niche: "Sports",
  client: "FoulBall YT",
  doc: "https://docs.google.com/document/d/1tJGW3RZdP5i2o-BVEWORrW1NUmAhtfh3/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1XDHdenHwm0CbxERdPqtfawDYnabslMvX/view?usp=sharing",
},

{
  id: "the-million-dollar-question-how-much-is-shohei-ohtani-s-uniq",
  type: "scriptwriting",
  title: "The Million-Dollar Question_ How Much is Shohei Ohtani's Unique Skill Set Really Worth_",
  niche: "Sports",
  client: "FoulBall YT",
  doc: "https://docs.google.com/document/d/19ysRsZ9j3br6QqJe3724osUIxHZHPNvk/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1XDHdenHwm0CbxERdPqtfawDYnabslMvX/view?usp=sharing",
},

{
  id: "the-unstoppable-rise-of-elly-de-la-cruz-analyzing-his-impact",
  type: "scriptwriting",
  title: "The Unstoppable Rise of Elly De La Cruz_ Analyzing His Impact on the Game",
  niche: "Sports",
  client: "FoulBall YT",
  doc: "https://docs.google.com/document/d/16XcwP1_-VF5asZrVgRwAloxc28AQNG_j/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1XDHdenHwm0CbxERdPqtfawDYnabslMvX/view?usp=sharing",
},

{
  id: "who-is-ethan-salas",
  type: "scriptwriting",
  title: "Who is Ethan Salas_",
  niche: "Sports",
  client: "FoulBall YT",
  doc: "https://docs.google.com/document/d/1p46-ai-XQ5MEEJ5xZcS7cif5D6IfZtGx/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1XDHdenHwm0CbxERdPqtfawDYnabslMvX/view?usp=sharing",
},

{
  id: "he-s-the-most-feared-mexican-fighter-in-boxing-history",
  type: "scriptwriting",
  title: "He_s The Most FEARED Mexican Fighter In Boxing History",
  niche: "Sports",
  client: "Boxing Universe YT",
  doc: "https://docs.google.com/document/d/1MzCtdvUfhCEZpVMo0ExBgM-JHcKx8Hoz/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1o11_ks8B0icBZnmf5Usu5878-FDsuXxR/view?usp=sharing",
},

{
  id: "the-comedic-timing-of-nicolino-locche",
  type: "scriptwriting",
  title: "The Comedic Timing Of Nicolino Locche",
  niche: "Sports",
  client: "Boxing Universe YT",
  doc: "https://docs.google.com/document/d/1ZuW2OjA_fpqtwUwqcN-ossnONiwfKQ4A/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1o11_ks8B0icBZnmf5Usu5878-FDsuXxR/view?usp=sharing",
},

{
  id: "anthony-joshua-vs-francis-ngannou-a-closer-look",
  type: "scriptwriting",
  title: "Anthony Joshua vs Francis Ngannou - A CLOSER LOOK",
  niche: "Sports",
  client: "Boxing Universe YT",
  doc: "https://docs.google.com/document/d/1ptlfPxSfp9GN563i8NiEqX9FOD700YFq/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1o11_ks8B0icBZnmf5Usu5878-FDsuXxR/view?usp=sharing",
},

{
  id: "did-you-know-this-about-mike-tyson-vs-lennox-lewis",
  type: "scriptwriting",
  title: "Did You Know This About Mike Tyson vs Lennox Lewis_",
  niche: "Sports",
  client: "Boxing Universe YT",
  doc: "https://docs.google.com/document/d/1ezZ29pBTM2BKTSIg7rlQSlQp5GGIAWjO/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1o11_ks8B0icBZnmf5Usu5878-FDsuXxR/view?usp=sharing",
},

{
  id: "the-most-vicious-heavyweight-in-history-jack-dempsey",
  type: "scriptwriting",
  title: "The Most Vicious Heavyweight In History - Jack Dempsey",
  niche: "Sports",
  client: "Boxing Universe YT",
  doc: "https://docs.google.com/document/d/1F15byHi7GjQjXdh6e-dYaA64KQ8bdJTu/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1o11_ks8B0icBZnmf5Usu5878-FDsuXxR/view?usp=sharing",
},

{
  id: "what-happens-when-manny-pacquiao-goes-into-devil-mode",
  type: "scriptwriting",
  title: "What Happens When Manny Pacquiao goes into DEVIL MODE_",
  niche: "Sports",
  client: "Boxing Universe YT",
  doc: "https://docs.google.com/document/d/1pu4Rqv_HdZCN65nN-KAU46Hh0BamV7J1/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1o11_ks8B0icBZnmf5Usu5878-FDsuXxR/view?usp=sharing",
},

{
  id: "this-man-s-knockout-record-that-will-never-be-broken",
  type: "scriptwriting",
  title: "This Man’s Knockout Record That Will NEVER Be Broken!",
  niche: "Sports",
  client: "Boxing Universe YT",
  doc: "https://docs.google.com/document/d/1GqOLxbZp7Qnkoh64ETQsANERWXOg4xj2/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1o11_ks8B0icBZnmf5Usu5878-FDsuXxR/view?usp=sharing",
},

{
  id: "when-depriving-a-beast-of-food-goes-wrong-james-toney",
  type: "scriptwriting",
  title: "When Depriving A Beast of Food Goes Wrong - James Toney",
  niche: "Sports",
  client: "Boxing Universe YT",
  doc: "https://docs.google.com/document/d/1bDO3FqS81o2P-OojJl_w2tg-2AY71yes/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1o11_ks8B0icBZnmf5Usu5878-FDsuXxR/view?usp=sharing",
},

{
  id: "football-tricks-that-have-been-banned-from-football-forever",
  type: "scriptwriting",
  title: "Football Tricks That Have Been Banned From Football Forever",
  niche: "Sports",
  client: "Soccer Fanatic YT",
  doc: "https://docs.google.com/document/d/1_6VrdG_FIRlRYAG4QeqkKLpVcZGMUpzv/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13Sao9xJwTnseZQzrKkgzDTnUxYHDx3os/view?usp=sharing",
},

{
  id: "footballers-who-have-betrayed-their-country",
  type: "scriptwriting",
  title: "Footballers who have betrayed their country",
  niche: "Sports",
  client: "Soccer Fanatic YT",
  doc: "https://docs.google.com/document/d/1-QwYNqx-1MkOHzBwsS0AATwEBr8vQntq/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13Sao9xJwTnseZQzrKkgzDTnUxYHDx3os/view?usp=sharing",
},

{
  id: "how-footballers-got-their-jersey-numbers",
  type: "scriptwriting",
  title: "How Footballers Got Their Jersey Numbers",
  niche: "Sports",
  client: "Soccer Fanatic YT",
  doc: "https://docs.google.com/document/d/1gjZNSKpPz2siuKapKwXP15hVGm3dL5aG/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13Sao9xJwTnseZQzrKkgzDTnUxYHDx3os/view?usp=sharing",
},

{
  id: "lamine-yamal-is-more-incredible-than-you-think-soccer-fanati",
  type: "scriptwriting",
  title: "Lamine Yamal is MORE INCREDIBLE Than You Think! (Soccer Fanatic YT",
  niche: "Sports",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1G9oeHgbEz4WwR88cPZXYD1Cxd93G9LSK/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13Sao9xJwTnseZQzrKkgzDTnUxYHDx3os/view?usp=sharing",
},

{
  id: "the-downfall-of-neymar",
  type: "scriptwriting",
  title: "The DownFall of Neymar",
  niche: "Sports",
  client: "Soccer Fanatic YT",
  doc: "https://docs.google.com/document/d/1qrRqA8l1R0HZf9GlAyMbXjfkrLOrf7O4/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13Sao9xJwTnseZQzrKkgzDTnUxYHDx3os/view?usp=sharing",
},

{
  id: "the-entire-history-of-football-salaries",
  type: "scriptwriting",
  title: "The Entire History Of Football Salaries",
  niche: "Sports",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1hzWjCFKoz2rfSHq6pjuPpkBnsiM2KUha/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13Sao9xJwTnseZQzrKkgzDTnUxYHDx3os/view?usp=sharing",
},

{
  id: "the-world-cup-winner-who-disappeared-overnight-soccer-fanati",
  type: "scriptwriting",
  title: "The World Cup Winner Who Disappeared Overnight (Soccer Fanatic YT",
  niche: "Sports",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1WNyVIgj6CKv7H_cOQNpDHwv8aznCxOjY/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13Sao9xJwTnseZQzrKkgzDTnUxYHDx3os/view?usp=sharing",
},

{
  id: "when-footballers-were-caught-cheating-in-game-soccer-fanatic",
  type: "scriptwriting",
  title: "When Footballers Were Caught Cheating in Game (Soccer Fanatic YT",
  niche: "Sports",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1XZ0ND-Nh0jjK_EjWfwilmt_GVjyeXj7h/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/13Sao9xJwTnseZQzrKkgzDTnUxYHDx3os/view?usp=sharing",
},

{
  id: "how-good-wilfredo-leon-actually-is",
  type: "scriptwriting",
  title: "How good Wilfredo Leon actually is",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1qrsirtWMZsCEmW7u9srh1CniM6ZciRDA&usp=drive_copy",
  image: "https://drive.google.com/file/d/1V9jIuQz3ZmbGg-2Ci-l6iefWq3R09A50/view?usp=sharing",
},

{
  id: "how-good-earving-ngapeth-actually-is",
  type: "scriptwriting",
  title: "How good Earving Ngapeth actually is",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1OmpwE0Njxzzxl9PhcHuBNowi-0mHhLRT&usp=drive_copy",
  image: "https://drive.google.com/file/d/1V9jIuQz3ZmbGg-2Ci-l6iefWq3R09A50/view?usp=sharing",
},

{
  id: "20-best-volleyball-players-in-italian-league-2024",
  type: "scriptwriting",
  title: "20 best volleyball players in Italian league 2024",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1BbyOzbPsXkIwAjfULXvQFn-TYYj_qE3L&usp=drive_copy",
  image: "https://drive.google.com/file/d/1V9jIuQz3ZmbGg-2Ci-l6iefWq3R09A50/view?usp=sharing",
},

{
  id: "if-you-make-the-italian-volleyball-players-angry-you-will-ge",
  type: "scriptwriting",
  title: "If you Make the Italian Volleyball Players Angry - YOU WILL GET THIS",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1wgx-fbVibb_WjARM9rJEzRNs9m6KTosD&usp=drive_copy",
  image: "https://drive.google.com/file/d/1V9jIuQz3ZmbGg-2Ci-l6iefWq3R09A50/view?usp=sharing",
},

{
  id: "intense-rivalry-china-vs-japan-vnl-2023-highlights",
  type: "scriptwriting",
  title: "INTENSE RIVALRY _ CHINA vs JAPAN _ VNL 2023 Highlights",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1wgx-fbVibb_WjARM9rJEzRNs9m6KTosD&usp=drive_copy",
  image: "https://drive.google.com/file/d/1V9jIuQz3ZmbGg-2Ci-l6iefWq3R09A50/view?usp=sharing",
},

{
  id: "yuji-nishida-s-secret-to-unstoppable-volleyball-plays-reveal",
  type: "scriptwriting",
  title: "Yuji Nishida's Secret to Unstoppable Volleyball Plays Revealed",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1ArXphdEDCWIXyvlPNv8xIyE2gGSOULPV&usp=drive_copy",
  image: "https://drive.google.com/file/d/1V9jIuQz3ZmbGg-2Ci-l6iefWq3R09A50/view?usp=sharing",
},

{
  id: "what-does-a-libero-do-in-volleyball",
  type: "scriptwriting",
  title: "What Does a LIBERO Do in Volleyball",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1hWhKirB1VRExhzOQkMONptZAkiN4qGNK&usp=drive_copy",
  image: "https://drive.google.com/file/d/1V9jIuQz3ZmbGg-2Ci-l6iefWq3R09A50/view?usp=sharing",
},

{
  id: "top-20-craziest-volleyball-blocks-by-dmitriy-muserskiy",
  type: "scriptwriting",
  title: "TOP 20 Craziest Volleyball Blocks by Dmitriy Muserskiy",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1U87c6O9iod4VBfZWG2xSeLqjU4kr8y8J&usp=drive_copy",
  image: "https://drive.google.com/file/d/1V9jIuQz3ZmbGg-2Ci-l6iefWq3R09A50/view?usp=sharing",
},

{
  id: "how-an-nfl-star-became-a-global-icon-after-being-blacklisted",
  type: "scriptwriting",
  title: "How an NFL Star Became a Global Icon After Being Blacklisted",
  niche: "Sports",
  client: "Gritzflix YT",
  doc: "https://drive.google.com/open?id=1XZZMMfhp68jv05jJ6cI4dGa41EnqbDtM&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XuOHX90JGwJPTZRc_vyYvK5ZoNt8X_TE/view?usp=sharing",
},

{
  id: "how-an-nfl-star-who-only-used-one-hand-outscored-everyone",
  type: "scriptwriting",
  title: "How an NFL Star Who Only Used One Hand Outscored Everyone",
  niche: "Sports",
  client: "Gritzflix YT",
  doc: "https://drive.google.com/open?id=1JtDlapQunAyJS1nNRQ9YLGj-lSPLukAt&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XuOHX90JGwJPTZRc_vyYvK5ZoNt8X_TE/view?usp=sharing",
},

{
  id: "how-an-obese-nfl-player-outscored-everyone",
  type: "scriptwriting",
  title: "How an OBESE NFL Player Outscored Everyone",
  niche: "Sports",
  client: "Gritzflix YT",
  doc: "https://drive.google.com/open?id=1yFblgHwDS0o_Rj7oZbWtiRd2CoZ1EroW&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XuOHX90JGwJPTZRc_vyYvK5ZoNt8X_TE/view?usp=sharing",
},

{
  id: "how-good-is-josh-allen-actually",
  type: "scriptwriting",
  title: "How Good Is Josh Allen actually_",
  niche: "Sports",
  client: "Gritzflix YT",
  doc: "https://drive.google.com/open?id=15o1Z4GLBKIlLy73Z0Px3HiQjJmPOMVrw&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XuOHX90JGwJPTZRc_vyYvK5ZoNt8X_TE/view?usp=sharing",
},

{
  id: "how-good-is-micah-parsons-actually",
  type: "scriptwriting",
  title: "How Good Is Micah Parsons Actually",
  niche: "Sports",
  client: "Gritzflix YT",
  doc: "https://drive.google.com/open?id=18b4Q_ofSdUhXYPlGZ5vVzAQ7YBO-OJyw&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XuOHX90JGwJPTZRc_vyYvK5ZoNt8X_TE/view?usp=sharing",
},

{
  id: "just-how-good-is-caleb-williams-really",
  type: "scriptwriting",
  title: "Just How Good Is Caleb WIlliams Really_",
  niche: "Sports",
  client: "Gritzflix YT",
  doc: "https://drive.google.com/open?id=17YvOuTwz1GLcrd5t9ERjJ8eYLOR5AeF7&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XuOHX90JGwJPTZRc_vyYvK5ZoNt8X_TE/view?usp=sharing",
},

{
  id: "the-entire-history-of-the-nfl-i-guess",
  type: "scriptwriting",
  title: "the entire history of the NFL, i guess",
  niche: "Sports",
  client: "Gritzflix YT",
  doc: "https://drive.google.com/open?id=1ZY1-LY-kppdQaXyHynoCFUKSRY8IFyxF&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XuOHX90JGwJPTZRc_vyYvK5ZoNt8X_TE/view?usp=sharing",
},

{
  id: "the-entire-history-of-the-super-bowl-i-guess",
  type: "scriptwriting",
  title: "The entire history of the super bowl, i guess",
  niche: "Sports",
  client: "Gritzflix YT",
  doc: "https://drive.google.com/open?id=18xMY2rLmu0Fw5xRnNzkqhFIAd5bf7TcT&usp=drive_copy",
  image: "https://drive.google.com/file/d/1XuOHX90JGwJPTZRc_vyYvK5ZoNt8X_TE/view?usp=sharing",
},

{
  id: "how-a-6-0-guard-with-a-streetball-mentality-destroyed-every",
  type: "scriptwriting",
  title: "How a 6'0_ Guard with a Streetball Mentality Destroyed Every Defender - Allen Iverson",
  niche: "Sports",
  client: "HOOPS BLITZ YT",
  doc: "https://drive.google.com/open?id=10NFTDjr2dpb0NyjdsCnZymG4FOU6M4wl&usp=drive_copy",
  image: "https://drive.google.com/file/d/1nM2Fxr4_a8l-1F31W3JLqgURvo204Fhb/view?usp=sharing",
},

{
  id: "how-a-7-4-player-still-destroyed-everyone-with-shooting-and",
  type: "scriptwriting",
  title: "How a 7'4_ Player still destroyed Everyone with Shooting and Dribbling",
  niche: "Sports",
  client: "HOOPS BLITZ YT",
  doc: "https://drive.google.com/open?id=1vassOtrmqpw6xnxZ_QQvlIIZQzpapwuJ&usp=drive_copy",
  image: "https://drive.google.com/file/d/1nM2Fxr4_a8l-1F31W3JLqgURvo204Fhb/view?usp=sharing",
},

{
  id: "how-a-streetball-swagger-entered-the-nba-to-make-his-opponen",
  type: "scriptwriting",
  title: "How A Streetball Swagger Entered The NBA To Make His Opponents Look Silly",
  niche: "Sports",
  client: "HOOPS BLITZ YT",
  doc: "https://drive.google.com/open?id=12W2Jw5ZgGG9Ee51OgzDnytdxTvJ6wnoF&usp=drive_copy",
  image: "https://drive.google.com/file/d/1nM2Fxr4_a8l-1F31W3JLqgURvo204Fhb/view?usp=sharing",
},

{
  id: "how-lebron-james-spends-half-a-billion-dollars",
  type: "scriptwriting",
  title: "How Lebron James spends half a billion dollars",
  niche: "Sports",
  client: "HoopFlix",
  doc: "https://drive.google.com/open?id=1wz-LW7L6DFo964j3pXx14yo8ZkrIbGPR&usp=drive_copy",
  image: "https://drive.google.com/file/d/1nM2Fxr4_a8l-1F31W3JLqgURvo204Fhb/view?usp=sharing",
},

{
  id: "most-expensive-cars-nba-players-own",
  type: "scriptwriting",
  title: "Most Expensive Cars NBA Players Own",
  niche: "Sports",
  client: "HoopFlix",
  doc: "https://drive.google.com/open?id=1B7hwpikiV_fFt4m7HCeWszpAo-Xa3F-J&usp=drive_copy",
  image: "https://drive.google.com/file/d/1nM2Fxr4_a8l-1F31W3JLqgURvo204Fhb/view?usp=sharing",
},

{
  id: "stupidly-expensive-things-lamelo-ball-owns",
  type: "scriptwriting",
  title: "Stupidly Expensive Things LaMelo Ball Owns",
  niche: "Sports",
  client: "HoopFlix",
  doc: "https://drive.google.com/open?id=1wmvTnPNNMhxyooBluCsC4zyOtGUB7yEV&usp=drive_copy",
  image: "https://drive.google.com/file/d/1nM2Fxr4_a8l-1F31W3JLqgURvo204Fhb/view?usp=sharing",
},

{
  id: "stupidly-expensive-things-stephen-curry-owns",
  type: "scriptwriting",
  title: "Stupidly Expensive Things Stephen Curry Owns",
  niche: "Sports",
  client: "HoopFlix",
  doc: "https://drive.google.com/open?id=1MeTIYiGDdTBO_XexwwaSh_Gs_9yijGU_&usp=drive_copy",
  image: "https://drive.google.com/file/d/1nM2Fxr4_a8l-1F31W3JLqgURvo204Fhb/view?usp=sharing",
},

{
  id: "stupidly-expensive-things-shaquille-o-neal-owns",
  type: "scriptwriting",
  title: "Stupidly Expensive Things Shaquille O'Neal Owns",
  niche: "Sports",
  client: "HoopFlix",
  doc: "https://drive.google.com/open?id=1Z3CymvTHi5VmEG6jnVxlzN5ibDYj11nm&usp=drive_copy",
  image: "https://drive.google.com/file/d/1nM2Fxr4_a8l-1F31W3JLqgURvo204Fhb/view?usp=sharing",
},

{
  id: "caitlin-clark-is-changing-the-wnba-forever-2",
  type: "scriptwriting",
  title: "Caitlin Clark is CHANGING the WNBA FOREVER",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1ZWCQQMvqqdSxVlEIYRYCzy6mWpZLJDW8/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "how-caitlin-clark-is-revolutionizing-the-wnba-here-s-the-pro-2",
  type: "scriptwriting",
  title: "How Caitlin Clark is Revolutionizing the WNBA - Here's the Proof",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1_uuOpsNB9uiewJ2ip7hw-WeArv0GVswR/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "the-wnba-will-never-be-the-same-after-caitlin-clark-2",
  type: "scriptwriting",
  title: "The WNBA Will NEVER Be the Same After Caitlin Clark",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1O9Ns6i-dnA8OmB5qgzoWE-5CUOuH3aum/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "caitlin-clark-vs-nba-stars-who-s-got-the-deeper-range-2",
  type: "scriptwriting",
  title: "Caitlin Clark vs. NBA Stars Who's Got the Deeper Range",
  niche: "Sports",
  client: "Real WNBA YT",
  doc: "https://docs.google.com/document/d/1ATKHb-NwVgDsw3IWaKcOOz0LYYv-ffRs/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1silzMc6MQGo4JA-_HF2QFmz0GzwucYdf/view?usp=sharing",
},

{
  id: "silent-hill-2024-game",
  type: "scriptwriting",
  title: "Silent Hill 2024 game",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1gFp0ugot7j0RHZIzlkV8B5vWT8xE3UFy&usp=drive_copy",
  image: "https://drive.google.com/file/d/1sN3jhlokyb00HFu1OeNOUQF1Rg0pPM_I/view?usp=sharing",
},

{
  id: "gta-v",
  type: "scriptwriting",
  title: "GTA V",
  niche: "Sports",
  client: "NDA",
  doc: "https://drive.google.com/open?id=1tAEinH05tm2F5agFD2uXfScIR68KzJ5p&usp=drive_copy",
  image: "https://drive.google.com/file/d/1sN3jhlokyb00HFu1OeNOUQF1Rg0pPM_I/view?usp=sharing",
},

{
  id: "career-and-life-retrospective-of-alexander-bublik",
  type: "scriptwriting",
  title: "Career and life retrospective of Alexander Bublik",
  niche: "Sports",
  client: "Tennis YT",
  doc: "https://drive.google.com/open?id=1kdolTpF6FsA21sMSytURwaXQFXnhWbw7X8q5866Cvzk&usp=drive_copy",
  image: "https://drive.google.com/file/d/1sFzL7Q5IRHuUqiKrfWJFovnjKZIUevUU/view?usp=sharing",
},
       
{
  id: "what-if-a-crumb-of-bread-hit-earth-at-light-speed",
  type: "scriptwriting",
  title: "What if a crumb of bread hit Earth at Light Speed",
  niche: "What If?",
  client: "Yappa YT",
  doc: "https://docs.google.com/document/d/1DdFywpjTT5aZECIYdO_VCMpT_GeAb-LL/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},


{
  id: "what-if-you-were-the-size-of-an-insect",
  type: "scriptwriting",
  title: "What if you were the size of an insect",
  niche: "What If?",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1IJAlDXLSubj4gBLbTfLdcwtSvOnJ7am1&usp=drive_copy",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},


{
  id: "what-if-humans-were-born-on-different-planets",
  type: "scriptwriting",
  title: "What if humans were born on different planets",
  niche: "What If?",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1S4P9CZaS8LiQvoUgiYO782XzCXBDFX6x&usp=drive_copy",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},


{
  id: "could-you-survive-a-nanosecond-outside-the-universe",
  type: "scriptwriting",
  title: "Could you survive a nanosecond outside the universe",
  niche: "What If?",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1e8C2Gq4rWSyPNNMszEGhl8e03Fju3hEL&usp=drive_copy",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},


{
  id: "how-long-would-it-take-you-to-count-to-tredecillion",
  type: "scriptwriting",
  title: "How long would it take you to count to Tredecillion",
  niche: "What If?",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1Gb4s9sgyVZOFWieAUWxwzUKm0kARXIVk&usp=drive_copy",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},


{
  id: "if-all-humans-died-how-long-until-earth-erased-every-trace-o",
  type: "scriptwriting",
  title: "If all humans died, how long until earth erased every trace of us",
  niche: "What If?",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1ACobeehUDK5vxsfE0PrWeuT2h0MPBwjq&usp=drive_copy",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},


{
  id: "what-getting-killed-by-a-hydraulic-press-feels-like",
  type: "scriptwriting",
  title: "What Getting Killed by a Hydraulic Press Feels Like",
  niche: "What If?",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1NN4oasbp10r6TLYE06TPGF4KSjGLAe6C&usp=drive_copy",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},


{
  id: "what-if-a-1cm-black-hole-appeared-in-your-room",
  type: "scriptwriting",
  title: "What if a 1cm black hole appeared in your room",
  niche: "What If?",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1w4hqYtF1_MNzkKvPc6m4VNJiBYIbd8Vh&usp=drive_copy",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},


{
  id: "what-if-all-nukes-were-launched-at-the-moon",
  type: "scriptwriting",
  title: "What if all nukes were launched at the moon",
  niche: "What If?",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1wVHor7RgpoM5TPQ2gQ-3pDuYSZ0WX2KV&usp=drive_copy",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-your-school-shut-down",
  type: "scriptwriting",
  title: "What if your school shut down",
  niche: "What If?",
  client: "AlterVerse SC",
  doc: "https://docs.google.com/document/d/1ZWCQQMvqqdSxVlEIYRYCzy6mWpZLJDW8/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-you-woke-up-during-surgery",
  type: "scriptwriting",
  title: "What if you woke up during surgery",
  niche: "What If?",
  client: "AlterVerse SC",
  doc: "https://docs.google.com/document/d/1ATKHb-NwVgDsw3IWaKcOOz0LYYv-ffRs/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-you-drank-coca-cola-instead-of-water",
  type: "scriptwriting",
  title: "What if you drank Coca Cola instead of water",
  niche: "What If?",
  client: "AlterVerse SC",
  doc: "https://docs.google.com/document/d/1XElodHu5BHLh8nNW05iWT3D45IHkykX9/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-the-us-invaded-russia",
  type: "scriptwriting",
  title: "What If The US Invaded Russia?",
  niche: "What If?",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1_uuOpsNB9uiewJ2ip7hw-WeArv0GVswR/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-the-ultron-program-was-successful",
  type: "scriptwriting",
  title: "What If the Ultron Program Was Successful",
  niche: "What If?",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1O9Ns6i-dnA8OmB5qgzoWE-5CUOuH3aum/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-the-african-continent-broke-apart",
  type: "scriptwriting",
  title: "What If the African Continent Broke Apart",
  niche: "What If?",
  client: "Motech YT",
  doc: "https://docs.google.com/document/d/1aZBvKGbBGafmooLkpyglToneSyR8TAsq/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-russia-launched-a-nuclear-bomb",
  type: "scriptwriting",
  title: "What if Russia Launched a Nuclear Bomb",
  niche: "What If?",
  client: "History SC",
  doc: "https://docs.google.com/document/d/1ZCzmpmDn5KWNGSgmUqKeTx8zSLXGZzk7/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-the-world-lost-oxygen-for-five-seconds",
  type: "scriptwriting",
  title: "What If The World Lost Oxygen For Five Seconds",
  niche: "What If?",
  client: "History YT",
  doc: "https://docs.google.com/document/d/1rNgDU3RN3jhgHgxcYbe0mthMCOCk9UP0/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-trump-got-arrested",
  type: "scriptwriting",
  title: "What If Trump Got Arrested",
  niche: "What If?",
  client: "Crime SC",
  doc: "https://docs.google.com/document/d/16cuEXV45wUI4bOz-2P26KeILdMAn5AOL/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-it-rained-bouncy-balls-for-a-day",
  type: "scriptwriting",
  title: "What If It Rained Bouncy Balls for a Day",
  niche: "What If?",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1tD_GRuOCU5hmaHs7aSHSDFqShVqx9Bwv/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},

{
  id: "what-if-titanoboa-snake-didn-t-go-extinct",
  type: "scriptwriting",
  title: "What if Titanoboa Snake Didn’t Go Extinct",
  niche: "What If?",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1fn7le5SWDwZXMW0Ni-aDwrymrU8NBE1M/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1keVnFjc2u4tun-nZM4MMYUGzezFHC64i/view?usp=sharing",
},



       {
  id: "robert-de-niro",
  type: "scriptwriting",
  title: "Robert De Niro",
  niche: "Celebrity Biographies",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1fRdZ-8I_C0YefgWmq84Seku4YWX8cm43/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/165hxvbKtmzZdg2w4Xy7Uo8Pp1Nb_5amh/view?usp=sharing",
},

{
  id: "leonardo-dicaprio",
  type: "scriptwriting",
  title: "Leonardo DiCaprio",
  niche: "Celebrity Biographies",
  client: "NDA",
  doc: "https://docs.google.com/document/d/10hyEAsXYmBGpB43yiJQAKJ8n-SYkuS4s/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/165hxvbKtmzZdg2w4Xy7Uo8Pp1Nb_5amh/view?usp=sharing",
},

{
  id: "matt-damon",
  type: "scriptwriting",
  title: "Matt Damon",
  niche: "Celebrity Biographies",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1PgtHonv1oKR2mD1aAzQPKnleJ2d79Qs5/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/165hxvbKtmzZdg2w4Xy7Uo8Pp1Nb_5amh/view?usp=sharing",
},

{
  id: "arnold-schwarzenneger",
  type: "scriptwriting",
  title: "Arnold Schwarzenneger",
  niche: "Celebrity Biographies",
  client: "NDA",
  doc: "https://docs.google.com/document/d/10dbMyCsLpHq-WwBdGf7JJyg6PHtA5gRv/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/165hxvbKtmzZdg2w4Xy7Uo8Pp1Nb_5amh/view?usp=sharing",
},

{
  id: "kristen-wiig",
  type: "scriptwriting",
  title: "Kristen Wiig",
  niche: "Celebrity Biographies",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1M9F4eyJArHRUfFegAaOXNZKL_YBYlBgM/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/165hxvbKtmzZdg2w4Xy7Uo8Pp1Nb_5amh/view?usp=sharing",
},

{
  id: "julia-roberts",
  type: "scriptwriting",
  title: "Julia Roberts",
  niche: "Celebrity Biographies",
  client: "NDA",
  doc: "https://docs.google.com/document/d/17t9IZrhVy4QCU4KlJrPSgKXcoLuFY9ax/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/165hxvbKtmzZdg2w4Xy7Uo8Pp1Nb_5amh/view?usp=sharing",
},
       {
  id: "unraveling-the-twisted-truth-of-dream-the-mega-famous-facele",
  type: "scriptwriting",
  title: "Unraveling The Twisted Truth Of Dream_ The Mega Famous Faceless YouTuber",
  niche: "Celebrity Drama",
  client: "The Plug",
  doc: "https://docs.google.com/document/d/1s84Bb_SFU5QkajU7LigHVGniaw5LpxLR/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "why-amber-heard-s-career-is-dead-for-good",
  type: "scriptwriting",
  title: "Why Amber Heard's Career Is DEAD For Good",
  niche: "Celebrity Drama",
  client: "The Plug",
  doc: "https://docs.google.com/document/d/1C0-Ft7kSosbXcATMclYTlUs-Dcq_oaRR/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "the-tragic-truth-about-johnny-depp-s-relationship-with-amber",
  type: "scriptwriting",
  title: "The Tragic Truth About Johnny Depp’s Relationship With Amber Heard",
  niche: "Celebrity Drama",
  client: "The Plug",
  doc: "https://docs.google.com/document/d/1Ox1kOAyroBUhrllsqKZV0AK40fs5MXDK/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "the-smith-family-deserves-their-failure",
  type: "scriptwriting",
  title: "The Smith Family Deserves Their Failure",
  niche: "Celebrity Drama",
  client: "The Plug",
  doc: "https://docs.google.com/document/d/1rtnpAI5m19lJQR_lJWtgfzkWBRIOD2RY/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "the-rise-and-fall-of-simon-leviev-the-manipulator-conman-who",
  type: "scriptwriting",
  title: "The Rise and Fall of Simon Leviev_ The manipulator Conman who scammed millions out of women",
  niche: "Celebrity Drama",
  client: "The Plug",
  doc: "https://docs.google.com/document/d/1tJGW3RZdP5i2o-BVEWORrW1NUmAhtfh3/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "the-mysterious-fall-of-roy-purdy",
  type: "scriptwriting",
  title: "The Mysterious Fall of Roy Purdy",
  niche: "Celebrity Drama",
  client: "The Plug",
  doc: "https://docs.google.com/document/d/19ysRsZ9j3br6QqJe3724osUIxHZHPNvk/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "mood-gossip-124",
  type: "scriptwriting",
  title: "Mood Gossip #124",
  niche: "Celebrity Drama",
  client: "Mood Gossip",
  doc: "https://docs.google.com/document/d/16XcwP1_-VF5asZrVgRwAloxc28AQNG_j/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "mood-gossip-125",
  type: "scriptwriting",
  title: "Mood Gossip #125",
  niche: "Celebrity Drama",
  client: "Mood Gossip",
  doc: "https://docs.google.com/document/d/1p46-ai-XQ5MEEJ5xZcS7cif5D6IfZtGx/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "mood-gossip-126",
  type: "scriptwriting",
  title: "Mood Gossip #126",
  niche: "Celebrity Drama",
  client: "Mood Gossip",
  doc: "https://docs.google.com/document/d/1MzCtdvUfhCEZpVMo0ExBgM-JHcKx8Hoz/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "mood-gossip-127",
  type: "scriptwriting",
  title: "Mood Gossip #127",
  niche: "Celebrity Drama",
  client: "Mood Gossip",
  doc: "https://docs.google.com/document/d/1ZuW2OjA_fpqtwUwqcN-ossnONiwfKQ4A/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "mood-gossip-128",
  type: "scriptwriting",
  title: "Mood Gossip #128",
  niche: "Celebrity Drama",
  client: "Mood Gossip",
  doc: "https://docs.google.com/document/d/1ptlfPxSfp9GN563i8NiEqX9FOD700YFq/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "the-dark-side-of-millie-bobby-brown-s-past",
  type: "scriptwriting",
  title: "The Dark Side of Millie Bobby Brown’s Past",
  niche: "Celebrity Drama",
  client: "Miss Petty",
  doc: "https://docs.google.com/document/d/1ezZ29pBTM2BKTSIg7rlQSlQp5GGIAWjO/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "the-full-khloe-kardashian-and-tristan-relationship",
  type: "scriptwriting",
  title: "The Full Khloe Kardashian & Tristan ‘Relationship’",
  niche: "Celebrity Drama",
  client: "Miss Petty",
  doc: "https://docs.google.com/document/d/1F15byHi7GjQjXdh6e-dYaA64KQ8bdJTu/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "ariana-grande-s-rise-to-fame-is-much-darker-than-you-think",
  type: "scriptwriting",
  title: "Ariana Grande’s Rise To Fame Is Much Darker Than You Think…",
  niche: "Celebrity Drama",
  client: "Miss Petty",
  doc: "https://docs.google.com/document/d/1pu4Rqv_HdZCN65nN-KAU46Hh0BamV7J1/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "amber-heard-and-johnny-depp-timeline",
  type: "scriptwriting",
  title: "Amber Heard and Johnny Depp Timeline",
  niche: "Celebrity Drama",
  client: "Miss Petty",
  doc: "https://docs.google.com/document/d/1GqOLxbZp7Qnkoh64ETQsANERWXOg4xj2/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "kanye-west-s-descent-into-madness",
  type: "scriptwriting",
  title: "Kanye West’s Descent Into Madness",
  niche: "Celebrity Drama",
  client: "Miss Petty",
  doc: "https://docs.google.com/document/d/1bDO3FqS81o2P-OojJl_w2tg-2AY71yes/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "young-thug-lyrics-put-him-in-court",
  type: "scriptwriting",
  title: "Young Thug lyrics put him in court",
  niche: "Celebrity Drama",
  client: "NDA",
  doc: "https://docs.google.com/document/d/13HHMIZh-oUEhDi8RQze_oTNsKbgahhNZ/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "tiktoker-beats-her-daughter-to-death",
  type: "scriptwriting",
  title: "TikToker Beats Her Daughter To Death",
  niche: "Celebrity Drama",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1-QwYNqx-1MkOHzBwsS0AATwEBr8vQntq/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "rotting-in-jail-for-allegedly-assaulting-and-drugging-60-wom",
  type: "scriptwriting",
  title: "Rotting In Jail for Allegedly Assaulting & drugging 60 women",
  niche: "Celebrity Drama",
  client: "True Story SC",
  doc: "https://docs.google.com/document/d/1gjZNSKpPz2siuKapKwXP15hVGm3dL5aG/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "bizarre-celeb-conspiracy-theories-celebs-in-cults",
  type: "scriptwriting",
  title: "Bizarre celeb conspiracy theories__Celebs in cults",
  niche: "Celebrity Drama",
  client: "True Story SC",
  doc: "https://docs.google.com/document/d/1G9oeHgbEz4WwR88cPZXYD1Cxd93G9LSK/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "chris-rock-reignites-beef-with-will-smith",
  type: "scriptwriting",
  title: "Chris Rock reignites beef with Will Smith",
  niche: "Celebrity Drama",
  client: "True Story SC",
  doc: "https://docs.google.com/document/d/1qrRqA8l1R0HZf9GlAyMbXjfkrLOrf7O4/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "how-hailey-and-selena-became-rivals",
  type: "scriptwriting",
  title: "How Hailey and Selena Became Rivals",
  niche: "Celebrity Drama",
  client: "True Story SC",
  doc: "https://docs.google.com/document/d/1hzWjCFKoz2rfSHq6pjuPpkBnsiM2KUha/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "i-am-madeline-mccann",
  type: "scriptwriting",
  title: "I am Madeline McCann",
  niche: "Celebrity Drama",
  client: "True Story SC",
  doc: "https://docs.google.com/document/d/1WNyVIgj6CKv7H_cOQNpDHwv8aznCxOjY/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "jalied-stephen-bear-loses-only-fans-empire",
  type: "scriptwriting",
  title: "Jalied, Stephen Bear Loses Only Fans Empire",
  niche: "Celebrity Drama",
  client: "True Story SC",
  doc: "https://docs.google.com/document/d/1XZ0ND-Nh0jjK_EjWfwilmt_GVjyeXj7h/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "movie-star-turned-cannibal-breaks-silence",
  type: "scriptwriting",
  title: "Movie Star-Turned Cannibal Breaks Silence",
  niche: "Celebrity Drama",
  client: "True Story SC",
  doc: "https://docs.google.com/document/d/1ffHRZ1zr07YzmOojoYzyPqA9YyLrByBW/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},


{
  id: "the-superman-star-charged-for-sex-trafficking",
  type: "scriptwriting",
  title: "The Superman Star Charged For Sex Trafficking",
  niche: "Celebrity Drama",
  client: "True Story SC",
  doc: "https://docs.google.com/document/d/1_6VrdG_FIRlRYAG4QeqkKLpVcZGMUpzv/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1cVXB9QFp85mszP3VWAp2cHIxqxGDVp4-/view?usp=sharing",
},



       {
  id: "stevie-ray-vaughan-helicopter-crash-1990",
  type: "scriptwriting",
  title: "Stevie ray vaughan helicopter crash 1990",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1krPnQYz73aAt70N07Zqn8-bQwzFkn5MQ/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "nh-hiker-found-dead",
  type: "scriptwriting",
  title: "NH Hiker Found DEAD!",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1fiZWRTezPIm7hi-35ukFXvM27ySATQDJ/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "naya-rivera-glee-drowning-accident-2020",
  type: "scriptwriting",
  title: "Naya rivera glee drowning accident 2020",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/18D4e4fzY1JqimxWVGSaVWjDTXFu8BOLz/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "alexis-martinez-orca-attack",
  type: "scriptwriting",
  title: "Alexis Martinez Orca attack",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1klw4cCxM02zrNoCLayXtZ0Os2VYV7WqE/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "colin-mcrae-helicopter-crash",
  type: "scriptwriting",
  title: "Colin Mcrae helicopter crash",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1WwfP5nWcnsTos3pcFbN0yZWWVjZ-egrA/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "craig-breen-rally-incident",
  type: "scriptwriting",
  title: "Craig Breen rally incident",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1mcnnKUfHEWz9fyVIkWmzsuUlKvZWZAeg/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "emiliano-sala-plane-crash",
  type: "scriptwriting",
  title: "Emiliano Sala plane crash",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1TDf729OzhTlo0L5suB8T-M8y7BHyo-Ay/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "gigi-wu-bikini-hiker",
  type: "scriptwriting",
  title: "Gigi Wu bikini hiker",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1OEXQBHgubDBjBPrqgkCKqtrR6DR7CXO4/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "about-the-dissappearence-of-michael-matthews-on-everest",
  type: "scriptwriting",
  title: "About the dissappearence of Michael Matthews on Everest",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1IJTDaQBRL4ek8LUINQHISr_PEXi07SDo/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "he-survived-the-deadliest-avalanche-on-everest",
  type: "scriptwriting",
  title: "He survived the deadliest avalanche on Everest.",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1ltDj4fc1PhJXoArtvSLpRaZxN5qozmjX/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "john-dillinger-the-rise-and-fall-of-public-enemy-number-1",
  type: "scriptwriting",
  title: "John Dillinger _ The Rise & Fall of Public Enemy Number 1",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1pwgSU5etrVppi7I0O_DBRCmpFA9r9vlv/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},

{
  id: "alibaba",
  type: "scriptwriting",
  title: "AliBaba",
  niche: "Long Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/12nZt_OSEybPhd1jPyvHzK6ljPzLVsKJg/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/18ylnhmLs__f_jRtOcAUE2NCLKWEkEY3S/view?usp=sharing",
},
       {
  id: "what-if-you-were-the-size-of-an-insect-2",
  type: "scriptwriting",
  title: "What if you were the size of an insect",
  niche: "Stickman/Explainer",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1IJAlDXLSubj4gBLbTfLdcwtSvOnJ7am1&usp=drive_copy",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "what-if-humans-were-born-on-different-planets-2",
  type: "scriptwriting",
  title: "What if humans were born on different planets",
  niche: "Stickman/Explainer",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1S4P9CZaS8LiQvoUgiYO782XzCXBDFX6x&usp=drive_copy",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "could-you-survive-a-nanosecond-outside-the-universe-2",
  type: "scriptwriting",
  title: "Could you survive a nanosecond outside the universe",
  niche: "Stickman/Explainer",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1e8C2Gq4rWSyPNNMszEGhl8e03Fju3hEL&usp=drive_copy",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "how-long-would-it-take-you-to-count-to-tredecillion-2",
  type: "scriptwriting",
  title: "How long would it take you to count to Tredecillion",
  niche: "Stickman/Explainer",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1Gb4s9sgyVZOFWieAUWxwzUKm0kARXIVk&usp=drive_copy",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "if-all-humans-died-how-long-until-earth-erased-every-trace-o-2",
  type: "scriptwriting",
  title: "If all humans died, how long until earth erased every trace of us",
  niche: "Stickman/Explainer",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1ACobeehUDK5vxsfE0PrWeuT2h0MPBwjq&usp=drive_copy",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "what-getting-killed-by-a-hydraulic-press-feels-like-2",
  type: "scriptwriting",
  title: "What Getting Killed by a Hydraulic Press Feels Like",
  niche: "Stickman/Explainer",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1NN4oasbp10r6TLYE06TPGF4KSjGLAe6C&usp=drive_copy",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "what-if-a-1cm-black-hole-appeared-in-your-room-2",
  type: "scriptwriting",
  title: "What if a 1cm black hole appeared in your room",
  niche: "Stickman/Explainer",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1w4hqYtF1_MNzkKvPc6m4VNJiBYIbd8Vh&usp=drive_copy",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "what-if-all-nukes-were-launched-at-the-moon-2",
  type: "scriptwriting",
  title: "What if all nukes were launched at the moon",
  niche: "Stickman/Explainer",
  client: "Yappa YT",
  doc: "https://drive.google.com/open?id=1wVHor7RgpoM5TPQ2gQ-3pDuYSZ0WX2KV&usp=drive_copy",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "weirdest-fears-you-never-knew-existed-in-under-x-minutes",
  type: "scriptwriting",
  title: "Weirdest Fears You Never Knew Existed In Under X Minutes",
  niche: "Stickman/Explainer",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1mWWOthdaQflTjDwExKbvk1_hUlcsZbJc/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "what-actually-happens-at-the-cia",
  type: "scriptwriting",
  title: "What Actually Happens at the CIA",
  niche: "Stickman/Explainer",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1TebCO8rMh_H0YkqLtt7kJUVc-N8f_UHF/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "what-it-s-like-to-be-every-hells-angels-level",
  type: "scriptwriting",
  title: "What It’s Like To Be Every Hells Angels Level",
  niche: "Stickman/Explainer",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1kEp-eRApsTC0rAx4eKOhwKyUCTMPXqVM/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "the-7-deadly-sins",
  type: "scriptwriting",
  title: "The 7 Deadly Sins",
  niche: "Stickman/Explainer",
  client: "NDA",
  doc: "https://docs.google.com/document/d/14l2d68HjmIakj6blu677-WOsMnfpbOti/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "leaving-the-us-stick-figure",
  type: "scriptwriting",
  title: "Leaving The US (Stick Figure)",
  niche: "Stickman/Explainer",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1e-ZUoY9T8ggreGHa0vpEPjoi7rxdaewm/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "how-the-us-electoral-system-works",
  type: "scriptwriting",
  title: "How the US electoral system works",
  niche: "Stickman/Explainer",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1ireeqziYJop3-eSglipgV3iLq3LhiUZV/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "animal-and-their-legs",
  type: "scriptwriting",
  title: "Animal and Their Legs",
  niche: "Stickman/Explainer",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1hUM4cRVLRt6sXv2LvwUwfnipfniYwFCN/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "every-crazy-disorders-that-give-you-superpowers-explained-in",
  type: "scriptwriting",
  title: "Every Crazy Disorders That Give You Superpowers Explained in X Minutes",
  niche: "Stickman/Explainer",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1-7HTwFxVpRY1NslwS4RTJGDNMNBOP2Vu/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},

{
  id: "every-weirdest-phobia-explained-in-x-minutes",
  type: "scriptwriting",
  title: "Every Weirdest Phobia Explained in X Minutes",
  niche: "Stickman/Explainer",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1TJPusmrW7pyd5hydJhRmm00WQbTmwGr1/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1kIf552n4XGcl3o7lXQQAzw8XlVFqmQ01/view?usp=sharing",
},
       {
  id: "why-you-ll-never-be-rich-working-for-someone-else",
  type: "scriptwriting",
  title: "Why You'll Never Be Rich Working for Someone Else?",
  niche: "Financial Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1QZhe4xjenxvd7K0azJ0uruLhcYUzu28s/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1GGkILwQMFuAjJCH8cMQkPe-GM9t58rE8/view?usp=sharing",
},

{
  id: "why-has-tesla-s-stock-price-skyrocketed-2",
  type: "scriptwriting",
  title: "Why has Tesla's stock price skyrocketed",
  niche: "Financial Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1ausHMr0duZ6JKSK9ac6nFsJ081PCUHUs/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1GGkILwQMFuAjJCH8cMQkPe-GM9t58rE8/view?usp=sharing",
},

{
  id: "warren-buffett-is-totally-crushing-it-this-year",
  type: "scriptwriting",
  title: "Warren Buffett is totally crushing it this year",
  niche: "Financial Documentaries",
  client: "InvestorInsights YT",
  doc: "https://docs.google.com/document/d/1qiNOcrt5BVTgJbKsrFHOvMLRj4vYb7e7/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1GGkILwQMFuAjJCH8cMQkPe-GM9t58rE8/view?usp=sharing",
},

{
  id: "think-canada-is-the-united-states-1-ally-think-again",
  type: "scriptwriting",
  title: "Think CANADA Is the United States' #1 Ally_ Think Again...",
  niche: "Financial Documentaries",
  client: "InvestorInsights YT",
  doc: "https://docs.google.com/document/d/1q1qjti2xk0ZPNHbUIP5yEDLo-W3jPp3s/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1GGkILwQMFuAjJCH8cMQkPe-GM9t58rE8/view?usp=sharing",
},

{
  id: "7-horsemen-of-the-coming-stock-market-apocalypse",
  type: "scriptwriting",
  title: "7 Horsemen of The Coming Stock Market Apocalypse",
  niche: "Financial Documentaries",
  client: "InvestorInsights YT",
  doc: "https://docs.google.com/document/d/1h7YMuh_5s9ghCIz_prf61hymH7-riC_f/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1GGkILwQMFuAjJCH8cMQkPe-GM9t58rE8/view?usp=sharing",
},

{
  id: "dirty-rotten-liars",
  type: "scriptwriting",
  title: "Dirty Rotten Liars",
  niche: "Financial Documentaries",
  client: "InvestorInsights YT",
  doc: "https://docs.google.com/document/d/1B2WLJgUe7jzOaoQk_NjXkdGfpJMSUZ5-/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1GGkILwQMFuAjJCH8cMQkPe-GM9t58rE8/view?usp=sharing",
},

{
  id: "do-you-own-nvidia-look-out",
  type: "scriptwriting",
  title: "Do You Own Nvidia_ LOOK OUT!",
  niche: "Financial Documentaries",
  client: "InvestorInsights YT",
  doc: "https://docs.google.com/document/d/1vvNDIsePeC4H_ECvZFERJ5LZXHcoPeHJ/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1GGkILwQMFuAjJCH8cMQkPe-GM9t58rE8/view?usp=sharing",
},

{
  id: "ray-dalio-s-last-warning",
  type: "scriptwriting",
  title: "Ray Dalio’s Last Warning",
  niche: "Financial Documentaries",
  client: "InvestorInsights YT",
  doc: "https://docs.google.com/document/d/1aFUeQuiuffFREQS6q3IGiNUKG3Ih7Y3_/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1GGkILwQMFuAjJCH8cMQkPe-GM9t58rE8/view?usp=sharing",
},

{
  id: "the-french-taxes-crisis-are-we-working-just-to-survive-2",
  type: "scriptwriting",
  title: "The French Taxes Crisis_ Are We Working Just to Survive",
  niche: "Financial Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1MSYRWshDfH_rPYwl6zj1FvzbnFX6SvEw/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1GGkILwQMFuAjJCH8cMQkPe-GM9t58rE8/view?usp=sharing",
},

{
  id: "there-s-a-devil-in-the-dow-the-stock-market-crash-of-2025",
  type: "scriptwriting",
  title: "There’s A Devil in the Dow_ The Stock Market Crash of 2025",
  niche: "Financial Documentaries",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1eYZ8xHb_IVZdRxLf5APTgPqq8HmbwCho/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1GGkILwQMFuAjJCH8cMQkPe-GM9t58rE8/view?usp=sharing",
},
       {
  id: "ashley-renee-sines",
  type: "scriptwriting",
  title: "Ashley Renee Sines",
  niche: "FOIA",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1ZxEmop204ZDDB7hj9fdrcld6Oqzve5--/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1FgS1REM0_2Wm4UbHNdGSpsImrp2PCI3S/view?usp=sharing",
},

{
  id: "aurora-rodriguez",
  type: "scriptwriting",
  title: "Aurora Rodriguez",
  niche: "FOIA",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1el3s3MIrk8IzbogUz9nwVLgtPEhr2Pdz/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1FgS1REM0_2Wm4UbHNdGSpsImrp2PCI3S/view?usp=sharing",
},

{
  id: "christopher-marvan",
  type: "scriptwriting",
  title: "Christopher Marvan",
  niche: "FOIA",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1jOICMN-Ybhj2RMpDUfiqlC_YP-BPFTwQ/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1FgS1REM0_2Wm4UbHNdGSpsImrp2PCI3S/view?usp=sharing",
},

{
  id: "jamal-hudson",
  type: "scriptwriting",
  title: "Jamal Hudson",
  niche: "FOIA",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1g4F-vYEFZlszOwT9M7nzDSQQmVV8FWS6/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1FgS1REM0_2Wm4UbHNdGSpsImrp2PCI3S/view?usp=sharing",
},

{
  id: "laritza-villa",
  type: "scriptwriting",
  title: "Laritza Villa",
  niche: "FOIA",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1e5V3V_BPAM08Si2ZzbdTGPtn7mqFS1lx/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1FgS1REM0_2Wm4UbHNdGSpsImrp2PCI3S/view?usp=sharing",
},

{
  id: "michael-broom",
  type: "scriptwriting",
  title: "Michael Broom",
  niche: "FOIA",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1Eyyn02WXhsdldhNU5Do3uuXqdDspqe_v/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1FgS1REM0_2Wm4UbHNdGSpsImrp2PCI3S/view?usp=sharing",
},

{
  id: "nakeiva-smith",
  type: "scriptwriting",
  title: "Nakeiva Smith",
  niche: "FOIA",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1SIh4kP8brzIrOXUQRdDat6E3eEanB_PB/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1FgS1REM0_2Wm4UbHNdGSpsImrp2PCI3S/view?usp=sharing",
},

{
  id: "samuel-muslair",
  type: "scriptwriting",
  title: "Samuel Muslair",
  niche: "FOIA",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1RksQdRZJASLL7g2iyd0yWJMKV1It5FQ5/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1FgS1REM0_2Wm4UbHNdGSpsImrp2PCI3S/view?usp=sharing",
},

{
  id: "stephanie-williams",
  type: "scriptwriting",
  title: "Stephanie Williams",
  niche: "FOIA",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1Pg6Q9SF5eaUAPbh-jnKPtb_f78c3Ye73/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1FgS1REM0_2Wm4UbHNdGSpsImrp2PCI3S/view?usp=sharing",
},

{
  id: "ted-stokes",
  type: "scriptwriting",
  title: "Ted Stokes",
  niche: "FOIA",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1DgW7RnxH84uxTXr1mJ30qezwTw_qYRhl/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1FgS1REM0_2Wm4UbHNdGSpsImrp2PCI3S/view?usp=sharing",
},
       {
  id: "what-scientists-just-discovered-at-the-grand-canyon-terrifie",
  type: "scriptwriting",
  title: "What Scientists Just Discovered At The Grand Canyon TERRIFIES The Whole World",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1uc_Oa-p8eXasSkkPlSdfRX19KkZdmNYq/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "when-streamers-realize-there-s-a-swat-team-at-their-door",
  type: "scriptwriting",
  title: "When Streamers Realize There's a SWAT Team at Their Door",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1GSdwFK43AozY6cYOMc1L5OR4CUnJSuG7/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "top-ten-prohibited-secret-area-no-human-is-allowed-to-visit-2",
  type: "scriptwriting",
  title: "Top Ten Prohibited / Secret Area No Human Is Allowed To Visit",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/19QpoiVLLs9ATHN1C_BeyWY3-SNhfIZRk/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "top-reactions-of-innocent-convicts-set-free",
  type: "scriptwriting",
  title: "Top Reactions Of INNOCENT Convicts Set Free",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1nsUroA4q4wcl_AwZ3PG0lR5VhKgZm4nm/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "the-plane-that-landed-with-92-skeletons-on-board",
  type: "scriptwriting",
  title: "The Plane That Landed with 92 Skeletons on Board!",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1u8N1FmtBAchLt5Uwju8F94a3jQXPDWQG/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "10-mariana-trench-creatures-that-are-scarier-than-megalodon",
  type: "scriptwriting",
  title: "10 Mariana Trench Creatures That Are Scarier Than Megalodon",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1Spy84KS4VnH6cVLoT_yuWuZw1HXMpJYB/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "real-life-human-giants-that-really-exist",
  type: "scriptwriting",
  title: "Real Life Human Giants That Really Exist",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1iJxwC4fFpVpsYk6KNUb06K0Mh8QR0cuU/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "strongest-kids-you-won-t-believe-exist",
  type: "scriptwriting",
  title: "Strongest Kids You Won't Believe Exist",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1p9XFQnF-jFoqDL3eceCJZFQXrWDM8IxW/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "super-hero-gadgets-you-can-actually-buy",
  type: "scriptwriting",
  title: "Super Hero Gadgets You Can Actually Buy",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1JKmlFRtXRB5gS5Bge8t_qF8A08TZ09mM/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "terrifying-things-recovered-from-the-titanic",
  type: "scriptwriting",
  title: "Terrifying Things Recovered from the Titanic!",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1UdiJpSP2sFVMNiF2SUD6yS3omFFki5gs/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "the-fastest-robots-in-the-world",
  type: "scriptwriting",
  title: "The Fastest Robots in The World",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1xYk-tfBqgzEH_ailcV8hYL8uIVQftZBT/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "james-webb-telescope-2",
  type: "scriptwriting",
  title: "James Webb Telescope",
  niche: "Tech",
  client: "NDA",
  doc: "https://drive.google.com/file/d/1xyRTU6fpydtxfu-WzWMGWhI-g-hfDfaQ/view?usp=drive_web",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "blue-origin-next-gen-engine",
  type: "scriptwriting",
  title: "Blue Origin Next Gen Engine",
  niche: "Tech",
  client: "NDA",
  doc: "https://drive.google.com/file/d/1FHeYsBqD4sJ6PRdi32H1UplOoDlJDbTO/view?usp=drive_web",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "elon-musk-people-don-t-realize-what-s-coming",
  type: "scriptwriting",
  title: "Elon Musk - People Don't Realize What's Coming",
  niche: "Tech",
  client: "NDA",
  doc: "https://drive.google.com/file/d/1plvlp-JMes9vOjwmXK7NnFunKqkykdF5/view?usp=drive_web",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "how-will-elon-musk-s-starship-land-on-mars",
  type: "scriptwriting",
  title: "How Will Elon Musk's Starship Land On Mars",
  niche: "Tech",
  client: "NDA",
  doc: "https://drive.google.com/file/d/19lRFITWjUL27Jwp_8rDFvPs_WbQIKrWk/view?usp=drive_web",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "how-will-people-live-in-spacex-starship",
  type: "scriptwriting",
  title: "How will people live in SpaceX Starship",
  niche: "Tech",
  client: "NDA",
  doc: "https://drive.google.com/file/d/1eyMeubpHer1auhVj8YyYYi4RGjIu0C3a/view?usp=drive_web",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "tesla-has-competition",
  type: "scriptwriting",
  title: "Tesla Has Competition",
  niche: "Tech",
  client: "NDA",
  doc: "https://drive.google.com/file/d/1SYGXh7eUbc8A2iU5_REsA8UIb1hMO105/view?usp=drive_web",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "why-has-tesla-s-stock-price-skyrocketed-3",
  type: "scriptwriting",
  title: "Why has Tesla's stock price skyrocketed",
  niche: "Tech",
  client: "NDA",
  doc: "https://drive.google.com/file/d/1IgovXYZ_HlbKmfE2e-1AO73FGllPaI2p/view?usp=drive_web",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "tesla-s-autopilot-is-it-completely-safe",
  type: "scriptwriting",
  title: "Tesla’s Autopilot - Is It Completely Safe",
  niche: "Tech",
  client: "NDA",
  doc: "https://drive.google.com/file/d/1QOZYlAim15XyuaVBJNsg0IkDbKn-hqNP/view?usp=drive_web",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},

{
  id: "tesla-autopilot-avoids-crashes",
  type: "scriptwriting",
  title: "Tesla Autopilot Avoids Crashes",
  niche: "Tech",
  client: "NDA",
  doc: "https://docs.google.com/document/d/10ZfHiCkx7fm98UD_fjMkHHzHMOzvZok8/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/1J3KWyx95I6vUHliGvV2W27LOLHRozpPF/view?usp=sharing",
},
{
  id: "i-explained-everything-you-need-to-know-before-avengers-doom",
  type: "scriptwriting",
  title: "I Explained EVERYTHING You Need to Know Before Avengers Doomsday in Just 15 Minutes",
  niche: "Marvel-DC",
  client: "Silver Screen Hero",
  doc: "https://docs.google.com/document/d/1L3TcyYE1sxIiZ1O98UxfxRQ7N4BrFkOB/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/11yTXOhcX45UVBodKWA1kJacPlcVzPsyn/view?usp=sharing",
},

{
  id: "most-hated-vs-most-loved-funny-mcu-characters",
  type: "scriptwriting",
  title: "Most Hated Vs Most Loved Funny MCU Characters",
  niche: "Marvel-DC",
  client: "Silver Screen Hero",
  doc: "https://docs.google.com/document/d/1Lio6f3Q8GYF-Y2IwnhKGz5OKzmrreydb/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/11yTXOhcX45UVBodKWA1kJacPlcVzPsyn/view?usp=sharing",
},

{
  id: "most-hated-vs-most-loved-mcu-villains",
  type: "scriptwriting",
  title: "Most Hated Vs Most Loved MCU Villains",
  niche: "Marvel-DC",
  client: "Silver Screen Hero",
  doc: "https://docs.google.com/document/d/1WEceZpVpZK4SwByvapQVHD2WGR8G7JrF/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/11yTXOhcX45UVBodKWA1kJacPlcVzPsyn/view?usp=sharing",
},

{
  id: "the-biggest-issue-with-james-gunn-s-stories",
  type: "scriptwriting",
  title: "The BIGGEST Issue with James Gunn’s Stories",
  niche: "Marvel-DC",
  client: "Silver Screen Hero",
  doc: "https://docs.google.com/document/d/1DO4KfnTZlmqleW-TfEcPLLzETH9L2S2Y/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/11yTXOhcX45UVBodKWA1kJacPlcVzPsyn/view?usp=sharing",
},

{
  id: "what-if-the-eternals-intervened",
  type: "scriptwriting",
  title: "What if the eternals intervened?",
  niche: "Marvel-DC",
  client: "NDA",
  doc: "https://docs.google.com/document/d/1O9bLLk8JNljYKUxx99vAyLf4jl_pEhBn/edit?usp=drive_link&ouid=112302339331626713297&rtpof=true&sd=true",
  image: "https://drive.google.com/file/d/11yTXOhcX45UVBodKWA1kJacPlcVzPsyn/view?usp=sharing",
},

{
  id: "doomsday-trailer-breakdown",
  type: "scriptwriting",
  title: "Doomsday Trailer Breakdown",
  niche: "Marvel-DC",
  client: "The Multiverse Index",
  doc: "https://docs.google.com/document/d/1Hq9XdGz5MENPLN4gNVjGWZwTKYTpOU1s26jwqlqy-5E/edit?usp=drive_link",
  image: "https://drive.google.com/file/d/11yTXOhcX45UVBodKWA1kJacPlcVzPsyn/view?usp=sharing",
},

{
  id: "the-history-and-origin-of-doctor-doom-in-comics-and-what-it",
  type: "scriptwriting",
  title: "The History & Origin of Doctor Doom in Comics (And What It Means for Avengers: Doomsday) – Part 1",
  niche: "Marvel-DC",
  client: "The Multiverse Index",
  doc: "https://docs.google.com/document/d/16TNfM-ndT0gln29WDJ0UXjU_DBskhj92RqO1RaAowpc/edit?usp=drive_link",
  image: "https://drive.google.com/file/d/11yTXOhcX45UVBodKWA1kJacPlcVzPsyn/view?usp=sharing",
},

{
  id: "everything-you-need-to-know-before-spider-man-brand-new-day",
  type: "scriptwriting",
  title: "Everything You Need To Know Before Spider-Man: Brand New Day",
  niche: "Marvel-DC",
  client: "The Multiverse Index",
  doc: "https://docs.google.com/document/d/1qGH0vbLAn2hu65MYjO5KvNeuAwaQ3NF9yxs9Epyvvs0/edit?usp=drive_link",
  image: "https://drive.google.com/file/d/11yTXOhcX45UVBodKWA1kJacPlcVzPsyn/view?usp=sharing",
},

{
  id: "why-the-dark-knight-still-works",
  type: "scriptwriting",
  title: "Why The Dark Knight Still Works",
  niche: "Marvel-DC",
  client: "The Multiverse Index",
  doc: "https://docs.google.com/document/d/1OcP2dNAxB8mCO8c6eu3aoKYBxqyaIuRA3uAjYXZOeM0/edit?usp=drive_link",
  image: "https://drive.google.com/file/d/11yTXOhcX45UVBodKWA1kJacPlcVzPsyn/view?usp=sharing",
},

{
  id: "what-if-superman-was-in-the-mcu-instead-of-dc",
  type: "scriptwriting",
  title: "What If Superman Was in the MCU Instead of DC?",
  niche: "Marvel-DC",
  client: "The Multiverse Index",
  doc: "https://docs.google.com/document/d/1zNpy51_mb0_f0wPz8jH69e0HJP168KCZMY0BtMbKhA8/edit?usp=drive_link",
  image: "https://drive.google.com/file/d/11yTXOhcX45UVBodKWA1kJacPlcVzPsyn/view?usp=sharing",
},
    /* ---------- Thumbnails ---------- */
    {
      id: "volleyball-sports-channel-thumbnails",
      type: "thumbnail",
      title: "VolleyBall Sports Channel Thumbnails",
      niche: "Sports",
      // client: "NovaTech Media",
      variants:[
  "assets/Thumbnails/Sports/Volley-Ball-Zone-Thumbnails/1.png",
  "assets/Thumbnails/Sports/Volley-Ball-Zone-Thumbnails/2.png",
  "assets/Thumbnails/Sports/Volley-Ball-Zone-Thumbnails/3.png",
  "assets/Thumbnails/Sports/Volley-Ball-Zone-Thumbnails/4.png",
  "assets/Thumbnails/Sports/Volley-Ball-Zone-Thumbnails/5.png",
  "assets/Thumbnails/Sports/Volley-Ball-Zone-Thumbnails/6.png",
  "assets/Thumbnails/Sports/Volley-Ball-Zone-Thumbnails/7.png",
  "assets/Thumbnails/Sports/Volley-Ball-Zone-Thumbnails/8.png",
  "assets/Thumbnails/Sports/Volley-Ball-Zone-Thumbnails/9.png",
  
  
      ],
      ctr: "10.8%",
      description: "Documentary-grade key art with cinematic color and single-focal-point composition."
    },
    {
      id: "ata-podcast-channel-thumbnails",
      type: "thumbnail",
      title: "ATA PodCast Channel Thumbnails",
      niche: "Podcast",
      // client: "Apex Athletics",
    variants:[
  "assets/Thumbnails/Podcast/ATA-PODCAST/1.png",
  "assets/Thumbnails/Podcast/ATA-PODCAST/2.png",
  "assets/Thumbnails/Podcast/ATA-PODCAST/3.png",
  "assets/Thumbnails/Podcast/ATA-PODCAST/4.png",
  "assets/Thumbnails/Podcast/ATA-PODCAST/5.png",
  "assets/Thumbnails/Podcast/ATA-PODCAST/6.png",
  "assets/Thumbnails/Podcast/ATA-PODCAST/7.png",
  "assets/Thumbnails/Podcast/ATA-PODCAST/8.png",
      ],
      ctr: "11.6%",
      description: "Transformation-focused frames — emotion-first faces, high-contrast grading, zero clutter."
    },
    {
      id: "dc-marvel-channel-thumbnails",
      type: "thumbnail",
      title: "DC-MARVEL Channel Thumbnails",
      niche: "DC-Marvel",
      // client: "Pixel Archives",
      variants:[
  "assets/Thumbnails/DC-MARVEL/1.png",
  "assets/Thumbnails/DC-MARVEL/2.png",
  "assets/Thumbnails/DC-MARVEL/3.png",
  "assets/Thumbnails/DC-MARVEL/4.png",
  "assets/Thumbnails/DC-MARVEL/5.png",
  "assets/Thumbnails/DC-MARVEL/6.png",
  "assets/Thumbnails/DC-MARVEL/7.png",
  "assets/Thumbnails/DC-MARVEL/8.png",
  "assets/Thumbnails/DC-MARVEL/9.png",
  "assets/Thumbnails/DC-MARVEL/10.png",
  "assets/Thumbnails/DC-MARVEL/11.png",
  "assets/Thumbnails/DC-MARVEL/12.png",

  
      ],
      ctr: "9.9%",
      description: "Story-driven key art that made non-gamers click — 48% of doc views came from browse."
    },
    {

      id: "fish-fanatic-channel-thumbnails",
      type: "thumbnail",
      title: "Fish Fanatic Channel Thumbnails ",
      niche: "Animation",
      // client: "Lumen Co.",
       variants:[
  "assets/Thumbnails/Animation/Fish-Fanatic/1.png",
  "assets/Thumbnails/Animation/Fish-Fanatic/2.png",
  "assets/Thumbnails/Animation/Fish-Fanatic/3.png",
  "assets/Thumbnails/Animation/Fish-Fanatic/4.png",
  "assets/Thumbnails/Animation/Fish-Fanatic/5.png",
  "assets/Thumbnails/Animation/Fish-Fanatic/6.png",
        ],
      ctr: "10.2%",
      description: "Data-forward compositions — one chart, one face, one number. CTR up 61% vs. previous designs."
    },
    {
      id: "superior-hvac-plumbing-water-thumbnail",
      type: "thumbnail",
      title: "Superior HVAC Plumbing Water Thumbnail",
      niche: "Services",
        variants:[
    "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/1.png",
  "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/2.png",
  "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/3.png",
  "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/4.png",
  "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/5.png",
  "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/6.png",
  "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/7.png",
  "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/8.png",
  "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/9.png",
    "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/10.png",
      "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/11.png",
        "assets/Thumbnails/Services/Superior-HVAC-Plumbing-Water/12.png"
  
        ],
      ctr: "9.4%",
      description: "Curiosity-gap compositions that make complex topics feel like one-click answers."
    },
    {id: "superior-hvac-repairing-channel-thumbnail",
      type: "thumbnail",
      title: "Superior HVAC Repairing Channel Thumbnail",
      niche: "Services",
        variants:[
    "assets/Thumbnails/Services/Superior-HVAC-Repairing/1.png",
  "assets/Thumbnails/Services/Superior-HVAC-Repairing/2.png",
  "assets/Thumbnails/Services/Superior-HVAC-Repairing/3.png",
  "assets/Thumbnails/Services/Superior-HVAC-Repairing/4.png",
  "assets/Thumbnails/Services/Superior-HVAC-Repairing/5.png",
  "assets/Thumbnails/Services/Superior-HVAC-Repairing/6.png",
  "assets/Thumbnails/Services/Superior-HVAC-Repairing/7.png",
  "assets/Thumbnails/Services/Superior-HVAC-Repairing/8.png",
  "assets/Thumbnails/Services/Superior-HVAC-Repairing/9.png"
  
        ],
      ctr: "9.4%",
      description: "Curiosity-gap compositions that make complex topics feel like one-click answers."
    },
  {id: "superior-water-purification-channel-thumbnail",
      type: "thumbnail",
      title: "Superior Water Purification Channel Thumbnail",
      niche: "Services",
        variants:[
    "assets/Thumbnails/Services/Superior-Water-Purification/1.png",
  "assets/Thumbnails/Services/Superior-Water-Purification/2.png",
  "assets/Thumbnails/Services/Superior-Water-Purification/3.png",
  "assets/Thumbnails/Services/Superior-Water-Purification/4.png",
  "assets/Thumbnails/Services/Superior-Water-Purification/5.png",
  "assets/Thumbnails/Services/Superior-Water-Purification/6.png",
  "assets/Thumbnails/Services/Superior-Water-Purification/7.png",
  "assets/Thumbnails/Services/Superior-Water-Purification/8.png",
  "assets/Thumbnails/Services/Superior-Water-Purification/9.png",
    "assets/Thumbnails/Services/Superior-Water-Purification/10.png",
      "assets/Thumbnails/Services/Superior-Water-Purification/11.png",
        "assets/Thumbnails/Services/Superior-Water-Purification/12.png",
          "assets/Thumbnails/Services/Superior-Water-Purification/13.png",
    
  
        ],
      ctr: "9.4%",
      description: "Curiosity-gap compositions that make complex topics feel like one-click answers."
    },
  {

      id: "kpop-demon-hunters-channel-thumbnails",
      type: "thumbnail",
      title: "KPOP Demon Hunters Channel Thumbnails ",
      niche: "Animation",
      // client: "Lumen Co.",
       variants:[
  "assets/Thumbnails/Animation/KPOP-Demon-Hunters/1.png",
  "assets/Thumbnails/Animation/KPOP-Demon-Hunters/2.png",
  "assets/Thumbnails/Animation/KPOP-Demon-Hunters/3.png",
  "assets/Thumbnails/Animation/KPOP-Demon-Hunters/4.png",
  "assets/Thumbnails/Animation/KPOP-Demon-Hunters/5.png",
  "assets/Thumbnails/Animation/KPOP-Demon-Hunters/6.png",
  "assets/Thumbnails/Animation/KPOP-Demon-Hunters/7.png",
  "assets/Thumbnails/Animation/KPOP-Demon-Hunters/8.png",
        ],
      },
  //  {
  //   id: "Volley-Ball-Zone-Thumbnails",
  //     type: "thumbnail",
  //     title: "KPOP Demon Hunters Channel Thumbnails ",
  //     niche: "Tech",
  //     // client: "Lumen Co.",
  //      variants:[
  // "assets/Thumbnails/Tech/Volley-Ball-Zone-Thumbnails/1.png",
  // "assets/Thumbnails/Tech/Volley-Ball-Zone-Thumbnails/2.png",
  // "assets/Thumbnails/Tech/Volley-Ball-Zone-Thumbnails/3.png",
  // "assets/Thumbnails/Tech/Volley-Ball-Zone-Thumbnails/4.png",
  // "assets/Thumbnails/Tech/Volley-Ball-Zone-Thumbnails/5.png",
  // "assets/Thumbnails/Tech/Volley-Ball-Zone-Thumbnails/6.png",
  // "assets/Thumbnails/Tech/Volley-Ball-Zone-Thumbnails/7.png",
  // "assets/Thumbnails/Tech/Volley-Ball-Zone-Thumbnails/8.png",
  //       ],
  //     },

    // Case Study//
      {
      id: "volleyball-zone",
      type: "CaseStudy",
      client: "Volleyball Zone",
      title: "From Dormant & Burning Ad Spend to a Monetized Volleyball Brand",
      niche: "Sports · Channel Growth",
      cover: "assets/cases-film/volleyball-zone/1.jpg",
      stats: ["5.1M views · 365 days", "+923% subs YoY", "10 slides"],
      slides: [
        "assets/cases-film/volleyball-zone/1.jpg",
        "assets/cases-film/volleyball-zone/2.jpg",
        "assets/cases-film/volleyball-zone/3.jpg",
        "assets/cases-film/volleyball-zone/4.jpg",
        "assets/cases-film/volleyball-zone/5.jpg",
        "assets/cases-film/volleyball-zone/6.jpg",
        "assets/cases-film/volleyball-zone/7.jpg",
        "assets/cases-film/volleyball-zone/8.jpg",
        "assets/cases-film/volleyball-zone/9.jpg",
        "assets/cases-film/volleyball-zone/10.jpg"
      ]
    },
    {
      id: "tmi-growth",
      type:"CaseStudy",
      client: "The Multiverse Index",
      title: "A Brand-New Channel Winning YouTube's Algorithm in 14 Months",
      niche: "Entertainment · Channel Launch",
      cover: "assets/cases-film/tmi-growth/1.jpg",
      stats: ["392.2K lifetime views", "97% new viewers", "8 slides"],
      slides: [
        "assets/cases-film/tmi-growth/1.jpg",
        "assets/cases-film/tmi-growth/2.jpg",
        "assets/cases-film/tmi-growth/3.jpg",
        "assets/cases-film/tmi-growth/4.jpg",
        "assets/cases-film/tmi-growth/5.jpg",
        "assets/cases-film/tmi-growth/6.jpg",
        "assets/cases-film/tmi-growth/7.jpg",
        "assets/cases-film/tmi-growth/8.jpg"
      ]
    }
  ],
 
  

  /* ============================================================
     SHOWREEL MARQUEE — the scrolling video strip under the hero.
     Drop your own short clips (mp4) into assets/clips/ and point
     to them here. Keep clips short (5-10s), they loop muted.
       orientation: "v" = vertical tile, "h" = horizontal tile
       platform:    small gold badge on the tile
       stats:       the little result pills at the tile bottom
     ============================================================ */
  marquee: [
    { clip: "assets/clips/reel-1.mp4", orientation: "v", platform: "TikTok",      stats: ["2M+ Views", "200K+ Likes"] },
    { clip: "assets/clips/reel-2.mp4", orientation: "h", platform: "YouTube",     stats: ["10M+ Views", "500K+ Subs"] },
    { clip: "assets/clips/reel-3.mp4", orientation: "v", platform: "Instagram",   stats: ["500K+ Views", "50K+ Shares"] },
    { clip: "assets/clips/reel-4.mp4", orientation: "h", platform: "Netflix",         stats: ["3M+ Views", "50K+ Comments"] },
    { clip: "assets/clips/reel-5.mp4", orientation: "v", platform: "Raw Footage", stats: ["1M+ Views", "50K+ Likes"] },
    { clip: "assets/clips/reel-6.mp4", orientation: "h", platform: "Edited",      stats: ["5M+ Views", "100K+ Likes"] },
    { clip: "assets/clips/reel-7.mp4", orientation: "v", platform: "Snapchat",    stats: ["800K+ Views", "90K+ Shares"] },
    { clip: "assets/clips/reel-8.mp4", orientation: "h", platform: "YouTube",     stats: ["12M+ Views", "700K+ Subs"] }
  ],

  /* ============================================================
     TRUSTED BY — client / agency logos in the slim scrolling strip.
     Drop each logo image into assets/clients/ (PNG or SVG with
     transparent background looks best) and add a line below.
     ============================================================ */
  clients: [
    { name: "WealthPath",       logo: "assets/clients/client-1.svg" },
    { name: "NovaTech Media",   logo: "assets/clients/client-2.svg" },
    { name: "Apex Athletics",   logo: "assets/clients/client-3.svg" },
    { name: "Midnight Files",   logo: "assets/clients/client-4.svg" },
    { name: "Lumen Co.",        logo: "assets/clients/client-5.svg" },
    { name: "The Deep Dive Pod",logo: "assets/clients/client-6.svg" },
    { name: "Courtside Clips",  logo: "assets/clients/client-7.svg" },
    { name: "LearnFast",        logo: "assets/clients/client-8.svg" }
  ],

  /* ============================================================
     TESTIMONIALS — your Upwork feedback screenshots.
     Screenshot a great review, drop it into assets/testimonials/,
     then add a line: shot (image path), client (name/label),
     project (what the job was), rating (1-5 stars shown on card).
     Clicking a card opens the full screenshot.
     ============================================================ */
  testimonials: [
    { shot: "assets/testimonials/review-1.png", client: "Upwork Client", project: "YouTube Automation Channel", rating: 5 },
    { shot: "assets/testimonials/review-2.png", client: "Upwork Client", project: "Documentary Edit + Thumbnails", rating: 5 },
    { shot: "assets/testimonials/review-3.png", client: "Upwork Client", project: "30 Shorts Monthly Retainer", rating: 5 },
    { shot: "assets/testimonials/review-4.png", client: "Upwork Client", project: "Channel Rebrand + Key Art", rating: 5 }
  ]
};
