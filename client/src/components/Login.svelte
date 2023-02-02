<script lang="ts">
  import { currentUser, pb } from "../lib/pocketbase";

  let username: string;
  let password: string;

  async function login() {
    const user = await pb
      .collection("users")
      .authWithPassword(username, password);
    console.log(user);
  }

  async function signUp() {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
      };
      const createdUser = await pb.collection("users").create(data);
      await login();
    } catch (err: any) {
      console.error(err.data);
    }
  }
</script>

<form on:submit|preventDefault>
  <input placeholder="Username" type="text" bind:value={username} />
  <input placeholder="Password" type="password" bind:value={password} />
  <button class="px-2 py-1 rounded bg-slate-200" on:click={signUp}
    >Sign Up</button
  >
  <button class="px-2 py-1 rounded bg-slate-200" on:click={login}>Login</button>
</form>
