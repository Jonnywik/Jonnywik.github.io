/**
 * Portfolio Command Center design reminder: dark technical editorial, asymmetric
 * evidence panels, signal teal/orange emphasis, and interactions that reveal work.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  Braces,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Code2,
  ExternalLink,
  Github,
  Layers3,
  Menu,
  Moon,
  Network,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

type Filter = "All" | "Operations" | "People systems" | "Resiliency";

const projects = [
  {
    id: "command-center",
    title: "Code for Resilience",
    eyebrow: "01 / RESILIENCE / SYSTEM / VERIFIED",
    summary:
      "A development foundation for local emergency operations: coordinating verified alerts, SOS intake, evacuation context, and offline-aware resident workflows.",
    tags: ["Operations", "Resiliency"],
    stack: ["FastAPI", "PostGIS", "Next.js", "Expo"],
    trace: ["backend/app", "frontend", "mobile", "docs/architecture.md"],
    image: "/manus-storage/command-center-sanitized_40ed0991.png",
    imageAlt: "Sanitized demo interface for the Resilience Command Center",
    evidenceLabel: "SANITIZED DEMO INTERFACE",
    repo: "https://github.com/Jonnywik/EnvScie-CommandCenter",
    accent: "teal",
    evidence: [
      "Decision support is clearly separated from live emergency-service deployment.",
      "The workflow considers low-connectivity and offline fallback scenarios.",
      "A dashboard, API service, and mobile client are documented as one system.",
    ],
    decision:
      "The interface treats urgency as context, not spectacle: status, verification, and safe operational boundaries remain visible throughout the system.",
  },
  {
    id: "employee-dashboard",
    title: "Employee Management Dashboard",
    eyebrow: "02 / PEOPLE / SYSTEM / VERIFIED",
    summary:
      "A responsive HR operations workspace for onboarding, attendance, payroll approvals, claims, and employee-facing workflows.",
    tags: ["Operations", "People systems"],
    stack: ["TypeScript", "React", "tRPC", "Drizzle"],
    trace: ["client", "server", "drizzle", "*.test.ts"],
    image: "/manus-storage/employee-dashboard-sanitized_6c6b59cc.png",
    imageAlt: "Sanitized demo interface for the Employee Management Dashboard",
    evidenceLabel: "SANITIZED DEMO INTERFACE",
    repo: "https://github.com/Jonnywik/employee-management-dashboard",
    accent: "orange",
    evidence: [
      "The product scope follows the operational lifecycle from onboarding to payroll close.",
      "The stack combines a typed UI, API procedures, relational persistence, and test tooling.",
      "Approval flow and audit-oriented exports are first-class product concerns.",
    ],
    decision:
      "The product makes complex internal operations easier to reason about by keeping workflow state, approval steps, and feedback close to the task at hand.",
  },
];

const principles = [
  {
    id: "clarity",
    label: "Operational clarity",
    icon: Layers3,
    title: "Make the next decision easy to see.",
    text: "Interfaces should reduce cognitive load by making state, action, and consequence understandable at a glance.",
  },
  {
    id: "resilience",
    label: "Resilient workflows",
    icon: Network,
    title: "Design for conditions beyond the happy path.",
    text: "Connectivity, uncertainty, approval boundaries, and partial failure are product concerns—not afterthoughts.",
  },
  {
    id: "boundaries",
    label: "Responsible systems",
    icon: ShieldCheck,
    title: "State what software can—and cannot—do.",
    text: "Clear safeguards, honest limitations, and traceable decisions build stronger foundations for real-world software.",
  },
];

const filters: Filter[] = ["All", "Operations", "People systems", "Resiliency"];

function RouteMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/manus-storage/jonnywik-route-node-mark_18ea65c3.png"
      alt="Jonnywik route-node brand mark"
      className={`route-mark ${className}`}
    />
  );
}

function RouteStamp({ className = "", label = "SIGNAL ROUTE" }: { className?: string; label?: string }) {
  return (
    <span className={`route-stamp ${className}`} aria-hidden="true">
      <span className="route-stamp-orbit" />
      <RouteMark />
      <small>{label}</small>
    </span>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const [activePrinciple, setActivePrinciple] = useState(principles[0].id);
  const [lightMode, setLightMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [routeScanActive, setRouteScanActive] = useState(false);

  const visibleProjects = useMemo(
    () =>
      projects.filter(
        (project) => activeFilter === "All" || project.tags.includes(activeFilter),
      ),
    [activeFilter],
  );

  const selected = projects.find((project) => project.id === selectedProject) ?? projects[0];
  const chosenPrinciple =
    principles.find((principle) => principle.id === activePrinciple) ?? principles[0];
  const PrincipleIcon = chosenPrinciple.icon;

  useEffect(() => {
    if (!routeScanActive) return undefined;

    const routeInterval = window.setInterval(() => {
      setSelectedProject((current) => {
        const currentIndex = projects.findIndex((project) => project.id === current);
        return projects[(currentIndex + 1) % projects.length].id;
      });
    }, 4200);

    return () => window.clearInterval(routeInterval);
  }, [routeScanActive]);

  useEffect(() => {
    const handleRouteShortcut = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;

      if (event.key === "1" || event.key === "2") {
        chooseProject(projects[Number(event.key) - 1].id);
      }
      if (event.key.toLowerCase() === "r") {
        setRouteScanActive((active) => !active);
      }
    };

    window.addEventListener("keydown", handleRouteShortcut);
    return () => window.removeEventListener("keydown", handleRouteShortcut);
  }, []);

  const chooseProject = (id: string) => {
    setSelectedProject(id);
    document.getElementById("case-study")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startRouteScan = () => {
    setActiveFilter("All");
    setRouteScanActive(true);
    document.getElementById("case-study")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`portfolio-shell ${lightMode ? "theme-light" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Jonnywik portfolio home">
          <RouteStamp label="J / 01" />
          <strong>JONNYWIK</strong>
          <i aria-hidden="true" />
          <small>COMMAND CENTER / 2026</small>
        </a>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#case-study" onClick={() => setMenuOpen(false)}>Case studies</a>
          <a href="#principles" onClick={() => setMenuOpen(false)}>Approach</a>
          <a href="https://github.com/Jonnywik" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            GitHub <ArrowUpRight size={14} />
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => setLightMode((value) => !value)}
            aria-label={lightMode ? "Switch to dark theme" : "Switch to light theme"}
            title={lightMode ? "Switch to dark theme" : "Switch to light theme"}
          >
            {lightMode ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button
            className="menu-button icon-button"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section id="top" className="hero-section" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <div className="eyebrow-row"><CircleDot size={13} /> DOMAIN / SYSTEM / EVIDENCE</div>
            <h1 id="hero-title">Software for work that <em>has to keep moving.</em></h1>
            <p className="hero-copy">
              I’m Jonnywik, a full-stack developer building resilient, user-centred operational software—where clarity, safeguards, and real workflows shape the interface.
            </p>
            <div className="hero-cta-row">
              <a href="#projects" className="button button-primary">Explore the work <ArrowDownRight size={18} /></a>
              <button type="button" className="button button-scan" onClick={startRouteScan}><Activity size={17} /> Run route scan</button>
              <a href="https://github.com/Jonnywik" target="_blank" rel="noreferrer" className="button button-quiet"><Github size={17} /> View GitHub</a>
            </div>
          </div>
          <RouteStamp className="hero-stamp" label="J / SYSTEM MAP" />
          <aside className="hero-status" aria-label="Portfolio status">
            <div className="status-kicker"><span /> CURRENT SIGNAL</div>
            <strong>Open source portfolio</strong>
            <p>Two flagship systems, documented decisions, and code-first evidence.</p>
            <div className="hero-coordinate"><span>14° 35’</span><span>125° 11’</span></div>
            <span className="shortcut-hint">Press <kbd>1</kbd> / <kbd>2</kbd> to trace · <kbd>R</kbd> to scan</span>
          </aside>
          <div className="hero-fact-strip" aria-label="Technology and focus areas">
            <span><Code2 size={15} /> Full-stack delivery</span>
            <span><Network size={15} /> Offline-aware systems</span>
            <span><ShieldCheck size={15} /> Responsible boundaries</span>
          </div>
        </section>

        <section id="projects" className="section project-section" aria-labelledby="projects-title">
          <div className="section-heading split-heading">
            <div>
              <p className="section-index">01 / DOMAIN / SYSTEM / EVIDENCE</p>
              <h2 id="projects-title">Follow the work,<br /><em>not the noise.</em></h2>
            </div>
            <p className="section-note">Each project is a traceable system: a problem, a design boundary, and the engineering choices used to carry it forward.</p>
          </div>

          <div className="filter-bar" role="toolbar" aria-label="Filter portfolio projects">
            <span className="filter-label"><Sparkles size={15} /> DOMAIN FILTER / SELECT</span>
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-chip ${activeFilter === filter ? "is-active" : ""}`}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className={`project-card accent-${project.accent}`} key={project.id}>
                <button
                  type="button"
                  className="project-image-button"
                  onClick={() => chooseProject(project.id)}
                  aria-label={`Open ${project.title} case study`}
                >
                  <img src={project.image} alt={project.imageAlt} />
                  <span className="interface-evidence-label">{project.evidenceLabel}</span>
                  <span className="source-trace source-trace-card" aria-hidden="true">
                    <small>VERIFIED SOURCE TRACE</small>
                    <code>{project.trace.join("  /  ")}</code>
                  </span>
                  <span className="project-image-overlay"><span>Inspect evidence</span><ArrowDownRight size={19} /></span>
                </button>
                <div className="project-card-content">
                  <div className="project-meta"><span>{project.eyebrow}</span><a href={project.repo} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} repository`}><Github size={17} /></a></div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <button type="button" className="text-action" onClick={() => chooseProject(project.id)}>Read the system brief <ChevronRight size={17} /></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="case-study" className="section case-study-section" aria-labelledby="case-title">
          <div className="case-study-rail">
            <p className="section-index">02 / EVIDENCE / DECISION / TRACE</p>
            <h2 id="case-title">The detail behind<br /><em>the interface.</em></h2>
            <div className="case-selector" aria-label="Choose a case study">
              {projects.map((project, index) => (
                <button key={project.id} type="button" className={selectedProject === project.id ? "is-active" : ""} onClick={() => setSelectedProject(project.id)}>
                  <span>0{index + 1}</span>{project.title}<ChevronRight size={17} />
                </button>
              ))}
            </div>
            <button
              type="button"
              className={`route-scan-control ${routeScanActive ? "is-active" : ""}`}
              onClick={() => setRouteScanActive((active) => !active)}
              aria-pressed={routeScanActive}
            >
              {routeScanActive ? <Pause size={16} /> : <Play size={16} />}
              {routeScanActive ? "Pause route scan" : "Run route scan"}
              <span>{routeScanActive ? "LIVE" : "IDLE"}</span>
            </button>
          </div>
          <article className={`case-detail accent-${selected.accent} ${routeScanActive ? "is-scanning" : ""}`} aria-live="polite">
            <div className="case-visual">
              <img src={selected.image} alt={selected.imageAlt} />
              <span className="scan-indicator"><i /> {routeScanActive ? "ROUTE SCAN ACTIVE" : "MANUAL INSPECTION"}</span>
              <span className="case-interface-label">{selected.evidenceLabel}</span>
              <div className="case-visual-caption"><span>System focus</span><strong>{selected.tags.join(" / ")}</strong></div>
              <div className="case-source-map">
                <span>01 / SOURCE MAP</span>
                {selected.trace.map((item, index) => <code key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</code>)}
              </div>
            </div>
            <div className="case-copy">
              <RouteStamp className="case-stamp" label="DECISION RECORD" />
              <p className="section-index">{selected.eyebrow}</p>
              <h3>{selected.title}</h3>
              <p className="lead-copy">{selected.summary}</p>
              <div className="decision-note"><Network size={19} /><p><strong>Design decision:</strong> {selected.decision}</p></div>
              <ul className="evidence-list">
                {selected.evidence.map((item) => <li key={item}><CheckCircle2 size={16} /> {item}</li>)}
              </ul>
              <a className="button button-secondary" href={selected.repo} target="_blank" rel="noreferrer">Open source repository <ExternalLink size={16} /></a>
            </div>
          </article>
        </section>

        <section id="principles" className="section principle-section" aria-labelledby="principles-title">
          <div className="principle-intro">
            <p className="section-index">03 / METHOD / DECISION / STATE</p>
            <h2 id="principles-title">The system is only as good as the <em>thinking behind it.</em></h2>
          </div>
          <div className="principle-board">
            <div className="principle-tabs" role="tablist" aria-label="Build principles">
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <button
                    key={principle.id}
                    type="button"
                    role="tab"
                    aria-selected={activePrinciple === principle.id}
                    className={activePrinciple === principle.id ? "is-active" : ""}
                    onClick={() => setActivePrinciple(principle.id)}
                  >
                    <Icon size={18} /><span>{principle.label}</span><ChevronRight size={16} />
                  </button>
                );
              })}
            </div>
            <div className="principle-display" role="tabpanel">
              <div className="principle-symbol"><PrincipleIcon size={34} /></div>
              <p className="section-index">ACTIVE PRINCIPLE</p>
              <h3>{chosenPrinciple.title}</h3>
              <p>{chosenPrinciple.text}</p>
              <div className="signal-line" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            </div>
          </div>
        </section>

        <section className="section closing-section" aria-labelledby="closing-title">
          <div className="closing-card">
            <div className="closing-art" aria-hidden="true"><Braces size={92} strokeWidth={0.75} /></div>
            <p className="section-index">SOURCE-FIRST PORTFOLIO</p>
            <h2 id="closing-title">Want to inspect the <em>systems underneath?</em></h2>
            <p>Every featured project is documented through its source, decisions, and implementation boundaries. Start with the repository that matches your interest.</p>
            <div className="hero-cta-row">
              <a href="https://github.com/Jonnywik" target="_blank" rel="noreferrer" className="button button-primary"><Github size={17} /> Visit GitHub</a>
              <a href="#top" className="button button-quiet">Return to top <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div><RouteMark /><span>JONNYWIK / PORTFOLIO COMMAND CENTER</span></div>
        <p>Built around real projects, clear boundaries, and source-first evidence.</p>
        <a href="https://github.com/Jonnywik" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  );
}
