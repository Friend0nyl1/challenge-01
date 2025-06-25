import z from "zod";
import { db } from "../db";
import { productStats, products } from "../db/schema/products";
import { publicProcedure, router } from "../lib/trpc";
import { asc, gt, and, like, sql  } from "drizzle-orm";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	getAllProducts: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(500).optional().default(50),
				cursor: z.number().nullish().optional(),
				search : z.string().nullish().optional()
			}),
		)
		.query(async (opts) => {
			const { limit, cursor , search } = opts.input;
			const conditions = [
            gt(products.id, cursor || 0)
        ];

        if (search) {
            const searchKeywords = search.split(/[, ]/).filter(Boolean);

            if (searchKeywords.length > 0) {
                const searchConditions = searchKeywords.map(keyword => {
                    const searchTerm = `%${keyword}%`;

                    const concatenatedSearchableFields = sql<string>`
                        ${products.id} || ' ' || ${products.name} || ' ' || ${products.description} || ' ' || ${products.category} || ' ' || ${products.subcategory} || ' ' || ${products.sku} || ' ' || ${products.barcode} || ' ' || ${products.manufacturer} || ' ' || ${products.color} || ' ' || ${products.size} || ' ' || ${products.material} || ' ' || ${products.country_of_origin}
                    `;
                    return like(concatenatedSearchableFields, searchTerm);
                });
                conditions.push(...searchConditions);

            }
        }
			const allProducts = await db
				.select()
				.from(products)
				.where(and(...conditions))
				.orderBy( asc(products.id))
				.limit(limit);

			let nextCursor: typeof cursor | undefined = undefined;

			if(allProducts.length > 0){
				nextCursor = allProducts[allProducts.length - 1].id as number
			}

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
