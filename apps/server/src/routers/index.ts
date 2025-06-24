import z from "zod";
import { db } from "../db";
import { productStats, products } from "../db/schema/products";
import { publicProcedure, router } from "../lib/trpc";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	getAllProducts: publicProcedure
		.input(
			z.object({
				limit: z.number().optional(),
				offset: z.number().optional(),
			}),
		)
		.query(async (opts) => {
			const offset = opts.input.offset || 1;
			const limit = opts.input.limit || 50;

			const totalItem = await db.$count(products);
			const totalPage = Math.ceil(totalItem / limit);
			const skip = (offset - 1) * limit;

			const allProducts = await db
				.select()
				.from(products)
				.limit(limit)
				.offset(skip);
			await new Promise((resolve) => setTimeout(resolve, 3000));

			return {
				products: allProducts,
				totalPage: totalPage,
				totalItem: totalItem,
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
