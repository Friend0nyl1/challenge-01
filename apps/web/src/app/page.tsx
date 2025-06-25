'use client';
import { ProductStats } from "@/app/_components/stat";
import { ProductsTable } from "./_components/table";
import { Suspense, useState } from "react";
import {  LoaderCircle } from "lucide-react";
import { LoadingProductStats } from "@/components/loadingProductStats";
import { SearchInput } from "@/components/searchInput";
import { useDebounce } from "@/hook/debounce-hook";


export default  function Home() {
	const [ search , setSearch ] = useState<string | null>(null)
	const debouncedSearchTerm = useDebounce(search, 500);
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		setSearch(e.target.value)
	}


	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid gap-6">
				<Suspense fallback={<LoadingProductStats/>}>
					<ProductStats />
				</Suspense>
				<SearchInput handleSearch={handleSearch} />
				<Suspense fallback={<div className="absolute inset-0 flex items-center justify-center z-50                   
                    ">
					<LoaderCircle size={80} className="animate-spin" />
				</div>
				}>
					<ProductsTable search={debouncedSearchTerm} />
				</Suspense>
			</div>
		</div>
	);
}
