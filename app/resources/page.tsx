import HeaderBanner from "@/components/header-banner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <HeaderBanner />
      <Navbar />
      
      <section className="py-20 bg-white min-h-[50vh] flex flex-col items-center justify-center flex-grow">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl text-primary-dark font-bold mb-4">Department Resources</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access Department Library guidelines, Downloads, Notice Board archives, and Curriculum details here.
            </p>
            <Link href="/" className="inline-block bg-accent text-primary-dark px-8 py-3 font-bold rounded-full hover:scale-105 transition-transform shadow-md">
              Return Home
            </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
