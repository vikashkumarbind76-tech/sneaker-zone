import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block relative bg-card rounded-xl overflow-hidden shadow-soft-sm hover:shadow-soft-lg transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-md">
              NEW
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            variant="default" 
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>

        {/* View Details Overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
            View Details
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.brand} · {product.category}
        </p>
        <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="font-medium text-lg">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
