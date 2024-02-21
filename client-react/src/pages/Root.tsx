import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <header className="w-full px-6 py-2 bg-secondary text-lg">
        PackLighter
      </header>
      <Outlet />
    </div>
  );
}

export default Root;
