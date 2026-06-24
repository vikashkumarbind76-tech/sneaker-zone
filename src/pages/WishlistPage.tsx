import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductImage from '@/components/ProductImage';
import ImageUnavailable from '@/components/ImageUnavailable';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const WishlistPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, removeFromWishlist, clearWishlist, totalItems } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: typeof items[number]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    removeFromWishlist(item.id);
    toast.success(`${item.name} moved to cart`);
  };

  return (
    <>
      <Helmet>
        <title>Your Wishlist | Sneaker Zone</title>
        <meta name="description" content="Your saved sneakers and streetwear at Sneaker Zone. Keep track of the kicks you love and grab them when you're ready." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://royal-kicks-canvas.lovable.app/wishlist" />
        <meta property="og:title" content="Your Wishlist | Sneaker Zone" />
        <meta property="og:description" content="Your saved sneakers and streetwear at Sneaker Zone." />
        <meta property="og:url" content="https://royal-kicks-canvas.lovable.app/wishlist" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setIsCartOpen(true)} />

        <main className="pt-28 pb-16">
          <div className="container-custom">
            <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>

            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-accent fill-accent" />
                <div>
                  <h1 className="heading-lg">Your Wishlist</h1>
                  <p className="text-muted-foreground">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} saved
                  </p>
                </div>
              </div>
              {totalItems > 0 && (
                <Button variant="outline" onClick={clearWishlist}>
                  Clear All
                </Button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="text-center py-24 bg-card rounded-2xl">
                <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Tap the heart on any product to save it here.
                </p>
                <Link to="/shop">
                  <Button>Explore Sneakers</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="group bg-card rounded-xl overflow-hidden shadow-soft-sm hover:shadow-soft-lg transition-all duration-500"
                  >
                    <Link to={`/product/${item.slug}`} className="block">
                      <div className="aspect-square bg-secondary overflow-hidden">
                        {item.image ? (
                          <ProductImage
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <ImageUnavailable />
                        )}
                      </div>
                    </Link>

                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-xs text-accent uppercase tracking-widest font-medium">
                          {item.brand}
                        </p>
                        <Link to={`/product/${item.slug}`} className="font-medium line-clamp-2 hover:text-accent transition-colors">
                          {item.name}
                        </Link>
                        <p className="font-display text-lg mt-1">₹{item.price}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleMoveToCart(item)}
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            removeFromWishlist(item.id);
                            toast.success('Removed from wishlist');
                          }}
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </>
  );
};

export default WishlistPage;
