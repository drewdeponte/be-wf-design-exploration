import * as wf from "./wf";
import { DatabasePool } from "./db";

export function fooHandler(dbPool: DatabasePool): wf.RouteHandler {
  return function (request: wf.Request): wf.Response {
    return { status: 200, body: dbPool.id };
  };
}
