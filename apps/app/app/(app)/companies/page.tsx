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
	demoCompaniesList,
	demoUsers,
} from "@/lib/demo-data";
import { requireSession } from "@/lib/session";
import { HydrateClient } from "@/lib/trpc/hydrate";
import { getServerQueryClient, getServerTrpc } from "@/lib/trpc/server";
import { companiesSearchParams } from "./companies-search-params";
import { CompaniesTable } from "./companies-table";
import { CreateCompanySheet } from "./create-company-sheet";

export const metadata: Metadata = {
	title: "Companies",
};

export default async function CompaniesPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>;
}) {
	const values = await companiesSearchParams.load(searchParams);
	const trpc = getServerTrpc();
	const queryClient = getServerQueryClient();
	const companiesQuery = trpc.companies.list.queryOptions(
		companiesSearchParams.toInput(values),
	);
	const usersQuery = trpc.users.list.queryOptions();

	if (DEMO_MODE) {
		queryClient.setQueryData(companiesQuery.queryKey, demoCompaniesList);
		queryClient.setQueryData(usersQuery.queryKey, demoUsers);
	} else {
		await requireSession();
		await queryClient.prefetchQuery(companiesQuery);
		void queryClient.prefetchQuery(usersQuery);
	}

	return (
		<PageShell className="min-h-0">
			<PageShellHeader>
				<PageShellHeading>
					<PageShellTitle>Companies</PageShellTitle>
					<PageShellDescription>
						Every account in the pipeline.
					</PageShellDescription>
				</PageShellHeading>
				<PageShellActions>
					<ListSearch placeholder="Search companies by name or domain…" />
					<CreateCompanySheet />
				</PageShellActions>
			</PageShellHeader>

			<PageShellContent className="min-h-0">
				<HydrateClient>
					<CompaniesTable />
				</HydrateClient>
			</PageShellContent>
		</PageShell>
	);
}
