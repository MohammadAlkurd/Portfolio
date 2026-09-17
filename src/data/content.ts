export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'itch'
}

export interface SkillGroup {
  label: string
  skills: string[]
}

export interface Project {
  title: string
  description: string
  tech: string[]
  repo?: string
  demo?: string
  demoLabel?: string
  demoIsHttp?: boolean
  featured?: boolean
  kind: 'code' | 'game'
  genre?: string
}

export interface EducationEntry {
  institution: string
  degree: string
  location: string
  period: string
}

export interface PortfolioContent {
  identity: {
    name: string
    title: string
    location: string
    tagline: string
    email: string
    resume: string
  }
  navigation: { label: string; href: string }[]
  hero: { eyebrow: string; intro: string; primaryCta: string; secondaryCta: string; resumeCta: string }
  about: { heading: string; body: string; addendum: string }
  skills: { heading: string; intro: string; groups: SkillGroup[] }
  projects: { heading: string; intro: string; codeLabel: string; gamesLabel: string; items: Project[] }
  education: { heading: string; intro: string; entries: EducationEntry[] }
  contact: { heading: string; body: string; emailLabel: string; githubLabel: string; itchLabel: string }
  socials: SocialLink[]
  footer: string
}

export const PLACEHOLDER_RESUME_URL = 'PLACEHOLDER_RESUME_URL'
export const content: PortfolioContent = {
  identity: {
    name: 'Mohammed Kord',
    title: 'Computer Engineering Student',
    location: 'Hebron, Palestine',
    tagline: 'Computer Engineering student at Palestine Polytechnic University, building desktop tools, game-engine experiments, and REST APIs.',
    email: 'alkurd.2000.md@gmail.com',
    resume: PLACEHOLDER_RESUME_URL,
  },
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Hello, I’m Mohammed',
    intro: 'I like building things that connect curious ideas to useful software.',
    primaryCta: 'View projects',
    secondaryCta: 'Get in touch',
    resumeCta: 'View resume',
  },
  about: {
    heading: 'Software engineering grounded in AI and algorithms.',
    body: "I'm a Computer Engineering student at Palestine Polytechnic University with a focus on artificial intelligence, competitive programming, and software engineering. My work spans machine learning applications such as gesture recognition with PyTorch and reinforcement learning in the Godot engine, REST APIs built with ASP.NET Core and Entity Framework, and Linux desktop tools in Python and PyQt6. I work primarily in C# and Python, use C++ where performance matters, and apply AI tooling deliberately to speed up research, prototyping, and delivery.",
    addendum: 'Competitive programming keeps my algorithmic and problem-solving skills sharp, and I bring the same rigor to writing clean, well-structured, maintainable code. Outside coursework I build and publish games in Godot on itch.io.',
  },
  skills: {
    heading: 'Tools I use to make ideas real.',
    intro: 'A growing toolkit shaped by coursework, experiments, and projects that needed to ship.',
    groups: [
      { label: 'Languages', skills: ['C#', 'Python', 'C++', 'GDScript', 'SQL'] },
      { label: 'Backend & Data', skills: ['ASP.NET Core Web API', 'REST API design', 'Entity Framework relationships (one-to-many, many-to-many)', 'relational schema design'] },
      { label: 'Desktop & UI', skills: ['PyQt6', 'KDE Plasma / Wayland integration', 'D-Bus', 'system tray apps'] },
      { label: 'AI & ML', skills: ['PyTorch (MLP classifiers)', 'hand-landmark detection', 'reinforcement learning', 'ONNX inference', 'AI-assisted development and research'] },
      { label: 'Game Dev', skills: ['Godot Engine', 'Godot RL Agents', 'shaders (GDShader)'] },
      { label: 'Tools', skills: ['Git & GitHub', 'Linux', 'GitHub Actions'] },
    ],
  },
  projects: {
    heading: 'Selected work, from systems to play.',
    intro: 'A mix of useful desktop software, backend foundations, and small games built to learn by doing.',
    codeLabel: 'Code projects',
    gamesLabel: 'Playable games',
    items: [
      {
        title: 'Hand Gestures To Action',
        description: 'A PyQt6 desktop app for KDE Linux that turns custom webcam hand gestures into real actions. Record a gesture, it extracts hand landmarks and trains a small MLP classifier, then bind the gesture to a keypress or script and the inference loop fires it live. Includes a test mode that shows predictions without triggering actions.',
        tech: ['Python', 'PyQt6', 'PyTorch', 'MediaPipe hand landmarks', 'pynput'],
        repo: 'https://github.com/MohammadAlkurd/Hand-Gestures-To-Action',
        featured: true,
        kind: 'code',
      },
      {
        title: 'RL Godot',
        description: 'A reinforcement-learning experiment in the Godot engine: a ragdoll agent trained with Godot RL Agents and run back in-engine through an exported ONNX policy, with custom shaders for the scene.',
        tech: ['Godot', 'GDScript', 'C#', 'Godot RL Agents', 'ONNX'],
        repo: 'https://github.com/MohammadAlkurd/RL_godot',
        featured: true,
        kind: 'code',
      },
      {
        title: 'Employment API',
        description: 'A RESTful API over Employees and Departments with a one-to-many relationship, deployed with a live Swagger UI to try the endpoints.',
        tech: ['C#', 'ASP.NET Core', 'Entity Framework', 'SQL', 'Swagger'],
        repo: 'https://github.com/MohammadAlkurd/Employment',
        demo: 'http://employment.runasp.net/swagger/index.html',
        demoLabel: 'Open HTTP demo',
        demoIsHttp: true,
        kind: 'code',
      },
      {
        title: 'Gemini Popup for KDE',
        description: 'An always-resident Gemini popup for KDE Plasma. A daemon keeps the web view warm in the system tray and a D-Bus toggle call pops it open at the mouse cursor, so it works identically on X11 and Wayland.',
        tech: ['Python', 'PyQt6 WebEngine', 'D-Bus', 'KDE Plasma'],
        repo: 'https://github.com/MohammadAlkurd/gemini_popup_kde_wayland',
        kind: 'code',
      },
      {
        title: 'Quoridor',
        description: 'A digital implementation of the Quoridor board game, with a C# backend for game state and rules alongside a Godot front end.',
        tech: ['C#', 'Godot'],
        repo: 'https://github.com/MohammadAlkurd/Quoridor',
        demo: 'https://mohammadalkurddev.itch.io/quoridor-demo',
        demoLabel: 'Play demo',
        kind: 'game',
        genre: 'Strategy',
      },
      {
        title: 'Student–Course Relations',
        description: 'A worked implementation of a many-to-many relationship between students and courses using a join table — schema design and data access fundamentals.',
        tech: ['C#', 'SQL', 'Entity Framework'],
        repo: 'https://github.com/MohammadAlkurd/Student-Course',
        kind: 'code',
      },
      {
        title: 'A Pentagon Game',
        description: 'A small Godot game published on itch.io.',
        tech: ['Godot', 'GDScript'],
        demo: 'https://mohammadalkurddev.itch.io/a-pentagon-game',
        demoLabel: 'Play on itch.io',
        kind: 'game',
      },
      {
        title: 'Cookie Eater',
        description: 'A small Godot game published on itch.io.',
        tech: ['Godot', 'GDScript'],
        demo: 'https://mohammadalkurddev.itch.io/cookie-eater',
        demoLabel: 'Play on itch.io',
        kind: 'game',
      },
    ],
  },
  education: {
    heading: 'Learning by building.',
    intro: 'The foundations behind the work — with plenty more still ahead.',
    entries: [
      {
        institution: 'Palestine Polytechnic University',
        degree: 'B.Sc. Computer Engineering',
        location: 'Hebron, Palestine',
        period: '2025 — Present',
      },
    ],
  },
  contact: {
    heading: 'Let’s build something useful.',
    body: 'Open to part-time roles, internships, freelance work, and collaboration. Reach me by email or on GitHub.',
    emailLabel: 'Send an email',
    githubLabel: 'GitHub profile',
    itchLabel: 'itch.io profile',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/MohammadAlkurd', icon: 'github' },
    { label: 'itch.io', href: 'https://mohammadalkurddev.itch.io/', icon: 'itch' },
  ],
  footer: 'Designed and built by Mohammed Kord.',
}
