import { Crown, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const formatCount = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K+`;
  return `${n}+`;
};

const features = [
  {
    icon: Crown,
    title: 'Premium Selection',
    description: 'Curated collection of the finest sneakers and streetwear from top brands.',
  },
  {
    icon: MapPin,
    title: '100% Authentic',
    description: 'Every pair is sourced from trusted brands — no fakes, ever.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'More than a store, we are a hub for sneakerheads and fashion enthusiasts.',
  },
];

const About = () => {
  const [customerCount, setCustomerCount] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    const fetchCount = async () => {
      const { data, error } = await supabase.rpc('get_customer_count');
      if (!error && mounted && typeof data === 'number') setCustomerCount(data);
    };
    fetchCount();

    const channel = supabase
      .channel('profiles-count')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'profiles' },
        () => fetchCount()
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'profiles' },
        () => fetchCount()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

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
                Sneaker Zone is an online store for sneakers and streetwear.
                We bring together the brands and styles you love — from
                everyday essentials to limited drops — in one easy place to
                shop.
              </p>
              <p>
                Every pair we list is 100% authentic, sourced from trusted
                brands like Nike, Adidas, Jordan, New Balance and Puma. No
                fakes, no guesswork — just real kicks.
              </p>
              <p>
                Add what you love to your cart or save it to your wishlist,
                and we'll get it to your door. Simple as that.
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
                <div className="aspect-[3/4] bg-bronze/20 rounded-xl overflow-hidden">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0642/7787/2830/files/RSL0536A_2.jpg"
                    alt="Red Tape Casual Sneakers"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square bg-bronze/10 rounded-xl overflow-hidden">
                  <img
                    src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/395111/01/sv01/fnd/IND/fmt/png/Smashic-Womens-Comfort-Casual-Sneakers"
                    alt="Puma Smashic Sneakers"
                    loading="lazy"
                    className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-bronze/10 rounded-xl overflow-hidden">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0659/0722/8923/files/100209513_1_39aff483-f753-4a09-9a11-4bd4589c9d48.jpg?v=1779544593"
                    alt="Reebok Classic Leather"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-[3/4] bg-bronze/20 rounded-xl overflow-hidden">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0659/0722/8923/files/100239576_1_a4690a9c-7f09-4ce5-a06b-6e5bfb97d23e.jpg?v=1779547218"
                    alt="Reebok Aztec II"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card text-card-foreground p-6 rounded-xl shadow-soft-xl flex gap-8">
              <div className="text-center">
                <p className="font-display text-3xl">2026</p>
                <p className="text-sm text-muted-foreground">Established</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl tabular-nums transition-all">{formatCount(customerCount)}</p>
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
