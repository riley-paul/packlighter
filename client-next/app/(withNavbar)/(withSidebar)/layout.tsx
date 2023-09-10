import Sidebar from "@/components/Sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row flex-1 overflow-hidden">
      <aside className="bg-card z-0 shadow border-r p-2 min-w-[250px] max-w-[300px]">
        <Sidebar />
      </aside>
      <div className="flex-1 w-full p-4 overflow-auto">{children}</div>
    </main>
  );
}
