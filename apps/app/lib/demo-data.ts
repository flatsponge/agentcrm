export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const demoUser = {
	id: "user-demo-morgan",
	name: "Morgan Chen",
	email: "morgan@comp.ai",
	image: null,
	emailVerified: true,
	createdAt: "2026-01-05T09:00:00.000Z",
	updatedAt: "2026-08-03T08:00:00.000Z",
};

export const demoUsers = [
	demoUser,
	{
		id: "user-demo-elena",
		name: "Elena Rossi",
		email: "elena@comp.ai",
		image: null,
	},
	{
		id: "user-demo-james",
		name: "James Bell",
		email: "james@comp.ai",
		image: null,
	},
];

const companies = [
	{
		id: "company-northstar",
		name: "Northstar Labs",
		domain: "northstarlabs.com",
		industry: "Artificial intelligence",
		location: "San Francisco, US",
		website: "https://northstarlabs.com",
		description: "Enterprise AI infrastructure for regulated teams.",
		logoUrl: null,
		iconUrl: null,
		iconDarkUrl: null,
		iconTone: "dark",
		owner: demoUser,
		contactCount: 4,
		openDealCount: 1,
		createdAt: "2026-05-10T10:00:00.000Z",
		lastActivityAt: "2026-08-03T08:42:00.000Z",
		enrichmentStatus: "COMPLETE",
		queued: false,
	},
	{
		id: "company-aperture",
		name: "Aperture Health",
		domain: "aperture.health",
		industry: "Healthcare software",
		location: "Boston, US",
		website: "https://aperture.health",
		description: "Clinical operations software for multi-site providers.",
		logoUrl: null,
		iconUrl: null,
		iconDarkUrl: null,
		iconTone: "light",
		owner: demoUsers[1],
		contactCount: 6,
		openDealCount: 1,
		createdAt: "2026-04-19T09:00:00.000Z",
		lastActivityAt: "2026-08-03T06:15:00.000Z",
		enrichmentStatus: "COMPLETE",
		queued: false,
	},
	{
		id: "company-forma",
		name: "Forma Systems",
		domain: "formasystems.io",
		industry: "Business software",
		location: "Berlin, Germany",
		website: "https://formasystems.io",
		description: "Workflow software for distributed operations teams.",
		logoUrl: null,
		iconUrl: null,
		iconDarkUrl: null,
		iconTone: "dark",
		owner: demoUsers[2],
		contactCount: 3,
		openDealCount: 1,
		createdAt: "2026-03-22T12:30:00.000Z",
		lastActivityAt: "2026-08-02T19:20:00.000Z",
		enrichmentStatus: "COMPLETE",
		queued: false,
	},
	{
		id: "company-juniper",
		name: "Juniper Works",
		domain: "juniperworks.com",
		industry: "Professional services",
		location: "London, UK",
		website: "https://juniperworks.com",
		description: "Operations consultancy for growing technology companies.",
		logoUrl: null,
		iconUrl: null,
		iconDarkUrl: null,
		iconTone: "light",
		owner: demoUser,
		contactCount: 2,
		openDealCount: 1,
		createdAt: "2026-06-04T14:15:00.000Z",
		lastActivityAt: "2026-08-01T15:40:00.000Z",
		enrichmentStatus: "COMPLETE",
		queued: false,
	},
	{
		id: "company-relay",
		name: "Relay Commerce",
		domain: "relaycommerce.co",
		industry: "E-commerce",
		location: "Toronto, Canada",
		website: "https://relaycommerce.co",
		description: "Revenue operations software for omnichannel retailers.",
		logoUrl: null,
		iconUrl: null,
		iconDarkUrl: null,
		iconTone: "dark",
		owner: demoUsers[1],
		contactCount: 5,
		openDealCount: 1,
		createdAt: "2026-02-15T11:45:00.000Z",
		lastActivityAt: "2026-07-31T17:10:00.000Z",
		enrichmentStatus: "COMPLETE",
		queued: false,
	},
	{
		id: "company-atlas",
		name: "Atlas Energy",
		domain: "atlasenergy.eu",
		industry: "Energy",
		location: "Prague, Czechia",
		website: "https://atlasenergy.eu",
		description: "Commercial energy services and portfolio management.",
		logoUrl: null,
		iconUrl: null,
		iconDarkUrl: null,
		iconTone: "light",
		owner: demoUsers[2],
		contactCount: 7,
		openDealCount: 1,
		createdAt: "2026-01-28T08:20:00.000Z",
		lastActivityAt: "2026-07-30T09:05:00.000Z",
		enrichmentStatus: "COMPLETE",
		queued: false,
	},
];

export const demoCompanyOptions = companies.map(({ id, name }) => ({ id, name }));

export const demoCompaniesList = {
	rows: companies,
	total: companies.length,
	facetCounts: {
		owner: {
			"user-demo-morgan": 2,
			"user-demo-elena": 2,
			"user-demo-james": 2,
		},
		industry: Object.fromEntries(companies.map((company) => [company.industry, 1])),
		enrichment: { COMPLETE: companies.length },
	},
};

const contacts = [
	{
		id: "contact-elena",
		firstName: "Elena",
		lastName: "Rossi",
		name: "Elena Rossi",
		email: "elena@northstarlabs.com",
		phone: "+1 415 555 0102",
		title: "VP of Revenue",
		imageUrl: null,
		company: companies[0],
		owner: demoUser,
		createdAt: "2026-05-11T08:00:00.000Z",
		lastActivityAt: "2026-08-03T08:42:00.000Z",
	},
	{
		id: "contact-james",
		firstName: "James",
		lastName: "Bell",
		name: "James Bell",
		email: "james@aperture.health",
		phone: "+1 617 555 0114",
		title: "Chief Operating Officer",
		imageUrl: null,
		company: companies[1],
		owner: demoUsers[1],
		createdAt: "2026-04-20T08:00:00.000Z",
		lastActivityAt: "2026-08-03T06:15:00.000Z",
	},
	{
		id: "contact-klara",
		firstName: "Klara",
		lastName: "Novak",
		name: "Klara Novak",
		email: "klara@formasystems.io",
		phone: "+49 30 555 0192",
		title: "Director of Operations",
		imageUrl: null,
		company: companies[2],
		owner: demoUsers[2],
		createdAt: "2026-03-23T08:00:00.000Z",
		lastActivityAt: "2026-08-02T19:20:00.000Z",
	},
	{
		id: "contact-sam",
		firstName: "Sam",
		lastName: "Turner",
		name: "Sam Turner",
		email: "sam@juniperworks.com",
		phone: "+44 20 7946 0123",
		title: "Managing Partner",
		imageUrl: null,
		company: companies[3],
		owner: demoUser,
		createdAt: "2026-06-05T08:00:00.000Z",
		lastActivityAt: "2026-08-01T15:40:00.000Z",
	},
	{
		id: "contact-nadia",
		firstName: "Nadia",
		lastName: "Hughes",
		name: "Nadia Hughes",
		email: "nadia@relaycommerce.co",
		phone: "+1 416 555 0188",
		title: "Head of Sales",
		imageUrl: null,
		company: companies[4],
		owner: demoUsers[1],
		createdAt: "2026-02-16T08:00:00.000Z",
		lastActivityAt: "2026-07-31T17:10:00.000Z",
	},
	{
		id: "contact-petr",
		firstName: "Petr",
		lastName: "Kral",
		name: "Petr Kral",
		email: "petr@atlasenergy.eu",
		phone: "+420 222 555 017",
		title: "Commercial Director",
		imageUrl: null,
		company: companies[5],
		owner: demoUsers[2],
		createdAt: "2026-01-29T08:00:00.000Z",
		lastActivityAt: "2026-07-30T09:05:00.000Z",
	},
];

export const demoContactsList = {
	rows: contacts,
	total: contacts.length,
	facetCounts: {
		owner: {
			"user-demo-morgan": 2,
			"user-demo-elena": 2,
			"user-demo-james": 2,
		},
		company: Object.fromEntries(companies.map((company) => [company.id, 1])),
	},
};

const deals = [
	{
		id: "deal-northstar",
		name: "Enterprise rollout",
		company: companies[0],
		stage: "DECISION_MAKER_BOUGHT_IN",
		amountCents: 24000000,
		currency: "USD",
		owner: demoUser,
		expectedCloseDate: "2026-08-28T00:00:00.000Z",
		stageChangedAt: "2026-07-29T14:00:00.000Z",
		createdAt: "2026-05-12T08:00:00.000Z",
		lastActivityAt: "2026-08-03T08:42:00.000Z",
	},
	{
		id: "deal-aperture",
		name: "Clinical operations platform",
		company: companies[1],
		stage: "CONTRACT_SENT",
		amountCents: 18500000,
		currency: "USD",
		owner: demoUsers[1],
		expectedCloseDate: "2026-08-18T00:00:00.000Z",
		stageChangedAt: "2026-08-02T10:30:00.000Z",
		createdAt: "2026-04-21T08:00:00.000Z",
		lastActivityAt: "2026-08-03T06:15:00.000Z",
	},
	{
		id: "deal-forma",
		name: "Regional workflow replacement",
		company: companies[2],
		stage: "QUALIFIED_TO_BUY",
		amountCents: 14200000,
		currency: "USD",
		owner: demoUsers[2],
		expectedCloseDate: "2026-09-14T00:00:00.000Z",
		stageChangedAt: "2026-07-26T11:15:00.000Z",
		createdAt: "2026-03-24T08:00:00.000Z",
		lastActivityAt: "2026-08-02T19:20:00.000Z",
	},
	{
		id: "deal-juniper",
		name: "Advisory team pilot",
		company: companies[3],
		stage: "DEMO_BOOKED",
		amountCents: 9700000,
		currency: "USD",
		owner: demoUser,
		expectedCloseDate: "2026-09-30T00:00:00.000Z",
		stageChangedAt: "2026-07-31T09:00:00.000Z",
		createdAt: "2026-06-06T08:00:00.000Z",
		lastActivityAt: "2026-08-01T15:40:00.000Z",
	},
	{
		id: "deal-relay",
		name: "Revenue intelligence workspace",
		company: companies[4],
		stage: "QUALIFIED_TO_BUY",
		amountCents: 7400000,
		currency: "USD",
		owner: demoUsers[1],
		expectedCloseDate: "2026-09-07T00:00:00.000Z",
		stageChangedAt: "2026-07-22T12:00:00.000Z",
		createdAt: "2026-02-17T08:00:00.000Z",
		lastActivityAt: "2026-07-31T17:10:00.000Z",
	},
	{
		id: "deal-atlas",
		name: "Commercial portfolio CRM",
		company: companies[5],
		stage: "DEMO_BOOKED",
		amountCents: 5200000,
		currency: "USD",
		owner: demoUsers[2],
		expectedCloseDate: "2026-10-02T00:00:00.000Z",
		stageChangedAt: "2026-07-18T08:00:00.000Z",
		createdAt: "2026-01-30T08:00:00.000Z",
		lastActivityAt: "2026-07-30T09:05:00.000Z",
	},
];

export const demoDealsList = {
	rows: deals,
	total: deals.length,
	openValueCents: deals.reduce((sum, deal) => sum + (deal.amountCents ?? 0), 0),
	facetCounts: {
		owner: {
			"user-demo-morgan": 2,
			"user-demo-elena": 2,
			"user-demo-james": 2,
		},
		stage: {
			DEMO_BOOKED: 2,
			QUALIFIED_TO_BUY: 2,
			DECISION_MAKER_BOUGHT_IN: 1,
			CONTRACT_SENT: 1,
		},
		closing: { this_month: 2, next_month: 3, later: 1 },
		status: { open: deals.length, closed: 0 },
	},
};

export const demoDashboardSummary = {
	pipeline: {
		totalCents: 79000000,
		totalDeals: 6,
		stages: [
			{ stage: "DEMO_BOOKED", valueCents: 14900000, count: 2 },
			{ stage: "QUALIFIED_TO_BUY", valueCents: 21600000, count: 2 },
			{
				stage: "DECISION_MAKER_BOUGHT_IN",
				valueCents: 24000000,
				count: 1,
			},
			{ stage: "CONTRACT_SENT", valueCents: 18500000, count: 1 },
		],
	},
	wonThisMonth: { valueCents: 31800000, count: 3 },
	wonPrevMonth: { valueCents: 27600000, count: 2 },
	performance: {
		windowDays: 90,
		winRate: 0.34,
		wins: 11,
		losses: 21,
		avgDealCents: 12600000,
		avgCycleDays: 41,
	},
	trend: [
		{ month: "Mar", won: 9200000, created: 15400000 },
		{ month: "Apr", won: 14800000, created: 18600000 },
		{ month: "May", won: 11500000, created: 21900000 },
		{ month: "Jun", won: 27600000, created: 17100000 },
		{ month: "Jul", won: 22400000, created: 23800000 },
		{ month: "Aug", won: 31800000, created: 19400000 },
	],
	closingThisMonthTotal: { valueCents: 42500000, count: 2 },
	biggestOpen: deals.slice(0, 5),
	overdueTasks: [
		{
			id: "task-legal",
			subject: "Review Aperture legal redlines",
			dueAt: "2026-08-01T12:00:00.000Z",
			deal: { id: deals[1].id, name: deals[1].name },
			company: { id: companies[1].id, name: companies[1].name },
		},
		{
			id: "task-roi",
			subject: "Prepare Northstar ROI summary",
			dueAt: "2026-08-02T12:00:00.000Z",
			deal: { id: deals[0].id, name: deals[0].name },
			company: { id: companies[0].id, name: companies[0].name },
		},
		{
			id: "task-forma",
			subject: "Send Forma implementation plan",
			dueAt: "2026-07-31T12:00:00.000Z",
			deal: { id: deals[2].id, name: deals[2].name },
			company: { id: companies[2].id, name: companies[2].name },
		},
	],
	recentActivity: [
		{
			id: "activity-reply",
			type: "EMAIL",
			subject: "Elena replied with rollout assumptions",
			company: { id: companies[0].id, name: companies[0].name },
			deal: { id: deals[0].id, name: deals[0].name },
			createdBy: { name: demoUser.name },
			createdAt: "2026-08-03T08:42:00.000Z",
		},
		{
			id: "activity-stage",
			type: "STAGE_CHANGE",
			subject: "Aperture moved to contract sent",
			company: { id: companies[1].id, name: companies[1].name },
			deal: { id: deals[1].id, name: deals[1].name },
			createdBy: { name: demoUsers[1].name },
			createdAt: "2026-08-03T06:15:00.000Z",
		},
		{
			id: "activity-note",
			type: "NOTE",
			subject: "Forma implementation risks documented",
			company: { id: companies[2].id, name: companies[2].name },
			deal: { id: deals[2].id, name: deals[2].name },
			createdBy: { name: demoUsers[2].name },
			createdAt: "2026-08-02T19:20:00.000Z",
		},
	],
};

export const demoQuickSearch = {
	hits: [
		...companies.map((company) => ({
			kind: "company" as const,
			id: company.id,
			label: company.name,
			detail: company.domain,
			iconUrl: company.iconUrl,
			iconDarkUrl: company.iconDarkUrl,
			iconTone: company.iconTone,
		})),
		...contacts.map((contact) => ({
			kind: "contact" as const,
			id: contact.id,
			label: contact.name,
			detail: `${contact.title} · ${contact.company.name}`,
			imageUrl: contact.imageUrl,
		})),
		...deals.map((deal) => ({
			kind: "deal" as const,
			id: deal.id,
			label: deal.name,
			detail: deal.company.name,
			iconUrl: deal.company.iconUrl,
			iconDarkUrl: deal.company.iconDarkUrl,
			iconTone: deal.company.iconTone,
		})),
	],
};

export function resolveDemoTrpc(path: string, input: unknown, type: string): unknown {
	switch (path) {
		case "users.me":
			return demoUser;
		case "users.list":
			return demoUsers;
		case "dashboard.summary":
			return demoDashboardSummary;
		case "companies.list":
			return demoCompaniesList;
		case "companies.options":
			return demoCompanyOptions;
		case "contacts.list":
			return demoContactsList;
		case "deals.list":
			return demoDealsList;
		case "search.quick": {
			const q = String((input as { q?: string } | undefined)?.q ?? "")
				.trim()
				.toLowerCase();
			return {
				hits: q
					? demoQuickSearch.hits.filter((hit) =>
							`${hit.label} ${hit.detail ?? ""}`.toLowerCase().includes(q),
						)
					: [],
			};
		}
		case "google.status":
			return {
				connected: false,
				email: demoUser.email,
				grantedScopes: [],
				requiredScopes: [],
			};
		case "settings.agentModel":
			return { selectedId: null, effectiveId: "openai/gpt-5-mini" };
		case "settings.modelCatalog":
			return {
				defaultId: "openai/gpt-5-mini",
				models: [
					{ id: "openai/gpt-5-mini", name: "GPT-5 mini" },
					{ id: "anthropic/claude-sonnet-4", name: "Claude Sonnet 4" },
				],
			};
		default:
			if (type === "mutation") {
				return {
					id: `demo-${Date.now()}`,
					...(typeof input === "object" && input !== null ? input : {}),
				};
			}
			if (path.endsWith(".options") || path.endsWith(".list")) return [];
			return null;
	}
}
