import { treaty } from "@elysiajs/eden";
import type { App } from "../app/api/[[...slugs]]/route";

export const client = treaty<App>(String(process.env.NEXT_PUBLIC_API_URL)).api;
