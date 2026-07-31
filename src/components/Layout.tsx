import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackToTop from '@/components/BackToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <ScrollProgressBar />
      <ParticleBackground />
      <div className="scanlines" />
      <div className="noise-overlay" />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Layout;
