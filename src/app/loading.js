import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <Card className="w-full min-h-screen">
      <CardHeader>
        <Skeleton className="h-[6.54vh] md:h-[7.41vh] w-2/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full min-h-screen " />
      </CardContent>
    </Card>
  )
}
