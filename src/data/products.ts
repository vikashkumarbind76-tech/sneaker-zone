import sneaker1 from '@/assets/product-sneaker-1.jpg';
import sneaker2 from '@/assets/product-sneaker-2.jpg';
import sneaker3 from '@/assets/product-sneaker-3.jpg';
import apparel1 from '@/assets/product-apparel-1.jpg';
import apparel2 from '@/assets/product-apparel-2.jpg';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: 'sneakers' | 'shoes' | 'apparel';
  isNew?: boolean;
  isFeatured?: boolean;
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  material?: string;
  sku: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Air Max SC",
    brand: "Nike",
    price: 4499,
    image: sneaker1,
    category: 'sneakers',
    isNew: true,
    isFeatured: true,
    description: "The Nike Air Max SC delivers iconic Nike style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Nike cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-NIKE-0001"
  },
  {
    id: 2,
    name: "Revolution 6",
    brand: "Nike",
    price: 3795,
    image: sneaker2,
    category: 'sneakers',
    isFeatured: true,
    description: "The Nike Revolution 6 delivers iconic Nike style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Nike cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-NIKE-0002"
  },
  {
    id: 3,
    name: "Court Vision Low",
    brand: "Nike",
    price: 5295,
    image: sneaker3,
    category: 'sneakers',
    isFeatured: true,
    description: "The Nike Court Vision Low delivers iconic Nike style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Nike cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-NIKE-0003"
  },
  {
    id: 4,
    name: "Air Force 1 '07",
    brand: "Nike",
    price: 8995,
    image: sneaker1,
    category: 'sneakers',
    isFeatured: true,
    description: "The Nike Air Force 1 '07 delivers iconic Nike style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Nike cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-NIKE-0004"
  },
  {
    id: 5,
    name: "Pegasus 40",
    brand: "Nike",
    price: 10995,
    image: sneaker2,
    category: 'sneakers',
    description: "The Nike Pegasus 40 delivers iconic Nike style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Nike cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-NIKE-0005"
  },
  {
    id: 6,
    name: "Dunk Low Retro",
    brand: "Nike",
    price: 8995,
    image: sneaker3,
    category: 'sneakers',
    isNew: true,
    description: "The Nike Dunk Low Retro delivers iconic Nike style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Nike cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-NIKE-0006"
  },
  {
    id: 7,
    name: "Blazer Mid '77",
    brand: "Nike",
    price: 7995,
    image: sneaker1,
    category: 'sneakers',
    description: "The Nike Blazer Mid '77 delivers iconic Nike style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Nike cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-NIKE-0007"
  },
  {
    id: 8,
    name: "Air Jordan 1 Low",
    brand: "Nike",
    price: 9295,
    image: sneaker2,
    category: 'sneakers',
    description: "The Nike Air Jordan 1 Low delivers iconic Nike style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Nike cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-NIKE-0008"
  },
  {
    id: 9,
    name: "Smash 3.0",
    brand: "Puma",
    price: 3499,
    image: sneaker3,
    category: 'sneakers',
    description: "The Puma Smash 3.0 delivers iconic Puma style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Puma cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-PUMA-0009"
  },
  {
    id: 10,
    name: "Suede Classic XXI",
    brand: "Puma",
    price: 6499,
    image: sneaker1,
    category: 'sneakers',
    description: "The Puma Suede Classic XXI delivers iconic Puma style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Puma cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-PUMA-0010"
  },
  {
    id: 11,
    name: "RS-X Reinvent",
    brand: "Puma",
    price: 8999,
    image: sneaker2,
    category: 'sneakers',
    isNew: true,
    description: "The Puma RS-X Reinvent delivers iconic Puma style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Puma cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-PUMA-0011"
  },
  {
    id: 12,
    name: "Cell Endura",
    brand: "Puma",
    price: 5999,
    image: sneaker3,
    category: 'sneakers',
    description: "The Puma Cell Endura delivers iconic Puma style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Puma cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-PUMA-0012"
  },
  {
    id: 13,
    name: "Anzarun Lite",
    brand: "Puma",
    price: 2999,
    image: sneaker1,
    category: 'sneakers',
    description: "The Puma Anzarun Lite delivers iconic Puma style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Puma cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-PUMA-0013"
  },
  {
    id: 14,
    name: "Future Rider",
    brand: "Puma",
    price: 6999,
    image: sneaker2,
    category: 'sneakers',
    description: "The Puma Future Rider delivers iconic Puma style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Puma cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-PUMA-0014"
  },
  {
    id: 15,
    name: "Mayze Stack",
    brand: "Puma",
    price: 7499,
    image: sneaker3,
    category: 'sneakers',
    description: "The Puma Mayze Stack delivers iconic Puma style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Puma cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-PUMA-0015"
  },
  {
    id: 16,
    name: "Slipstream Lo",
    brand: "Puma",
    price: 7999,
    image: sneaker1,
    category: 'sneakers',
    isNew: true,
    description: "The Puma Slipstream Lo delivers iconic Puma style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Puma cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-PUMA-0016"
  },
  {
    id: 17,
    name: "Grand Court",
    brand: "Adidas",
    price: 4799,
    image: sneaker2,
    category: 'sneakers',
    description: "The Adidas Grand Court delivers iconic Adidas style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Adidas cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ADID-0017"
  },
  {
    id: 18,
    name: "Runfalcon 3.0",
    brand: "Adidas",
    price: 3999,
    image: sneaker3,
    category: 'sneakers',
    description: "The Adidas Runfalcon 3.0 delivers iconic Adidas style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Adidas cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ADID-0018"
  },
  {
    id: 19,
    name: "Galaxy 6",
    brand: "Adidas",
    price: 4499,
    image: sneaker1,
    category: 'sneakers',
    description: "The Adidas Galaxy 6 delivers iconic Adidas style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Adidas cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ADID-0019"
  },
  {
    id: 20,
    name: "Ultraboost Light",
    brand: "Adidas",
    price: 17999,
    image: sneaker2,
    category: 'sneakers',
    description: "The Adidas Ultraboost Light delivers iconic Adidas style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Adidas cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ADID-0020"
  },
  {
    id: 21,
    name: "NMD_R1",
    brand: "Adidas",
    price: 13999,
    image: sneaker3,
    category: 'sneakers',
    isNew: true,
    description: "The Adidas NMD_R1 delivers iconic Adidas style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Adidas cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ADID-0021"
  },
  {
    id: 22,
    name: "Stan Smith",
    brand: "Adidas",
    price: 8999,
    image: sneaker1,
    category: 'sneakers',
    description: "The Adidas Stan Smith delivers iconic Adidas style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Adidas cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ADID-0022"
  },
  {
    id: 23,
    name: "Samba OG",
    brand: "Adidas",
    price: 10999,
    image: sneaker2,
    category: 'sneakers',
    description: "The Adidas Samba OG delivers iconic Adidas style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Adidas cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ADID-0023"
  },
  {
    id: 24,
    name: "Forum Low",
    brand: "Adidas",
    price: 9499,
    image: sneaker3,
    category: 'sneakers',
    description: "The Adidas Forum Low delivers iconic Adidas style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Adidas cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ADID-0024"
  },
  {
    id: 25,
    name: "Classic Leather",
    brand: "Reebok",
    price: 6499,
    image: sneaker1,
    category: 'sneakers',
    description: "The Reebok Classic Leather delivers iconic Reebok style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Reebok cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-REEB-0025"
  },
  {
    id: 26,
    name: "Club C 85",
    brand: "Reebok",
    price: 7499,
    image: sneaker2,
    category: 'sneakers',
    isNew: true,
    description: "The Reebok Club C 85 delivers iconic Reebok style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Reebok cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-REEB-0026"
  },
  {
    id: 27,
    name: "Nano X3",
    brand: "Reebok",
    price: 10999,
    image: sneaker3,
    category: 'sneakers',
    description: "The Reebok Nano X3 delivers iconic Reebok style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Reebok cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-REEB-0027"
  },
  {
    id: 28,
    name: "Floatride Energy 5",
    brand: "Reebok",
    price: 8999,
    image: sneaker1,
    category: 'sneakers',
    description: "The Reebok Floatride Energy 5 delivers iconic Reebok style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Reebok cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-REEB-0028"
  },
  {
    id: 29,
    name: "Gel-Excite 10",
    brand: "Asics",
    price: 6499,
    image: sneaker2,
    category: 'sneakers',
    description: "The Asics Gel-Excite 10 delivers iconic Asics style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Asics cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ASIC-0029"
  },
  {
    id: 30,
    name: "Gel-Kayano 30",
    brand: "Asics",
    price: 16999,
    image: sneaker3,
    category: 'sneakers',
    description: "The Asics Gel-Kayano 30 delivers iconic Asics style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Asics cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ASIC-0030"
  },
  {
    id: 31,
    name: "Novablast 4",
    brand: "Asics",
    price: 13999,
    image: sneaker1,
    category: 'sneakers',
    isNew: true,
    description: "The Asics Novablast 4 delivers iconic Asics style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Asics cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-ASIC-0031"
  },
  {
    id: 32,
    name: "Go Walk 6",
    brand: "Skechers",
    price: 4999,
    image: sneaker2,
    category: 'sneakers',
    description: "The Skechers Go Walk 6 delivers iconic Skechers style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Skechers cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-SKEC-0032"
  },
  {
    id: 33,
    name: "D'Lites",
    brand: "Skechers",
    price: 5999,
    image: sneaker3,
    category: 'sneakers',
    description: "The Skechers D'Lites delivers iconic Skechers style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Skechers cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-SKEC-0033"
  },
  {
    id: 34,
    name: "Arch Fit",
    brand: "Skechers",
    price: 7499,
    image: sneaker1,
    category: 'sneakers',
    description: "The Skechers Arch Fit delivers iconic Skechers style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Skechers cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-SKEC-0034"
  },
  {
    id: 35,
    name: "574 Core",
    brand: "New Balance",
    price: 10499,
    image: sneaker2,
    category: 'sneakers',
    description: "The New Balance 574 Core delivers iconic New Balance style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic New Balance cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-NEW--0035"
  },
  {
    id: 36,
    name: "550 White Green",
    brand: "New Balance",
    price: 13999,
    image: sneaker3,
    category: 'sneakers',
    isNew: true,
    description: "The New Balance 550 White Green delivers iconic New Balance style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic New Balance cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-NEW--0036"
  },
  {
    id: 37,
    name: "North Plus",
    brand: "Campus",
    price: 1399,
    image: sneaker1,
    category: 'sneakers',
    description: "The Campus North Plus delivers iconic Campus style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Campus cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-CAMP-0037"
  },
  {
    id: 38,
    name: "Maxico",
    brand: "Campus",
    price: 1599,
    image: sneaker2,
    category: 'sneakers',
    description: "The Campus Maxico delivers iconic Campus style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Campus cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-CAMP-0038"
  },
  {
    id: 39,
    name: "First",
    brand: "Campus",
    price: 999,
    image: sneaker3,
    category: 'sneakers',
    description: "The Campus First delivers iconic Campus style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Campus cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-CAMP-0039"
  },
  {
    id: 40,
    name: "SM-414",
    brand: "Sparx",
    price: 1299,
    image: sneaker1,
    category: 'sneakers',
    description: "The Sparx SM-414 delivers iconic Sparx style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Sparx cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-SPAR-0040"
  },
  {
    id: 41,
    name: "SX0492G",
    brand: "Sparx",
    price: 1199,
    image: sneaker2,
    category: 'sneakers',
    isNew: true,
    description: "The Sparx SX0492G delivers iconic Sparx style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic Sparx cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-SPAR-0041"
  },
  {
    id: 42,
    name: "Fortify Running",
    brand: "HRX",
    price: 2499,
    image: sneaker3,
    category: 'sneakers',
    description: "The HRX Fortify Running delivers iconic HRX style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic HRX cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-HRX-0042"
  },
  {
    id: 43,
    name: "Energy Pro Trainer",
    brand: "HRX",
    price: 2799,
    image: sneaker1,
    category: 'sneakers',
    description: "The HRX Energy Pro Trainer delivers iconic HRX style with modern comfort. Perfect for daily wear, sport, and street looks.",
    details: [
      "Breathable mesh / leather upper",
      "Authentic HRX cushioning technology",
      "Padded collar for ankle support",
      "Grippy rubber outsole",
      "Lightweight, low-profile silhouette"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black/White", "White", "Grey", "Navy"],
    material: "Mesh, Synthetic, Rubber",
    sku: "SZ-HRX-0043"
  },
  {
    id: 44,
    name: "RTE2014 Casual",
    brand: "Red Tape",
    price: 1899,
    image: sneaker2,
    category: 'shoes',
    isNew: true,
    isFeatured: true,
    description: "Step out in confidence with the Red Tape RTE2014 Casual. Built by Red Tape for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Red Tape comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-RED--0044"
  },
  {
    id: 45,
    name: "RSO0287 Loafer",
    brand: "Red Tape",
    price: 2299,
    image: sneaker1,
    category: 'shoes',
    isFeatured: true,
    description: "Step out in confidence with the Red Tape RSO0287 Loafer. Built by Red Tape for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Red Tape comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-RED--0045"
  },
  {
    id: 46,
    name: "Walking Shoe",
    brand: "Red Tape",
    price: 1599,
    image: sneaker3,
    category: 'shoes',
    isFeatured: true,
    description: "Step out in confidence with the Red Tape Walking Shoe. Built by Red Tape for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Red Tape comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-RED--0046"
  },
  {
    id: 47,
    name: "Comfit Slip On",
    brand: "Bata",
    price: 1499,
    image: sneaker2,
    category: 'shoes',
    isFeatured: true,
    description: "Step out in confidence with the Bata Comfit Slip On. Built by Bata for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Bata comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-BATA-0047"
  },
  {
    id: 48,
    name: "Power Walk",
    brand: "Bata",
    price: 1799,
    image: sneaker1,
    category: 'shoes',
    description: "Step out in confidence with the Bata Power Walk. Built by Bata for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Bata comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-BATA-0048"
  },
  {
    id: 49,
    name: "North Star Sneaker",
    brand: "Bata",
    price: 1999,
    image: sneaker3,
    category: 'shoes',
    isNew: true,
    description: "Step out in confidence with the Bata North Star Sneaker. Built by Bata for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Bata comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-BATA-0049"
  },
  {
    id: 50,
    name: "Leather Boot",
    brand: "Woodland",
    price: 4995,
    image: sneaker2,
    category: 'shoes',
    description: "Step out in confidence with the Woodland Leather Boot. Built by Woodland for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Woodland comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-WOOD-0050"
  },
  {
    id: 51,
    name: "Outdoor Trekker",
    brand: "Woodland",
    price: 5495,
    image: sneaker1,
    category: 'shoes',
    description: "Step out in confidence with the Woodland Outdoor Trekker. Built by Woodland for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Woodland comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-WOOD-0051"
  },
  {
    id: 52,
    name: "Classic Derby",
    brand: "Woodland",
    price: 3995,
    image: sneaker3,
    category: 'shoes',
    description: "Step out in confidence with the Woodland Classic Derby. Built by Woodland for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Woodland comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-WOOD-0052"
  },
  {
    id: 53,
    name: "Briggs Loafer",
    brand: "Hush Puppies",
    price: 4499,
    image: sneaker2,
    category: 'shoes',
    description: "Step out in confidence with the Hush Puppies Briggs Loafer. Built by Hush Puppies for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Hush Puppies comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-HUSH-0053"
  },
  {
    id: 54,
    name: "Drift Slip On",
    brand: "Hush Puppies",
    price: 3999,
    image: sneaker1,
    category: 'shoes',
    isNew: true,
    description: "Step out in confidence with the Hush Puppies Drift Slip On. Built by Hush Puppies for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Hush Puppies comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-HUSH-0054"
  },
  {
    id: 55,
    name: "Tilden Cap",
    brand: "Clarks",
    price: 6999,
    image: sneaker3,
    category: 'shoes',
    description: "Step out in confidence with the Clarks Tilden Cap. Built by Clarks for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Clarks comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-CLAR-0055"
  },
  {
    id: 56,
    name: "Bushacre 3",
    brand: "Clarks",
    price: 8499,
    image: sneaker2,
    category: 'shoes',
    description: "Step out in confidence with the Clarks Bushacre 3. Built by Clarks for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Clarks comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-CLAR-0056"
  },
  {
    id: 57,
    name: "Coolers Sandal",
    brand: "Liberty",
    price: 899,
    image: sneaker1,
    category: 'shoes',
    description: "Step out in confidence with the Liberty Coolers Sandal. Built by Liberty for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Liberty comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-LIBE-0057"
  },
  {
    id: 58,
    name: "Healers Formal",
    brand: "Liberty",
    price: 1599,
    image: sneaker3,
    category: 'shoes',
    description: "Step out in confidence with the Liberty Healers Formal. Built by Liberty for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Liberty comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-LIBE-0058"
  },
  {
    id: 59,
    name: "LC4087 Sneaker",
    brand: "Lee Cooper",
    price: 2999,
    image: sneaker2,
    category: 'shoes',
    isNew: true,
    description: "Step out in confidence with the Lee Cooper LC4087 Sneaker. Built by Lee Cooper for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Lee Cooper comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-LEE--0059"
  },
  {
    id: 60,
    name: "Casual Derby",
    brand: "Lee Cooper",
    price: 2499,
    image: sneaker1,
    category: 'shoes',
    description: "Step out in confidence with the Lee Cooper Casual Derby. Built by Lee Cooper for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Lee Cooper comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-LEE--0060"
  },
  {
    id: 61,
    name: "Formal Oxford",
    brand: "Provogue",
    price: 1799,
    image: sneaker3,
    category: 'shoes',
    description: "Step out in confidence with the Provogue Formal Oxford. Built by Provogue for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Provogue comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-PROV-0061"
  },
  {
    id: 62,
    name: "Tan Loafer",
    brand: "Mochi",
    price: 2999,
    image: sneaker2,
    category: 'shoes',
    description: "Step out in confidence with the Mochi Tan Loafer. Built by Mochi for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Mochi comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-MOCH-0062"
  },
  {
    id: 63,
    name: "Black Derby",
    brand: "Metro",
    price: 2199,
    image: sneaker1,
    category: 'shoes',
    description: "Step out in confidence with the Metro Black Derby. Built by Metro for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Metro comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-METR-0063"
  },
  {
    id: 64,
    name: "Campus Walker",
    brand: "Action",
    price: 799,
    image: sneaker3,
    category: 'shoes',
    isNew: true,
    description: "Step out in confidence with the Action Campus Walker. Built by Action for everyday Indian streets with comfort and durability in mind.",
    details: [
      "Durable upper construction",
      "Signature Action comfort sole",
      "Cushioned insole for all-day wear",
      "Anti-skid rubber outsole",
      "Lightweight and flexible"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ["Black", "Brown", "Tan", "Grey"],
    material: "Leather / Synthetic",
    sku: "SZ-ACTI-0064"
  },
  {
    id: 65,
    name: "Active Training Tee",
    brand: "HRX",
    price: 799,
    image: apparel1,
    category: 'apparel',
    isNew: true,
    isFeatured: true,
    description: "The HRX Active Training Tee blends iconic HRX style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic HRX branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-HRX-0065"
  },
  {
    id: 66,
    name: "Energy Joggers",
    brand: "HRX",
    price: 1499,
    image: apparel2,
    category: 'apparel',
    isFeatured: true,
    description: "The HRX Energy Joggers blends iconic HRX style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic HRX branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-HRX-0066"
  },
  {
    id: 67,
    name: "Lifestyle Hoodie",
    brand: "HRX",
    price: 1999,
    image: apparel1,
    category: 'apparel',
    isFeatured: true,
    description: "The HRX Lifestyle Hoodie blends iconic HRX style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic HRX branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-HRX-0067"
  },
  {
    id: 68,
    name: "Cotton T-Shirt",
    brand: "Roadster",
    price: 599,
    image: apparel2,
    category: 'apparel',
    isFeatured: true,
    description: "The Roadster Cotton T-Shirt blends iconic Roadster style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Roadster branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-ROAD-0068"
  },
  {
    id: 69,
    name: "Slim Fit Jeans",
    brand: "Roadster",
    price: 1499,
    image: apparel1,
    category: 'apparel',
    description: "The Roadster Slim Fit Jeans blends iconic Roadster style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Roadster branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-ROAD-0069"
  },
  {
    id: 70,
    name: "Checked Shirt",
    brand: "Roadster",
    price: 999,
    image: apparel2,
    category: 'apparel',
    isNew: true,
    description: "The Roadster Checked Shirt blends iconic Roadster style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Roadster branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-ROAD-0070"
  },
  {
    id: 71,
    name: "511 Slim Jeans",
    brand: "Levi's",
    price: 3499,
    image: apparel1,
    category: 'apparel',
    description: "The Levi's 511 Slim Jeans blends iconic Levi's style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Levi's branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-LEVI-0071"
  },
  {
    id: 72,
    name: "Logo Tee",
    brand: "Levi's",
    price: 1299,
    image: apparel2,
    category: 'apparel',
    description: "The Levi's Logo Tee blends iconic Levi's style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Levi's branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-LEVI-0072"
  },
  {
    id: 73,
    name: "Trucker Jacket",
    brand: "Levi's",
    price: 5999,
    image: apparel1,
    category: 'apparel',
    description: "The Levi's Trucker Jacket blends iconic Levi's style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Levi's branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-LEVI-0073"
  },
  {
    id: 74,
    name: "Polo T-Shirt",
    brand: "U.S. Polo Assn.",
    price: 1599,
    image: apparel2,
    category: 'apparel',
    description: "The U.S. Polo Assn. Polo T-Shirt blends iconic U.S. Polo Assn. style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic U.S. Polo Assn. branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-U-S--0074"
  },
  {
    id: 75,
    name: "Slim Fit Shirt",
    brand: "U.S. Polo Assn.",
    price: 2299,
    image: apparel1,
    category: 'apparel',
    isNew: true,
    description: "The U.S. Polo Assn. Slim Fit Shirt blends iconic U.S. Polo Assn. style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic U.S. Polo Assn. branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-U-S--0075"
  },
  {
    id: 76,
    name: "Graphic Tee",
    brand: "Jack & Jones",
    price: 1099,
    image: apparel2,
    category: 'apparel',
    description: "The Jack & Jones Graphic Tee blends iconic Jack & Jones style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Jack & Jones branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-JACK-0076"
  },
  {
    id: 77,
    name: "Slim Chinos",
    brand: "Jack & Jones",
    price: 2499,
    image: apparel1,
    category: 'apparel',
    description: "The Jack & Jones Slim Chinos blends iconic Jack & Jones style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Jack & Jones branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-JACK-0077"
  },
  {
    id: 78,
    name: "Bomber Jacket",
    brand: "Jack & Jones",
    price: 4999,
    image: apparel2,
    category: 'apparel',
    description: "The Jack & Jones Bomber Jacket blends iconic Jack & Jones style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Jack & Jones branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-JACK-0078"
  },
  {
    id: 79,
    name: "Formal Shirt",
    brand: "Allen Solly",
    price: 1799,
    image: apparel1,
    category: 'apparel',
    description: "The Allen Solly Formal Shirt blends iconic Allen Solly style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Allen Solly branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-ALLE-0079"
  },
  {
    id: 80,
    name: "Chino Trouser",
    brand: "Allen Solly",
    price: 1999,
    image: apparel2,
    category: 'apparel',
    isNew: true,
    description: "The Allen Solly Chino Trouser blends iconic Allen Solly style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Allen Solly branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-ALLE-0080"
  },
  {
    id: 81,
    name: "Cotton Shirt",
    brand: "Peter England",
    price: 1599,
    image: apparel1,
    category: 'apparel',
    description: "The Peter England Cotton Shirt blends iconic Peter England style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Peter England branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-PETE-0081"
  },
  {
    id: 82,
    name: "Casual Blazer",
    brand: "Peter England",
    price: 4999,
    image: apparel2,
    category: 'apparel',
    description: "The Peter England Casual Blazer blends iconic Peter England style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Peter England branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-PETE-0082"
  },
  {
    id: 83,
    name: "Regular Fit Tee",
    brand: "H&M",
    price: 699,
    image: apparel1,
    category: 'apparel',
    description: "The H&M Regular Fit Tee blends iconic H&M style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic H&M branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-H-M-0083"
  },
  {
    id: 84,
    name: "Slim Joggers",
    brand: "H&M",
    price: 1499,
    image: apparel2,
    category: 'apparel',
    description: "The H&M Slim Joggers blends iconic H&M style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic H&M branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-H-M-0084"
  },
  {
    id: 85,
    name: "Oversized Hoodie",
    brand: "H&M",
    price: 2299,
    image: apparel1,
    category: 'apparel',
    isNew: true,
    description: "The H&M Oversized Hoodie blends iconic H&M style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic H&M branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-H-M-0085"
  },
  {
    id: 86,
    name: "Essentials Tee",
    brand: "Puma",
    price: 999,
    image: apparel2,
    category: 'apparel',
    description: "The Puma Essentials Tee blends iconic Puma style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Puma branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-PUMA-0086"
  },
  {
    id: 87,
    name: "Track Pants",
    brand: "Puma",
    price: 1999,
    image: apparel1,
    category: 'apparel',
    description: "The Puma Track Pants blends iconic Puma style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Puma branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-PUMA-0087"
  },
  {
    id: 88,
    name: "3-Stripes Tee",
    brand: "Adidas",
    price: 1499,
    image: apparel2,
    category: 'apparel',
    description: "The Adidas 3-Stripes Tee blends iconic Adidas style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Adidas branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-ADID-0088"
  },
  {
    id: 89,
    name: "Tiro Trackpant",
    brand: "Adidas",
    price: 2799,
    image: apparel1,
    category: 'apparel',
    description: "The Adidas Tiro Trackpant blends iconic Adidas style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Adidas branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-ADID-0089"
  },
  {
    id: 90,
    name: "Sportswear Tee",
    brand: "Nike",
    price: 1495,
    image: apparel2,
    category: 'apparel',
    isNew: true,
    description: "The Nike Sportswear Tee blends iconic Nike style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Nike branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-NIKE-0090"
  },
  {
    id: 91,
    name: "Tech Fleece Hoodie",
    brand: "Nike",
    price: 6995,
    image: apparel1,
    category: 'apparel',
    description: "The Nike Tech Fleece Hoodie blends iconic Nike style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Nike branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-NIKE-0091"
  },
  {
    id: 92,
    name: "Texas Jeans",
    brand: "Wrangler",
    price: 2499,
    image: apparel2,
    category: 'apparel',
    description: "The Wrangler Texas Jeans blends iconic Wrangler style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Wrangler branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-WRAN-0092"
  },
  {
    id: 93,
    name: "Slim Tee",
    brand: "Pepe Jeans",
    price: 1199,
    image: apparel1,
    category: 'apparel',
    description: "The Pepe Jeans Slim Tee blends iconic Pepe Jeans style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Pepe Jeans branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-PEPE-0093"
  },
  {
    id: 94,
    name: "Linen Shirt",
    brand: "Mast & Harbour",
    price: 1599,
    image: apparel2,
    category: 'apparel',
    description: "The Mast & Harbour Linen Shirt blends iconic Mast & Harbour style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Mast & Harbour branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-MAST-0094"
  },
  {
    id: 95,
    name: "Casual Shirt",
    brand: "Highlander",
    price: 899,
    image: apparel1,
    category: 'apparel',
    isNew: true,
    description: "The Highlander Casual Shirt blends iconic Highlander style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Highlander branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-HIGH-0095"
  },
  {
    id: 96,
    name: "Logo Polo",
    brand: "Tommy Hilfiger",
    price: 2999,
    image: apparel2,
    category: 'apparel',
    description: "The Tommy Hilfiger Logo Polo blends iconic Tommy Hilfiger style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Tommy Hilfiger branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-TOMM-0096"
  },
  {
    id: 97,
    name: "Crew Tee",
    brand: "Calvin Klein",
    price: 2499,
    image: apparel1,
    category: 'apparel',
    description: "The Calvin Klein Crew Tee blends iconic Calvin Klein style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Calvin Klein branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-CALV-0097"
  },
  {
    id: 98,
    name: "Graphic Tee",
    brand: "Being Human",
    price: 899,
    image: apparel2,
    category: 'apparel',
    description: "The Being Human Graphic Tee blends iconic Being Human style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Being Human branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-BEIN-0098"
  },
  {
    id: 99,
    name: "Cotton Tee",
    brand: "UCB",
    price: 1299,
    image: apparel1,
    category: 'apparel',
    description: "The UCB Cotton Tee blends iconic UCB style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic UCB branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-UCB-0099"
  },
  {
    id: 100,
    name: "Slim Jeans",
    brand: "Flying Machine",
    price: 1799,
    image: apparel2,
    category: 'apparel',
    isNew: true,
    description: "The Flying Machine Slim Jeans blends iconic Flying Machine style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Flying Machine branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-FLYI-0100"
  },
  {
    id: 101,
    name: "Tapered Jeans",
    brand: "Spykar",
    price: 1999,
    image: apparel1,
    category: 'apparel',
    description: "The Spykar Tapered Jeans blends iconic Spykar style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Spykar branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-SPYK-0101"
  },
  {
    id: 102,
    name: "Hooded Sweatshirt",
    brand: "WROGN",
    price: 1999,
    image: apparel2,
    category: 'apparel',
    description: "The WROGN Hooded Sweatshirt blends iconic WROGN style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic WROGN branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-WROG-0102"
  },
  {
    id: 103,
    name: "Printed Tee",
    brand: "Bewakoof",
    price: 499,
    image: apparel1,
    category: 'apparel',
    description: "The Bewakoof Printed Tee blends iconic Bewakoof style with premium build quality. A versatile wardrobe staple for the modern Indian wardrobe.",
    details: [
      "Premium fabric for everyday comfort",
      "Authentic Bewakoof branding",
      "Easy machine wash",
      "Tailored modern fit",
      "Designed for Indian climate"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ["Black", "White", "Navy", "Grey"],
    material: "Cotton blend",
    sku: "SZ-BEWA-0103"
  }
];

export const featuredProducts = products.filter(p => p.isFeatured);

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const sizeCharts = {
  sneakers: {
    title: 'Sneakers Size Guide (India)',
    headers: ['UK/IND', 'US', 'EU', 'CM'],
    rows: [
      ['6','7','40','25'],
      ['7','8','41','26'],
      ['8','9','42','27'],
      ['9','10','43','28'],
      ['10','11','44','29'],
      ['11','12','45','30'],
      ['12','13','46','31'],
    ]
  },
  shoes: {
    title: 'Shoes Size Guide (India)',
    headers: ['UK/IND', 'US', 'EU', 'CM'],
    rows: [
      ['6','7','40','25'],
      ['7','8','41','26'],
      ['8','9','42','27'],
      ['9','10','43','28'],
      ['10','11','44','29'],
      ['11','12','45','30'],
    ]
  },
  apparel: {
    title: 'Apparel Size Guide',
    headers: ['Size','Chest (in)','Waist (in)','Length (in)'],
    rows: [
      ['XS','34-36','28-30','26'],
      ['S','36-38','30-32','27'],
      ['M','38-40','32-34','28'],
      ['L','40-42','34-36','29'],
      ['XL','42-44','36-38','30'],
      ['XXL','44-46','38-40','31'],
    ]
  }
};