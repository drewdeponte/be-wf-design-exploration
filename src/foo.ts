import * as wf from "./wf";
import { DatabasePool } from "./db";

export function fooHandler(
  dbPool: DatabasePool,
  getOtherDbPool: () => DatabasePool
): wf.RouteHandler {
  return function (request: wf.Request): wf.Response {
    const otherDbPool = getOtherDbPool();
    return { status: 200, body: `${dbPool.id} & ${otherDbPool.id}` };
  };
}
