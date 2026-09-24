import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import AISolutions from "@/components/AISolutions";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollEffects from "@/components/ScrollEffects";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Marquee />
        <Services />
        <AISolutions />
        <WhyUs />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollEffects />
    </>
  );
}
