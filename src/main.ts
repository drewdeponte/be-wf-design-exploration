import * as wf from "./wf";
import { buildRoutes } from "./routes";

const realDbPool = { id: "realDbPool" };
const routes = buildRoutes(realDbPool);
const router = wf.router(routes, wf.notFoundRoute);

// Normally this request would come in via an HTTP Server and get translated
// into a wf.Request object and in turn handed to the wf.process() function.
// However, this works as a means of simulating this for the development of
// the framework without needing to build the HTTP Server portion.
const request: wf.Request = { path: "/foo" };
const response = wf.process(request, router);

console.log(response);
