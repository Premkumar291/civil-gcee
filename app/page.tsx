import HeaderBanner from "@/components/header-banner";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import NewsEventsSection from "@/components/news-events";
import AboutSection from "@/components/about-section";
import ProgramsSection from "@/components/programs-section";
import FacilitiesSection from "@/components/facilities-section";
import FacultySection from "@/components/faculty-section";
import ActivitiesSection from "@/components/activities-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <HeaderBanner />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <NewsEventsSection />
      <AboutSection />
      <ProgramsSection />
      <FacilitiesSection />
      <FacultySection />
      <ActivitiesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
