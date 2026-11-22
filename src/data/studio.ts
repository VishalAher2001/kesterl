import {ProcessStage, ServiceItem, TestimonialItem} from '../types';

export const SERVICES: ServiceItem[] = [
  {
    index: '01',
    title: 'Brand Strategy & Visual Identity',
    summary:
      'Positioning systems, editorial typography, art direction, and cohesive design languages built for category leaders.',
    deliverables: [
      'Competitive Positioning & Messaging',
      'Typographic & Color Architecture',
      'Art Direction & Photography Guides',
      'Comprehensive Brand Books',
    ],
    outcome: 'Unmistakable visual differentiation before a visitor reads a single paragraph.',
  },
  {
    index: '02',
    title: 'Flagship Web & Interactive Experiences',
    summary:
      'Custom React, WebGL, and GSAP-choreographed web platforms engineered for editorial polish and sub-second speed.',
    deliverables: [
      'UX Architecture & Wireframing',
      'Bespoke Motion & Shader Systems',
      'Modular Frontend Engineering',
      'Technical SEO & Accessibility Compliance',
    ],
    outcome: 'High-conviction brand storytelling paired with 98+ Lighthouse performance.',
  },
  {
    index: '03',
    title: 'Direct-to-Consumer E-Commerce',
    summary:
      'Tactile luxury storefronts, bespoke product configurators, and friction-free subscription architectures.',
    deliverables: [
      'Conversion-Focused PDP Architecture',
      'Interactive Finish & Spec Configurators',
      'Headless Storefront Engineering',
      'Retention & Refill Lifecycle Design',
    ],
    outcome: 'Measured lifts in average order value and repeat purchase retention.',
  },
  {
    index: '04',
    title: 'Design Systems & Product Craft',
    summary:
      'Scalable multi-brand component libraries, design tokens, and interactive prototypes for ambitious product teams.',
    deliverables: [
      'Tokenized UI Component Libraries',
      'Interactive Browser Prototyping',
      'Documentation & Engineering Handoff',
      'Design QA & Accessibility Audits',
    ],
    outcome: 'Faster product velocity with zero visual drift across platforms.',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Immersion & Positioning',
    duration: 'Weeks 1–2',
    description:
      'We audit your category landscape, interview executive stakeholders, and isolate the single strategic wedge that separates your brand from lookalike competitors.',
    artifact: 'Strategic Wedge Brief & Information Architecture',
  },
  {
    step: '02',
    title: 'Editorial Direction & System',
    duration: 'Weeks 3–5',
    description:
      'Typographic hierarchies, bespoke photography art direction, and grid rhythms are tested directly against real copy—never filler—until the visual voice feels unmistakable.',
    artifact: 'Art Direction Board & Core Design System',
  },
  {
    step: '03',
    title: 'Motion & Technical Build',
    duration: 'Weeks 6–10',
    description:
      'Our technologists build in live staging URLs from day one, uniting Lenis physics, GSAP ScrollTrigger choreography, and accessible semantic markup.',
    artifact: 'Live Staging Build & Motion Prototype',
  },
  {
    step: '04',
    title: 'Refinement & Category Launch',
    duration: 'Weeks 11–12',
    description:
      'Cross-device performance tuning, SEO verification, and analytics instrumentation ensure your launch lands cleanly with measurable commercial momentum.',
    artifact: 'Production Deployment & Launch Playbook',
  },
];

export const STUDIO_PILLARS = [
  {
    label: 'Strategy',
    heading: 'Sharp commercial focus before a single pixel moves.',
    copy: 'Every aesthetic decision maps back to buyer psychology, category positioning, and tangible revenue goals—never arbitrary visual trends.',
  },
  {
    label: 'Design',
    heading: 'Editorial restraint with unmistakable typographic authority.',
    copy: 'We craft calm, generous layouts where bespoke typography, tactile material photography, and controlled orange accents command instant trust.',
  },
  {
    label: 'Technology',
    heading: 'Live browser craft engineered for 60fps fluidity.',
    copy: 'Custom WebGL shaders, GSAP ScrollTrigger choreography, and clean TypeScript architecture deliver tactile depth without sacrificing speed.',
  },
  {
    label: 'Execution',
    heading: 'Senior multi-disciplinary pods from kickoff to launch.',
    copy: 'You collaborate directly with the creative director, lead designer, and principal engineer shaping your work—zero layers of translation.',
  },
];

export const STUDIO_STATS = [
  {
    value: 48,
    suffix: '+',
    label: 'Category Launches',
    context: 'Flagship brands & platforms shipped since 2020',
  },
  {
    value: 94,
    suffix: '%',
    label: 'Client Retention',
    context: 'Partners returning for multi-year product phases',
  },
  {
    value: 14,
    suffix: '',
    label: 'International Honors',
    context: 'Design, typography & engineering recognitions',
  },
  {
    value: 99,
    suffix: '',
    label: 'Median Performance',
    context: 'Core Web Vitals score across recent builds',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Kestrel translated complex autonomous actuator specs into a flagship digital experience our enterprise buyers immediately understood. Within 90 days of launch, qualified demo requests more than doubled.',
    author: 'Marcus Lindholm',
    role: 'VP of Product Marketing',
    company: 'Vela Precision Systems',
    outcome: '+148% Enterprise Demo Requests in Q1',
  },
  {
    quote:
      'Working directly with their creative director and principal engineer felt effortless. They cut our cluttered storefront in half and lifted mobile conversion from 2.9% to 4.6% within six weeks.',
    author: 'Astrid Lindberg',
    role: 'Co-Founder',
    company: 'Kora Botanics',
    outcome: '72% 90-Day Subscription Refill Retention',
  },
  {
    quote:
      'Most agencies pitch dark-mode clichés for institutional finance. Kestrel gave us a calm, editorial daylight system that resonated with CFOs from the very first Series C briefing.',
    author: 'David Chen',
    role: 'Chief Design Officer',
    company: 'Aether Treasury Platform',
    outcome: '+94% Mid-Market CFO Pipeline',
  },
];
