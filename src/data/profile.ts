/**
 * Single source of truth for every piece of portfolio content.
 * Nothing in the UI hardcodes copy — sections render from here so the
 * redesign can be verified against the original data.
 */

export const identity = {
  name: 'Dinksira Elsa',
  wordmark: 'DINK',
  role: 'Full Stack Developer & UI/UX Designer',
  location: 'Addis Ababa, Ethiopia',
  greetingAmharic: 'እንኳን ደህና መጡ',
  bio: 'Bridging Figma design systems directly into production code — React & Next.js on the web, cross-platform mobile apps, and high-performance Node.js & FastAPI backends with zero fidelity loss.',
  portrait: '/profile.png',
  portraitAlt: 'Portrait of Dinksira Elsa',
  availability: 'Available for work',
  resumeDrive:
    'https://drive.google.com/file/d/1woQVgpWxist-an5YBJ0L2wv6yOYxPPqj/view?usp=drive_link',
  resumeFile: '/Dinksira_Elsa_Resume.pdf',
  email: 'dinksiraelisa@gmail.com',
  phone: '+251 949 765 679',
  phoneHref: 'tel:+251949765679',
};

export interface Social {
  name: string;
  href: string;
}

export const socials: Social[] = [
  { name: 'Behance', href: 'https://www.behance.net/dinksiraelsa' },
  { name: 'Dribbble', href: 'https://dribbble.com/dinksira-elsa' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dinksira-elsa-13904b319/' },
  { name: 'GitHub', href: 'https://github.com/dinksira' },
  { name: 'Upwork', href: 'https://www.upwork.com/freelancers/~0169e7871bfcb02264?mp_source=share' },
  { name: 'Telegram', href: 'https://t.me/Dink_Sira' },
];

/** Footer carries a shorter set than the hero. */
export const footerSocials: Social[] = socials.filter(
  (s) => s.name !== 'Upwork'
);

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  logo?: string;
  aspect?: string;
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Enderas',
    subtitle: 'Digital Auction & Bidding Platform',
    category: 'Full Stack',
    description:
      'Sealed-bid auction platform used by Ethiopian government institutions — bidder KYC, the auction lifecycle, bid submission and invalidation, winner selection, and CPO payment flows. A unified architecture powers separate public bidder and admin console apps, with role-based access control between institution staff, bidders, and administrators.',
    tags: ['React', 'TypeScript', 'Node.js', 'SQL', 'System Architecture', 'Tailwind CSS'],
    image: '/Enderas.png',
    logo: '/enderas_logo_blue.svg',
    aspect: '16 / 9',
    links: [{ label: 'Live Site', href: 'https://enderasbid.com/' }],
  },
  {
    id: 2,
    title: 'Relavo',
    subtitle: 'AI Client Relationship Platform',
    category: 'AI Product',
    description:
      'Keeps client records and interaction history in one place for businesses, using Claude AI to summarise relationships, generate intelligent interaction briefs, and surface accounts that have gone quiet. Built end to end, from database schema to intuitive interface.',
    tags: ['React', 'Vite', 'Express', 'FastAPI', 'Claude API', 'Supabase'],
    image: '/Relavo.png',
    logo: '/relavoicon.svg',
    aspect: '16 / 9',
    links: [{ label: 'Live Site', href: 'https://relavo.xyz/' }],
  },
  {
    id: 3,
    title: 'Delta Labs',
    subtitle: 'Cross-Platform Education System',
    category: 'Full Stack',
    description:
      'One education product across three clients — a TypeScript web app, a Flutter mobile app, and an Electron desktop build — all reading from the same MongoDB-backed API. Course enrollment, school management, competitions, and certification, with AI-assisted features built into the learning flow.',
    tags: ['TypeScript', 'MongoDB', 'Electron', 'Flutter', 'Express'],
    image: '/DeltaLabs.png',
    logo: '/DeltaLabslogo.png',
    aspect: '16 / 9',
    links: [
      {
        label: 'Figma Design',
        href: 'https://www.figma.com/design/FKY5f0yd3fSsTmgjERfFHb/Education-UIUX?node-id=0-1&p=f&t=eVN64FtUWw0NKS1Z-0',
      },
    ],
  },
  {
    id: 4,
    title: 'Health Advisor',
    subtitle: 'Android Health & Wellness Assistant',
    category: 'Mobile',
    description:
      "An Android app giving personalised health recommendations, habit tracking, and medical guidance tailored to each user's biometric data and lifestyle inputs.",
    tags: ['Android', 'Java', 'SQLite', 'Material Design'],
    image: '/Health_Addvisor.png',
    aspect: '16 / 9',
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/dinksira/Health_Advisor.git' },
    ],
  },
];

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend',
    skills: [
      'React & Next.js',
      'Flutter',
      'React Native',
      'Tailwind CSS',
      'Vite',
      'Electron',
    ],
  },
  {
    title: 'Backend',
    skills: [
      'Node.js & Express',
      'FastAPI',
      'MongoDB',
      'Supabase',
      'PostgreSQL',
      'REST APIs, OAuth & RBAC',
      'Claude & OpenAI APIs',
    ],
  },
  {
    title: 'Design',
    skills: [
      'UI/UX design',
      'Wireframing',
      'Interactive prototyping',
      'Design systems',
      'Accessibility',
    ],
  },
];

/** Keyed to the icon components exported from ToolIcons. */
export const toolbox = [
  'Figma',
  'Adobe XD',
  'VS Code',
  'Git & GitHub',
  'React',
  'Node.js',
  'Vercel',
  'Turborepo',
] as const;

export type ToolboxName = (typeof toolbox)[number];

export interface Role {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export const timeline: Role[] = [
  {
    id: 1,
    title: 'Full Stack Developer & UI/UX Designer',
    company: 'Delta Rabbits',
    location: 'Addis Ababa, Ethiopia',
    period: 'Dec 2024 — Present',
    points: [
      'Build and maintain the education platform across the TypeScript web app, Flutter mobile app, Electron desktop build, and MongoDB-backed API all three sit on.',
      'Own the design as well as the code — wireframes and prototypes in Figma, then built out in TypeScript, so nothing gets lost in the handover.',
      'Turn direct user feedback into something specific enough to build, and fix real-device layout and state issues across screen sizes.',
      'Write the documentation — both the technical kind and the plain-language kind that clients read.',
    ],
  },
  {
    id: 2,
    title: 'Full Stack Web & Mobile App Developer',
    company: 'Mager Software PLC',
    location: 'Addis Ababa, Ethiopia',
    period: 'Aug 2026 — Sep 2026',
    points: [
      'Built the Enderas sealed-bid auction platform for Ethiopian government institutions, from API to iOS and Android.',
      'Split the frontend into public bidder and admin console apps on one backend, with role-based access control between institution staff, bidders, and administrators.',
      'Handled KYC, the auction lifecycle, bid submission and invalidation, winner selection, and CPO payment flows.',
    ],
  },
  {
    id: 3,
    title: 'Video Editor',
    company: 'EBJ Media',
    location: 'Remote',
    period: 'Jul 2024 — Dec 2024',
    points: [
      'Cut promotional and social video from raw footage in Premiere Pro and After Effects, usually on a same-week turnaround.',
      'Ran the full pipeline from rough cut through color, sound, and final export.',
    ],
  },
  {
    id: 4,
    title: 'ICT Intern',
    company: 'Hawassa University ICT Center',
    location: 'Hawassa, Ethiopia',
    period: 'Jul 2024 — Sep 2024',
    points: [
      'Configured and documented a new network topology and spent most of the internship troubleshooting connectivity problems.',
    ],
  },
];

export const education = {
  degree: 'BSc, Computer Science',
  school: 'Dilla University',
  period: 'Oct 2020 — Jul 2024',
  grade: 'CGPA 3.44 / 4.0',
  finalProjects:
    'Final projects: Health Advisor (an Android app giving personalised health recommendations), an online voting system, and a desktop student information system.',
  credentials: [
    'Google UX Design Certificate — Coursera',
    'Introduction to AI Certificate',
    'Languages: English and Amharic, both fluent',
  ],
};

export const contactInfo = [
  { key: 'email', label: 'Email', value: identity.email },
  { key: 'phone', label: 'Phone', value: identity.phone },
  { key: 'location', label: 'Location', value: identity.location },
] as const;

export const whatsappQr = '/assets/qr.jpg';

export const timezone = {
  zone: 'Africa/Addis_Ababa',
  label: 'Addis Ababa (UTC+3)',
  utcOffset: 'UTC+3',
};

/** Feeds the metrics and marquee. */
export const stats = [
  { value: '2+', label: 'Years shipping' },
  { value: '8+', label: 'Shipped platforms' },
  { value: '2', label: 'Disciplines: Code & Design' },
  { value: '100%', label: 'Handover fidelity' },
  { value: 'Open', label: 'For new contracts' },
];

/**
 * Atmosphere clips. URLs are the live Supabase objects — no placeholders.
 */
export const VIDEOS = {
  summitDay:
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/8bd0314a-9525-4a13-996e-2c37cbd9e514/1788821119486-8d762eee-0098-4e15-808c-6c0f590a2b91.mp4',
  summitNight:
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/8bd0314a-9525-4a13-996e-2c37cbd9e514/1788821195710-5afeca8a-1190-4bd1-a288-0886426ea10b.mp4',
  suite:
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/8bd0314a-9525-4a13-996e-2c37cbd9e514/1788820960281-6d84cb51-4834-49d9-b9b9-ebfe93d89b55.mp4',
  leeward:
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/8bd0314a-9525-4a13-996e-2c37cbd9e514/1788821034404-bdf2a9d5-43eb-4ba3-a080-a8f8aef77f46.mp4',
};
