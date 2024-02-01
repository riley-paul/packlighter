import { Button } from "./components/ui/button";
import { toast } from "sonner";

export default function App() {
  return <Button onClick={() => toast("Hello world")}>Hello</Button>;
}
