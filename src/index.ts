/**
 * IMPORTS
 */

import { app } from "./http/app";

const server = app.listen(3000);

console.log(
  `🦊 Elysia is running at ${server.server?.hostname}:${server.server?.port}`,
);

export type App = typeof app;
