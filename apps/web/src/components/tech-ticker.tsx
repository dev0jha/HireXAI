import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export const TechTicker = () => {
   const symbols = [
      "terminal-box",
      "cpu-square",
      "server-stack",
      "code-window",
      "brackets-square",
      "git-block",
      "layout-grid",
      "container",
      "api-box",
      "keyboard-key",
      "file-binary",
      "kanban",
   ]

   const SymbolIcon = ({ name }: { name: string }) => {
      switch (name) {
         case "terminal-box":
            return (
               <>
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <path d="m8 13 2 2-2 2" />
                  <path d="M12 17h4" />
               </>
            )
         case "cpu-square":
            return (
               <>
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" rx="1" />
                  <path d="M9 1V4" />
                  <path d="M15 1V4" />
                  <path d="M9 20V23" />
                  <path d="M15 20V23" />
                  <path d="M20 9H23" />
                  <path d="M20 15H23" />
                  <path d="M1 9H4" />
                  <path d="M1 15H4" />
               </>
            )
         case "server-stack":
            return (
               <>
                  <rect x="2" y="2" width="20" height="8" rx="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2" />
                  <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2" />
               </>
            )
         case "code-window":
            return (
               <>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M7 13h8" />
                  <path d="M7 17h5" />
               </>
            )
         case "brackets-square":
            return (
               <>
                  <path d="M7 4h-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2" />
                  <path d="M17 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2" />
                  <path d="M9 12h6" />
               </>
            )
         case "git-block":
            return (
               <>
                  <rect x="3" y="3" width="6" height="6" rx="1" />
                  <rect x="3" y="15" width="6" height="6" rx="1" />
                  <rect x="15" y="3" width="6" height="6" rx="1" />
                  <path d="M6 9v6" />
                  <path d="M6 9c0 3 3 6 6 6h3" />
               </>
            )
         case "layout-grid":
            return (
               <>
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
               </>
            )
         case "container":
            return (
               <>
                  <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-9-4-9 4Z" />
                  <path d="M12 3v18" />
                  <path d="M3 7h18" />
                  <path d="M12 11h9" />
               </>
            )
         case "api-box":
            return (
               <>
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M9 12h6" />
                  <path d="M12 9v6" />
                  <rect
                     x="9"
                     y="9"
                     width="6"
                     height="6"
                     rx="1"
                     fill="currentColor"
                     fillOpacity="0.1"
                  />
               </>
            )
         case "keyboard-key":
            return (
               <>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M8 12h8" />
                  <path d="M14 9v6" />
               </>
            )
         case "file-binary":
            return (
               <>
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M8 8h2" />
                  <path d="M14 8h2" />
                  <path d="M8 12h2" />
                  <path d="M14 12h2" />
                  <path d="M8 16h2" />
                  <path d="M14 16h2" />
               </>
            )
         case "kanban":
            return (
               <>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18" />
                  <path d="M15 3v18" />
               </>
            )
         default:
            return null
      }
   }

   return (
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-40 w-full select-none overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_20%,black_100%)]">
         <div className="absolute inset-0 flex items-center gap-12">
            <motion.div
               animate={{ x: [0, -1440] }}
               transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 60,
               }}
               className="flex flex-nowrap gap-24 whitespace-nowrap"
            >
               {[...symbols, ...symbols, ...symbols].map((symbol, i) => (
                  <svg
                     key={i}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="1"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className={cn(
                        "h-24 w-24",
                        "text-cyan-200/20",
                        "drop-shadow-[0_0_1px_rgba(165,243,252,0.3)]"
                     )}
                  >
                     <SymbolIcon name={symbol} />
                  </svg>
               ))}
            </motion.div>
         </div>
      </div>
   )
}
