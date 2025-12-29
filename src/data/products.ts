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
    name: 'Urban Classic Low',
    price: 189,
    image: sneaker1,
    category: 'sneakers',
    isNew: true,
    isFeatured: true,
    description: 'The Urban Classic Low brings timeless street style to your everyday rotation. Crafted with premium leather uppers and signature branding, these sneakers deliver comfort and durability for the modern urbanite.',
    details: [
      'Premium leather upper with textile lining',
      'Cushioned EVA midsole for all-day comfort',
      'Rubber outsole with classic tread pattern',
      'Padded collar and tongue for ankle support',
      'Metal eyelets for durability'
    ],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    colors: ['Black/White', 'White/Gold', 'Navy/White'],
    material: 'Leather, Textile, Rubber',
    sku: 'RSA-UCL-001'
  },
  {
    id: 2,
    name: 'Cream Runner Pro',
    price: 165,
    image: sneaker2,
    category: 'sneakers',
    isFeatured: true,
    description: 'Experience lightweight performance with the Cream Runner Pro. Featuring breathable mesh construction and responsive cushioning, these runners are perfect for both workouts and casual wear.',
    details: [
      'Breathable knit mesh upper',
      'Responsive foam midsole technology',
      'Lightweight design for agile movement',
      'Pull tab for easy on/off',
      'Reflective accents for visibility'
    ],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    colors: ['Cream/Beige', 'White/Grey', 'Black/Cream'],
    material: 'Mesh, Synthetic, Foam',
    sku: 'RSA-CRP-002'
  },
  {
    id: 3,
    name: 'Court Red Elite',
    price: 225,
    image: sneaker3,
    category: 'sneakers',
    isNew: true,
    isFeatured: true,
    description: 'Dominate the court and the streets with the Court Red Elite. Inspired by basketball heritage, these high-performance sneakers feature premium materials and advanced cushioning for ultimate support.',
    details: [
      'Full-grain leather and synthetic upper',
      'Zoom Air cushioning in heel and forefoot',
      'Herringbone traction pattern',
      'Reinforced toe cap for durability',
      'Perforated panels for breathability'
    ],
    sizes: ['7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12', '13', '14'],
    colors: ['Red/Black', 'Black/Red', 'White/Red'],
    material: 'Leather, Synthetic, Rubber',
    sku: 'RSA-CRE-003'
  },
  {
    id: 4,
    name: 'Essential Hoodie',
    price: 95,
    image: apparel1,
    category: 'apparel',
    isFeatured: true,
    description: 'The Essential Hoodie is your go-to layer for any season. Made from heavyweight French terry cotton, it offers warmth, comfort, and effortless style that pairs with everything.',
    details: [
      '400gsm heavyweight French terry cotton',
      'Relaxed fit with dropped shoulders',
      'Kangaroo pocket with hidden media pocket',
      'Ribbed cuffs and hem',
      'Adjustable drawstring hood'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Charcoal', 'Navy', 'Cream'],
    material: '100% Cotton French Terry',
    sku: 'RSA-EH-004'
  },
  {
    id: 5,
    name: 'Premium Tee',
    price: 45,
    image: apparel2,
    category: 'apparel',
    description: 'Elevate your basics with the Premium Tee. Cut from soft, substantial cotton with a relaxed fit, this essential piece features quality construction that holds up wash after wash.',
    details: [
      '220gsm premium cotton jersey',
      'Relaxed fit with slight drop shoulder',
      'Reinforced neck ribbing',
      'Side-seam construction',
      'Pre-shrunk fabric'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    colors: ['Cream', 'Black', 'White', 'Olive', 'Navy'],
    material: '100% Combed Cotton',
    sku: 'RSA-PT-005'
  },
  {
    id: 6,
    name: 'Street Runner X',
    price: 175,
    image: sneaker2,
    category: 'shoes',
    description: 'The Street Runner X combines retro aesthetics with modern comfort technology. Perfect for long days on your feet, these versatile shoes transition seamlessly from day to night.',
    details: [
      'Suede and mesh combination upper',
      'OrthoLite sockliner for cushioning',
      'EVA midsole with gel insert',
      'Vintage-inspired silhouette',
      'Gum rubber outsole'
    ],
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
    colors: ['Beige/Cream', 'Grey/White', 'Navy/Gum'],
    material: 'Suede, Mesh, Rubber',
    sku: 'RSA-SRX-006'
  },
  {
    id: 7,
    name: 'Royal High Top',
    price: 210,
    image: sneaker1,
    category: 'sneakers',
    description: 'Make a statement with the Royal High Top. This premium sneaker features our signature crown detailing and luxurious materials that set you apart from the crowd.',
    details: [
      'Premium tumbled leather upper',
      'Gold-tone hardware and accents',
      'Cushioned collar for ankle support',
      'Memory foam insole',
      'Signature crown embroidery'
    ],
    sizes: ['7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    colors: ['Black/Gold', 'White/Gold', 'Cream/Bronze'],
    material: 'Full Grain Leather, Rubber',
    sku: 'RSA-RHT-007'
  },
  {
    id: 8,
    name: 'Classic Jogger',
    price: 85,
    image: apparel1,
    category: 'apparel',
    description: 'The Classic Jogger delivers premium comfort with a tailored look. Featuring tapered legs and elastic cuffs, these joggers are perfect for lounging or running errands in style.',
    details: [
      '360gsm cotton fleece',
      'Tapered fit with elastic cuffs',
      'Drawstring waistband',
      'Side pockets with hidden zip pocket',
      'Back patch pocket'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Heather Grey', 'Navy', 'Olive'],
    material: '80% Cotton, 20% Polyester',
    sku: 'RSA-CJ-008'
  },
];

export const featuredProducts = products.filter(p => p.isFeatured);

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

// Size chart data
export const sizeCharts = {
  sneakers: {
    title: 'Sneakers Size Guide',
    headers: ['US', 'UK', 'EU', 'CM'],
    rows: [
      ['7', '6', '40', '25'],
      ['7.5', '6.5', '40.5', '25.5'],
      ['8', '7', '41', '26'],
      ['8.5', '7.5', '42', '26.5'],
      ['9', '8', '42.5', '27'],
      ['9.5', '8.5', '43', '27.5'],
      ['10', '9', '44', '28'],
      ['10.5', '9.5', '44.5', '28.5'],
      ['11', '10', '45', '29'],
      ['11.5', '10.5', '45.5', '29.5'],
      ['12', '11', '46', '30'],
      ['13', '12', '47.5', '31'],
    ]
  },
  shoes: {
    title: 'Shoes Size Guide',
    headers: ['US', 'UK', 'EU', 'CM'],
    rows: [
      ['7', '6', '40', '25'],
      ['7.5', '6.5', '40.5', '25.5'],
      ['8', '7', '41', '26'],
      ['8.5', '7.5', '42', '26.5'],
      ['9', '8', '42.5', '27'],
      ['9.5', '8.5', '43', '27.5'],
      ['10', '9', '44', '28'],
      ['10.5', '9.5', '44.5', '28.5'],
      ['11', '10', '45', '29'],
      ['12', '11', '46', '30'],
    ]
  },
  apparel: {
    title: 'Apparel Size Guide',
    headers: ['Size', 'Chest (in)', 'Waist (in)', 'Length (in)'],
    rows: [
      ['XS', '34-36', '28-30', '26'],
      ['S', '36-38', '30-32', '27'],
      ['M', '38-40', '32-34', '28'],
      ['L', '40-42', '34-36', '29'],
      ['XL', '42-44', '36-38', '30'],
      ['XXL', '44-46', '38-40', '31'],
      ['XXXL', '46-48', '40-42', '32'],
    ]
  }
};
