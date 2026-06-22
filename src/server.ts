/**
 * IMPORTS
 */

import { app } from "./http/app";

const port = Number(process.env.PORT ?? 3000);

const server = app.listen(port);

console.log(
  `🦊 Elysia is running at ${server.server?.hostname}:${server.server?.port}`,
);

export type App = typeof app;
