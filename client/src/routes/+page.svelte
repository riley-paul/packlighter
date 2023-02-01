<div class="flex">
  <aside
    class="sticky top-0 h-screen w-72 min-w-fit bg-slate-900 text-white p-4 flex flex-col gap-2 resize-x overflow-auto"
  >
    <h1 class="text-3xl font-bold">Packlighter</h1>
    <div class="flex justify-between">
      <h2 class="text-lg font-bold">Lists</h2>
      <button><i class="fa-solid fa-plus" /></button>
    </div>
    <ul class="bg-slate-800 py-1 px-4 divide-y overflow-scroll text-gray-100">
      <li class="py-1 text-red-500 font-bold">Ski Day</li>
      <li class="py-1">Crag Day</li>
      <li class="py-1">Day Hike</li>
      <li class="py-1">Multi-Day Hike</li>
      <li class="py-1">West Coast Trail</li>
    </ul>
    <br />
    <div class="flex justify-between">
      <h2 class="text-xl font-bold">Gear</h2>
      <div class="flex gap-3">
        <button><i class="fa-solid fa-upload"/></button>
        <button><i class="fa-solid fa-plus"/></button>
      </div>
    </div>
    <ul class="bg-slate-800 py-1 px-4 divide-y overflow-scroll text-gray-100">
      <li class="py-1">Shell Jacket</li>
      <li class="py-1">Down Jacket</li>
      <li class="py-1">Fleece Sweater</li>
      <li class="py-1">Camp Stove</li>
      <li class="py-1">65L Backpack</li>
      <li class="py-1">Sleeping Bag</li>
      <li class="py-1">2P Tent</li>
      <li class="py-1">Sleeping Pad</li>
      <li class="py-1">Bear Spray</li>
    </ul>
  </aside>
  <main class="flex-1 p-4">
    <nav>
      <span>Ski Day</span>
    </nav>
    <figure>Pie chart</figure>
    <h2>Description</h2>
    <p>Description of the list (editable)</p>

    <!-- <ul class="grid w-full grid-cols-[100px_2fr_5fr_1fr_1fr] gap-2">
      <li class="col-span-3 text-xl font-bold">Pack</li>
      <li class="font-bold">Weight</li>
      <li class="font-bold">Qty</li>
      <li><img src="" alt="" /></li>
      <li>Ski Pack</li>
      <li>MEC Weeping Wall</li>
      <li>990g</li>
      <li>1</li>
      <li><img src="" alt="" /></li>
      <li>Multitool</li>
      <li>Leatherman</li>
      <li>190g</li>
      <li>1</li>
      <li><img src="" alt="" /></li>
      <li>Sunglasses</li>
      <li>Sunski</li>
      <li>90g</li>
      <li>1</li>
    </ul> -->
    <br>
    <table class="w-full border-collapse">
      <thead >
        <th colspan="3" class="text-left">Pack</th>
        <th>Weight</th>
        <th>Qty</th>
      </thead>
      <tbody class="divide-y border-y">
        <tr>
          <td><img src="" alt="" /></td>
          <td>Ski Pack</td>
          <td>MEC Weeping Wall</td>
          <td>990g</td>
          <td>1</td>
        </tr>
        <tr>
          <td><img src="" alt="" /></td>
          <td>Multitool</td>
          <td>Leatherman</td>
          <td>190g</td>
          <td>1</td>
        </tr>
        <tr>
          <td><img src="" alt="" /></td>
          <td>Sunglasses</td>
          <td>Sunski</td>
          <td>90g</td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
  </main>
</div>
