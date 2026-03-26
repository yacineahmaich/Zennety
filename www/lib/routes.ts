type RouteName =
  | "home"
  | "login"
  | "register"
  | "forgot-password"
  | "app"
  | "organization/settings"
  | "organization/settings/details"
  | "organization/settings/members"
  | "organization/settings/admin"
  | "bookmarks"
  | "workspace"
  | "board"
  | "workspace/members"
  | "workspace/settings"
  | "board/members"
  | "board/settings";

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
    name: "organization/settings",
    buildPath: (params) => `/app/o/${params[0]}/settings`,
  },
  {
    name: "organization/settings/details",
    buildPath: (params) => `/app/o/${params[0]}/settings/details`,
  },
  {
    name: "organization/settings/members",
    buildPath: (params) => `/app/o/${params[0]}/settings/members`,
  },
  {
    name: "organization/settings/admin",
    buildPath: (params) => `/app/o/${params[0]}/settings/admin`,
  },
  {
    name: "bookmarks",
    buildPath: () => "/app/bookmarks",
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
  {
    name: "board/settings",
    buildPath: (params) => `/app/w/${params[0]}/b/${params[1]}/settings`,
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
