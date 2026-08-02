import { Navbar } from "@/components/Navbar";
import { SocialRail } from "@/components/SocialRail";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { MouseGlow } from "@/components/MouseGlow";
import { Grain } from "@/components/Grain";
import { Marquee } from "@/components/Marquee";
import { ClickRipple } from "@/components/ClickRipple";
import { PageLoader } from "@/components/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <MouseGlow />
      <FloatingOrbs />
      <Grain />
      <ClickRipple />
      <CustomCursor />
      <Navbar />
      <SocialRail />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
