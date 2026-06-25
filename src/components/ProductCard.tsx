import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Product } from '@/data/products';
import { toast } from 'sonner';
import ImageUnavailable from '@/components/ImageUnavailable';
import ProductImage from '@/components/ProductImage';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  /** Bento sizing: 'tall' doubles row span, 'wide' doubles col span */
  size?: 'default' | 'tall' | 'wide' | 'large';
}

const ProductCard = ({ product, size = 'default' }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const primaryImage = product.images[0];
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const wished = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    // tilt up to ~8deg either way
    const ry = (x - 0.5) * 12;
    const rx = (0.5 - y) * 12;
    setTilt({ rx, ry, mx: x * 100, my: y * 100 });
  };

  const reset = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage?.url ?? '',
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage?.url ?? '',
      brand: product.brand,
      slug: product.slug,
      category: product.category,
    });
    toast.success(wished ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const sizeClass = cn(
    size === 'tall' && 'sm:row-span-2',
    size === 'wide' && 'sm:col-span-2',
    size === 'large' && 'sm:col-span-2 sm:row-span-2',
  );

  return (
    <div className={cn('group/card [perspective:1200px]', sizeClass)}>
      <Link
        ref={cardRef}
        to={`/product/${product.slug}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="relative block h-full rounded-2xl overflow-hidden bg-card shadow-soft-md hover:shadow-soft-lg will-change-transform"
      >
        {/* Glow follow cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(420px circle at ${tilt.mx}% ${tilt.my}%, hsl(var(--accent) / 0.18), transparent 55%)`,
          }}
        />

        {/* Specular gold sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background:
              'linear-gradient(135deg, transparent 35%, hsl(var(--accent) / 0.25) 50%, transparent 65%)',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Image */}
        <div className="relative w-full h-full min-h-[280px] overflow-hidden bg-secondary [transform:translateZ(0)]">
          {primaryImage ? (
            <ProductImage
              src={primaryImage.url}
              alt={primaryImage.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
            />
          ) : (
            <ImageUnavailable />
          )}

          {/* Gradient bottom for legibility */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent" />

          {/* Badges */}
          <div
            className="absolute top-3 left-3 flex gap-2 z-30"
            style={{ transform: 'translateZ(40px)' }}
          >
            {product.isNew && (
              <span className="bg-accent text-accent-foreground text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md shadow-soft-md">
                NEW
              </span>
            )}
            <span className="bg-card/90 backdrop-blur-sm text-foreground text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md">
              {product.brand}
            </span>
          </div>

          {/* Wishlist */}
          <button
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={handleWishlist}
            style={{ transform: 'translateZ(40px)' }}
            className="absolute top-3 right-3 z-30 h-9 w-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-soft-md hover:scale-110 transition-transform"
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-colors',
                wished ? 'fill-accent text-accent' : 'text-foreground',
              )}
            />
          </button>

          {/* Info pinned to bottom, lifts in 3D */}
          <div
            className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-30"
            style={{ transform: 'translateZ(60px)' }}
          >
            <p className="text-[10px] text-primary-foreground/70 uppercase tracking-[0.2em] mb-1">
              {product.category}
            </p>
            <h3 className="font-display text-xl sm:text-2xl leading-tight text-primary-foreground mb-1 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-end justify-between gap-3">
              <p className="font-semibold text-lg text-primary-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              <Button
                variant="default"
                size="sm"
                onClick={handleAddToCart}
                className="translate-y-2 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
