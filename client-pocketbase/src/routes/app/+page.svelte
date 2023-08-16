<script lang="ts">
  import { Button } from "$components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
</script>

<div class="w-full flex justify-center pt-12">
  <Card class="w-[300px]">
    <CardHeader>
      <CardTitle>Welcome to the App</CardTitle>
      <CardDescription>Have a look around</CardDescription>
    </CardHeader>
    <CardContent class="grid grid-cols-2 gap-2">
      <Button href="/app/list">Lists</Button>
      <Button href="/app/item">Items</Button>
    </CardContent>
  </Card>
</div>
