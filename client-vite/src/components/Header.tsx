import { Feather } from "lucide-react";
import { Link } from "react-router-dom";
// import { AccountDropdown } from "./AccountDropdown";

// const imageUrl = user ? Astro.locals.pb.files.getUrl(user, user.profile) : "";

export const Header: React.FC = () => (
  <header className="bg-card text-foreground h-14 border-b shadow">
    <div className="px-4 flex justify-between items-center h-full">
      <Link to="/" className="flex items-center w-[250px] border-r h-full">
        <Feather className="mr-3 w-6 text-teal-500" />
        <h1 className="font-medium text-lg">PackLighter</h1>
      </Link>
      {/* <AccountDropdown user={user} imageUrl={imageUrl}/> */}
    </div>
  </header>
);
