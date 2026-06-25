import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import ImageUnavailable from '@/components/ImageUnavailable';

const Hero = () => {
  const { data: products = [] } = useProducts();

  // Use featured products if any, else fall back to first few
  const showcase = useMemo(() => {
    const featured = products.filter(p => p.isFeatured && p.images.length > 0);
    const pool = featured.length >= 3 ? featured : products.filter(p => p.images.length > 0);
    return pool.slice(0, 6);
  }, [products]);

  const [index, setIndex] = useState(0);
  const current = showcase[index];

  const next = () => setIndex(i => (showcase.length ? (i + 1) % showcase.length : 0));
  const prev = () =>
    setIndex(i => (showcase.length ? (i - 1 + showcase.length) % showcase.length : 0));

  const ghostWord = current?.brand?.toUpperCase() ?? 'AUTHENTIC';

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Radial accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-hero)' }}
      />

      {/* Ghost Display Type */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1
          aria-hidden="true"
          className="ghost-text text-[clamp(96px,22vw,260px)] whitespace-nowrap opacity-90"
        >
          {ghostWord}
        </h1>
      </div>

      {/* Accessible H1 for SEO/screen readers */}
      <h1 className="sr-only">
        Sneaker Zone — Authentic Sneakers & Streetwear, Premium Drops Online
      </h1>

      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: product meta */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-5 animate-fade-up">
          <span className="text-primary font-body text-xs tracking-[0.3em] uppercase font-semibold">
            Legacy Edition
          </span>
          <h2 className="font-display text-5xl xl:text-6xl leading-[0.95] text-foreground">
            {current?.name ?? 'Authentic Drops'}
          </h2>
          <p className="text-muted-foreground max-w-xs leading-relaxed">
            {current?.description?.slice(0, 130) ??
              'Curated authentic sneakers from the brands you love — every step guaranteed genuine.'}
          </p>
        </div>

        {/* Center: floating product */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-lg">
            <div className="relative aspect-square flex items-center justify-center animate-float">
              {current?.images[0] ? (
                <img
                  key={current.id}
                  src={current.images[0].url}
                  alt={current.images[0].alt}
                  width={800}
                  height={800}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-contain drop-shadow-[0_35px_60px_rgba(255,120,78,0.25)] transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full">
                  <ImageUnavailable />
                </div>
              )}
            </div>
            {/* Perspective shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/5 h-10 bg-black/60 blur-3xl rounded-full" />
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="bg-primary text-primary-foreground font-semibold tracking-widest uppercase text-sm px-10 py-4 rounded-full hover:scale-105 hover:shadow-bronze active:scale-95 transition-all duration-300 min-h-11"
            >
              Shop Now
            </Link>
            <Link
              to="/shop"
              className="border border-white/15 bg-white/[0.03] text-foreground font-semibold tracking-widest uppercase text-sm px-10 py-4 rounded-full hover:bg-white/[0.08] transition-all duration-300 min-h-11"
            >
              Explore Collection
            </Link>
          </div>
        </div>

        {/* Right: price + nav */}
        <div className="hidden lg:flex lg:col-span-3 flex-col items-end gap-10 animate-fade-up">
          <div className="text-right">
            <div className="font-display text-5xl text-primary-foreground/90 leading-none">
              <span className="text-[hsl(var(--primary-soft))]">
                ₹{current ? current.price.toLocaleString('en-IN') : '—'}
              </span>
            </div>
            <div className="text-muted-foreground text-xs tracking-[0.3em] uppercase mt-2 font-semibold">
              Retail Price
            </div>
          </div>

          <div className="flex gap-3" aria-label="Browse collection">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous product"
              className="w-14 h-14 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center hover:bg-primary/15 hover:border-primary/40 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next product"
              className="w-14 h-14 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center hover:bg-primary/15 hover:border-primary/40 transition-colors group"
            >
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {showcase.length > 0 && (
            <div className="flex gap-1.5" aria-hidden>
              {showcase.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all ${
                    i === index ? 'w-8 bg-primary' : 'w-4 bg-white/20'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile nav controls */}
        <div className="flex lg:hidden col-span-1 justify-center gap-3 pb-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous product"
            className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center min-h-11 min-w-11"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next product"
            className="w-12 h-12 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center min-h-11 min-w-11"
          >
            <ArrowRight className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="font-body text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
