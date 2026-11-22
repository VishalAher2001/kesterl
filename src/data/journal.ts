import {JournalArticle} from '../types';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    slug: 'restraint-as-competitive-moat',
    title: 'Restraint as a Competitive Moat in Oversaturated Digital Markets',
    category: 'Branding',
    excerpt:
      'Why category leaders are abandoning decorative UI noise in favor of disciplined typography, honest whitespace, and unmistakable hierarchy.',
    author: 'Clara Lindqvist',
    authorRole: 'Executive Creative Director',
    date: 'November 14, 2026',
    publishedAtISO: '2026-11-14',
    readingTime: '6 min read',
    image: '/src/assets/images/journal_editorial_desk_1795348876393.jpg',
    alt: 'Studio oak desk with printed Swiss grid typography specimens, matte black laptop, espresso cup, and brass lamp in daylight',
    featured: true,
    pullQuote:
      'When every competitor shouts with gradients, badges, and popups, calm architectural clarity becomes the loudest signal in the market.',
    keyTakeaways: [
      'Visual restraint lowers cognitive load and signals institutional maturity within milliseconds.',
      'Replacing decorative badges with strong typographic contrast improves scan speed by over 30%.',
      'Whitespace is not empty space—it is the structural frame that gives photography and headlines authority.',
    ],
    sections: [
      {
        heading: 'The Inflation of Visual Noise',
        paragraphs: [
          'Over the past five years, template culture and automated component kits compressed the visual distance between early-stage experiments and established category leaders. Nearly every SaaS and consumer landing page converged on the same ingredients: floating gradient blobs, stacked status pills, and hyper-dense feature grids.',
          'The unintended side effect is skepticism. Buyers browsing high-consideration products—whether precision industrial hardware or enterprise treasury software—subconsciously equate visual clutter with operational chaos. When a site tries to say twelve things above the fold, visitors retain none of them.',
        ],
      },
      {
        heading: 'Designing for Conviction Instead of Decoration',
        paragraphs: [
          'At Kestrel, our brand audits begin by subtracting rather than adding. We ask what single architectural statement, tactile photograph, and verifiable outcome earns the visitor’s attention in the first five seconds. Everything that does not actively clarify that promise is moved downstream or cut entirely.',
          'Typography carries the emotional weight when decoration steps back. Pairing a confident geometric display face with generous line-height body copy and disciplined hairline dividers creates rhythm without visual fatigue. The visitor feels guided rather than pursued.',
        ],
      },
      {
        heading: 'Commercial Returns of Quiet Authority',
        paragraphs: [
          'Restraint is frequently mistaken for minimalism-for-its-own-sake, yet our client telemetry consistently proves the opposite. Stripping away competing banners and redundant visual badges focuses every scroll stop onto one unambiguous action, raising qualified conversion rates while compressing sales cycles.',
        ],
      },
    ],
  },
  {
    id: 'art-2',
    slug: 'webgl-shaders-without-performance-tax',
    title: 'Atmospheric WebGL Shaders Without the Performance Tax',
    category: 'Technology',
    excerpt:
      'Engineering liquid-glass light refraction and organic film grain in GLSL while preserving 60fps mobile responsiveness and crisp legibility.',
    author: 'Henrik Vestergaard',
    authorRole: 'Principal Creative Technologist',
    date: 'November 04, 2026',
    publishedAtISO: '2026-11-04',
    readingTime: '7 min read',
    image: '/src/assets/images/project_aether_fintech_1795348876460.jpg',
    alt: 'Frosted optical glass prism refracting warm amber caustics alongside brushed steel cubes on matte plaster',
    pullQuote:
      'A background shader succeeds only when visitors feel subtle physical depth without noticing the technology rendering it.',
    keyTakeaways: [
      'Cap devicePixelRatio at 1.5 for ambient background shaders to cut fragment shading cost by 55%.',
      'Always respect prefers-reduced-motion by freezing time uniforms to a composed still frame.',
      'Keep luminance contrast soft behind hero typography so WCAG AA contrast never degrades.',
    ],
    sections: [
      {
        heading: 'Why Most Hero Shaders Fail in Production',
        paragraphs: [
          'Interactive WebGL canvases frequently look extraordinary on a studio workstation and collapse into battery-draining stutter on mid-tier laptops or mobile browsers. The culprit is rarely vertex geometry—it is almost always unthrottled full-resolution fragment loops executing expensive noise octaves on every pixel.',
          'Worse still, high-contrast procedural colors behind dark or light headlines routinely break readability halfway through an animation cycle, forcing visitors to squint as bright highlights sweep underneath body copy.',
        ],
      },
      {
        heading: 'Disciplined Fragment Budgets and Optical Restraint',
        paragraphs: [
          'For daylight agency environments, we treat GLSL shaders like architectural frosted glass rather than a laser show. Two octaves of smooth domain-warped simplex motion, modulated with a whisper-quiet chromatic shift and a deterministic high-frequency film grain pass, render comfortably under two milliseconds per frame.',
          'By keeping background brightness tightly bounded between 92% and 97% luminance, dark editorial typography maintains crisp 12:1 contrast across every phase of motion—delivering tactile atmosphere with zero readability penalty.',
        ],
      },
    ],
  },
  {
    id: 'art-3',
    slug: 'swiss-grids-in-fluid-viewports',
    title: 'Translating Swiss Grid Discipline to Fluid Multi-Breakpoint Viewports',
    category: 'Digital Design',
    excerpt:
      'How Josef Müller-Brockmann’s modular proportions inform modern CSS Grid architecture from 375px phones to 1600px studio displays.',
    author: 'Maya Deshmukh',
    authorRole: 'Design Systems Lead',
    date: 'October 22, 2026',
    publishedAtISO: '2026-10-22',
    readingTime: '5 min read',
    image: '/src/assets/images/journal_typography_print_1795348896424.jpg',
    alt: 'Fresh black letterpress Swiss typography proofs printed on heavy textured cotton paper under raking studio light',
    pullQuote:
      'A grid is not a cage for creativity; it is the shared mathematical tempo that makes asymmetric layouts feel inevitable.',
    keyTakeaways: [
      'Define typographic clamp() scales alongside container padding ratios rather than arbitrary pixel jumps.',
      'Asymmetric 7/5 and 8/4 splits sustain editorial tension far better than repetitive 50/50 cards.',
      'Mobile layouts must re-sequence hierarchy intentionally instead of mechanically shrinking desktop columns.',
    ],
    sections: [
      {
        heading: 'Beyond 12-Column Boilerplate',
        paragraphs: [
          'Modern CSS frameworks popularized twelve-column grids, yet most web implementations reduce them to symmetrical three-column card rows. True Swiss editorial grids rely on deliberate asymmetry—leaving structural columns open so headlines breathe and photography commands focal scale.',
          'When every element occupies the exact same rectangular container, the eye stops scanning. Introducing controlled scale contrast between wide 16:10 showcase frames and tall 3:4 portrait plates mirrors the pacing of an architectural monograph.',
        ],
      },
      {
        heading: 'Rebuilding Proportions for Handheld Screens',
        paragraphs: [
          'On mobile viewports, simply stacking desktop columns creates monotonous vertical tunnels. We re-order supporting metadata, tighten vertical section cadence, and preserve touch targets above 44 pixels so the editorial voice remains crisp without sacrificing thumb ergonomics.',
        ],
      },
    ],
  },
  {
    id: 'art-4',
    slug: 'choreographing-scroll-motion-with-lenis-gsap',
    title: 'Choreographing Scroll Motion That Serves Narrative Pacing',
    category: 'Technology',
    excerpt:
      'Synchronizing Lenis smooth scrolling with GSAP ScrollTrigger to create tactile weight without hijacking user intent.',
    author: 'Tomas Novak',
    authorRole: 'Senior Frontend Engineer',
    date: 'October 09, 2026',
    publishedAtISO: '2026-10-09',
    readingTime: '6 min read',
    image: '/src/assets/images/journal_motion_studio_1795348898535.jpg',
    alt: 'Creative director standing before a calibrated cinema monitor displaying minimalist white geometric motion paths in a concrete room',
    pullQuote:
      'Motion should clarify spatial transitions and reward curiosity—never delay access to primary information.',
    keyTakeaways: [
      'Animate only GPU-composited properties—transform, opacity, and clip-path—to prevent layout thrashing.',
      'Bind Lenis raf ticks directly to gsap.ticker so ScrollTrigger pin calculations remain pixel-accurate.',
      'Keep interactive micro-feedback under 200ms while reserving longer curves for large image reveals.',
    ],
    sections: [
      {
        heading: 'Respecting Scroll Momentum',
        paragraphs: [
          'Nothing frustrates a user faster than scroll-jacking that locks viewport movement behind forced animation timelines. Smooth scrolling should soften mechanical mouse-wheel steps while honoring trackpad inertia and keyboard PageDown navigation.',
          'Connecting Lenis directly into GSAP’s single requestAnimationFrame ticker guarantees that ScrollTrigger scrub positions never drift out of sync by a frame—eliminating the subtle jitter that plagues multi-loop implementations.',
        ],
      },
      {
        heading: 'The 200ms Rule for Controls',
        paragraphs: [
          'While large architectural photographs benefit from measured 700ms clip-path reveals, buttons, navigation links, and filter controls must respond instantaneously. Tightening interactive transitions to 160–200ms makes an editorial site feel sharp and responsive under rapid exploration.',
        ],
      },
    ],
  },
  {
    id: 'art-5',
    slug: 'tactile-photography-in-a-synthetic-era',
    title: 'Why Tactile Material Photography Outperforms Synthetic 3D Renders',
    category: 'Digital Design',
    excerpt:
      'In an era flooded with glossy CGI renders, natural daylight, stone grain, and human studio craft build immediate brand credibility.',
    author: 'Clara Lindqvist',
    authorRole: 'Executive Creative Director',
    date: 'September 27, 2026',
    publishedAtISO: '2026-09-27',
    readingTime: '5 min read',
    image: '/src/assets/images/journal_ceramic_craft_1795348896936.jpg',
    alt: 'Matte black geometric hardware prototypes and raw stoneware vessels resting on a pitted concrete studio bench by a sunlit window',
    pullQuote:
      'Micro-imperfections—porous travertine, raking morning shadow, linen weave—signal that a real human stands behind the product.',
    keyTakeaways: [
      'Consistent daylight direction across a portfolio unifies disparate client industries effortlessly.',
      'Physical material contrast pairs exceptionally well with stark, high-precision digital typography.',
      'Always author unique, scene-accurate ALT descriptions so visual craft translates to screen readers.',
    ],
    sections: [
      {
        heading: 'The Fatigue of Frictionless Surfaces',
        paragraphs: [
          'Synthetic floating spheres and iridescent glass blobs became shorthand for "innovation" across thousands of startups. Within months, audiences learned to tune them out as generic visual filler.',
          'Conversely, photographing physical materials—brushed aluminum, acoustic wool, unglazed stoneware, poured concrete—grounds a digital experience in sensory truth. Even software brands benefit when abstract capabilities are anchored by disciplined architectural still lifes.',
        ],
      },
      {
        heading: 'Cohesion Through Lighting Direction',
        paragraphs: [
          'Rather than forcing every brand into the same color palette, we unify multi-project portfolios through consistent lighting temperature and framing geometry. Natural side-lit daylight creates calm tonal continuity from hero banner down to case-study thumbnails.',
        ],
      },
    ],
  },
  {
    id: 'art-6',
    slug: 'designing-conversion-flows-for-high-ticket-b2b',
    title: 'Designing High-Trust Conversion Flows for Complex B2B Services',
    category: 'UX Strategy',
    excerpt:
      'Structuring project scoping forms, validation feedback, and proof adjacency so executive buyers actually complete the inquiry.',
    author: 'Soren Halvorsen',
    authorRole: 'Head of Strategy',
    date: 'September 11, 2026',
    publishedAtISO: '2026-09-11',
    readingTime: '7 min read',
    image: '/src/assets/images/journal_brutalist_stairwell_1795348895626.jpg',
    alt: 'Curving poured concrete architectural staircase with warm oak handrail illuminated by natural skylight',
    pullQuote:
      'An inquiry form is not an administrative hurdle—it is the first collaborative touchpoint a prospective client experiences with your team.',
    keyTakeaways: [
      'Place verifiable outcome metrics immediately adjacent to service claims rather than hiding them on a separate page.',
      'Validate inputs constructively on blur with human explanations—never cryptic error codes.',
      'Transparently surface budget ranges and expected response SLAs next to the submit button.',
    ],
    sections: [
      {
        heading: 'Why Generic "Contact Us" Pages Underperform',
        paragraphs: [
          'Most agency contact pages drop visitors onto an empty three-field box with zero context on engagement minimums, timelines, or who actually reads the message. Serious buyers hesitate because uncertainty feels risky.',
          'Adding structured project-type, budget-band, and target-timeline selectors accomplishes two things simultaneously: it signals how the studio operates while giving prospective clients confidence that their scope fits.',
        ],
      },
      {
        heading: 'Constructive Validation Builds Technical Credibility',
        paragraphs: [
          'If a user mistypes an email address or omits an area code, vague red outlines breed frustration. Clear inline guidance—explaining precisely what needs adjustment while preserving typed input—demonstrates the same attention to craft your clients expect in their own products.',
        ],
      },
    ],
  },
  {
    id: 'art-7',
    slug: 'architectural-wayfinding-for-editorial-commerce',
    title: 'Architectural Wayfinding: Lessons From Museums for Luxury E-Commerce',
    category: 'UX Strategy',
    excerpt:
      'Applying spatial gallery pacing to direct-to-consumer flagship stores so storytelling and conversion reinforce one another.',
    author: 'Maya Deshmukh',
    authorRole: 'Design Systems Lead',
    date: 'August 28, 2026',
    publishedAtISO: '2026-08-28',
    readingTime: '6 min read',
    image: '/src/assets/images/project_solis_audio_1795348876167.jpg',
    alt: 'Sculptural brushed aluminum loudspeaker on a low travertine bench inside a sunlit architectural concrete pavilion',
    pullQuote:
      'Great galleries never place a gift shop counter in the entrance lobby; they earn desire through calm spatial progression.',
    keyTakeaways: [
      'Sequence product detail pages around buyer questions: form, acoustic/material truth, specification, then acquisition.',
      'Keep variant selectors tactile and immediate without triggering disorienting full-page reloads.',
      'Pair editorial lookbooks with subtle persistent purchase triggers rather than aggressive discount overlays.',
    ],
    sections: [
      {
        heading: 'Pacing Desire Over Urgency Tricks',
        paragraphs: [
          'Countdown timers and pop-up wheel discounts actively erode perceived craftsmanship for considered purchases. When a customer is investing in architectural furniture, acoustic hardware, or fine skincare, artificial urgency signals commodity pricing.',
          'Borrowing wayfinding principles from contemporary museums—clear room signage, unhurried object pedestals, and layered technical placards—respects the buyer’s intelligence and raises average order value organically.',
        ],
      },
      {
        heading: 'Friction-Free Precision at Checkout',
        paragraphs: [
          'Once a buyer decides to configure or purchase, every mechanical barrier must vanish. Clean single-line tabs, honest stock and lead-time transparency, and unambiguous typography carry museum calm all the way through confirmation.',
        ],
      },
    ],
  },
  {
    id: 'art-8',
    slug: 'inside-kestrel-small-senior-pods',
    title: 'Inside Our Studio Model: Why Small Senior Pods Outship Large Agencies',
    category: 'Culture',
    excerpt:
      'How eliminating account-management telephone games allows strategy, design, and engineering to collaborate directly with founders.',
    author: 'Soren Halvorsen',
    authorRole: 'Head of Strategy',
    date: 'August 14, 2026',
    publishedAtISO: '2026-08-14',
    readingTime: '5 min read',
    image: '/src/assets/images/studio_team_collab_1795348876110.jpg',
    alt: 'Two creative directors reviewing printed brand identity boards and fabric swatches over a sunlit oak studio table',
    pullQuote:
      'Every layer of translation between the client’s ambition and the person writing the code dilutes originality.',
    keyTakeaways: [
      'Every Kestrel engagement pairs one Creative Director, one Lead Designer, and one Principal Technologist from day one.',
      'Weekly live prototypes in the browser replace static 80-slide approval decks.',
      'Working directly in code early uncovers interaction breakthroughs impossible to spot in static mockups.',
    ],
    sections: [
      {
        heading: 'The Hidden Cost of Agency Handoffs',
        paragraphs: [
          'In traditional holding-company agencies, senior partners pitch the work, junior strategists write a brief, separate UI teams draw static screens, and an outsourced engineering vendor builds something noticeably stiffer six months later. Subtle typographic intent evaporates at every relay.',
          'We structured Kestrel around tight, cross-disciplinary pods of three to four senior practitioners. The designer shaping the grid sits beside the engineer tuning ScrollTrigger easing on the very same morning.',
        ],
      },
      {
        heading: 'Prototyping Truth in the Browser',
        paragraphs: [
          'Static Figma frames can lie about motion, font rendering, and mobile ergonomics. By putting live staging URLs in front of client leadership within the first fortnight, decisions happen faster, feedback gets sharper, and launches arrive without eleventh-hour compromises.',
        ],
      },
    ],
  },
];
