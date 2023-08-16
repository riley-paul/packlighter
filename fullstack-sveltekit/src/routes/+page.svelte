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
  import { Separator } from "$components/ui/separator";
  import { CONTACT_EMAIL } from "$lib/config/constants";
</script>

<main class="px-4 py-8">
  <Card class="max-w-md mx-auto">
    <CardHeader>
      <CardTitle>Welcome to PackLighter</CardTitle>
      <CardDescription>The packing tool of the future. Inspired by <a href="https://lighterpack.com">LighterPack.</a></CardDescription>
    </CardHeader>
    <CardContent class="grid grid-cols-2 gap-2">
      <Button href="/auth/sign-in">Sign In</Button>
      <Button href="/auth/sign-up" variant="secondary">Sign Up</Button>
    </CardContent>
    <CardFooter class="grid">
      <div class="flex mx-auto h-4 items-center">
        <Button href="mailto:{CONTACT_EMAIL}" variant="link">Contact</Button>
        <Separator orientation="vertical" />
        <Button href="/privacy" variant="link">Privacy</Button>
        <Separator orientation="vertical" />
        <Button href="/terms" variant="link">Terms</Button>
      </div>
    </CardFooter>
  </Card>
</main>
