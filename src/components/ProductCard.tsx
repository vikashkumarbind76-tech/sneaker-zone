import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Product } from '@/data/products';
import { toast } from 'sonner';
import ImageUnavailable from '@/components/ImageUnavailable';
import ProductImage from '@/components/ProductImage';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  size?: 'default' | 'tall' | 'wide' | 'large';
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const primaryImage = product.images[0];
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const wished = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const ry = (x - 0.5) * 8;
    const rx = (0.5 - y) * 8;
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
    toast.success(`${product.name} added to cart`);
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

  return (
    <div className="group/card h-full [perspective:1200px]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full rounded-3xl bg-card border border-white/10 hover:border-primary/40 transition-colors duration-500 p-5 sm:p-6 flex flex-col will-change-transform"
      >
        {/* Cursor glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(420px circle at ${tilt.mx}% ${tilt.my}%, hsl(var(--primary) / 0.12), transparent 55%)`,
          }}
        />

        {/* Wishlist (top-right) */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-4 right-4 z-20 h-10 w-10 min-h-11 min-w-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
          style={{ transform: 'translateZ(30px)' }}
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-colors',
              wished ? 'fill-primary-foreground text-primary-foreground' : 'text-foreground',
            )}
          />
        </button>

        {/* Badges (top-left) */}
        <div
          className="absolute top-4 left-4 z-30 flex flex-col gap-2 pointer-events-none"
          style={{ transform: 'translateZ(60px)' }}
        >
          {product.isNew && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md">
              NEW
            </span>
          )}
        </div>

        {/* Image — clickable */}
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="relative w-full flex-1 min-h-0 flex items-center justify-center mb-4 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden focus:outline-none"
          style={{ transform: 'translateZ(40px)' }}
        >
          {primaryImage ? (
            <ProductImage
              src={primaryImage.url}
              alt={primaryImage.alt}
              className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:-translate-y-2 group-hover/card:-rotate-3"
            />
          ) : (
            <ImageUnavailable />
          )}
        </Link>

        {/* Meta */}
        <div className="space-y-1 flex-1" style={{ transform: 'translateZ(20px)' }}>
          <div className="text-primary font-body text-[10px] uppercase tracking-[0.25em] font-semibold">
            {product.brand}
          </div>
          <Link
            to={`/product/${product.slug}`}
            className="block font-display text-xl leading-tight text-foreground truncate hover:text-primary transition-colors"
          >
            {product.name}
          </Link>
          <div className="flex justify-between items-center pt-2">
            <span className="font-display text-2xl text-[hsl(var(--primary-soft))]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.sizes?.length > 0 && (
              <span className="px-2 py-1 bg-white/[0.05] border border-white/10 rounded-md font-body text-[10px] text-muted-foreground tracking-wider">
                UK {product.sizes[0]}-{product.sizes[product.sizes.length - 1]}
              </span>
            )}
          </div>
        </div>

        {/* Add to cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full mt-5 bg-white/[0.04] border border-white/10 py-3.5 rounded-full font-body text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 min-h-11 flex items-center justify-center gap-2"
          style={{ transform: 'translateZ(20px)' }}
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
