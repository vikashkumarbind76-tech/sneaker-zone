import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-sneakers.jpg';

const Hero = () => {
  const handleShopNow = () => {
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetDirections = () => {
    window.open('https://maps.google.com/?q=1347+Fulton+St,+Brooklyn,+NY+11216', '_blank');
  };

  const handleCallUs = () => {
    window.location.href = 'tel:+13476276595';
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
                Brooklyn's Premium Streetwear
              </p>
              <h1 className="heading-xl animate-fade-up delay-100">
                STEP INTO<br />
                <span className="text-gradient">ROYALTY</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md animate-fade-up delay-200">
                Discover the latest sneakers and streetwear at Sneaker Zone. 
                Where Brooklyn style meets premium fashion.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Button variant="hero" onClick={handleShopNow}>
                Shop Now
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
              <Button variant="heroOutline" onClick={handleGetDirections}>
                <MapPin className="w-5 h-5 mr-1" />
                Get Directions
              </Button>
              <Button variant="heroAccent" onClick={handleCallUs}>
                <Phone className="w-5 h-5 mr-1" />
                Call Us
              </Button>
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
                <p className="font-display text-4xl text-foreground">10+</p>
                <p className="text-sm text-muted-foreground">Years in Brooklyn</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-soft-xl">
              <img 
                src={heroImage} 
                alt="Premium sneakers at Sneaker Zone Brooklyn"
                className="w-full h-full object-cover animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-soft-lg animate-fade-up delay-500">
              <p className="text-sm text-muted-foreground">New Arrivals</p>
              <p className="font-display text-2xl">WEEKLY DROPS</p>
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
