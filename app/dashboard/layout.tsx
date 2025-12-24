import Navbar from "../components/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="pt-[yourNavHeightIfNeeded]">
        {children}
      </main>
    </div>
  );
}
