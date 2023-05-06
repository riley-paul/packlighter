<!-- <script lang="ts">
  export let username: string;
  export let password: string;
  export let login: () => undefined;
  export let signUp: () => undefined;
</script> -->

<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<p>
	{#if Object.keys($page.data.session || {}).length}
		{#if $page.data.session.user.image}
			<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
		{/if}
		<span class="signedInText">
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user.email || $page.data.session.user.name}</strong>
		</span>
		<button on:click={() => signOut()} class="button">Sign out</button>
	{:else}
		<span class="notSignedInText">You are not signed in</span>
		<button on:click={() => signIn('github')}>Sign In with GitHub</button>
	{/if}
</p>
<!-- 
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
</div> -->
