
import { ProductStats } from "@/app/_components/stat";
import { caller } from "@/lib/trpc/server";
import { ProductsTable } from "./_components/table";


export default async function Home() {
	const { stats } = await caller.getLatestProductStats();
	const { products } = await caller.getAllProducts({ limit: 50 });


	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid gap-6">
				<ProductStats stats={stats} />
				<ProductsTable  />
			</div>
		</div>
	);
}
