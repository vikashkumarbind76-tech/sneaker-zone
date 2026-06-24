import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ShoppingBag, Ruler, Heart, Share2, Truck, RotateCcw, Shield, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
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
        <div className="text-center">
          <h1 className="heading-lg mb-4">Loading Product</h1>
          <p className="text-muted-foreground">Checking product-specific images...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-lg mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const sizeChart = sizeCharts[product.category];
  const activeImage = product.images[activeImageIndex] ?? product.images[0];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: `${product.name} - Size ${selectedSize}`,
        price: product.price,
        image: product.images[0]?.url ?? '',
        category: product.category,
      });
    }
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | Royal Sneakers & Apparels</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`https://royal-kicks-canvas.lovable.app/product/${product.id}`} />
        <meta property="og:title" content={`${product.name} | Royal Sneakers & Apparels`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:url" content={`https://royal-kicks-canvas.lovable.app/product/${product.id}`} />
        <meta property="og:type" content="product" />
        {product.images[0]?.url && <meta property="og:image" content={product.images[0].url} />}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: product.images.map(i => i.url).filter(Boolean),
          description: product.description,
          sku: product.sku,
          category: product.category,
          brand: { "@type": "Brand", name: "Royal Sneakers & Apparels" },
          offers: {
            "@type": "Offer",
            url: `https://royal-kicks-canvas.lovable.app/product/${product.id}`,
            priceCurrency: "INR",
            price: product.price,
            availability: "https://schema.org/InStock",
          },
        })}</script>
      </Helmet>

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground capitalize">{product.category}</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{product.name}</span>
          </nav>

          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden">
                {activeImage ? (
                  <ProductImage
                    key={`${product.id}-${activeImage.url}`}
                    src={activeImage.url} 
                    alt={activeImage.alt}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageUnavailable />
                )}
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded-lg">
                    NEW
                  </span>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm"
                  aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  onClick={() => {
                    const wasIn = isInWishlist(product.id);
                    toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: activeImage?.url ?? product.images[0]?.url ?? '',
                      brand: product.brand,
                      category: product.category,
                      slug: product.slug,
                    });
                    toast.success(wasIn ? 'Removed from wishlist' : 'Added to wishlist');
                  }}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-accent text-accent' : ''}`} />
                </Button>
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={`${product.id}-${image.url}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`aspect-square overflow-hidden rounded-xl border-2 bg-secondary transition-colors ${
                        activeImageIndex === index ? 'border-accent' : 'border-border hover:border-accent/70'
                      }`}
                      aria-label={`View ${image.alt}`}
                    >
                      <ProductImage
                        src={image.url}
                        alt={image.alt}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-accent font-medium tracking-widest uppercase text-sm mb-2">
                  {product.category}
                </p>
                <h1 className="heading-lg mb-2">{product.name}</h1>
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
              </div>

              <p className="font-display text-4xl">₹{product.price}</p>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>


              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium">Size: {selectedSize || 'Select a size'}</p>
                  <button
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    <Ruler className="w-4 h-4" />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Chart Modal */}
              {showSizeChart && (
                <div className="bg-secondary p-6 rounded-xl animate-fade-up">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-xl">{sizeChart.title}</h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowSizeChart(false)}
                    >
                      Close
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          {sizeChart.headers.map(header => (
                            <th key={header} className="py-2 px-4 text-left font-medium">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sizeChart.rows.map((row, index) => (
                          <tr key={index} className="border-b border-border/50">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="py-2 px-4">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="font-medium mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium" aria-live="polite">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 pt-4">
                <Button 
                  variant="accent" 
                  size="xl" 
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14" aria-label="Share product">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="text-xs text-muted-foreground">Free Shipping Over ₹1999</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="text-xs text-muted-foreground">30-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="text-xs text-muted-foreground">Authentic Guarantee</p>
                </div>
              </div>

              {/* Product Details Accordion */}
              <div className="border-t border-border pt-6">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center justify-between w-full py-2"
                >
                  <span className="font-display text-xl">PRODUCT DETAILS</span>
                  {showDetails ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {showDetails && (
                  <div className="pt-4 space-y-4 animate-fade-up">
                    <div>
                      <p className="font-medium mb-2">Features</p>
                      <ul className="space-y-2">
                        {product.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {product.material && (
                      <div>
                        <p className="font-medium mb-2">Material</p>
                        <p className="text-sm text-muted-foreground">{product.material}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default ProductDetail;
