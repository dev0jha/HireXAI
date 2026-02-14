import "server-only"

import { treaty } from "@elysiajs/eden"

const { app } = await import("@/server/app")

const apiClient = treaty(app).api

export { apiClient }
