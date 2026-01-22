import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductGallery } from '@/components/ProductGallery';
import { BrandPhilosophy } from '@/components/BrandPhilosophy';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { Workwear } from '@/components/Workwear';
import { SafetyShoes } from '@/components/SafetyShoes';
import { Testimonials } from '@/components/Testimonials';
import { Approach } from '@/components/Approach';
import { Pricing } from '@/components/Pricing';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <Hero />
      <ProductGallery />
      <BrandPhilosophy />
      <CategoryShowcase />
      <Workwear />
      <SafetyShoes />
      <Testimonials />
      <Approach />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
