import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SubpageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      {/* Main Content with top padding for fixed header */}
      <div className="pt-20">
        {children}
      </div>

      <Footer />
    </>
  );
}
