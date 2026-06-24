import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CartProvider } from '@/hooks/useCart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Crown, MapPin, Users, Star, Award, Heart } from 'lucide-react';

const values = [
  {
    icon: Crown,
    title: 'Premium Quality',
    description: 'We source only the finest sneakers and apparel from trusted brands and verified suppliers.',
  },
  {
    icon: MapPin,
    title: 'Brooklyn Proud',
    description: 'Born and raised in Brooklyn, we understand the unique style and culture of our community.',
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
  { year: '2014', event: 'Royal Sneakers & Apparels opens on Fulton Street' },
  { year: '2016', event: 'Expanded to include premium apparel line' },
  { year: '2018', event: 'Reached 1,000+ satisfied customers' },
  { year: '2020', event: 'Launched online presence and delivery' },
  { year: '2022', event: 'Celebrated 5,000+ happy customers' },
  { year: '2024', event: '10 years serving Brooklyn community' },
];

const AboutPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Helmet>
        <title>About Royal Sneakers & Apparels | Brooklyn Streetwear</title>
        <meta 
          name="description" 
          content="Learn about Royal Sneakers & Apparels - Brooklyn's premier destination for authentic sneakers and streetwear since 2014." 
        />
        <link rel="canonical" href="https://royal-kicks-canvas.lovable.app/about" />
        <meta property="og:title" content="About Royal Sneakers & Apparels | Brooklyn Streetwear" />
        <meta property="og:description" content="Brooklyn's premier destination for authentic sneakers and streetwear since 2014." />
        <meta property="og:url" content="https://royal-kicks-canvas.lovable.app/about" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main className="pt-24">
          {/* Hero Section */}
          <section className="bg-primary text-primary-foreground py-20">
            <div className="container-custom text-center">
              <Crown className="w-16 h-16 text-bronze-light mx-auto mb-6" />
              <p className="text-bronze-light font-medium tracking-widest uppercase mb-2">
                Our Story
              </p>
              <h1 className="heading-xl mb-6">ABOUT ROYAL SNEAKERS & APPARELS</h1>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
                Brooklyn's premier destination for authentic sneakers and streetwear. 
                We've been keeping the community fresh since 2014.
              </p>
            </div>
          </section>

          {/* Story Section */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="heading-lg">FROM BROOKLYN, FOR BROOKLYN</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Royal Sneakers & Apparels was born from a simple idea: Brooklyn 
                      deserves a sneaker store that understands its unique culture, style, 
                      and energy. Founded in 2014 by a group of local sneaker enthusiasts, 
                      we set out to create more than just a store.
                    </p>
                    <p>
                      Located on historic Fulton Street, we've become a landmark for 
                      sneakerheads, fashion lovers, and anyone who appreciates quality 
                      footwear. Our carefully curated collection features the latest 
                      drops, timeless classics, and exclusive collaborations.
                    </p>
                    <p>
                      What sets us apart isn't just our products—it's our commitment 
                      to authenticity, community, and customer service. When you walk 
                      into Royal Sneakers & Apparels, you're not just a customer; you're family.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-[3/4] bg-secondary rounded-xl" />
                    <div className="aspect-square bg-accent/20 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <p className="font-display text-5xl text-accent">10+</p>
                        <p className="text-sm text-muted-foreground">Years</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="aspect-square bg-accent/20 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <p className="font-display text-5xl text-accent">5K+</p>
                        <p className="text-sm text-muted-foreground">Customers</p>
                      </div>
                    </div>
                    <div className="aspect-[3/4] bg-secondary rounded-xl" />
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

          {/* Timeline Section */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center mb-12">
                <p className="text-accent font-medium tracking-widest uppercase mb-2">
                  Our Journey
                </p>
                <h2 className="heading-lg">MILESTONES</h2>
              </div>

              <div className="max-w-2xl mx-auto">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className="flex gap-6 pb-8 last:pb-0"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-accent rounded-full" />
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="font-display text-2xl text-accent mb-1">{milestone.year}</p>
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary text-primary-foreground py-16">
            <div className="container-custom text-center">
              <h2 className="heading-md mb-4">READY TO EXPERIENCE ROYAL SNEAKERS & APPARELS?</h2>
              <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
                Visit us at 1347 Fulton St, Brooklyn, or call us at (347) 627-6595
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://maps.google.com/?q=1347+Fulton+St,+Brooklyn,+NY+11216"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-bronze text-primary-foreground px-6 py-3 rounded-lg font-medium hover:brightness-110 transition-all"
                >
                  <MapPin className="w-5 h-5" />
                  Get Directions
                </a>
                <a 
                  href="tel:+13476276595"
                  className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 px-6 py-3 rounded-lg font-medium hover:bg-primary-foreground/10 transition-all"
                >
                  Call Us
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
