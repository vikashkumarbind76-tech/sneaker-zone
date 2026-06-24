import { Crown, MapPin, Users } from 'lucide-react';

const features = [
  {
    icon: Crown,
    title: 'Premium Selection',
    description: 'Curated collection of the finest sneakers and streetwear from top brands.',
  },
  {
    icon: MapPin,
    title: 'Brooklyn Roots',
    description: 'Proudly serving the Brooklyn community for over a decade with authentic style.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'More than a store, we are a hub for sneakerheads and fashion enthusiasts.',
  },
];

const About = () => {
  return (
    <section id="about" className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <p className="text-bronze-light font-medium tracking-widest uppercase mb-2">
                Our Story
              </p>
              <h2 className="heading-lg">ABOUT SNEAKER ZONE</h2>
            </div>

            <div className="space-y-4 text-primary-foreground/80">
              <p>
                Founded in the heart of Brooklyn, Sneaker Zone has been 
                the go-to destination for authentic streetwear and premium sneakers 
                since 2014. What started as a small passion project has grown into 
                a community staple.
              </p>
              <p>
                We believe everyone deserves to step out in style. Our carefully 
                curated collection features the latest drops, classic silhouettes, 
                and exclusive collaborations that you won't find anywhere else.
              </p>
              <p>
                Located on Fulton Street, we're more than just a store—we're a 
                gathering place for sneaker culture, fashion enthusiasts, and 
                everyone who appreciates quality footwear and apparel.
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-6 pt-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-bronze/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-bronze-light" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl mb-1">{feature.title}</h3>
                    <p className="text-sm text-primary-foreground/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-bronze/20 rounded-xl" />
                <div className="aspect-square bg-bronze/10 rounded-xl" />
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-bronze/10 rounded-xl" />
                <div className="aspect-[3/4] bg-bronze/20 rounded-xl" />
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card text-card-foreground p-6 rounded-xl shadow-soft-xl flex gap-8">
              <div className="text-center">
                <p className="font-display text-3xl">10+</p>
                <p className="text-sm text-muted-foreground">Years</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl">5K+</p>
                <p className="text-sm text-muted-foreground">Customers</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl">★ 4.9</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
