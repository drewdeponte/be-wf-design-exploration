import * as wf from "./wf";
import { DatabasePool } from "./db";
import { buildRoutes } from "./routes";

function getOtherDbPool(): DatabasePool {
  return { id: "otherRealDbPool" };
}

const realDbPool = { id: "realDbPool" };
const routes = buildRoutes(realDbPool, getOtherDbPool);
const router = wf.router(routes, wf.notFoundRoute);

// Normally this request would come in via an HTTP Server and get translated
// into a wf.Request object and in turn handed to the wf.process() function.
// However, this works as a means of simulating this for the development of
// the framework without needing to build the HTTP Server portion.
const request: wf.Request = { path: "/foo" };
const response = wf.process(request, router);

console.log(response);
