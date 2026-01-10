import indexRouter from "@/server/routes"
import { describe, expect, it } from "bun:test"
import { Elysia } from "elysia"

describe("index route", () => {
  it("returns a response", async () => {
    const app = new Elysia().use(indexRouter)

    const response = await app.handle(new Request("http://localhost/")).then(res => res.text())

    expect(response).toBe("Welcome to the Elysia server!")
  })
})
