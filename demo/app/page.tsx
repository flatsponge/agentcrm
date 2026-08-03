"use client";

import { useMemo, useState } from "react";

type View = "overview" | "companies" | "contacts" | "deals";
type IconName =
  | "dashboard"
  | "building"
  | "users"
  | "deal"
  | "search"
  | "sun"
  | "moon"
  | "plus"
  | "arrow"
  | "close"
  | "refresh"
  | "chevron";

type Company = {
  id: string;
  name: string;
  domain: string;
  industry: string;
  location: string;
  owner: string;
  pipeline: number;
  contacts: number;
  tone: string;
  summary: string;
};

type Contact = {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  owner: string;
  lastContact: string;
  initials: string;
  tone: string;
};

type DealStage = "Qualified" | "Proposal" | "Negotiation" | "Contract";

type Deal = {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: DealStage;
  owner: string;
  close: string;
  probability: number;
};

type DrawerRecord =
  | { kind: "company"; data: Company }
  | { kind: "contact"; data: Contact }
  | { kind: "deal"; data: Deal };

const companies: Company[] = [
  {
    id: "c-1",
    name: "Northstar Labs",
    domain: "northstarlabs.io",
    industry: "AI infrastructure",
    location: "Berlin, Germany",
    owner: "Maya Chen",
    pipeline: 240000,
    contacts: 6,
    tone: "violet",
    summary: "Evaluating a company-wide rollout after a successful technical pilot.",
  },
  {
    id: "c-2",
    name: "Aperture Health",
    domain: "aperture.health",
    industry: "Healthcare",
    location: "London, UK",
    owner: "Theo Martin",
    pipeline: 185000,
    contacts: 4,
    tone: "green",
    summary: "Security review is complete. Commercial terms are the remaining blocker.",
  },
  {
    id: "c-3",
    name: "Forma Systems",
    domain: "forma.systems",
    industry: "Manufacturing",
    location: "Prague, Czechia",
    owner: "Maya Chen",
    pipeline: 142000,
    contacts: 8,
    tone: "blue",
    summary: "Replacing an internal spreadsheet workflow used across three regional teams.",
  },
  {
    id: "c-4",
    name: "Juniper Works",
    domain: "juniper.works",
    industry: "Professional services",
    location: "Amsterdam, Netherlands",
    owner: "Sam Rivera",
    pipeline: 97000,
    contacts: 3,
    tone: "amber",
    summary: "Discovery completed. The buying group wants a phased implementation plan.",
  },
  {
    id: "c-5",
    name: "Relay Commerce",
    domain: "relaycommerce.com",
    industry: "E-commerce",
    location: "Paris, France",
    owner: "Theo Martin",
    pipeline: 74000,
    contacts: 5,
    tone: "rose",
    summary: "Inbound opportunity focused on consolidating customer research and account notes.",
  },
  {
    id: "c-6",
    name: "Atlas Climate",
    domain: "atlasclimate.org",
    industry: "Climate technology",
    location: "Copenhagen, Denmark",
    owner: "Sam Rivera",
    pipeline: 52000,
    contacts: 2,
    tone: "cyan",
    summary: "Early qualification. Budget is approved but the timeline is not yet fixed.",
  },
];

const contacts: Contact[] = [
  {
    id: "p-1",
    name: "Elena Rossi",
    title: "VP Operations",
    company: "Northstar Labs",
    email: "elena@northstarlabs.io",
    owner: "Maya Chen",
    lastContact: "Today, 09:42",
    initials: "ER",
    tone: "violet",
  },
  {
    id: "p-2",
    name: "Jon Bell",
    title: "Director of IT",
    company: "Aperture Health",
    email: "jon@aperture.health",
    owner: "Theo Martin",
    lastContact: "Yesterday",
    initials: "JB",
    tone: "green",
  },
  {
    id: "p-3",
    name: "Klára Nováková",
    title: "Head of Transformation",
    company: "Forma Systems",
    email: "klara@forma.systems",
    owner: "Maya Chen",
    lastContact: "2 days ago",
    initials: "KN",
    tone: "blue",
  },
  {
    id: "p-4",
    name: "Marcus de Vries",
    title: "Managing Partner",
    company: "Juniper Works",
    email: "marcus@juniper.works",
    owner: "Sam Rivera",
    lastContact: "4 days ago",
    initials: "MV",
    tone: "amber",
  },
  {
    id: "p-5",
    name: "Camille Laurent",
    title: "Revenue Operations Lead",
    company: "Relay Commerce",
    email: "camille@relaycommerce.com",
    owner: "Theo Martin",
    lastContact: "6 days ago",
    initials: "CL",
    tone: "rose",
  },
  {
    id: "p-6",
    name: "Sofie Lind",
    title: "Chief of Staff",
    company: "Atlas Climate",
    email: "sofie@atlasclimate.org",
    owner: "Sam Rivera",
    lastContact: "1 week ago",
    initials: "SL",
    tone: "cyan",
  },
];

const initialDeals: Deal[] = [
  {
    id: "d-1",
    name: "Enterprise rollout",
    company: "Northstar Labs",
    value: 240000,
    stage: "Negotiation",
    owner: "Maya Chen",
    close: "Aug 28",
    probability: 70,
  },
  {
    id: "d-2",
    name: "Clinical operations platform",
    company: "Aperture Health",
    value: 185000,
    stage: "Contract",
    owner: "Theo Martin",
    close: "Aug 14",
    probability: 85,
  },
  {
    id: "d-3",
    name: "Regional workflow replacement",
    company: "Forma Systems",
    value: 142000,
    stage: "Proposal",
    owner: "Maya Chen",
    close: "Sep 05",
    probability: 50,
  },
  {
    id: "d-4",
    name: "Advisory team pilot",
    company: "Juniper Works",
    value: 97000,
    stage: "Qualified",
    owner: "Sam Rivera",
    close: "Sep 19",
    probability: 30,
  },
  {
    id: "d-5",
    name: "Revenue intelligence workspace",
    company: "Relay Commerce",
    value: 74000,
    stage: "Proposal",
    owner: "Theo Martin",
    close: "Sep 12",
    probability: 45,
  },
  {
    id: "d-6",
    name: "Research operations pilot",
    company: "Atlas Climate",
    value: 52000,
    stage: "Qualified",
    owner: "Sam Rivera",
    close: "Oct 03",
    probability: 25,
  },
];

const tasks = [
  ["Review Aperture legal redlines", "Today", "urgent"],
  ["Send Forma implementation plan", "Tomorrow", "normal"],
  ["Prepare Northstar ROI summary", "Wed", "normal"],
  ["Follow up with Atlas buying team", "Fri", "normal"],
] as const;

const stages: DealStage[] = ["Qualified", "Proposal", "Negotiation", "Contract"];

function money(value: number, compact = false) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    notation: compact ? "compact" : "standard",
  }).format(value);
}

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<IconName, React.ReactNode> = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    building: <><path d="M4 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" /><path d="M16 9h3a1 1 0 0 1 1 1v11" /><path d="M8 7h4M8 11h4M8 15h4M3 21h18" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    deal: <><path d="M4 7h16v13H4z" /><path d="M8 7V4h8v3M4 12h16M10 12v2h4v-2" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: <path d="m9 18 6-6-6-6" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    refresh: <><path d="M20 7h-5V2" /><path d="M20 7a9 9 0 1 0 1 8" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function DemoPage() {
  const [view, setView] = useState<View>("overview");
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState<DrawerRecord | null>(null);
  const [deals, setDeals] = useState(initialDeals);
  const [showCreate, setShowCreate] = useState(false);
  const [notice, setNotice] = useState("Browser-only demo. Nothing is sent or saved.");

  const nav = [
    { key: "overview" as const, label: "Overview", icon: "dashboard" as const },
    { key: "companies" as const, label: "Companies", icon: "building" as const },
    { key: "contacts" as const, label: "Contacts", icon: "users" as const },
    { key: "deals" as const, label: "Deals", icon: "deal" as const },
  ];

  const filteredCompanies = useMemo(() => {
    const q = query.toLowerCase();
    return companies.filter((item) => `${item.name} ${item.domain} ${item.industry}`.toLowerCase().includes(q));
  }, [query]);

  const filteredContacts = useMemo(() => {
    const q = query.toLowerCase();
    return contacts.filter((item) => `${item.name} ${item.company} ${item.title} ${item.email}`.toLowerCase().includes(q));
  }, [query]);

  const filteredDeals = useMemo(() => {
    const q = query.toLowerCase();
    return deals.filter((item) => `${item.name} ${item.company} ${item.owner} ${item.stage}`.toLowerCase().includes(q));
  }, [deals, query]);

  const resetDemo = () => {
    setDeals(initialDeals);
    setQuery("");
    setDrawer(null);
    setNotice("Demo reset. All temporary browser changes were cleared.");
  };

  return (
    <main className={dark ? "app theme-dark" : "app"}>
      <header className="topbar">
        <div className="brand-mark">C</div>
        <div className="brand-copy">
          <strong>Comp AI CRM</strong>
          <span>UI demo</span>
        </div>
        <div className="topbar-search">
          <Icon name="search" size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${view === "overview" ? "the demo" : view}...`}
            aria-label="Search demo data"
          />
          <kbd>⌘ K</kbd>
        </div>
        <div className="topbar-actions">
          <button className="icon-button" onClick={resetDemo} aria-label="Reset demo" title="Reset demo">
            <Icon name="refresh" />
          </button>
          <button className="icon-button" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">
            <Icon name={dark ? "sun" : "moon"} />
          </button>
          <div className="avatar avatar-user">MC</div>
        </div>
      </header>

      <div className="shell">
        <aside className="sidebar">
          <nav aria-label="Primary navigation">
            {nav.map((item) => (
              <button
                key={item.key}
                className={view === item.key ? "nav-item active" : "nav-item"}
                onClick={() => {
                  setView(item.key);
                  setQuery("");
                  setDrawer(null);
                }}
                aria-current={view === item.key ? "page" : undefined}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <span className="status-dot" />
            <div><strong>Demo mode</strong><small>Resets on refresh</small></div>
          </div>
        </aside>

        <section className="workspace">
          <div className="demo-notice">
            <span>{notice}</span>
            <button onClick={() => setNotice("Browser-only demo. Nothing is sent or saved.")}>Dismiss</button>
          </div>

          <PageHeader view={view} onCreate={() => setShowCreate(true)} />

          <div className="content-scroll">
            {view === "overview" && <Overview deals={deals} onOpenDeal={(deal) => setDrawer({ kind: "deal", data: deal })} />}
            {view === "companies" && <CompaniesTable companies={filteredCompanies} onOpen={(company) => setDrawer({ kind: "company", data: company })} />}
            {view === "contacts" && <ContactsTable contacts={filteredContacts} onOpen={(contact) => setDrawer({ kind: "contact", data: contact })} />}
            {view === "deals" && <DealsBoard deals={filteredDeals} onOpen={(deal) => setDrawer({ kind: "deal", data: deal })} />}
          </div>
        </section>
      </div>

      {drawer && <RecordDrawer record={drawer} onClose={() => setDrawer(null)} />}
      {showCreate && (
        <CreateDealModal
          onClose={() => setShowCreate(false)}
          onCreate={(deal) => {
            setDeals((current) => [deal, ...current]);
            setView("deals");
            setShowCreate(false);
            setNotice("Temporary deal created in browser memory. Refresh to remove it.");
          }}
        />
      )}
    </main>
  );
}

function PageHeader({ view, onCreate }: { view: View; onCreate: () => void }) {
  const copy: Record<View, { eyebrow: string; title: string; description: string }> = {
    overview: { eyebrow: "Workspace", title: "Overview", description: "Pipeline health, priorities, and recent account movement." },
    companies: { eyebrow: "Accounts", title: "Companies", description: "Organizations in the pipeline and the people working them." },
    contacts: { eyebrow: "Relationships", title: "Contacts", description: "Buyers, champions, and stakeholders across active accounts." },
    deals: { eyebrow: "Revenue", title: "Deals", description: "Opportunities moving from qualification to signed contract." },
  };

  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{copy[view].eyebrow}</span>
        <h1>{copy[view].title}</h1>
        <p>{copy[view].description}</p>
      </div>
      <button className="primary-button" onClick={onCreate}>
        <Icon name="plus" size={17} />
        New deal
      </button>
    </div>
  );
}

function Overview({ deals, onOpenDeal }: { deals: Deal[]; onOpenDeal: (deal: Deal) => void }) {
  const openPipeline = deals.reduce((sum, deal) => sum + deal.value, 0);
  const weighted = deals.reduce((sum, deal) => sum + deal.value * (deal.probability / 100), 0);

  return (
    <div className="overview-grid">
      <div className="metric-grid">
        <Metric label="Open pipeline" value={money(openPipeline, true)} delta="+12.4%" detail="vs last month" />
        <Metric label="Weighted forecast" value={money(weighted, true)} delta="+8.1%" detail="current quarter" />
        <Metric label="Win rate" value="34%" delta="+3.2 pts" detail="rolling 90 days" />
        <Metric label="Overdue tasks" value="6" delta="2 urgent" detail="across 4 accounts" warning />
      </div>

      <section className="panel pipeline-panel">
        <div className="panel-heading"><div><h2>Pipeline by stage</h2><p>Value and momentum across active deals</p></div><button className="text-button">View report <Icon name="arrow" size={15} /></button></div>
        <div className="stage-chart">
          {stages.map((stage) => {
            const stageDeals = deals.filter((deal) => deal.stage === stage);
            const value = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
            const max = Math.max(...stages.map((name) => deals.filter((deal) => deal.stage === name).reduce((sum, deal) => sum + deal.value, 0)));
            return (
              <div className="stage-row" key={stage}>
                <div className="stage-label"><span>{stage}</span><small>{stageDeals.length} deals</small></div>
                <div className="stage-track"><div className={`stage-fill stage-${stage.toLowerCase()}`} style={{ width: `${Math.max(8, (value / max) * 100)}%` }} /></div>
                <strong>{money(value, true)}</strong>
              </div>
            );
          })}
        </div>
      </section>

      <section className="panel deals-panel">
        <div className="panel-heading"><div><h2>Deals in progress</h2><p>Highest-value active opportunities</p></div><button className="more-button">•••</button></div>
        <div className="mini-table">
          {deals.slice(0, 5).map((deal) => (
            <button className="mini-row" key={deal.id} onClick={() => onOpenDeal(deal)}>
              <div className="company-symbol">{deal.company.slice(0, 1)}</div>
              <div className="mini-main"><strong>{deal.name}</strong><span>{deal.company}</span></div>
              <span className={`stage-pill stage-pill-${deal.stage.toLowerCase()}`}>{deal.stage}</span>
              <strong className="deal-value">{money(deal.value)}</strong>
              <Icon name="chevron" size={15} />
            </button>
          ))}
        </div>
      </section>

      <section className="panel task-panel">
        <div className="panel-heading"><div><h2>Next actions</h2><p>Work most likely to move revenue</p></div><span className="count-badge">4</span></div>
        <div className="task-list">
          {tasks.map(([task, date, priority]) => (
            <label className="task-row" key={task}>
              <input type="checkbox" />
              <span><strong>{task}</strong><small>{date}</small></span>
              {priority === "urgent" && <span className="urgent-dot" />}
            </label>
          ))}
        </div>
      </section>

      <section className="panel activity-panel">
        <div className="panel-heading"><div><h2>Recent activity</h2><p>Signals from the last 24 hours</p></div></div>
        <div className="activity-list">
          <Activity initials="ER" tone="violet" title="Elena Rossi replied" detail="Asked for the final rollout assumptions" time="18m" />
          <Activity initials="JB" tone="green" title="Aperture moved to contract" detail="Security review marked complete" time="2h" />
          <Activity initials="KN" tone="blue" title="Forma opened the proposal" detail="Viewed by 4 stakeholders" time="5h" />
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, delta, detail, warning = false }: { label: string; value: string; delta: string; detail: string; warning?: boolean }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <div><em className={warning ? "metric-warning" : "metric-positive"}>{delta}</em><small>{detail}</small></div>
    </article>
  );
}

function Activity({ initials, tone, title, detail, time }: { initials: string; tone: string; title: string; detail: string; time: string }) {
  return (
    <div className="activity-row">
      <div className={`avatar avatar-${tone}`}>{initials}</div>
      <div><strong>{title}</strong><span>{detail}</span></div>
      <time>{time}</time>
    </div>
  );
}

function CompaniesTable({ companies: rows, onOpen }: { companies: Company[]; onOpen: (company: Company) => void }) {
  return (
    <section className="table-panel">
      <div className="table-toolbar"><span>{rows.length} companies</span><div><button>All owners</button><button>All industries</button></div></div>
      <div className="data-table company-table">
        <div className="data-row data-head"><span>Company</span><span>Industry</span><span>Location</span><span>Owner</span><span>Pipeline</span><span>Contacts</span></div>
        {rows.map((company) => (
          <button className="data-row" key={company.id} onClick={() => onOpen(company)}>
            <span className="entity-cell"><span className={`entity-logo logo-${company.tone}`}>{company.name.slice(0, 1)}</span><span><strong>{company.name}</strong><small>{company.domain}</small></span></span>
            <span>{company.industry}</span><span>{company.location}</span><span>{company.owner}</span><strong>{money(company.pipeline)}</strong><span>{company.contacts}</span>
          </button>
        ))}
        {rows.length === 0 && <EmptyState />}
      </div>
    </section>
  );
}

function ContactsTable({ contacts: rows, onOpen }: { contacts: Contact[]; onOpen: (contact: Contact) => void }) {
  return (
    <section className="table-panel">
      <div className="table-toolbar"><span>{rows.length} contacts</span><div><button>All owners</button><button>Last contacted</button></div></div>
      <div className="data-table contact-table">
        <div className="data-row data-head"><span>Contact</span><span>Company</span><span>Email</span><span>Owner</span><span>Last contact</span></div>
        {rows.map((contact) => (
          <button className="data-row" key={contact.id} onClick={() => onOpen(contact)}>
            <span className="entity-cell"><span className={`avatar avatar-${contact.tone}`}>{contact.initials}</span><span><strong>{contact.name}</strong><small>{contact.title}</small></span></span>
            <span>{contact.company}</span><span>{contact.email}</span><span>{contact.owner}</span><span>{contact.lastContact}</span>
          </button>
        ))}
        {rows.length === 0 && <EmptyState />}
      </div>
    </section>
  );
}

function DealsBoard({ deals, onOpen }: { deals: Deal[]; onOpen: (deal: Deal) => void }) {
  return (
    <div className="board">
      {stages.map((stage) => {
        const stageDeals = deals.filter((deal) => deal.stage === stage);
        const total = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
        return (
          <section className="board-column" key={stage}>
            <header><div><span className={`column-dot dot-${stage.toLowerCase()}`} /><strong>{stage}</strong><em>{stageDeals.length}</em></div><span>{money(total, true)}</span></header>
            <div className="deal-cards">
              {stageDeals.map((deal) => (
                <button className="deal-card" key={deal.id} onClick={() => onOpen(deal)}>
                  <div className="deal-card-top"><span>{deal.company}</span><span>{deal.probability}%</span></div>
                  <h3>{deal.name}</h3>
                  <strong>{money(deal.value)}</strong>
                  <div className="deal-card-bottom"><span>{deal.owner}</span><time>{deal.close}</time></div>
                </button>
              ))}
              {stageDeals.length === 0 && <div className="empty-column">No matching deals</div>}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function RecordDrawer({ record, onClose }: { record: DrawerRecord; onClose: () => void }) {
  const title = record.data.name;
  const subtitle = record.kind === "company" ? record.data.domain : record.kind === "contact" ? `${record.data.title} at ${record.data.company}` : record.data.company;

  return (
    <div className="drawer-layer" role="dialog" aria-modal="true" aria-label={`${record.kind} details`}>
      <button className="drawer-scrim" onClick={onClose} aria-label="Close details" />
      <aside className="drawer">
        <header className="drawer-header">
          <div><span className="eyebrow">{record.kind}</span><h2>{title}</h2><p>{subtitle}</p></div>
          <button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </header>
        <div className="drawer-tabs"><button className="active">Overview</button><button>Activity</button><button>Agent</button></div>
        <div className="drawer-content">
          {record.kind === "company" && <CompanyDetails company={record.data} />}
          {record.kind === "contact" && <ContactDetails contact={record.data} />}
          {record.kind === "deal" && <DealDetails deal={record.data} />}
        </div>
      </aside>
    </div>
  );
}

function CompanyDetails({ company }: { company: Company }) {
  return <><DetailHero label="Account brief" text={company.summary} /><DetailGrid items={[["Industry", company.industry], ["Location", company.location], ["Owner", company.owner], ["Open pipeline", money(company.pipeline)], ["Contacts", String(company.contacts)], ["Domain", company.domain]]} /><Timeline /></>;
}

function ContactDetails({ contact }: { contact: Contact }) {
  return <><DetailHero label="Relationship signal" text={`${contact.name} is an active stakeholder at ${contact.company}. Their last recorded interaction was ${contact.lastContact.toLowerCase()}.`} /><DetailGrid items={[["Title", contact.title], ["Company", contact.company], ["Email", contact.email], ["Owner", contact.owner], ["Last contact", contact.lastContact], ["Status", "Active stakeholder"]]} /><Timeline /></>;
}

function DealDetails({ deal }: { deal: Deal }) {
  return <><DetailHero label="Opportunity summary" text={`${deal.name} is currently in ${deal.stage.toLowerCase()} with a ${deal.probability}% weighted probability of closing.`} /><DetailGrid items={[["Company", deal.company], ["Value", money(deal.value)], ["Stage", deal.stage], ["Probability", `${deal.probability}%`], ["Owner", deal.owner], ["Target close", deal.close]]} /><div className="probability"><div><span>Close probability</span><strong>{deal.probability}%</strong></div><div className="probability-track"><span style={{ width: `${deal.probability}%` }} /></div></div><Timeline /></>;
}

function DetailHero({ label, text }: { label: string; text: string }) {
  return <section className="detail-hero"><span>{label}</span><p>{text}</p><button className="secondary-button">Research with agent</button></section>;
}

function DetailGrid({ items }: { items: [string, string][] }) {
  return <dl className="detail-grid">{items.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}

function Timeline() {
  return <section className="timeline"><h3>Recent activity</h3><div><span /><p><strong>Account notes updated</strong><small>Agent extracted new context from a customer reply · 18m</small></p></div><div><span /><p><strong>Follow-up scheduled</strong><small>Next action assigned to the account owner · 2h</small></p></div><div><span /><p><strong>Record enriched</strong><small>Company and stakeholder information refreshed · Yesterday</small></p></div></section>;
}

function CreateDealModal({ onClose, onCreate }: { onClose: () => void; onCreate: (deal: Deal) => void }) {
  const [name, setName] = useState("Expansion opportunity");
  const [company, setCompany] = useState("Northstar Labs");
  const [value, setValue] = useState("85000");
  const [stage, setStage] = useState<DealStage>("Qualified");

  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Create deal">
      <button className="modal-scrim" onClick={onClose} aria-label="Close modal" />
      <form className="modal" onSubmit={(event) => {
        event.preventDefault();
        onCreate({ id: `temp-${Date.now()}`, name, company, value: Math.max(0, Number(value) || 0), stage, owner: "Maya Chen", close: "Oct 18", probability: stage === "Qualified" ? 25 : 45 });
      }}>
        <header><div><span className="eyebrow">Browser-only</span><h2>Create a temporary deal</h2><p>This record exists only until you refresh the page.</p></div><button type="button" className="icon-button" onClick={onClose}><Icon name="close" /></button></header>
        <label><span>Deal name</span><input value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label><span>Company</span><select value={company} onChange={(event) => setCompany(event.target.value)}>{companies.map((item) => <option key={item.id}>{item.name}</option>)}</select></label>
        <div className="field-row"><label><span>Value (USD)</span><input type="number" min="0" value={value} onChange={(event) => setValue(event.target.value)} required /></label><label><span>Stage</span><select value={stage} onChange={(event) => setStage(event.target.value as DealStage)}>{stages.map((item) => <option key={item}>{item}</option>)}</select></label></div>
        <footer><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Create temporary deal</button></footer>
      </form>
    </div>
  );
}

function EmptyState() {
  return <div className="empty-state"><Icon name="search" /><strong>No matching records</strong><span>Try a broader search.</span></div>;
}
