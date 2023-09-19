import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="w-full h-full py-16 overflow-auto">
      <div className="prose dark:prose-invert mx-auto max-w-xl">
        <FontAwesomeIcon
          icon={faFeather}
          className="h-20 text-teal-500 mx-auto mb-16"
        />
        <h1 className="text-center">PackLighter</h1>
        <p className="text-center">
          The best way to optimize your packing lists for weight and
          completeness
        </p>
        <div>
          <a href="/auth">
            <Button className="w-full">Get Started</Button>
          </a>
        </div>
        <br />
      </div>
    </main>
  );
}