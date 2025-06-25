import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"


export const LoadingProductStats = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm">Total Products</CardTitle>
							<div className="h-4 w-4 text-muted-foreground">📦</div>
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl">
								<Skeleton className="h-6 w-16" />

							</div>
							<p className="text-muted-foreground text-xs">Products in catalog</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm">Views Today</CardTitle>
							<div className="h-4 w-4 text-muted-foreground">👁️</div>
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl">
								<Skeleton className="h-6 w-16" />
							</div>
							<p className="text-muted-foreground text-xs">Page views today</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm">Sales Today</CardTitle>
							<div className="h-4 w-4 text-muted-foreground">💰</div>
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl">						<Skeleton className="h-6 w-16" />
							</div>
							<p className="text-muted-foreground text-xs">Sales completed today</p>
						</CardContent>
					</Card>
				</div>
    )
}