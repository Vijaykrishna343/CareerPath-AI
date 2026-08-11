import { CareerExplorer } from "@/components/career-explorer"
import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <HeroSection />
      <main className="container mx-auto py-8 px-4 pb-20 flex-grow">
        <CareerExplorer />
      </main>
      <Footer />
    </div>
  )
}
