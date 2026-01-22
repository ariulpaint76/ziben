import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductGallery } from '@/components/ProductGallery';
import { BrandPhilosophy } from '@/components/BrandPhilosophy';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { GovernmentNews } from '@/components/GovernmentNews';
import { Workwear } from '@/components/Workwear';
import { SafetyShoes } from '@/components/SafetyShoes';
import { Testimonials } from '@/components/Testimonials';
import { Approach } from '@/components/Approach';
import { Pricing } from '@/components/Pricing';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';

export default function Home() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <Hero />
      <ProductGallery />
      <BrandPhilosophy />
      <CategoryShowcase />
      <GovernmentNews />
      <Workwear />
      <SafetyShoes />
      <Testimonials />
      <Approach />
      <Pricing />
      <Contact />
      <Footer />
      <AIChatbot />
    </main>
  );
}
