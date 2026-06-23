import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CartProvider } from '@/hooks/useCart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

type Category = 'all' | 'sneakers' | 'shoes' | 'apparel';

const categories: { label: string; value: Category }[] = [
  { label: 'All Products', value: 'all' },
  { label: 'Sneakers', value: 'sneakers' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Apparel', value: 'apparel' },
];

const ShopPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'newest'>('default');
  const { data: products = [] } = useProducts();

  let filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  return (
    <CartProvider>
      <Helmet>
        <title>Shop | Sneaker Zone Brooklyn</title>
        <meta 
          name="description" 
          content="Browse our collection of premium sneakers, shoes, and streetwear. Find the latest drops and classic styles at Sneaker Zone." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="bg-primary text-primary-foreground py-16 mb-12">
            <div className="container-custom text-center">
              <p className="text-bronze-light font-medium tracking-widest uppercase mb-2">
                Explore Our Collection
              </p>
              <h1 className="heading-xl mb-4">THE SHOP</h1>
              <p className="text-primary-foreground/70 max-w-xl mx-auto">
                Discover premium sneakers, shoes, and streetwear. Authentic styles for the modern urbanite.
              </p>
            </div>
          </section>

          <div className="container-custom">
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                      activeCategory === cat.value
                        ? 'bg-primary text-primary-foreground shadow-soft-md'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-accent"
                >
                  <option value="default">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl font-medium mb-2">No products found</p>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </main>

        <Footer />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </CartProvider>
  );
};

export default ShopPage;
