import { faFeather, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-3 border-b shadow">
      <a href="/" className="flex items-center">
        <FontAwesomeIcon icon={faFeather} className="h-5 mr-3 text-teal-500" />
        <div className="font-medium">PackLighter</div>
      </a>
      <div className="flex gap-4 items-center">
        <div className="text-muted-foreground">Guest</div>
        <a href="/auth">
          <Button>
            <FontAwesomeIcon icon={faRightToBracket} className="h-4 mr-2" />
            Login
          </Button>
        </a>
      </div>
    </header>
  );
}
