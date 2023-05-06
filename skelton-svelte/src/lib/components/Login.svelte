<script lang="ts">
  import { currentUser, pb } from "$lib/pocketbase";

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
      await pb.collection("users").create(data);
      await login();
    } catch (err: any) {
      console.error(err.data);
    }
  }
</script>

<div class="flex justify-center items-center h-full">
  <form
    on:submit|preventDefault
    class="flex flex-col p-8 gap-4 max-w-md m-8 rounded"
  >
    <div class="text-center">
      <div class="font-bold text-3xl">Welcome to PackLighter</div>
      <small>Please login to start optimizing your packing lists</small>
    </div>
    <label for="username" class="label">
      <input
        placeholder="Username"
        id="username"
        name="username"
        type="text"
        class="input"
        bind:value={username}
      />
    </label>
    <label for="password" class="label">
      <input
        placeholder="Password"
        id="password"
        name="password"
        type="password"
        class="input"
        bind:value={password}
      />
    </label>
    <div class="w-full flex gap-4">
      <button class="btn variant-outline w-full" on:click={login}>Login</button>
      <button class="btn variant-outline w-full" on:click={signUp}
        >Sign Up</button
      >
    </div>
  </form>
</div>
