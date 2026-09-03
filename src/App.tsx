import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FloatingStats from '@/components/FloatingStats';
import Members from '@/components/Members';
import Events from '@/components/Events';
import Gallery from '@/components/Gallery';
import Journey from '@/components/Journey';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { useReveal } from '@/hooks/useReveal';

function App() {
  useReveal();

  return (
    <div className="min-h-screen bg-slatey-50 dark:bg-navy-950">
      <Navbar />
      <main>
        <Hero />
        <FloatingStats />
        <Members />
        <Events />
        <Gallery />
        <Journey />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;
