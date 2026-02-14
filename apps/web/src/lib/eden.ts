import { treaty } from "@elysiajs/eden"

import type { API } from "@/server/app"

const apiClient = treaty<API>(process.env.NEXT_PUBLIC_APP_URL!, {
   fetch: {
      credentials: "include",
   },
}).api

export { apiClient }
