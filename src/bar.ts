import * as wf from "./wf";

export function barHandler(): wf.RouteHandler {
  return function (request: wf.Request): wf.Response {
    return { status: 200, body: "" };
  };
}
