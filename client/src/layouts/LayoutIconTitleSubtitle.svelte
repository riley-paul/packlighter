<script lang="ts">
  import { cn } from "@/lib/utils";

  export let big = false;
</script>

<div class="flex h-min w-full items-center justify-center px-4">
  <div class="my-24 flex flex-col items-center">
    <div class="text-primary mb-4"><slot /></div>
    <div class={cn("mb-1 font-semibold", big && "text-3xl font-bold")}>
      <slot name="title" />
    </div>
    <p class="text-muted-foreground max-w-[14rem] text-center text-sm">
      <slot name="subtitle" />
    </p>
  </div>
</div>
