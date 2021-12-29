import * as wf from "./wf";

test("end-to-end test request -> response", () => {
  function somePathHandler(request: wf.Request): wf.Response {
    return { status: 200 };
  }

  function notFoundHandler(request: wf.Request): wf.Response {
    return { status: 404 };
  }

  const router = wf.router(
    [{ pattern: "some/path", handler: somePathHandler }],
    {
      pattern: "",
      handler: notFoundHandler,
    }
  );

  const request: wf.Request = { path: "some/path" };

  const response = wf.process(request, router);

  expect(response.status).toBe(200);
});

test("test routing", () => {
  function somePathHandler(request: wf.Request): wf.Response {
    return { status: 200 };
  }

  function notFoundHandler(request: wf.Request): wf.Response {
    return { status: 404 };
  }

  const router = wf.router(
    [{ pattern: "some/path", handler: somePathHandler }],
    {
      pattern: "",
      handler: notFoundHandler,
    }
  );

  const request: wf.Request = { path: "some/path" };

  const route = router(request);

  expect(route).toStrictEqual({
    pattern: "some/path",
    handler: somePathHandler,
  });
});
