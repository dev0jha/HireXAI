import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export function DashboardCard({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "border-2 border-white/10 bg-[#1a1a1c]/50 backdrop-blur-md p-6 sm:p-8 relative text-white",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  )
}
