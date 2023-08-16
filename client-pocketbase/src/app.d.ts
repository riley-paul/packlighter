// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import PocketBase from "pocketbase";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
			pb: PocketBase;
			user: PocketBase.authStore.model | undefined
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
