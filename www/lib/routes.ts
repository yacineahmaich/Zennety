type RouteName =
  | "home"
  | "login"
  | "register"
  | "forgot-password"
  | "app"
  | "workspace"
  | "board";

type Route = {
  name: RouteName;
  buildPath: (params: any[]) => string;
};

const routes: Route[] = [
  {
    name: "home",
    buildPath: () => "/",
  },
  {
    name: "login",
    buildPath: (params) =>
      `/auth/login${params[0] ? `?callback=${params[0]}` : ""}`,
  },
  {
    name: "register",
    buildPath: () => "/auth/register",
  },
  {
    name: "forgot-password",
    buildPath: () => "/auth/forgot-password",
  },
  {
    name: "app",
    buildPath: () => "/app",
  },
  {
    name: "workspace",
    buildPath: (params) => `/app/w/${params[0]}`,
  },
  {
    name: "board",
    buildPath: (params) => `/app/b/${params[0]}`,
  },
];

/**
 *
 * @param RouteName
 * @param params values needed to build route path
 */
export function route(name: RouteName, ...params: any[]) {
  const route = routes.find((route) => route.name === name);
  if (!route) throw new Error("Invalid route name");

  return route.buildPath(params);
}
