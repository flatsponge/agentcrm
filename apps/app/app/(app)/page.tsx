import type { SearchParams } from "nuqs/server";
import {
	PageShell,
	PageShellActions,
	PageShellContent,
	PageShellHeader,
	PageShellHeading,
} from "@/components/page-shell";
import {
	DEMO_MODE,
	demoDashboardSummary,
	demoUser,
} from "@/lib/demo-data";
import { requireSession } from "@/lib/session";
import { HydrateClient } from "@/lib/trpc/hydrate";
import { getServerQueryClient, getServerTrpc } from "@/lib/trpc/server";
import { DashboardSummary } from "./dashboard-summary";
import { OverviewGreeting } from "./overview-greeting";
import { OverviewScopeToggle } from "./overview-scope";
import { loadOverviewSearchParams } from "./overview-search-params";

export default async function OverviewPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>;
}) {
	const { scope } = await loadOverviewSearchParams(searchParams);
	const trpc = getServerTrpc();
	const queryClient = getServerQueryClient();
	const userQuery = trpc.users.me.queryOptions();
	const dashboardQuery = trpc.dashboard.summary.queryOptions({ scope });

	if (DEMO_MODE) {
		queryClient.setQueryData(userQuery.queryKey, demoUser as never);
		queryClient.setQueryData(dashboardQuery.queryKey, {
			...demoDashboardSummary,
			scope,
		} as never);
	} else {
		await requireSession();
		await Promise.all([
			queryClient.prefetchQuery(userQuery),
			queryClient.prefetchQuery(dashboardQuery),
		]);
	}

	return (
		<PageShell>
			<PageShellHeader>
				<PageShellHeading>
					<HydrateClient>
						<OverviewGreeting />
					</HydrateClient>
				</PageShellHeading>
				<PageShellActions>
					<OverviewScopeToggle />
				</PageShellActions>
			</PageShellHeader>

			<PageShellContent>
				<HydrateClient>
					<DashboardSummary />
				</HydrateClient>
			</PageShellContent>
		</PageShell>
	);
}
