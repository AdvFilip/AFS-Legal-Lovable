import type { PropsWithChildren } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Disclaimer } from "./Disclaimer";

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Disclaimer />
      <Nav />
      <main id="main" className="pt-[84px]">
        {children}
      </main>
      <Footer />
    </>
  );
}