import { Elysia } from "elysia"
import indexRouter from "@/server/routes"

const app = new Elysia({ prefix: "/api" }).use(indexRouter)

export type API = typeof app

export const GET = app.fetch
export const POST = app.fetch
