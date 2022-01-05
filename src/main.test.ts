import * as wf from "./wf";
import { buildRoutes } from "./routes";

test("end-to-end with fake db pool", () => {
  const fakeDbPool = { id: "fakeDbPool" };
  const routes = buildRoutes(fakeDbPool, () => {
    return { id: "otherDbPool" };
  });
  const router = wf.router(routes, wf.notFoundRoute);

  const request: wf.Request = { path: "/foo" };
  const response = wf.process(request, router);

  expect(response).toStrictEqual({
    status: 200,
    body: "fakeDbPool & otherDbPool",
  });
});
