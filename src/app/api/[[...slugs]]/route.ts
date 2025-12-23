import { Elysia } from "elysia";

const rooms = new Elysia({ prefix: "/rooms" }).post("/create", () => {
  console.log("create room");
});

const app = new Elysia({ prefix: "/api" }).use(rooms);

export const GET = app.fetch;
export const POST = app.fetch;

export type App = typeof app;
