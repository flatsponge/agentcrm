import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import { ListSearch } from "@/components/data-table/list-search";
import {
	PageShell,
	PageShellActions,
	PageShellContent,
	PageShellDescription,
	PageShellHeader,
	PageShellHeading,
	PageShellTitle,
} from "@/components/page-shell";
import {
	DEMO_MODE,
	demoCompanyOptions,
	demoDealsList,
	demoUsers,
} from "@/lib/demo-data";
import { requireSession } from "@/lib/session";
import { HydrateClient } from "@/lib/trpc/hydrate";
import { getServerQueryClient, getServerTrpc } from "@/lib/trpc/server";
import { CreateDealSheet } from "./create-deal-sheet";
import { dealsSearchParams } from "./deals-search-params";
import { DealsTable } from "./deals-table";

export const metadata: Metadata = {
	title: "Deals",
};

export default async function DealsPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>;
}) {
	const values = await dealsSearchParams.load(searchParams);
	const trpc = getServerTrpc();
	const queryClient = getServerQueryClient();
	const dealsQuery = trpc.deals.list.queryOptions(
		dealsSearchParams.toInput(values),
	);
	const usersQuery = trpc.users.list.queryOptions();
	const companiesQuery = trpc.companies.options.queryOptions({ q: "" });

	if (DEMO_MODE) {
		queryClient.setQueryData(dealsQuery.queryKey, demoDealsList as never);
		queryClient.setQueryData(usersQuery.queryKey, demoUsers as never);
		queryClient.setQueryData(companiesQuery.queryKey, demoCompanyOptions as never);
	} else {
		await requireSession();
		await queryClient.prefetchQuery(dealsQuery);
		void queryClient.prefetchQuery(usersQuery);
		void queryClient.prefetchQuery(companiesQuery);
	}

	return (
		<PageShell className="min-h-0">
			<PageShellHeader>
				<PageShellHeading>
					<PageShellTitle>Deals</PageShellTitle>
					<PageShellDescription>
						The pipeline, and everything that has already closed.
					</PageShellDescription>
				</PageShellHeading>
				<PageShellActions>
					<ListSearch placeholder="Search deals by name or company…" />
					<CreateDealSheet />
				</PageShellActions>
			</PageShellHeader>

			<PageShellContent className="min-h-0">
				<HydrateClient>
					<DealsTable />
				</HydrateClient>
			</PageShellContent>
		</PageShell>
	);
}
