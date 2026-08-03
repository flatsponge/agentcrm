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
	demoContactsList,
	demoUsers,
} from "@/lib/demo-data";
import { requireSession } from "@/lib/session";
import { HydrateClient } from "@/lib/trpc/hydrate";
import { getServerQueryClient, getServerTrpc } from "@/lib/trpc/server";
import { contactsSearchParams } from "./contacts-search-params";
import { ContactsTable } from "./contacts-table";
import { CreateContactSheet } from "./create-contact-sheet";

export const metadata: Metadata = {
	title: "Contacts",
};

export default async function ContactsPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>;
}) {
	const values = await contactsSearchParams.load(searchParams);
	const trpc = getServerTrpc();
	const queryClient = getServerQueryClient();
	const contactsQuery = trpc.contacts.list.queryOptions(
		contactsSearchParams.toInput(values),
	);
	const usersQuery = trpc.users.list.queryOptions();
	const companiesQuery = trpc.companies.options.queryOptions({ q: "" });

	if (DEMO_MODE) {
		queryClient.setQueryData(contactsQuery.queryKey, demoContactsList);
		queryClient.setQueryData(usersQuery.queryKey, demoUsers);
		queryClient.setQueryData(companiesQuery.queryKey, demoCompanyOptions);
	} else {
		await requireSession();
		await queryClient.prefetchQuery(contactsQuery);
		void queryClient.prefetchQuery(usersQuery);
		void queryClient.prefetchQuery(companiesQuery);
	}

	return (
		<PageShell className="min-h-0">
			<PageShellHeader>
				<PageShellHeading>
					<PageShellTitle>Contacts</PageShellTitle>
					<PageShellDescription>Everyone in the pipeline.</PageShellDescription>
				</PageShellHeading>
				<PageShellActions>
					<ListSearch placeholder="Search by name, email or company…" />
					<CreateContactSheet />
				</PageShellActions>
			</PageShellHeader>

			<PageShellContent className="min-h-0">
				<HydrateClient>
					<ContactsTable />
				</HydrateClient>
			</PageShellContent>
		</PageShell>
	);
}
