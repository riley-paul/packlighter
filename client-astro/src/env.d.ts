import PocketBase from "pocketbase";

/// <reference types="astro/client" />

declare global {
  namespace App {
    interface Locals {
      pb: PocketBase;
      user: PocketBase.authStore.model | undefined;
    }
  }
}

export {};
