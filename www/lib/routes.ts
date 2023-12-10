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
    buildPath: () => "/auth/login",
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
    buildPath: (params) => `/app/w/${params[0]}/b/${params[1]}`,
  },
];

/**
 *
 * @param name route name
 * @param params values need to build route path
 */
export function route(name: RouteName, ...params: any[]) {
  const route = routes.find((route) => route.name === name);
  if (!route) throw new Error("Invalid route name");

  return route.buildPath(params);
}
