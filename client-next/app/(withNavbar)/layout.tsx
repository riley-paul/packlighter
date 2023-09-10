import Navbar from "@/components/Navbar";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <header className="z-50">
        <Navbar />
      </header>
      {children}
    </div>
  );
}
