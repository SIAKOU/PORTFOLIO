import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <ParticleBackground />
      <div className="scanlines" />
      <div className="noise-overlay" />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
