import { ProductStats } from "@/app/_components/stat";
import { caller } from "@/lib/trpc/server";
import { ProductsTable } from "./_components/table";

export default async function Home() {
	const { products } = await caller.getAllProducts({ limit: 50 , cursor: 0, direction: 'forward' });
	const { stats } = await caller.getLatestProductStats();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid gap-6">
				<ProductStats stats={stats} />
				<ProductsTable products={products} />
			</div>
		</div>
	);
}
