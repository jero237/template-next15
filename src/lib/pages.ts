export const pages = {
  home: "/",
  auth: {
    signIn: "/signin",
    signUp: "/signup",
  },
  dashboard: {
    apps: { href: "/dashboard", title: "Apps" },
    createApp: { href: "/dashboard/create-app", title: "Create App" },
    appId: (appId: string) => ({
      root: { href: `/dashboard/${appId}/home`, title: "Home" },
      databases: { href: `/dashboard/${appId}/databases`, title: "Databases" },
      createDatabase: {
        href: `/dashboard/${appId}/databases/create`,
        title: "Add Database",
      },
    }),
  },
};

export const api = {
  apps: {
    databases: (appId: string) => `/api/apps/${appId}/databases`,
  },
};
