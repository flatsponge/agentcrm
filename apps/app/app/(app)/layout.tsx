import { AppHeader } from "@/components/app-header";
import { AppIconRail } from "@/components/app-icon-rail";
import { QuickSwitcher } from "@/components/crm/quick-switcher";
import { RecordSheetHost } from "@/components/crm/record-sheet/record-sheet-host";
import { MobileNavProvider } from "@/components/mobile-nav";
import { DEMO_MODE, demoUser } from "@/lib/demo-data";
import { requireGoogleAccess } from "@/lib/session";

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = DEMO_MODE ? demoUser : (await requireGoogleAccess()).user;

	return (
		<MobileNavProvider>
			<div className="isolate flex h-svh flex-col">
				<AppHeader
					user={{
						name: user.name,
						email: user.email,
						image: user.image ?? null,
					}}
				/>
				<div className="flex min-h-0 flex-1">
					<AppIconRail />
					{children}
				</div>

				{DEMO_MODE ? null : <RecordSheetHost />}
				{DEMO_MODE ? null : <QuickSwitcher />}
			</div>
		</MobileNavProvider>
	);
}
