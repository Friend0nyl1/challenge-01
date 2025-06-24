import z from "zod";
import { db } from "../db";
import { productStats, products } from "../db/schema/products";
import { publicProcedure, router } from "../lib/trpc";
import { asc, desc, gt, lt } from "drizzle-orm";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	getAllProducts: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).optional().default(50),
				cursor: z.number().nullish(),
				direction: z.enum(['forward', 'backward']).optional().default('forward'),
			}),
		)
		.query(async (opts) => {
			const { limit, cursor, direction } = opts.input;
			const allProducts = await db
				.select()
				.from(products)
				.where(direction === 'forward' ? gt(products.id, cursor || 0) : lt(products.id, cursor || 0))
				.orderBy(direction === 'forward' ? asc(products.id) : desc(products.id))
				.limit(limit);

			let nextCursor: typeof cursor | undefined = undefined;
			let previousCursor: typeof cursor | undefined = undefined;

			if (allProducts.length > limit) {
				if (direction === 'forward') {
					const nextItem = allProducts.pop();
					nextCursor = nextItem?.id as number
				} else {
					const previousItem = allProducts.shift()
					previousCursor = previousItem?.id as number
					nextCursor = allProducts[allProducts.length - 1].id as number
				}
			}

			if(direction === 'backward'){
				allProducts.reverse()
			}

			await new Promise((resolve) => setTimeout(resolve, 3000));

			return {
				products: allProducts,
				nextCursor,
				previousCursor
			};
		}),
	getLatestProductStats: publicProcedure.query(async () => {
		const latestStats = await db
			.select()
			.from(productStats)
			.orderBy(productStats.created_at)
			.limit(1);

		return {
			stats: latestStats[0] || null,
		};
	}),
});
export type AppRouter = typeof appRouter;
