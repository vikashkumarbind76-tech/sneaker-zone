import sneaker1 from '@/assets/product-sneaker-1.jpg';
import sneaker2 from '@/assets/product-sneaker-2.jpg';
import sneaker3 from '@/assets/product-sneaker-3.jpg';
import apparel1 from '@/assets/product-apparel-1.jpg';
import apparel2 from '@/assets/product-apparel-2.jpg';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'sneakers' | 'shoes' | 'apparel';
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Urban Classic Low',
    price: 189,
    image: sneaker1,
    category: 'sneakers',
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: 'Cream Runner Pro',
    price: 165,
    image: sneaker2,
    category: 'sneakers',
    isFeatured: true,
  },
  {
    id: 3,
    name: 'Court Red Elite',
    price: 225,
    image: sneaker3,
    category: 'sneakers',
    isNew: true,
    isFeatured: true,
  },
  {
    id: 4,
    name: 'Essential Hoodie',
    price: 95,
    image: apparel1,
    category: 'apparel',
    isFeatured: true,
  },
  {
    id: 5,
    name: 'Premium Tee',
    price: 45,
    image: apparel2,
    category: 'apparel',
  },
  {
    id: 6,
    name: 'Street Runner X',
    price: 175,
    image: sneaker2,
    category: 'shoes',
  },
  {
    id: 7,
    name: 'Royal High Top',
    price: 210,
    image: sneaker1,
    category: 'sneakers',
  },
  {
    id: 8,
    name: 'Classic Jogger',
    price: 85,
    image: apparel1,
    category: 'apparel',
  },
];

export const featuredProducts = products.filter(p => p.isFeatured);
