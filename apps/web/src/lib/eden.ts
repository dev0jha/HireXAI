import { treaty } from "@elysiajs/eden"
import { app, type API } from "@/server/app"

export const apiClient =
  // process is defined on server side and build time
  typeof window === "undefined"
    ? treaty(app).api
    : treaty<API>(process.env.NEXT_PUBLIC_APP_URL!).api
