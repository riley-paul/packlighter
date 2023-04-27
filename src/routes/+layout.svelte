<script>
  import "../app.css";
  import Logo from "../components/Logo.svelte";
  import ListsList from "../components/ListsList.svelte";
  import GearList from "../components/GearList.svelte";
</script>

<div class="flex">
  <aside
    class="w-1/5 sticky top-0 left-0 h-screen bg-slate-800 text-gray-200 p-4 flex flex-col gap-2"
  >
    <Logo />

    <h2 class="text-xl font-bold">LISTS</h2>
    <ListsList {lists} {getLists} />

    <h2 class="text-xl font-bold">GEAR</h2>
    <GearList {gear} {getGear} />
    <p>
      Built by <a href="https://rileypaul.ca" class="text-sky-500">Riley Paul</a
      >
    </p>
  </aside>

  <div class="flex-1">
    <header class="px-4 py-2 bg-slate-700 text-gray-100">
      <div class="flex justify-between items-center">
        <p>Signed in as {"riley"}</p>
        <button
          class="px-2 py-1 rounded bg-slate-200 text-gray-700">Sign Out</button
        >
      </div>
    </header>
    <main class="p-4">
      <slot />
    </main>
  </div>
</div>
