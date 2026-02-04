import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DestinationsSection from '@/components/DestinationsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DestinationsSection />
        <ExperienceSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
