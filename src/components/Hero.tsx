import { ArrowRight, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-sneakers.jpg';

const Hero = () => {
  const handleShopNow = () => {
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream to-cream-dark" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-bronze/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-accent font-medium tracking-widest uppercase animate-fade-up">
                Authentic Sneakers & Streetwear
              </p>
              <h1 className="heading-xl animate-fade-up delay-100">
                STEP INTO <span className="text-gradient">THE ZONE</span><br />
                <span className="block text-2xl md:text-3xl font-display tracking-wide mt-3">
                  Your Online Sneaker Destination
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md animate-fade-up delay-200">
                Shop the latest drops and classic kicks from the brands you love —
                100% authentic, delivered to your door.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Button variant="hero" onClick={handleShopNow}>
                Shop Now
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
              <Link to="/shop">
                <Button variant="heroOutline">
                  <Truck className="w-5 h-5 mr-1" />
                  Browse Catalog
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 animate-fade-up delay-400">
              <div>
                <p className="font-display text-4xl text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="font-display text-4xl text-foreground">5K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="font-display text-4xl text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Authentic</p>
              </div>
            </div>
          </div>


          {/* Hero Image */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-soft-xl">
              <img
                src={heroImage}
                alt="Premium sneakers at Sneaker Zone"
                className="w-full h-full object-cover animate-float"
                width={1200}
                height={900}
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
            
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
