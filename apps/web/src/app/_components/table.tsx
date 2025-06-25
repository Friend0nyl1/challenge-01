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
import { useEffect, useRef } from "react";
import { useVirtualizer } from '@tanstack/react-virtual';
import { Skeleton } from "@/components/ui/skeleton";

export function ProductsTable({ search }: { search: string | null }) {
	const loadMoreRef = useRef<HTMLDivElement>(null);

	const limit = 50
	const [{ pages }, allProductsQuery] = trpc.getAllProducts.useSuspenseInfiniteQuery(
		{ limit, search },
		{
			getNextPageParam: (res) => {
				if (res.products.length < limit) {
					return undefined
				}
				return res.nextCursor
			},

		},
	);
	const { isFetchingNextPage, fetchNextPage, hasNextPage } = allProductsQuery;

	const products = pages?.flatMap((page) => page.products) || [];



	const rowVirtualizer = useVirtualizer({
		count: products.length,
		getScrollElement: () => loadMoreRef.current,
		estimateSize: () => 40,
		overscan: 25
	});
	const virtualItems = rowVirtualizer.getVirtualItems()



	useEffect(() => {

		if (!hasNextPage || !virtualItems.length || isFetchingNextPage) {
			return;
		}

		const lastVirtualItemIndex = virtualItems[virtualItems.length - 1].index;
		const triggerThreshold = (products.length - 1) - (rowVirtualizer.options.overscan || 0);

		if (lastVirtualItemIndex > triggerThreshold) {
			fetchNextPage();
		}
	}, [
		hasNextPage,
		isFetchingNextPage,
		virtualItems.length,
		virtualItems,
	]);


	const isPrepareVirtualItems = virtualItems && virtualItems.length <= 0 && products.length > 0
	const isShowData = products.length > 0 && products && virtualItems.length > 0


	return (
		<>
			{<div className="rounded-md border min-w-full h-[80vh] overflow-y-auto" ref={loadMoreRef}>
				{isPrepareVirtualItems &&
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead style={{ width: '50px' }}>ID</TableHead>
								<TableHead style={{ width: '100px' }}>SKU</TableHead>
								<TableHead style={{ width: '150px' }}>Name</TableHead>
								<TableHead style={{ width: '200px' }}>Description</TableHead>
								<TableHead style={{ width: '100px' }}>Brand</TableHead>
								<TableHead style={{ width: '100px' }}>Category</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{[...Array(17)].map((_, i) => (
								<TableRow key={i} style={{ height: '40px' }}>
									<TableCell><Skeleton className="h-4 w-[40px]" /></TableCell>
									<TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
									<TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
									<TableCell><Skeleton className="h-4 w-[180px]" /></TableCell>
									<TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
									<TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				}
				{!isPrepareVirtualItems && <Table >
					{<TableHeader >
						<TableRow >
							<TableHead style={{ width: '50px' }}>ID</TableHead>
							<TableHead style={{ width: '100px' }}>SKU</TableHead>
							<TableHead style={{ width: '150px' }}>Name</TableHead>
							<TableHead style={{ width: '200px' }}>Description</TableHead>
							<TableHead style={{ width: '100px' }}>Brand</TableHead>
							<TableHead style={{ width: '100px' }}>Category</TableHead>
							<TableHead style={{ width: '120px' }}>Subcategory</TableHead>
							<TableHead style={{ width: '80px' }}>Price</TableHead>
							<TableHead style={{ width: '80px' }}>Cost</TableHead>
							<TableHead style={{ width: '80px' }}>Weight</TableHead>
							<TableHead style={{ width: '80px' }}>Length</TableHead>
							<TableHead style={{ width: '80px' }}>Width</TableHead>
							<TableHead style={{ width: '80px' }}>Height</TableHead>
							<TableHead style={{ width: '100px' }}>Color</TableHead>
							<TableHead style={{ width: '80px' }}>Size</TableHead>
							<TableHead style={{ width: '100px' }}>Material</TableHead>
							<TableHead style={{ width: '120px' }}>Manufacturer</TableHead>
							<TableHead style={{ width: '150px' }}>Country of Origin</TableHead>
							<TableHead style={{ width: '120px' }}>Barcode</TableHead>
							<TableHead style={{ width: '120px' }}>Stock Quantity</TableHead>
							<TableHead style={{ width: '120px' }}>Min Stock Level</TableHead>
							<TableHead style={{ width: '120px' }}>Max Stock Level</TableHead>
							<TableHead style={{ width: '80px' }}>Is Active</TableHead>
							<TableHead style={{ width: '100px' }}>Is Featured</TableHead>
							<TableHead style={{ width: '100px' }}>Is Digital</TableHead>
							<TableHead style={{ width: '120px' }}>Requires Shipping</TableHead>
							<TableHead style={{ width: '100px' }}>Tax Rate</TableHead>
							<TableHead style={{ width: '120px' }}>Warranty (Months)</TableHead>
							<TableHead style={{ width: '120px' }}>Supplier Name</TableHead>
							<TableHead style={{ width: '120px' }}>Supplier Code</TableHead>
							<TableHead style={{ width: '100px' }}>Season</TableHead>
							<TableHead style={{ width: '100px' }}>Collection</TableHead>
							<TableHead style={{ width: '80px' }}>Style</TableHead>
							<TableHead style={{ width: '100px' }}>Pattern</TableHead>
							<TableHead style={{ width: '150px' }}>Fabric Composition</TableHead>
							<TableHead style={{ width: '150px' }}>Care Instructions</TableHead>
							<TableHead style={{ width: '100px' }}>Tags</TableHead>
							<TableHead style={{ width: '150px' }}>Meta Title</TableHead>
							<TableHead style={{ width: '180px' }}>Meta Description</TableHead>
							<TableHead style={{ width: '100px' }}>Slug</TableHead>
							<TableHead style={{ width: '120px' }}>Rating Average</TableHead>
							<TableHead style={{ width: '120px' }}>Rating Count</TableHead>
							<TableHead style={{ width: '100px' }}>View Count</TableHead>
							<TableHead style={{ width: '120px' }}>Purchase Count</TableHead>
							<TableHead style={{ width: '150px' }}>Created At</TableHead>
							<TableHead style={{ width: '150px' }}>Updated At</TableHead>
							<TableHead style={{ width: '150px' }}>Last Restocked At</TableHead>
							<TableHead style={{ width: '150px' }}>Discontinued At</TableHead>
						</TableRow>
					</TableHeader>}

					{isShowData && <TableBody>
						<tr style={{ height: virtualItems[0]?.start || 0, display: 'table-row' }} />
						{virtualItems.map((virtualRow) => {
							const product = products[virtualRow.index];
							if (!product) return null;
							return (
								<TableRow
									key={product.id || virtualRow.key}
									ref={rowVirtualizer.measureElement}
									data-index={virtualRow.index}
									style={{
										height: '40px',
									}}
								>
									<TableCell style={{ width: '50px' }}>{product.id}</TableCell>
									<TableCell style={{ width: '100px' }} className="font-medium">{product.sku}</TableCell>
									<TableCell style={{ width: '150px' }} className="font-medium">{product.name}</TableCell>
									<TableCell style={{ width: '200px' }}>{product.description || "N/A"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.brand || "N/A"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.category || "N/A"}</TableCell>
									<TableCell style={{ width: '120px' }}>{product.subcategory || "N/A"}</TableCell>
									<TableCell style={{ width: '80px' }} className="text-right">
										${product.price || "N/A"}
									</TableCell>
									<TableCell style={{ width: '80px' }} className="text-right">
										${product.cost?.toFixed(2) || "N/A"}
									</TableCell>
									<TableCell style={{ width: '80px' }}>{product.weight || "N/A"}</TableCell>
									<TableCell style={{ width: '80px' }}>{product.length || "N/A"}</TableCell>
									<TableCell style={{ width: '80px' }}>{product.width || "N/A"}</TableCell>
									<TableCell style={{ width: '80px' }}>{product.height || "N/A"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.color || "N/A"}</TableCell>
									<TableCell style={{ width: '80px' }}>{product.size || "N/A"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.material || "N/A"}</TableCell>
									<TableCell style={{ width: '120px' }}>{product.manufacturer || "N/A"}</TableCell>
									<TableCell style={{ width: '150px' }}>{product.country_of_origin || "N/A"}</TableCell>
									<TableCell style={{ width: '120px' }}>{product.barcode || "N/A"}</TableCell>
									<TableCell style={{ width: '120px' }}>{product.stock_quantity}</TableCell>
									<TableCell style={{ width: '120px' }}>{product.min_stock_level}</TableCell>
									<TableCell style={{ width: '120px' }}>{product.max_stock_level}</TableCell>
									<TableCell style={{ width: '80px' }}>{product.is_active ? "Yes" : "No"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.is_featured ? "Yes" : "No"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.is_digital ? "Yes" : "No"}</TableCell>
									<TableCell style={{ width: '120px' }}>{product.requires_shipping ? "Yes" : "No"}</TableCell>
									<TableCell style={{ width: '100px' }}>
										{product.tax_rate ? `${(product.tax_rate * 100).toFixed(1)}%` : "N/A"}
									</TableCell>
									<TableCell style={{ width: '120px' }}>{product.warranty_months || "N/A"}</TableCell>
									<TableCell style={{ width: '120px' }}>{product.supplier_name || "N/A"}</TableCell>
									<TableCell style={{ width: '120px' }}>{product.supplier_code || "N/A"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.season || "N/A"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.collection || "N/A"}</TableCell>
									<TableCell style={{ width: '80px' }}>{product.style || "N/A"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.pattern || "N/A"}</TableCell>
									<TableCell style={{ width: '150px' }}>{product.fabric_composition || "N/A"}</TableCell>
									<TableCell style={{ width: '150px' }}>{product.care_instructions || "N/A"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.tags || "N/A"}</TableCell>
									<TableCell style={{ width: '150px' }}>{product.meta_title || "N/A"}</TableCell>
									<TableCell style={{ width: '180px' }}>{product.meta_description || "N/A"}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.slug || "N/A"}</TableCell>
									<TableCell style={{ width: '120px' }}>
										{product.rating_average ? product.rating_average.toFixed(1) : "N/A"}
									</TableCell>
									<TableCell style={{ width: '120px' }}>{product.rating_count}</TableCell>
									<TableCell style={{ width: '100px' }}>{product.view_count}</TableCell>
									<TableCell style={{ width: '120px' }}>{product.purchase_count}</TableCell>
									<TableCell style={{ width: '150px' }}>
										{product.created_at ? new Date(product.created_at).toLocaleString() : "N/A"}
									</TableCell>
									<TableCell style={{ width: '150px' }}>
										{product.updated_at ? new Date(product.updated_at).toLocaleString() : "N/A"}
									</TableCell>
									<TableCell style={{ width: '150px' }}>
										{product.last_restocked_at ? new Date(product.last_restocked_at).toLocaleString() : "N/A"}
									</TableCell>
									<TableCell style={{ width: '150px' }}>
										{product.discontinued_at ? new Date(product.discontinued_at).toLocaleString() : "N/A"}
									</TableCell>
								</TableRow>
							)
						})}

						{isFetchingNextPage && [...Array(17)].map((_, i) => (
							<TableRow key={i} style={{ height: '40px' }}>
								{[...Array(51)].map((_, i) => (
									<TableCell key={i}>
										<Skeleton className="h-4 w-full" />
									</TableCell>
								))}

							</TableRow>
						))}
					</TableBody>}
				</Table>}
			</div>}
		</>
	);
}
