'use client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { trpc } from "@/lib/trpc/client";
import type { Product } from "@server/db/schema/products";

import { useEffect, useRef } from "react";

export function ProductsTable() {
	const loadMoreRef = useRef<HTMLDivElement>(null);

	const { data, fetchNextPage } = trpc.getAllProducts.useInfiniteQuery({limit: 500},
		{
			getNextPageParam: (res) => {
				if (res.products.length < 500) {
					return undefined
				}
				return res.nextCursor 
			},
			initialCursor: 0
		},

	);
	const products = data?.pages.flatMap((page) => page.products) || [];
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchNextPage()
					console.log('fetching next page')
				}
			},
			{ threshold: 1.0 }
		);


		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [])
	return (
		<>
			{data && (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>SKU</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Brand</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Subcategory</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Cost</TableHead>
							<TableHead>Weight</TableHead>
							<TableHead>Length</TableHead>
							<TableHead>Width</TableHead>
							<TableHead>Height</TableHead>
							<TableHead>Color</TableHead>
							<TableHead>Size</TableHead>
							<TableHead>Material</TableHead>
							<TableHead>Manufacturer</TableHead>
							<TableHead>Country of Origin</TableHead>
							<TableHead>Barcode</TableHead>
							<TableHead>Stock Quantity</TableHead>
							<TableHead>Min Stock Level</TableHead>
							<TableHead>Max Stock Level</TableHead>
							<TableHead>Is Active</TableHead>
							<TableHead>Is Featured</TableHead>
							<TableHead>Is Digital</TableHead>
							<TableHead>Requires Shipping</TableHead>
							<TableHead>Tax Rate</TableHead>
							<TableHead>Warranty (Months)</TableHead>
							<TableHead>Supplier Name</TableHead>
							<TableHead>Supplier Code</TableHead>
							<TableHead>Season</TableHead>
							<TableHead>Collection</TableHead>
							<TableHead>Style</TableHead>
							<TableHead>Pattern</TableHead>
							<TableHead>Fabric Composition</TableHead>
							<TableHead>Care Instructions</TableHead>
							<TableHead>Tags</TableHead>
							<TableHead>Meta Title</TableHead>
							<TableHead>Meta Description</TableHead>
							<TableHead>Slug</TableHead>
							<TableHead>Rating Average</TableHead>
							<TableHead>Rating Count</TableHead>
							<TableHead>View Count</TableHead>
							<TableHead>Purchase Count</TableHead>
							<TableHead>Created At</TableHead>
							<TableHead>Updated At</TableHead>
							<TableHead>Last Restocked At</TableHead>
							<TableHead>Discontinued At</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.id}>
								<TableCell>{product.id}</TableCell>
								<TableCell className="font-medium">{product.sku}</TableCell>
								<TableCell className="font-medium">{product.name}</TableCell>
								<TableCell>{product.description || "N/A"}</TableCell>
								<TableCell>{product.brand || "N/A"}</TableCell>
								<TableCell>{product.category || "N/A"}</TableCell>
								<TableCell>{product.subcategory || "N/A"}</TableCell>
								<TableCell className="text-right">
									${product.price || "N/A"}
								</TableCell>
								<TableCell className="text-right">
									${product.cost || "N/A"}
								</TableCell>
								<TableCell>{product.weight || "N/A"}</TableCell>
								<TableCell>{product.length || "N/A"}</TableCell>
								<TableCell>{product.width || "N/A"}</TableCell>
								<TableCell>{product.height || "N/A"}</TableCell>
								<TableCell>{product.color || "N/A"}</TableCell>
								<TableCell>{product.size || "N/A"}</TableCell>
								<TableCell>{product.material || "N/A"}</TableCell>
								<TableCell>{product.manufacturer || "N/A"}</TableCell>
								<TableCell>{product.country_of_origin || "N/A"}</TableCell>
								<TableCell>{product.barcode || "N/A"}</TableCell>
								<TableCell>{product.stock_quantity}</TableCell>
								<TableCell>{product.min_stock_level}</TableCell>
								<TableCell>{product.max_stock_level}</TableCell>
								<TableCell>{product.is_active ? "Yes" : "No"}</TableCell>
								<TableCell>{product.is_featured ? "Yes" : "No"}</TableCell>
								<TableCell>{product.is_digital ? "Yes" : "No"}</TableCell>
								<TableCell>{product.requires_shipping ? "Yes" : "No"}</TableCell>
								<TableCell>
									{product.tax_rate
										? `${(product.tax_rate * 100).toFixed(1)}%`
										: "N/A"}
								</TableCell>
								<TableCell>{product.warranty_months || "N/A"}</TableCell>
								<TableCell>{product.supplier_name || "N/A"}</TableCell>
								<TableCell>{product.supplier_code || "N/A"}</TableCell>
								<TableCell>{product.season || "N/A"}</TableCell>
								<TableCell>{product.collection || "N/A"}</TableCell>
								<TableCell>{product.style || "N/A"}</TableCell>
								<TableCell>{product.pattern || "N/A"}</TableCell>
								<TableCell>{product.fabric_composition || "N/A"}</TableCell>
								<TableCell>{product.care_instructions || "N/A"}</TableCell>
								<TableCell>{product.tags || "N/A"}</TableCell>
								<TableCell>{product.meta_title || "N/A"}</TableCell>
								<TableCell>{product.meta_description || "N/A"}</TableCell>
								<TableCell>{product.slug || "N/A"}</TableCell>
								<TableCell>
									{product.rating_average
										? product.rating_average.toFixed(1)
										: "N/A"}
								</TableCell>
								<TableCell>{product.rating_count}</TableCell>
								<TableCell>{product.view_count}</TableCell>
								<TableCell>{product.purchase_count}</TableCell>
								<TableCell>
									{product.created_at || "N/A"}
								</TableCell>
								<TableCell>
									{product.updated_at || "N/A"}
								</TableCell>
								<TableCell>
									{product.last_restocked_at || "N/A"}
								</TableCell>
								<TableCell>
									{product.discontinued_at|| "N/A"}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			<div ref={loadMoreRef}></div>
		</>
	);
}
