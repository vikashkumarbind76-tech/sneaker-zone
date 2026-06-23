import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Shop from '@/components/Shop';
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
        <title>Sneaker Zone | Brooklyn's Premium Streetwear Store</title>
        <meta 
          name="description" 
          content="Discover authentic sneakers and streetwear at Sneaker Zone in Brooklyn, NY. Shop the latest drops from top brands. Visit us at 1347 Fulton St." 
        />
        <meta name="keywords" content="sneakers, streetwear, Brooklyn, shoes, apparel, fashion, Sneaker Zone" />
        <meta property="og:title" content="Sneaker Zone | Brooklyn's Premium Streetwear Store" />
        <meta property="og:description" content="Brooklyn's premier destination for authentic sneakers and streetwear. Step into royalty." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sneakerzone.in" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main>
          <Hero />
          <FeaturedProducts />
          <Shop />
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
