declare module "bun" {
  interface Env {
    CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;

    TURSO_CONNECTION_URL: string;
    TURSO_AUTH_TOKEN: string;
  }
}
