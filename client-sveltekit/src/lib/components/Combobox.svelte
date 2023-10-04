<script lang="ts">
  import Input from "./ui/input/input.svelte";
  import { Popover, PopoverTrigger } from "./ui/popover";
  import PopoverContent from "./ui/popover/popover-content.svelte";
  export let options: string[] = [];
  export let placeholder = "";
</script>

<Popover>
  <PopoverTrigger asChild>
    <Input type="search" {placeholder} />
  </PopoverTrigger>
  <PopoverContent>hello</PopoverContent>
</Popover>
