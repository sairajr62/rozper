import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Component as NotFoundPage } from "@/components/ui/404-page-error";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: "#0B1220" }}>
      <Navbar />
      <div className="flex-1">
        <NotFoundPage />
      </div>
      <Footer />
    </main>
  );
}
