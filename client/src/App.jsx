import Navbar from '@/Components/Layout/Navbar'
import HeroSection from '@/Components/UiElement/HeroSection'
import ServicesCarousel from '@/Components/UiElement/ServicesCarousel'

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground">
        <ServicesCarousel />
        <HeroSection />
      </main>
    </>
  )
}

export default App
