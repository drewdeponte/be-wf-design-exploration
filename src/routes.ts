import * as wf from "./wf";
import { DatabasePool } from "./db";
import { healthHandler } from "./health";
import { fooHandler } from "./foo";
import { barHandler } from "./bar";

export function buildRoutes(dbPool: DatabasePool): wf.Routes {
  return [
    { pattern: "/foo", handler: fooHandler(dbPool) },
    { pattern: "/bar", handler: barHandler() },
    { pattern: "/health", handler: healthHandler() },
  ];
}
