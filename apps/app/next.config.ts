import { loadRootEnv } from "@crm/env";
import type { NextConfig } from "next";

loadRootEnv();

const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
const apiUrl =
	process.env.API_URL ??
	process.env.NEXT_PUBLIC_API_URL ??
	"http://localhost:3001";

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_API_URL: apiUrl,
		NEXT_PUBLIC_DEMO_MODE: demoMode ? "true" : "false",
		...(demoMode
			? {
					DATABASE_URL: "postgresql://demo:demo@127.0.0.1:5432/demo",
					BETTER_AUTH_SECRET: "demo-browser-only-secret-not-used",
				}
			: {}),
	},

	typescript: {
		tsconfigPath: demoMode ? "./tsconfig.demo.json" : "./tsconfig.json",
	},

	transpilePackages: ["@crm/auth", "@crm/db", "@crm/ui"],

	serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],

	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "**.blob.vercel-storage.com" },
		],
	},

	experimental: {
		viewTransition: true,
	},
};

export default nextConfig;
