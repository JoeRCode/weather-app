import type { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header.tsx";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-3xl mx-auto mt-1 p-1">
      <div className="bg-gradient-to-br from-background to-muted">
        <Header />
        <main className="flex items-center justify-center min-h-screen container mx-auto px-4 py-2">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
