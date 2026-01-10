import { HealthService } from "@/server/services"
import { Elysia } from "elysia"

export const app = new Elysia({ prefix: "/api" }).get("/health", HealthService.getStatus)

export type API = typeof app
