import type { PropsWithChildren } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav />
      <main id="main" className="pt-[84px]">
        {children}
      </main>
      <Footer />
    </>
  );
}