
import { ProductStats } from "@/app/_components/stat";
import { ProductsTable } from "./_components/table";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Circle, LoaderCircle } from "lucide-react";
import { LoadingProductStats } from "@/components/loadingProductStats";


export default async function Home() {



	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid gap-6">
				<Suspense fallback={<LoadingProductStats/>}>
					<ProductStats />
				</Suspense>
				<Suspense fallback={<div className="absolute inset-0 flex items-center justify-center z-50                   
                    ">
					<LoaderCircle size={40} className="animate-spi " />
				</div>
				}>
					<ProductsTable />
				</Suspense>
			</div>
		</div>
	);
}
