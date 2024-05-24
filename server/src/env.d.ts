declare module "bun" {
  interface Env {
    DATABASE_URL: string;
    DATABASE_AUTH_TOKEN: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }
}
