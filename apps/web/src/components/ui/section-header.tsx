import { cn } from "@/lib/utils"

interface SectionHeaderProps {
   title: string
   subtitle?: string
   description?: string

   className?: string
   titleClassName?: string
   subtitleClassName?: string
   descriptionClassName?: string

   align?: "left" | "center"
}

export function SectionHeader({
   title,
   subtitle,
   description,
   className,
   titleClassName,
   subtitleClassName,
   descriptionClassName,
   align = "left",
}: SectionHeaderProps) {
   return (
      <div className={cn("mb-16", align === "center" && "text-center mx-auto", className)}>
         <h2
            className={cn(
               "text-4xl md:text-5xl font-semibold tracking-tight text-white",
               titleClassName
            )}
         >
            {title}
            {subtitle && (
               <>
                  <br />
                  <span className={cn("text-zinc-600", subtitleClassName)}>{subtitle}</span>
               </>
            )}
         </h2>

         {description && (
            <p
               className={cn(
                  "mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400",
                  align === "center" && "mx-auto",
                  descriptionClassName
               )}
            >
               {description}
            </p>
         )}
      </div>
   )
}
