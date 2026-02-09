import { IconLoader2 } from "@tabler/icons-react"
import { useEffect, useState } from "react"

export function StatusStreamer({ statusText }: { statusText: string }) {
   const [elapsed, setElapsed] = useState<number>(0)

   useEffect(() => {
      const startTime = Date.now()
      const timer = setInterval(() => {
         setElapsed((Date.now() - startTime) / 1000)
      }, 100)
      return () => clearInterval(timer)
   }, [])

   return (
      <div className="mt-2 px-1 animate-in fade-in slide-in-from-top-1 duration-300">
         <div className="flex items-start gap-3">
            <div className="flex-1 space-y-1 pt-2">
               <div className="flex items-center gap-2">
                  <IconLoader2 className="h-3.5 w-3.5 animate-spin text-zinc-400" />
                  <span className="font-bold text-sm text-zinc-200">
                     {statusText}
                     <span className="ml-1 animate-pulse text-zinc-600">_</span>
                  </span>
               </div>

               <div className="flex flex-col gap-1 pl-5.5 opacity-50">
                  <p className="text-[10px] text-zinc-500">
                     <span className="text-zinc-700">pid:</span>{" "}
                     {Math.floor(Math.random() * 9000) + 1000} •
                     <span className="ml-2 text-zinc-700">time:</span> {elapsed.toFixed(1)}s
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
