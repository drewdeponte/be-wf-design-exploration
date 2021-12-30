import * as wf from "./wf";

test("end-to-end test request -> response", () => {
  function somePathHandler(request: wf.Request): wf.Response {
    return { status: 200, body: "" };
  }

  function notFoundHandler(request: wf.Request): wf.Response {
    return { status: 404, body: "" };
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
    return { status: 200, body: "" };
  }

  function notFoundHandler(request: wf.Request): wf.Response {
    return { status: 404, body: "" };
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

describe("with dependency in handler", () => {
  test("test route configurationr", () => {
    function somePathHandler(someDep: string): wf.RouteHandler {
      return function (request: wf.Request): wf.Response {
        return { status: 200, body: someDep };
      };
    }

    function notFoundHandler(request: wf.Request): wf.Response {
      return { status: 404, body: "" };
    }

    const router = wf.router(
      [{ pattern: "some/path", handler: somePathHandler("myDependency") }],
      {
        pattern: "",
        handler: notFoundHandler,
      }
    );

    const request: wf.Request = { path: "some/path" };

    const route = router(request);

    // We can't do a full blown scrict equal anymore because the handler is now
    // an anonymous function. So the best we can do in make sure that the
    // patttern is correct.
    expect(route.pattern).toBe("some/path");
  });

  test("test handler", () => {
    function somePathHandler(someDep: string): wf.RouteHandler {
      return function (request: wf.Request): wf.Response {
        return { status: 200, body: someDep };
      };
    }

    expect(somePathHandler("stubDep")({ path: "some/path" })).toStrictEqual({
      status: 200,
      body: "stubDep",
    });
  });

  test("end-to-end test request -> response", () => {
    interface DatabasePool {
      id: string;
    }

    function somePathHandler(dbPool: DatabasePool): wf.RouteHandler {
      return function (request: wf.Request): wf.Response {
        return { status: 200, body: dbPool.id };
      };
    }

    function notFoundHandler(request: wf.Request): wf.Response {
      return { status: 404, body: "" };
    }

    const router = wf.router(
      [
        {
          pattern: "some/path",
          handler: somePathHandler({ id: "fakeDbPool" }),
        },
      ],
      {
        pattern: "",
        handler: notFoundHandler,
      }
    );

    const request: wf.Request = { path: "some/path" };

    const response = wf.process(request, router);

    expect(response).toStrictEqual({ status: 200, body: "fakeDbPool" });
  });
});
