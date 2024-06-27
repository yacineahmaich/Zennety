type RouteName =
  | "home"
  | "login"
  | "register"
  | "forgot-password"
  | "app"
  | "workspace"
  | "board"
  | "workspace/members"
  | "workspace/settings"
  | "board/members";

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
    buildPath: (params) => `/app/w/${params[0]}/b/${params[1]}`,
  },
  {
    name: "workspace/members",
    buildPath: (params) => `/app/w/${params[0]}/members`,
  },
  {
    name: "workspace/settings",
    buildPath: (params) => `/app/w/${params[0]}/settings`,
  },
  {
    name: "board/members",
    buildPath: (params) => `/app/w/${params[0]}/b/${params[1]}/members`,
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
