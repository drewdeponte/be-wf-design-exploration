import * as wf from "./wf";

export function healthHandler(): wf.RouteHandler {
  return function (request: wf.Request): wf.Response {
    return { status: 200, body: "" };
  };
}
