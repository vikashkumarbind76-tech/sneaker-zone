import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

type Category = 'all' | 'sneakers' | 'shoes' | 'apparel';

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Sneakers', value: 'sneakers' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Apparel', value: 'apparel' },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="shop" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-accent font-medium tracking-widest uppercase mb-2">
            Explore Our Collection
          </p>
          <h2 className="heading-lg">THE SHOP</h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-primary text-primary-foreground shadow-soft-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
