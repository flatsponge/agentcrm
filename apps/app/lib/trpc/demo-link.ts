import { TRPCClientError, type TRPCLink } from "@trpc/client";
import { observable } from "@trpc/server/observable";
import type { AppRouter } from "api/app-router";
import { resolveDemoTrpc } from "@/lib/demo-data";

export const demoLink: TRPCLink<AppRouter> = () => {
	return ({ op }) =>
		observable((observer) => {
			queueMicrotask(() => {
				try {
					observer.next({
						result: {
							data: resolveDemoTrpc(op.path, op.input, op.type),
						},
					});
					observer.complete();
				} catch (cause) {
					observer.error(TRPCClientError.from(cause));
				}
			});

			return () => undefined;
		});
};
