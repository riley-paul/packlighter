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

<div class="flex justify-center items-center h-screen bg-slate-900">
  <form
    on:submit|preventDefault
    class="flex flex-col bg-slate-800 p-8 gap-4 max-w-lg m-8 rounded"
  >
    <div class="text-white text-center">
      <h1 class="font-bold text-3xl">Welcome to PackLighter</h1>
      <p class="text-gray-300">
        Please login to start optimizing your packing lists
      </p>
    </div>
    <input
      placeholder="Username"
      type="text"
      bind:value={username}
      class="w-full p-2 rounded"
    />
    <input
      placeholder="Password"
      type="password"
      bind:value={password}
      class="w-full p-2 rounded"
    />
    <div class="w-full flex gap-4">
      <button
        class="px-2 py-1 rounded bg-blue-500 text-white w-full"
        on:click={login}>Login</button
      >
      <button
        class="px-2 py-1 rounded bg-blue-500 text-white w-full"
        on:click={signUp}>Sign Up</button
      >
    </div>
  </form>
</div>
