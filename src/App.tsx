import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Github,
  Mail,
  Menu,
  Moon,
  Sun,
  Terminal,
  X,
} from 'lucide-react'
import { content, PLACEHOLDER_RESUME_URL } from './data/content'

const sectionIds = content.navigation.map((item) => item.href.slice(1))

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (document.documentElement.dataset.theme as 'light' | 'dark') || 'light',
  )
  const [activeSection, setActiveSection] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.35, 0.65] },
    )
    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    localStorage.setItem('theme', nextTheme)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#main-content" aria-label={`${content.identity.name} home`}>
            <span className="brand-mark">MK</span>
            <span className="brand-name">{content.identity.name}</span>
          </a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} id="main-navigation" aria-label="Main navigation">
            {content.navigation.map((item) => (
              <a
                className={activeSection === item.href.slice(1) ? 'active' : ''}
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero container" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" />{content.hero.eyebrow}</p>
            <h1 id="hero-heading">{content.identity.name}<span className="hero-dot">.</span></h1>
            <p className="hero-title">{content.identity.title} <span>·</span> {content.identity.location}</p>
            <p className="hero-intro">{content.identity.tagline}</p>
            <p className="hero-subintro">{content.hero.intro}</p>
            <div className="button-row">
              <a className="button button-primary" href="#projects">{content.hero.primaryCta}<ArrowDown size={16} /></a>
              <a className="button button-secondary" href="#contact">{content.hero.secondaryCta}<ArrowUpRight size={16} /></a>
              {content.identity.resume !== PLACEHOLDER_RESUME_URL && (
                <a className="text-link" href={content.identity.resume} target="_blank" rel="noreferrer">{content.hero.resumeCta}<ExternalLink size={14} /></a>
              )}
            </div>
          </div>
          <div className="hero-aside" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-terminal">
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-line"><b>&gt;</b> building with intent<span className="cursor" /></span>
            </div>
          </div>
        </section>

        <section className="section container about-section" id="about" aria-labelledby="about-heading">
          <SectionKicker index="01" label="About" />
          <div className="about-grid">
            <h2 id="about-heading">{content.about.heading}</h2>
            <div className="measure">
              <p>{content.about.body}</p>
              <p>{content.about.addendum}</p>
            </div>
          </div>
        </section>

        <section className="section section-tinted" id="skills" aria-labelledby="skills-heading">
          <div className="container">
            <SectionKicker index="02" label="Skills" />
            <div className="section-heading-row">
              <h2 id="skills-heading">{content.skills.heading}</h2>
              <p className="section-intro">{content.skills.intro}</p>
            </div>
            <div className="skills-grid">
              {content.skills.groups.map((group) => (
                <article className="skill-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container projects-section" id="projects" aria-labelledby="projects-heading">
          <SectionKicker index="03" label="Projects" />
          <div className="section-heading-row projects-heading">
            <h2 id="projects-heading">{content.projects.heading}</h2>
            <p className="section-intro">{content.projects.intro}</p>
          </div>
          <ProjectGroup label={content.projects.codeLabel} items={content.projects.items.filter((project) => project.kind === 'code')} />
          <ProjectGroup label={content.projects.gamesLabel} items={content.projects.items.filter((project) => project.kind === 'game')} />
        </section>

        <section className="section section-tinted" id="education" aria-labelledby="education-heading">
          <div className="container">
            <SectionKicker index="04" label="Education" />
            <div className="section-heading-row">
              <h2 id="education-heading">{content.education.heading}</h2>
              <p className="section-intro">{content.education.intro}</p>
            </div>
            <div className="timeline">
              {content.education.entries.map((entry) => (
                <article className="timeline-entry" key={entry.institution}>
                  <div className="timeline-marker"><span /></div>
                  <div className="timeline-content">
                    <div className="timeline-meta"><span>{entry.period}</span><span>{entry.location}</span></div>
                    <h3>{entry.institution}</h3>
                    <p className="degree">{entry.degree}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container contact-section" id="contact" aria-labelledby="contact-heading">
          <SectionKicker index="05" label="Contact" />
          <div className="contact-panel">
            <div>
              <h2 id="contact-heading">{content.contact.heading}</h2>
              <p>{content.contact.body}</p>
            </div>
            <div className="contact-links">
              <a className="contact-link contact-link-primary" href={`mailto:${content.identity.email}`}><Mail size={18} /><span>{content.contact.emailLabel}<small>{content.identity.email}</small></span><ArrowUpRight size={16} /></a>
              {content.socials.map((social) => (
                <a className="contact-link" href={social.href} target="_blank" rel="noreferrer" key={social.href}>
                  {social.icon === 'github' ? <Github size={18} /> : <span className="itch-icon">◈</span>}
                  <span>{social.icon === 'github' ? content.contact.githubLabel : content.contact.itchLabel}<small>{social.href.replace('https://', '')}</small></span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>{content.footer}</span>
          <a href="#main-content">Back to top <ArrowUp size={14} /></a>
        </div>
      </footer>
    </div>
  )
}

function SectionKicker({ index, label }: { index: string; label: string }) {
  return <p className="section-kicker"><span>{index}</span>{label}</p>
}

function ProjectGroup({ label, items }: { label: string; items: typeof content.projects.items }) {
  return (
    <div className="project-group">
      <h3 className="project-group-title"><span />{label}</h3>
      <div className="projects-grid">
        {items.map((project) => <ProjectCard key={project.title} project={project} />)}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof content.projects.items)[number] }) {
  return (
    <article className={`project-card ${project.featured ? 'featured' : ''}`}>
      <div className="project-visual" aria-label={`${project.title} project image placeholder`} role="img">
        <div className="visual-grid" />
        <div className="visual-label">{project.kind === 'game' ? 'PLAYABLE' : 'PROJECT'}</div>
        {project.kind === 'game' ? <Terminal size={28} strokeWidth={1.2} /> : <Code2 size={28} strokeWidth={1.2} />}
      </div>
      <div className="project-card-body">
        <div className="project-card-top">
          <div>
            {project.genre && <span className="project-type">{project.genre}</span>}
            <h4>{project.title}</h4>
          </div>
          {project.featured && <span className="featured-label">Featured</span>}
        </div>
        <p>{project.description}</p>
        <ul className="tech-list">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
        <div className="project-links">
          {project.repo && <a href={project.repo} target="_blank" rel="noreferrer"><Github size={15} /> Source</a>}
          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={15} /> {project.demoLabel ?? 'Live demo'}{project.demoIsHttp && <small>HTTP</small>}</a>}
        </div>
      </div>
    </article>
  )
}

export default App
