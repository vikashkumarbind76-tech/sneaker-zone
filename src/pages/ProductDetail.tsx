import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  ShoppingBag,
  Ruler,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Minus,
  Plus,
  Star,
  RotateCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { sizeCharts } from '@/data/products';
import { useProduct } from '@/hooks/useProducts';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ImageUnavailable from '@/components/ImageUnavailable';
import ProductImage from '@/components/ProductImage';
import SizeGuideDialog from '@/components/SizeGuideDialog';
import { cn } from '@/lib/utils';


const REVIEWS = [
  { user: 'MARCUS_SNEAKS', ago: '2D AGO', body: '"The quality is unmatched. Perfect fit out of the box."' },
  { user: 'SOLE_COLLECTOR', ago: '1W AGO', body: '"Instant classic. Looks even better in person."' },
  { user: 'STREET_RUN', ago: '2W AGO', body: '"Solid construction. Feels built to last."' },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { product, isLoading } = useProduct(id);

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedSize('');
    setQuantity(1);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-body text-sm uppercase tracking-[0.3em]">
          Loading product…
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-5xl">Product Not Found</h1>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const sizeChart = sizeCharts[product.category];
  const activeImage = product.images[activeImageIndex] ?? product.images[0];
  const wished = isInWishlist(product.id);
  const ghostWord = product.name.toUpperCase();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url ?? '',
        category: product.category,
        size: selectedSize,
      });
    }
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: activeImage?.url ?? '',
      brand: product.brand,
      category: product.category,
      slug: product.slug,
    });
    toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | Sneaker Zone</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`https://sneaker-zone.lovable.app/product/${product.id}`} />
        <meta property="og:title" content={`${product.name} | Sneaker Zone`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:url" content={`https://sneaker-zone.lovable.app/product/${product.id}`} />
        <meta property="og:type" content="product" />
        {product.images[0]?.url && <meta property="og:image" content={product.images[0].url} />}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          image: product.images.map(i => i.url).filter(Boolean),
          description: product.description,
          sku: product.sku,
          category: product.category,
          brand: { '@type': 'Brand', name: product.brand ?? 'Sneaker Zone' },
          offers: {
            '@type': 'Offer',
            url: `https://sneaker-zone.lovable.app/product/${product.id}`,
            priceCurrency: 'INR',
            price: product.price,
            ...(product.originalPrice ? { priceSpecification: { '@type': 'UnitPriceSpecification', priceType: 'https://schema.org/ListPrice', price: product.originalPrice, priceCurrency: 'INR' } } : {}),
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
          },
        })}</script>
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <main className="relative pt-24 pb-24 overflow-x-hidden bg-background">
        {/* Ghost background type */}
        <div
          aria-hidden
          className="ghost-text absolute top-40 -left-10 font-display text-[clamp(120px,18vw,220px)] leading-none whitespace-nowrap select-none pointer-events-none"
        >
          {ghostWord}
        </div>

        <div className="container-custom relative z-10">
          {/* Breadcrumb + Back */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <nav className="flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em]">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                Shop
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground truncate max-w-[40ch]">{product.name}</span>
            </nav>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          {/* 3-column hero */}
          <section className="grid grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* LEFT: Info / size / CTA */}
            <div className="col-span-12 lg:col-span-4 order-2 lg:order-1 flex flex-col justify-center space-y-8">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-[hsl(var(--primary-soft))] font-body text-[11px] uppercase tracking-[0.25em] font-semibold mb-5">
                  {product.brand ?? 'Heritage Classic'}
                </span>
                <h1 className="font-display text-6xl md:text-7xl uppercase leading-[0.9] mb-5 text-foreground">
                  {product.name}
                </h1>
                <p className="text-muted-foreground font-body text-base leading-relaxed max-w-md">
                  {product.description}
                </p>
                <p className="text-xs text-muted-foreground mt-4 font-body uppercase tracking-[0.2em]">
                  SKU: {product.sku}
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-end gap-3 flex-wrap">
                    <span className="font-display text-5xl text-[hsl(var(--primary-soft))]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-muted-foreground mb-2 font-body text-lg line-through decoration-primary/70">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {product.discountPercentage ? (
                      <span className="mb-2 bg-primary/15 text-[hsl(var(--primary-soft))] border border-primary/40 text-xs font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                        {product.discountPercentage}% OFF
                      </span>
                    ) : null}
                  </div>
                  {product.saveAmount ? (
                    <p className="font-body text-sm text-emerald-400/90 font-semibold">
                      You save ₹{product.saveAmount.toLocaleString('en-IN')} · Inclusive of all taxes
                    </p>
                  ) : (
                    <span className="text-muted-foreground font-body text-xs uppercase tracking-[0.25em]">
                      INR · Inclusive of all taxes
                    </span>
                  )}
                </div>

                {/* Sizes */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Size · {selectedSize ? `UK ${selectedSize}` : 'Select'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowSizeChart(s => !s)}
                      className="flex items-center gap-1 text-xs text-primary hover:underline font-body uppercase tracking-[0.2em]"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {product.sizes.map(size => {
                      const active = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            'glass-panel py-3 rounded-xl font-body text-sm font-semibold transition-all min-h-11',
                            active
                              ? 'border-primary bg-primary/20 text-foreground'
                              : 'hover:border-primary/60',
                          )}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Qty
                  </span>
                  <div className="flex items-center glass-panel rounded-full">
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-3 hover:text-primary transition-colors min-h-11 min-w-11"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span
                      className="w-10 text-center font-body font-semibold"
                      aria-live="polite"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-3 hover:text-primary transition-colors min-h-11 min-w-11"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-primary-foreground font-body font-bold text-xs uppercase tracking-[0.25em] py-5 rounded-full hover:scale-[1.02] hover:shadow-bronze transition-all flex items-center justify-center gap-3 min-h-11"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Bag
                  </button>
                  <button
                    type="button"
                    onClick={handleWishlist}
                    aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                    className="glass-panel rounded-full w-14 h-14 flex items-center justify-center hover:border-primary/60 transition-colors"
                  >
                    <Heart
                      className={cn(
                        'w-5 h-5 transition-colors',
                        wished ? 'fill-primary text-primary' : 'text-foreground',
                      )}
                    />
                  </button>
                  <button
                    type="button"
                    aria-label="Share product"
                    className="glass-panel rounded-full w-14 h-14 flex items-center justify-center hover:border-primary/60 transition-colors"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      toast.success('Link copied');
                    }}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <SizeGuideDialog
                  open={showSizeChart}
                  onOpenChange={setShowSizeChart}
                  category={product.category}
                  availableSizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelectSize={(s) => {
                    setSelectedSize(s);
                    toast.success(`Size UK ${s} selected`);
                  }}
                />

              </div>
            </div>

            {/* MIDDLE: hero image + floating chips */}
            <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 relative flex items-center justify-center min-h-[460px]">
              <div className="relative w-full aspect-square flex items-center justify-center">
                {activeImage ? (
                  <ProductImage
                    key={`${product.id}-${activeImage.url}`}
                    src={activeImage.url}
                    alt={activeImage.alt}
                    loading="eager"
                    className="w-full h-full object-contain drop-shadow-[0_35px_70px_rgba(255,120,78,0.25)] animate-float"
                  />
                ) : (
                  <ImageUnavailable />
                )}

                {/* Floating spec chips */}
                <div
                  className="absolute top-[18%] right-0 glass-panel p-3 rounded-2xl animate-float"
                  style={{ animationDuration: '5s' }}
                >
                  <div className="text-[10px] text-primary tracking-[0.25em] uppercase mb-1 font-semibold">
                    Outsole
                  </div>
                  <div className="font-body text-xs font-semibold uppercase tracking-wider">
                    Rubber Grip
                  </div>
                </div>
                <div
                  className="absolute bottom-[18%] left-0 glass-panel p-3 rounded-2xl animate-float"
                  style={{ animationDuration: '6s' }}
                >
                  <div className="text-[10px] text-primary tracking-[0.25em] uppercase mb-1 font-semibold">
                    Material
                  </div>
                  <div className="font-body text-xs font-semibold uppercase tracking-wider truncate max-w-[140px]">
                    {product.material ?? 'Premium Build'}
                  </div>
                </div>

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground font-body text-[10px] uppercase tracking-[0.3em]">
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  Interactive View
                </div>
              </div>
            </div>

            {/* RIGHT: specs + reviews */}
            <div className="col-span-12 lg:col-span-3 order-3 flex flex-col gap-6 justify-center">
              <div className="glass-panel p-6 rounded-3xl space-y-5">
                <h2 className="font-display text-2xl uppercase text-primary border-b border-white/10 pb-3">
                  Tech Specs
                </h2>
                <ul className="space-y-3 font-body text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground uppercase tracking-wider text-xs">
                      Brand
                    </span>
                    <span className="font-semibold uppercase">{product.brand}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground uppercase tracking-wider text-xs">
                      Category
                    </span>
                    <span className="font-semibold uppercase">{product.category}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground uppercase tracking-wider text-xs">
                      Closure
                    </span>
                    <span className="font-semibold uppercase">Lace-up</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground uppercase tracking-wider text-xs">
                      Sizes
                    </span>
                    <span className="font-semibold uppercase">
                      UK {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-6 rounded-3xl space-y-5">
                <div className="flex justify-between items-center">
                  <h2 className="font-display text-2xl uppercase text-primary">Reviews</h2>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="font-display text-2xl">4.9</span>
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </div>
                </div>
                <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">
                  {REVIEWS.map((r, i) => (
                    <div
                      key={r.user}
                      className={cn(
                        'pb-3',
                        i < REVIEWS.length - 1 && 'border-b border-white/10',
                      )}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="font-body text-xs font-semibold uppercase tracking-wider">
                          {r.user}
                        </span>
                        <span className="text-muted-foreground text-[10px] font-body">
                          {r.ago}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs italic leading-relaxed">
                        {r.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Trust strip */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {[
              { icon: Truck, label: 'Free shipping over ₹1,999' },
              { icon: RotateCcw, label: '30-day easy returns' },
              { icon: Shield, label: '100% authenticity guarantee' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="glass-panel rounded-2xl px-6 py-5 flex items-center gap-4"
              >
                <Icon className="w-5 h-5 text-primary shrink-0" />
                <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </section>

          {/* Gallery */}
          {product.images.length > 1 && (
            <section className="mt-24">
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-center mb-12">
                Gallery View
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.images.slice(0, 6).map((image, index) => (
                  <button
                    key={`${product.id}-gal-${image.url}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`View ${image.alt}`}
                    className={cn(
                      'aspect-[4/5] rounded-3xl overflow-hidden glass-panel group relative transition-transform',
                      index === 1 && 'md:mt-12',
                      activeImageIndex === index && 'ring-2 ring-primary',
                    )}
                  >
                    <ProductImage
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-foreground font-body text-xs font-semibold uppercase tracking-[0.25em]">
                        View {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Product details */}
          {(product.details?.length > 0 || product.material) && (
            <section className="mt-24 max-w-3xl mx-auto glass-panel rounded-3xl p-8 md:p-12">
              <h2 className="font-display text-3xl uppercase tracking-tight text-primary mb-6">
                Product Details
              </h2>
              {product.details?.length > 0 && (
                <ul className="space-y-3 mb-6">
                  {product.details.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-muted-foreground font-body leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              {product.material && (
                <div>
                  <p className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    Material
                  </p>
                  <p className="font-body text-sm text-foreground">{product.material}</p>
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default ProductDetail;
