import { Footer } from "@/components/modules/home/Footer";
import { Navbar } from "@/components/shared/Navbar";
// import { Footer } from "@/components/shared/Footer"; // Import koro

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer /> 
    </div>
  );
}