"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/ui/section-header"

const testimonials = [
   {
      name: "DEV HARI OJHA",
      role: "FULL STACK ENGINEER",
      img: "https://avatars.githubusercontent.com/u/155317634?v=4",
      text: "For the first time, my skills were judged by my code — not just my resume. The AI insights felt accurate and motivating.",
      span: "md:col-span-2",
      highlight: true,
   },
   {
      name: "ARPIT YADAV",
      role: "SOFTWARE ENGINEER",
      img: "https://avatars.githubusercontent.com/u/118053362?v=4",
      text: "The developer score helped me understand where I stand.",
      span: "md:col-span-1",
      highlight: false,
   },
   {
      name: "ANIKET NISHAD",
      role: "FRONTEND DEV",
      img: "https://pro-section.ui-layouts.com/people/aam4.jpg",
      text: "I loved how transparent the evaluation was. I could see exactly why I got my score.",
      span: "md:col-span-1",
      highlight: false,
   },
   {
      name: "NISHANT DIXIT",
      role: "BACKEND DEV",
      img: "https://avatars.githubusercontent.com/u/145234347?v=4",
      text: "Recruiters reached out to me directly based on my real abilities, not keywords. It was a game changer.",
      span: "md:col-span-2",
      highlight: true,
   },
   {
      name: "PRABHAT YADAV",
      role: "FULL STACK",
      img: "https://pro-section.ui-layouts.com/people/aam3.jpg",
      text: "The platform turned my GitHub work into real opportunities.",
      span: "md:col-span-1",
      highlight: false,
   },
   {
      name: "PANKAJ KANNOUJIA",
      role: "AI ENGINEER",
      img: "https://pro-section.ui-layouts.com/people/in1.jpg",
      text: "The AI feedback pushed me to write cleaner, more maintainable code.",
      span: "md:col-span-2",
      highlight: true,
   },
]

function ClientFeedback() {
   const containerRef = useRef<HTMLDivElement>(null)

   return (
      <section ref={containerRef} className="relative container mx-auto h-full py-20">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Trusted By Engineers" subtitle="Showcase your real skills" />
         </div>

         <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 px-4 md:px-0 mask-[radial-gradient(ellipse_at_center,black_70%,transparent_100%)]">
            {testimonials.map((item, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={cn(
                     "relative flex flex-col justify-between overflow-hidden p-8 transition-colors",
                     item.span,
                     "border-[1.5] border-dashed border-zinc-800/40",
                     "md:-ml-px md:-mt-px",

                     item.highlight ? "bg-neutral-700/10" : "hover:bg-neutral-700/10"
                  )}
               >
                  {item.highlight && (
                     <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-size-[50px_56px]" />
                  )}

                  <div className="mb-6">
                     <p
                        className={cn(
                           "text-lg leading-relaxed",
                           item.highlight ? "text-white font-medium" : "text-zinc-400"
                        )}
                     >
                        &quot;{item.text}&quot;
                     </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                     <div className="flex flex-col">
                        <h3 className="font-semibold text-white uppercase tracking-wide text-sm">
                           {item.name}
                        </h3>
                        <p className="text-xs font-medium text-zinc-500 uppercase">{item.role}</p>
                     </div>
                     <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                        <Image src={item.img} alt={item.name} fill className="object-cover" />
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
   )
}

export default ClientFeedback
