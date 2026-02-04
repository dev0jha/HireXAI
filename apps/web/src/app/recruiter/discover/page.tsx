import { Suspense } from "react"
import { DiscoverContent } from "@/components/discover/discover-content"

export default function DiscoverPage() {
   return (
      <Suspense fallback={<div className="min-h-screen" />}>
         <DiscoverContent />
      </Suspense>
   )
}
