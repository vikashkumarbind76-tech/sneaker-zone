import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import ImageUnavailable from '@/components/ImageUnavailable';

const Hero = () => {
  const { data: products = [] } = useProducts();

  const { hero, badgeA, badgeB } = useMemo(() => {
    const withImage = products.filter((p) => p.images.length > 0);
    return {
      hero: withImage[0],
      badgeA: withImage.find((p) => p.brand?.toLowerCase().includes('red tape')) ?? withImage[1],
      badgeB: withImage.find((p) => p.brand?.toLowerCase().includes('puma')) ?? withImage[2],
    };
  }, [products]);

  const brands = ['Red Tape', 'Puma', 'Adidas', 'Reebok'];

  return (
    <section
      id="home"
      className="relative min-h-screen w-full pt-20 flex items-center justify-center overflow-hidden bg-background text-foreground"
    >
      {/* Background giant kinetic type */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden opacity-[0.04]"
      >
        <h2 className="font-display text-[18vw] leading-none uppercase tracking-tighter italic whitespace-nowrap">
          SNEAKER
        </h2>
        <h2 className="font-display text-[18vw] leading-none uppercase tracking-tighter italic whitespace-nowrap">
          ZONE
        </h2>
      </div>


      {/* Ambient red glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-5 flex flex-col gap-8 text-center lg:text-left animate-fade-up">
          <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              New Drop · Red Tape Street
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tight">
            Authentic Sneakers
            <br />
            <span className="text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.35)]">
              &amp; Streetwear
            </span>
          </h1>

          <p className="max-w-md mx-auto lg:mx-0 text-muted-foreground text-lg font-light leading-relaxed">
            Premium urban footwear curated for the Indian subculture. Authentic drops from{' '}
            <span className="text-foreground font-bold">Red Tape</span>,{' '}
            <span className="text-foreground font-bold">Puma</span> and{' '}
            <span className="text-foreground font-bold">Adidas</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
            <Link
              to="/shop"
              className="px-10 py-5 bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm hover:scale-105 hover:shadow-bronze transition-all duration-300 rounded-full text-center min-h-11"
            >
              Shop Now
            </Link>
            <Link
              to="/shop"
              className="px-10 py-5 bg-transparent border border-white/15 text-foreground font-black uppercase tracking-widest text-sm hover:border-primary hover:text-primary transition-all rounded-full text-center min-h-11"
            >
              View All Brands
            </Link>
          </div>
        </div>

        {/* Right: hero product visual */}
        <div className="lg:col-span-7 relative flex justify-center items-center h-[500px] lg:h-[700px]">
          <div className="relative w-full max-w-[600px] aspect-[4/3] rotate-[-12deg] hover:rotate-[-5deg] transition-transform duration-700 ease-out z-20 animate-float">
            {hero?.images[0] ? (
              <img
                src={hero.images[0].url}
                alt={hero.images[0].alt || hero.name}
                width={800}
                height={600}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-contain drop-shadow-[0_45px_60px_rgba(0,0,0,0.7)]"
              />
            ) : (
              <ImageUnavailable />
            )}
          </div>

          {/* Floating glass badges */}
          {badgeA && (
            <Link
              to={`/product/${badgeA.slug}`}
              className="absolute top-[12%] right-2 md:right-6 bg-card/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl z-30 hidden md:block hover:border-primary/40 transition-colors"
            >
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">
                Signature Series
              </p>
              <p className="text-base font-bold max-w-[180px] truncate">{badgeA.name}</p>
              <p className="text-primary font-black mt-1">
                ₹{badgeA.price.toLocaleString('en-IN')}
              </p>
            </Link>
          )}

          {badgeB && (
            <Link
              to={`/product/${badgeB.slug}`}
              className="absolute bottom-[14%] left-2 md:left-6 bg-card/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl z-30 hidden md:block hover:border-primary/40 transition-colors"
            >
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">
                Trending
              </p>
              <p className="text-base font-bold max-w-[180px] truncate">{badgeB.name}</p>
              <p className="text-primary font-black mt-1">
                ₹{badgeB.price.toLocaleString('en-IN')}
              </p>
            </Link>
          )}
        </div>

        {/* Brand strip */}
        <div className="lg:col-span-12 mt-8 w-full pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-10 opacity-80 hover:opacity-100 transition-all duration-500">
          {brands.map((b) => (
            <span
              key={b}
              className="font-display text-2xl md:text-3xl tracking-widest uppercase"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;
