<script lang="ts">
  import { createEventDispatcher } from "svelte";

  type DragData = {
    index: number;
    group: string;
  };

  const dispatch = createEventDispatcher();

  export let index: number;
  export let list: any[] = [];
  export let group = "default";
  export let disabled = false;
  export let dragHandleClass = ""; // by default the entire element

  let dragging = false;
  let dragover = false;

  const onDrag = (e: DragEvent, i: number) => {
    if (!e || disabled || !e.dataTransfer) {
      return;
    }

    const target = e.target as HTMLElement;

    if (dragHandleClass && !target.classList.contains(dragHandleClass)) {
      // not the drag handle
      dragover = false;
      dragging = false;
      e.preventDefault();
      return;
    }

    dragging = true;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        index: i,
        group: group,
      }),
    );

    dispatch("drag", e);
  };

  const onDrop = (e: DragEvent, targetIndex: number) => {
    dragover = false;
    dragging = false;

    if (!e || disabled || !e.dataTransfer) {
      return;
    }

    e.dataTransfer.dropEffect = "move";

    let dragData: DragData = { index: 0, group: "" };
    try {
      dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
    } catch (_) {}

    if (dragData.group != group) {
      return; // different draggable group
    }

    const start = dragData.index << 0;

    if (start < targetIndex) {
      list.splice(targetIndex + 1, 0, list[start]);
      list.splice(start, 1);
    } else {
      list.splice(targetIndex, 0, list[start]);
      list.splice(start + 1, 1);
    }

    list = list;

    dispatch("sort", {
      oldIndex: start,
      newIndex: targetIndex,
      list: list,
    });
  };
</script>

<div
  draggable={!disabled}
  class="draggable"
  class:dragging
  class:dragover
  role="listitem"
  on:dragover|preventDefault={() => {
    dragover = true;
  }}
  on:dragleave|preventDefault={() => {
    dragover = false;
  }}
  on:dragend={() => {
    dragover = false;
    dragging = false;
  }}
  on:dragstart={(e) => onDrag(e, index)}
  on:drop={(e) => onDrop(e, index)}
>
  <slot {dragging} {dragover} />
</div>

<style>
  .draggable {
    user-select: none;
    outline: 0;
    min-width: 0;
  }
</style>
