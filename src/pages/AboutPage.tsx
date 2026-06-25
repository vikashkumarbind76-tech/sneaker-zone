import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CartProvider } from '@/hooks/useCart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Crown, MapPin, Users, Star, Award, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const formatCount = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K+`;
  return `${n}+`;
};

const values = [
  {
    icon: Crown,
    title: 'Premium Quality',
    description: 'We source only the finest sneakers and apparel from trusted brands and verified suppliers.',
  },
  {

    icon: Users,
    title: 'Community First',
    description: 'More than a store, we are a gathering place for sneakerheads and fashion lovers.',
  },
  {
    icon: Star,
    title: 'Authentic Only',
    description: 'Every item we sell is 100% authentic. We guarantee it or your money back.',
  },
  {
    icon: Award,
    title: 'Expert Curation',
    description: 'Our team handpicks each item, ensuring you get the best selection available.',
  },
  {
    icon: Heart,
    title: 'Customer Love',
    description: 'We treat every customer like family. Your satisfaction is our top priority.',
  },
];

const milestones = [
  { year: '2026', event: 'Sneaker Zone launches online' },
];

const AboutPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerCount, setCustomerCount] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    const fetchCount = async () => {
      const { data, error } = await supabase.rpc('get_customer_count');
      if (!error && mounted && typeof data === 'number') setCustomerCount(data);
    };
    fetchCount();

    const channel = supabase
      .channel('profiles-count-about')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'profiles' }, () => fetchCount())
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'profiles' }, () => fetchCount())
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <CartProvider>
      <Helmet>
        <title>About Sneaker Zone | Online Sneakers & Streetwear</title>
        <meta
          name="description"
          content="Learn about Sneaker Zone — your online destination for authentic sneakers and streetwear from the brands you love."
        />
        <link rel="canonical" href="https://royal-kicks-canvas.lovable.app/about" />
        <meta property="og:title" content="About Sneaker Zone | Online Sneakers & Streetwear" />
        <meta property="og:description" content="Your online destination for authentic sneakers and streetwear." />
        <meta property="og:url" content="https://royal-kicks-canvas.lovable.app/about" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-primary text-primary-foreground py-10">
            <div className="container-custom text-center">
              <Crown className="w-8 h-8 text-bronze-light mx-auto mb-2" />
              <p className="text-bronze-light text-xs font-medium tracking-widest uppercase mb-1">
                Our Story
              </p>
              <h1 className="font-display text-3xl md:text-5xl mb-3">ABOUT SNEAKER ZONE</h1>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
                Your online destination for authentic sneakers and streetwear from the brands you love.
              </p>
            </div>
          </section>


          {/* Story Section */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="heading-lg">WHAT IS SNEAKER ZONE?</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Sneaker Zone is your one-stop online shop for sneakers and
                      streetwear. From everyday classics to the latest hyped
                      drops, we stock a carefully picked range of footwear and
                      apparel built for people who care about how they step out.
                    </p>
                    <p>
                      We work only with authentic products from trusted brands —
                      Nike, Adidas, Jordan, New Balance, Puma and more — so every
                      order you place is the real deal, every time.
                    </p>
                    <p>
                      Browse the catalog, save your favorites to your wishlist,
                      and check out in minutes. Fast shipping, easy returns, and
                      a team that actually cares about sneakers.
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-[3/4] bg-secondary rounded-xl overflow-hidden">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0642/7787/2830/files/RSL0536A_2.jpg"
                        alt="Red Tape Casual Sneakers"
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="aspect-square bg-accent/20 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <p className="font-display text-5xl text-accent">2026</p>
                        <p className="text-sm text-muted-foreground">Established</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="aspect-square bg-accent/20 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <p className="font-display text-5xl text-accent tabular-nums transition-all">{formatCount(customerCount)}</p>
                        <p className="text-sm text-muted-foreground">Customers</p>
                      </div>
                    </div>
                    <div className="aspect-[3/4] bg-secondary rounded-xl overflow-hidden">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0659/0722/8923/files/100239576_1_a4690a9c-7f09-4ce5-a06b-6e5bfb97d23e.jpg?v=1779547218"
                        alt="Reebok Aztec II"
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="section-padding bg-secondary/50">
            <div className="container-custom">
              <div className="text-center mb-12">
                <p className="text-accent font-medium tracking-widest uppercase mb-2">
                  What We Stand For
                </p>
                <h2 className="heading-lg">OUR VALUES</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={index}
                    className="bg-card p-6 rounded-xl shadow-soft-sm hover:shadow-soft-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-display text-xl mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* CTA Section */}
          <section className="bg-primary text-primary-foreground py-8">
            <div className="container-custom flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <h2 className="font-display text-xl md:text-2xl">READY TO SHOP?</h2>
              <div className="flex gap-3">
                <a
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-bronze text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition-all"
                >
                  Shop Now
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-primary-foreground/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-foreground/10 transition-all"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>


        </main>

        <Footer />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </CartProvider>
  );
};

export default AboutPage;
