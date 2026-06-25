import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';


import About from '@/components/About';
import InstagramFeed from '@/components/InstagramFeed';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Sneaker Zone — Authentic Sneakers & Streetwear Online</title>
        <meta
          name="description"
          content="Shop authentic sneakers and streetwear online at Sneaker Zone. The latest drops and classic styles from the brands you love, delivered to your door."
        />
        <meta name="keywords" content="sneakers, streetwear, shoes, apparel, fashion, Sneaker Zone, online sneaker store, authentic kicks" />
        <meta property="og:title" content="Sneaker Zone — Authentic Sneakers & Streetwear Online" />
        <meta property="og:description" content="Shop authentic sneakers and streetwear online — the latest drops, delivered." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://royal-kicks-canvas.lovable.app/" />
        <link rel="canonical" href="https://royal-kicks-canvas.lovable.app/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main>
          <Hero />
          <FeaturedProducts />
          
          <About />
          <InstagramFeed />
          <Contact />
        </main>

        <Footer />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </>
  );
};

export default Index;
