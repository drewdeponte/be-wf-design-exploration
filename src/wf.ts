export interface Request {
  path: string;
  // ...
}

export interface Response {
  status: number;
  body: string;
  // ...
}

export type RouteHandler = (request: Request) => Response;

export interface Route {
  pattern: string;
  handler: RouteHandler;
}

export type Routes = Array<Route>;

export type Router = (request: Request) => Route;

function routeMatches(request: Request, route: Route): boolean {
  return request.path == route.pattern;
}

export function router(routes: Routes, notFoundRoute: Route): Router {
  return function (request: Request): Route {
    const matchedRoute = routes.find((route) => routeMatches(request, route));
    if (matchedRoute) {
      return matchedRoute;
    } else {
      return notFoundRoute;
    }
  };
}

export function process(request: Request, router: Router): Response {
  return router(request).handler(request);
}

// Just provide the following for convenience, they don't really impact the
// framework
export function notFoundHandler(request: Request): Response {
  return { status: 404, body: "Not Found" };
}

export const notFoundRoute: Route = { pattern: "", handler: notFoundHandler };
