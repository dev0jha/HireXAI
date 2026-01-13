import { HealthService } from "@/server/services"
import { Elysia } from "elysia"
import { openapi } from "@elysiajs/openapi"
import { betterAuthmiddleware } from "@/server/middlewares/auth.middleware"

export const app = new Elysia({ prefix: "/api" })
  .use(openapi())
  .use(betterAuthmiddleware)
  .get("/user", ({ user }) => user, { auth: true })
  .get("/health", HealthService.getStatus)

export type API = typeof app
