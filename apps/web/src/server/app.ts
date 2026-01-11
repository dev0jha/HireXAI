import { HealthService } from "@/server/services"
import { Elysia } from "elysia"
import { openapi } from "@elysiajs/openapi"
import { UserService } from "@/server/services/user.service"

export const app = new Elysia({ prefix: "/api" })
  .get("/user", UserService.getUser)
  .use(openapi())
  .get("/health", HealthService.getStatus)
export type API = typeof app
