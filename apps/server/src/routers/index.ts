import z from "zod";
import { db } from "../db";
import { productStats, products } from "../db/schema/products";
import { publicProcedure, router } from "../lib/trpc";
import { asc, desc, gt, gte, lt, lte } from "drizzle-orm";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	getAllProducts: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(500).optional().default(50),
				cursor: z.number().nullish().optional(),
			}),
		)
		.query(async (opts) => {
			const { limit, cursor } = opts.input;
			const allProducts = await db
				.select()
				.from(products)
				.where(gt(products.id, cursor || 0))
				.orderBy( asc(products.id))
				.limit(limit);

			let nextCursor: typeof cursor | undefined = undefined;

			if(allProducts.length > 0){
				nextCursor = allProducts[allProducts.length - 1].id as number
			}


			// await new Promise((resolve) => setTimeout(resolve, 3000));

			return {
				products: allProducts,
				nextCursor
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
