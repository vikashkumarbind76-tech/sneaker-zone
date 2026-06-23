import snWhiteLow from '@/assets/p/sneaker-white-low.jpg';
import snBlackRunner from '@/assets/p/sneaker-black-runner.jpg';
import snRedHi from '@/assets/p/sneaker-red-hi.jpg';
import snSuedeBeige from '@/assets/p/sneaker-suede-beige.jpg';
import snNavyStripes from '@/assets/p/sneaker-navy-stripes.jpg';
import snGreyPerf from '@/assets/p/sneaker-grey-perf.jpg';
import snBlackLux from '@/assets/p/sneaker-black-lux.jpg';
import snOliveChunky from '@/assets/p/sneaker-olive-chunky.jpg';
import shBrownDerby from '@/assets/p/shoe-brown-derby.jpg';
import shTanLoafer from '@/assets/p/shoe-tan-loafer.jpg';
import shBootBrown from '@/assets/p/shoe-boot-brown.jpg';
import shBlackOxford from '@/assets/p/shoe-black-oxford.jpg';
import shGreySlipon from '@/assets/p/shoe-grey-slipon.jpg';
import apBlackTee from '@/assets/p/apparel-black-tee.jpg';
import apGreyHoodie from '@/assets/p/apparel-grey-hoodie.jpg';
import apBlueJeans from '@/assets/p/apparel-blue-jeans.jpg';
import apOliveShirt from '@/assets/p/apparel-olive-shirt.jpg';
import apNavyPolo from '@/assets/p/apparel-navy-polo.jpg';
import apBlackJoggers from '@/assets/p/apparel-black-joggers.jpg';
import apWhiteGraphic from '@/assets/p/apparel-white-graphic.jpg';

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

const sneakerSizes = ['6', '7', '8', '9', '10', '11', '12'];
const apparelSizes = ['S', 'M', 'L', 'XL', 'XXL'];
const jeansSizes = ['28', '30', '32', '34', '36', '38'];

export const products: Product[] = [
  // ============ NIKE (8) ============
  {
    id: 1, name: "Air Force 1 '07", brand: "Nike", price: 8295, image: snWhiteLow, category: 'sneakers', isNew: true, isFeatured: true,
    description: "An icon of basketball heritage, the Nike Air Force 1 '07 brings back the classic all-white low-top with premium leather and Nike Air cushioning.",
    details: ["Full-grain leather upper", "Nike Air cushioning in the heel", "Perforated toe for breathability", "Rubber cupsole with pivot circle", "Iconic AF1 silhouette"],
    sizes: sneakerSizes, colors: ["White", "Black", "Triple White"], material: "Leather, Rubber", sku: "SZ-NIKE-0001"
  },
  {
    id: 2, name: "Air Max SC", brand: "Nike", price: 5495, image: snGreyPerf, category: 'sneakers', isFeatured: true,
    description: "The Nike Air Max SC pairs classic sportswear style with visible Max Air cushioning for all-day comfort on Indian streets.",
    details: ["Leather and synthetic upper", "Visible Max Air heel unit", "Foam midsole for soft cushioning", "Rubber outsole with waffle pattern", "Padded collar and tongue"],
    sizes: sneakerSizes, colors: ["Grey/White", "Black", "Navy"], material: "Leather, Mesh, Rubber", sku: "SZ-NIKE-0002"
  },
  {
    id: 3, name: "Revolution 7 Running", brand: "Nike", price: 4795, image: snBlackRunner, category: 'sneakers',
    description: "A lightweight everyday running shoe designed for new runners and daily walks, with soft foam underfoot.",
    details: ["Engineered mesh upper", "Soft foam midsole", "Rubber outsole for traction", "Padded collar for ankle comfort", "Reflective heel details"],
    sizes: sneakerSizes, colors: ["Black", "Grey", "Navy"], material: "Mesh, Rubber", sku: "SZ-NIKE-0003"
  },
  {
    id: 4, name: "Court Vision Low", brand: "Nike", price: 5295, image: snWhiteLow, category: 'sneakers',
    description: "Inspired by '80s basketball, the Court Vision Low gives you classic court style with crisp white leather.",
    details: ["Leather upper", "Foam midsole", "Rubber cupsole", "Perforations for airflow", "Low-cut for mobility"],
    sizes: sneakerSizes, colors: ["White/Black", "All White"], material: "Leather, Rubber", sku: "SZ-NIKE-0004"
  },
  {
    id: 5, name: "Dunk High Retro", brand: "Nike", price: 9795, image: snRedHi, category: 'sneakers', isNew: true,
    description: "The Nike Dunk High Retro returns with bold color blocking and a padded high-top collar for a true throwback feel.",
    details: ["Leather upper with overlays", "Padded high-top collar", "Foam midsole", "Rubber outsole with pivot circle", "Heritage Dunk silhouette"],
    sizes: sneakerSizes, colors: ["University Red/White", "Black/White"], material: "Leather, Rubber", sku: "SZ-NIKE-0005"
  },
  {
    id: 6, name: "Pegasus 40", brand: "Nike", price: 11295, image: snGreyPerf, category: 'sneakers', isFeatured: true,
    description: "The trusty Nike Pegasus 40 delivers responsive React foam and Zoom Air units for confident daily miles.",
    details: ["Engineered mesh upper", "React foam midsole", "Forefoot and heel Zoom Air units", "Waffle rubber outsole", "Midfoot band for lockdown"],
    sizes: sneakerSizes, colors: ["Grey/Volt", "Black/White"], material: "Mesh, Foam, Rubber", sku: "SZ-NIKE-0006"
  },
  {
    id: 7, name: "Sportswear Club Fleece Hoodie", brand: "Nike", price: 3495, image: apGreyHoodie, category: 'apparel',
    description: "A soft brushed-fleece pullover hoodie with the classic embroidered Swoosh. Perfect for chilly mornings.",
    details: ["80% cotton / 20% polyester fleece", "Brushed interior for warmth", "Kangaroo pocket", "Ribbed cuffs and hem", "Embroidered Nike Swoosh"],
    sizes: apparelSizes, colors: ["Grey", "Black", "Navy"], material: "Cotton, Polyester", sku: "SZ-NIKE-0007"
  },
  {
    id: 8, name: "Dri-FIT Training Tee", brand: "Nike", price: 1495, image: apBlackTee, category: 'apparel',
    description: "Sweat-wicking Dri-FIT fabric keeps you dry through tough workouts and weekend runs.",
    details: ["Nike Dri-FIT moisture-wicking fabric", "Standard fit", "Crew neck", "Printed Swoosh on chest", "Lightweight feel"],
    sizes: apparelSizes, colors: ["Black", "White", "Navy"], material: "100% Polyester", sku: "SZ-NIKE-0008"
  },

  // ============ ADIDAS (8) ============
  {
    id: 9, name: "Superstar", brand: "Adidas", price: 8999, image: snWhiteLow, category: 'sneakers', isFeatured: true,
    description: "The legendary adidas Superstar with its iconic rubber shell toe and 3-Stripes — a true streetwear classic.",
    details: ["Leather upper", "Signature rubber shell toe", "Serrated 3-Stripes", "Herringbone-pattern rubber cupsole", "Heritage Trefoil logo"],
    sizes: sneakerSizes, colors: ["White/Black", "All White"], material: "Leather, Rubber", sku: "SZ-ADID-0009"
  },
  {
    id: 10, name: "Stan Smith", brand: "Adidas", price: 7999, image: snWhiteLow, category: 'sneakers', isNew: true,
    description: "Clean, minimalist tennis style. The adidas Stan Smith remains a timeless wardrobe staple.",
    details: ["Primegreen recycled upper", "Perforated 3-Stripes", "Heel patch with Stan Smith signature", "Rubber cupsole", "Vegan-friendly construction"],
    sizes: sneakerSizes, colors: ["White/Green", "White/Navy"], material: "Recycled Synthetic, Rubber", sku: "SZ-ADID-0010"
  },
  {
    id: 11, name: "Ultraboost Light", brand: "Adidas", price: 17999, image: snGreyPerf, category: 'sneakers', isFeatured: true,
    description: "The lightest Ultraboost ever, with new BOOST Light foam for incredible energy return on every stride.",
    details: ["Primeknit+ adaptive upper", "BOOST Light midsole", "Linear Energy Push system", "Stretchweb outsole with Continental rubber", "Heel counter for support"],
    sizes: sneakerSizes, colors: ["Grey/Black", "Core Black"], material: "Primeknit, Rubber", sku: "SZ-ADID-0011"
  },
  {
    id: 12, name: "Galaxy 6 Running", brand: "Adidas", price: 3999, image: snBlackRunner, category: 'sneakers',
    description: "An everyday running shoe with cushioned comfort built for beginners and daily training.",
    details: ["Lightweight mesh upper", "Cloudfoam midsole", "Adiwear rubber outsole", "EVA sockliner", "Classic 3-Stripes branding"],
    sizes: sneakerSizes, colors: ["Black", "Grey", "Navy"], material: "Mesh, Rubber", sku: "SZ-ADID-0012"
  },
  {
    id: 13, name: "Samba OG", brand: "Adidas", price: 10999, image: snNavyStripes, category: 'sneakers', isNew: true, isFeatured: true,
    description: "The legendary indoor football shoe turned street icon. Premium leather, gum sole, and timeless silhouette.",
    details: ["Full-grain leather upper", "Suede T-toe overlay", "Iconic gum rubber outsole", "Classic 3-Stripes", "Padded tongue"],
    sizes: sneakerSizes, colors: ["Black/White Gum", "White/Navy Gum"], material: "Leather, Suede, Rubber", sku: "SZ-ADID-0013"
  },
  {
    id: 14, name: "Forum Low", brand: "Adidas", price: 8499, image: snRedHi, category: 'sneakers',
    description: "An '80s basketball classic with an unmistakable ankle strap and premium build.",
    details: ["Leather upper", "Adjustable ankle strap", "Foam midsole", "Rubber cupsole", "Heritage Trefoil branding"],
    sizes: sneakerSizes, colors: ["White/Red", "White/Black"], material: "Leather, Rubber", sku: "SZ-ADID-0014"
  },
  {
    id: 15, name: "3-Stripes Track Pants", brand: "Adidas", price: 2999, image: apBlackJoggers, category: 'apparel',
    description: "The iconic adidas 3-Stripes track pants — comfortable tricot fabric with a tapered, modern fit.",
    details: ["Tricot polyester fabric", "Side 3-Stripes", "Elastic waist with drawcord", "Tapered leg", "Side hand pockets"],
    sizes: apparelSizes, colors: ["Black", "Navy"], material: "100% Polyester Tricot", sku: "SZ-ADID-0015"
  },
  {
    id: 16, name: "Essentials 3-Stripes Tee", brand: "Adidas", price: 1399, image: apBlackTee, category: 'apparel',
    description: "Soft cotton tee with the signature adidas 3-Stripes across the chest. A wardrobe essential.",
    details: ["100% cotton single jersey", "Regular fit", "Ribbed crew neck", "3-Stripes across chest", "Embroidered Trefoil"],
    sizes: apparelSizes, colors: ["Black", "White", "Navy"], material: "100% Cotton", sku: "SZ-ADID-0016"
  },

  // ============ PUMA (8) ============
  {
    id: 17, name: "Suede Classic XXI", brand: "Puma", price: 5499, image: snSuedeBeige, category: 'sneakers', isFeatured: true,
    description: "The legendary PUMA Suede — 50+ years of street style in a premium suede upper.",
    details: ["Premium suede upper", "Foam midsole", "Iconic PUMA Formstrip", "Rubber outsole", "Padded collar"],
    sizes: sneakerSizes, colors: ["Sand/White", "Black/White", "Navy/White"], material: "Suede, Rubber", sku: "SZ-PUMA-0017"
  },
  {
    id: 18, name: "Smash 3.0 L", brand: "Puma", price: 3999, image: snWhiteLow, category: 'sneakers',
    description: "A clean, court-inspired sneaker with leather upper and timeless PUMA styling.",
    details: ["Leather upper", "PUMA Formstrip overlay", "Soft foam sockliner", "Rubber outsole", "Low-profile silhouette"],
    sizes: sneakerSizes, colors: ["White/Navy", "White/Black"], material: "Leather, Rubber", sku: "SZ-PUMA-0018"
  },
  {
    id: 19, name: "RS-X Reinvention", brand: "Puma", price: 8999, image: snOliveChunky, category: 'sneakers', isNew: true,
    description: "Chunky, futuristic, and bold. The RS-X dials up volume with Running System cushioning.",
    details: ["Mesh and synthetic upper", "RS cushioning technology", "Chunky rubber outsole", "Bold color blocking", "Reinforced heel"],
    sizes: sneakerSizes, colors: ["Olive/Multi", "Black/Multi"], material: "Mesh, Synthetic, Rubber", sku: "SZ-PUMA-0019"
  },
  {
    id: 20, name: "Softride Enzo Evo", brand: "Puma", price: 5499, image: snBlackRunner, category: 'sneakers',
    description: "Built for daily running with SOFTRIDE cushioning that adapts to every step.",
    details: ["Engineered mesh upper", "SOFTRIDE foam midsole", "Rubber outsole", "Heel pull tab", "Lightweight design"],
    sizes: sneakerSizes, colors: ["Black", "Grey/Red"], material: "Mesh, Foam, Rubber", sku: "SZ-PUMA-0020"
  },
  {
    id: 21, name: "Cali Star", brand: "Puma", price: 6999, image: snWhiteLow, category: 'sneakers',
    description: "California court style updated with chunky tooling and premium leather panels.",
    details: ["Leather upper with star overlay", "Stacked rubber cupsole", "Foam sockliner", "Padded tongue and collar", "Bold PUMA branding"],
    sizes: sneakerSizes, colors: ["White/Pink", "White/Black"], material: "Leather, Rubber", sku: "SZ-PUMA-0021"
  },
  {
    id: 22, name: "Essentials Logo Hoodie", brand: "Puma", price: 2799, image: apGreyHoodie, category: 'apparel',
    description: "A cozy fleece hoodie with the classic PUMA No. 1 Logo printed on the chest.",
    details: ["Cotton-rich fleece", "Drawcord-adjustable hood", "Kangaroo pocket", "Ribbed cuffs and hem", "Printed PUMA logo"],
    sizes: apparelSizes, colors: ["Grey", "Black", "Navy"], material: "Cotton/Polyester Fleece", sku: "SZ-PUMA-0022"
  },
  {
    id: 23, name: "Active Polo T-shirt", brand: "Puma", price: 1499, image: apNavyPolo, category: 'apparel',
    description: "A breathable dryCELL polo for sport, golf, or casual weekend wear.",
    details: ["dryCELL moisture-wicking fabric", "Self-fabric collar", "Two-button placket", "Embroidered PUMA Cat logo", "Regular fit"],
    sizes: apparelSizes, colors: ["Navy", "White", "Black"], material: "100% Polyester", sku: "SZ-PUMA-0023"
  },
  {
    id: 24, name: "Train Favourite Joggers", brand: "Puma", price: 2299, image: apBlackJoggers, category: 'apparel',
    description: "Slim-fit training joggers with dryCELL technology and a tapered, modern silhouette.",
    details: ["dryCELL polyester fabric", "Elastic waist with drawcord", "Side hand pockets", "Tapered, slim fit", "PUMA Cat logo"],
    sizes: apparelSizes, colors: ["Black", "Grey"], material: "Polyester/Elastane", sku: "SZ-PUMA-0024"
  },

  // ============ RED TAPE (8) ============
  {
    id: 25, name: "RTE0145 Walking Sneakers", brand: "Red Tape", price: 1799, image: snWhiteLow, category: 'sneakers', isFeatured: true,
    description: "Red Tape's bestselling walking sneakers with shock-absorbing soles for all-day Indian city comfort.",
    details: ["Soft synthetic upper", "Cushioned EVA midsole", "Shock-absorbing sole", "Lace-up closure", "Lightweight build"],
    sizes: sneakerSizes, colors: ["White", "Black", "Navy"], material: "Synthetic, EVA, Rubber", sku: "SZ-REDT-0025"
  },
  {
    id: 26, name: "RTE2014 Casual Sneakers", brand: "Red Tape", price: 1999, image: snBlackRunner, category: 'sneakers',
    description: "Sporty casual sneakers built for everyday wear, with breathable mesh and a flexible sole.",
    details: ["Breathable mesh upper", "Memory-tech footbed", "Anti-slip outsole", "Padded collar", "Slip-resistant grip"],
    sizes: sneakerSizes, colors: ["Black/White", "Grey"], material: "Mesh, Rubber", sku: "SZ-REDT-0026"
  },
  {
    id: 27, name: "Tan Leather Derby", brand: "Red Tape", price: 2499, image: shBrownDerby, category: 'shoes', isNew: true,
    description: "Handcrafted genuine leather derby — formal yet versatile, perfect for office and evenings.",
    details: ["Genuine leather upper", "Cushioned insole", "TPR outsole", "4-eyelet derby lacing", "Hand-finished detailing"],
    sizes: sneakerSizes, colors: ["Tan", "Brown", "Black"], material: "Genuine Leather, TPR", sku: "SZ-REDT-0027"
  },
  {
    id: 28, name: "Black Formal Oxford", brand: "Red Tape", price: 2799, image: shBlackOxford, category: 'shoes', isFeatured: true,
    description: "Classic closed-lace oxford in polished black leather — a non-negotiable formal essential.",
    details: ["Premium leather upper", "Closed-lace oxford construction", "Memory cushion footbed", "Slip-resistant outsole", "Polished finish"],
    sizes: sneakerSizes, colors: ["Black", "Brown"], material: "Leather, TPR", sku: "SZ-REDT-0028"
  },
  {
    id: 29, name: "Tan Slip-on Loafers", brand: "Red Tape", price: 2299, image: shTanLoafer, category: 'shoes',
    description: "Smart leather loafers that work just as well with chinos as with denim.",
    details: ["Genuine leather upper", "Apron-toe styling", "Soft padded footbed", "Slip-on construction", "Durable TPR sole"],
    sizes: sneakerSizes, colors: ["Tan", "Brown"], material: "Leather, TPR", sku: "SZ-REDT-0029"
  },
  {
    id: 30, name: "Brown Leather Chukka Boot", brand: "Red Tape", price: 3299, image: shBootBrown, category: 'shoes', isNew: true,
    description: "Rugged chukka boots in rich brown leather — built for travel and casual wear.",
    details: ["Full-grain leather upper", "Padded ankle collar", "3-eyelet lace closure", "Rugged rubber sole", "Reinforced stitching"],
    sizes: sneakerSizes, colors: ["Brown", "Tan", "Black"], material: "Leather, Rubber", sku: "SZ-REDT-0030"
  },
  {
    id: 31, name: "Slim Fit Dark Wash Jeans", brand: "Red Tape", price: 1599, image: apBlueJeans, category: 'apparel',
    description: "Slim-fit stretchable jeans in a versatile dark wash — easy to dress up or down.",
    details: ["98% cotton / 2% elastane denim", "Slim fit", "5-pocket styling", "Mid rise", "Stretch comfort"],
    sizes: jeansSizes, colors: ["Dark Blue", "Black", "Mid Blue"], material: "Cotton/Elastane Denim", sku: "SZ-REDT-0031"
  },
  {
    id: 32, name: "Olive Casual Shirt", brand: "Red Tape", price: 1299, image: apOliveShirt, category: 'apparel',
    description: "A relaxed-fit cotton casual shirt in earthy olive — perfect for weekends.",
    details: ["100% cotton weave", "Regular fit", "Spread collar", "Button-down front", "Chest pocket"],
    sizes: apparelSizes, colors: ["Olive", "Beige", "White"], material: "100% Cotton", sku: "SZ-REDT-0032"
  },

  // ============ SKECHERS (7) ============
  {
    id: 33, name: "Go Walk 6", brand: "Skechers", price: 5499, image: snGreyPerf, category: 'sneakers', isFeatured: true,
    description: "Skechers Go Walk 6 with Hyper Burst cushioning — engineered for ultimate walking comfort.",
    details: ["Engineered mesh upper", "Hyper Burst ultra-light cushioning", "Air-Cooled Goga Mat insole", "Slip-on with bungee laces", "High-rebound outsole"],
    sizes: sneakerSizes, colors: ["Grey", "Black", "Navy"], material: "Mesh, Foam, Rubber", sku: "SZ-SKEC-0033"
  },
  {
    id: 34, name: "D'Lites 1.0", brand: "Skechers", price: 6499, image: snWhiteLow, category: 'sneakers',
    description: "The cult-favourite chunky dad sneaker with stitched overlays and Memory Foam comfort.",
    details: ["Leather and mesh upper", "Stitched overlay design", "Air-Cooled Memory Foam insole", "Shock-absorbing midsole", "Chunky rubber outsole"],
    sizes: sneakerSizes, colors: ["White/Navy", "All White", "Black"], material: "Leather, Mesh, Rubber", sku: "SZ-SKEC-0034"
  },
  {
    id: 35, name: "Arch Fit Slip-on", brand: "Skechers", price: 6999, image: shGreySlipon, category: 'shoes', isNew: true,
    description: "Slip-on comfort shoes with podiatrist-certified Arch Fit insole — perfect for all-day standing.",
    details: ["Knit mesh upper", "Arch Fit removable insole", "Slip-on construction", "Air-Cooled comfort", "Flexible rubber outsole"],
    sizes: sneakerSizes, colors: ["Grey", "Black", "Navy"], material: "Knit Mesh, Rubber", sku: "SZ-SKEC-0035"
  },
  {
    id: 36, name: "Max Cushioning Elite", brand: "Skechers", price: 8999, image: snBlackRunner, category: 'sneakers',
    description: "Maximum stack-height cushioning for long runs and walks with incredible energy return.",
    details: ["Engineered mesh upper", "ULTRA GO max cushioning", "Goga Mat insole", "Stability heel cradle", "Durable rubber outsole"],
    sizes: sneakerSizes, colors: ["Black/White", "Grey"], material: "Mesh, Foam, Rubber", sku: "SZ-SKEC-0036"
  },
  {
    id: 37, name: "Track Scloric Sneaker", brand: "Skechers", price: 4999, image: snNavyStripes, category: 'sneakers',
    description: "Retro-inspired runner with stripes and Memory Foam comfort for daily wear.",
    details: ["Synthetic and mesh upper", "Air-Cooled Memory Foam", "Shock-absorbing midsole", "Lace-up closure", "Flex grooves outsole"],
    sizes: sneakerSizes, colors: ["Navy/White", "Black/Red"], material: "Synthetic, Mesh", sku: "SZ-SKEC-0037"
  },
  {
    id: 38, name: "Status 2.0 Casual", brand: "Skechers", price: 5999, image: shBrownDerby, category: 'shoes',
    description: "Smart casual leather lace-up with Memory Foam — bridges office and evening.",
    details: ["Premium leather upper", "Lace-up plain-toe design", "Air-Cooled Memory Foam", "Shock-absorbing midsole", "Slip-resistant outsole"],
    sizes: sneakerSizes, colors: ["Brown", "Black", "Tan"], material: "Leather, Rubber", sku: "SZ-SKEC-0038"
  },
  {
    id: 39, name: "Performance Polo Tee", brand: "Skechers", price: 1799, image: apNavyPolo, category: 'apparel',
    description: "Athletic polo with sweat-wicking fabric and four-way stretch for active days.",
    details: ["Polyester/spandex blend", "Four-way stretch", "Moisture-wicking finish", "Ribbed self collar", "Embroidered logo"],
    sizes: apparelSizes, colors: ["Navy", "Black", "White"], material: "Polyester/Spandex", sku: "SZ-SKEC-0039"
  },

  // ============ SPARX (6) ============
  {
    id: 40, name: "SM-414 Running Shoes", brand: "Sparx", price: 1299, image: snBlackRunner, category: 'sneakers', isFeatured: true,
    description: "Affordable, durable running shoes from India's favourite homegrown sports brand.",
    details: ["Mesh upper for breathability", "Phylon midsole", "Lightweight TPR outsole", "Lace-up closure", "Padded tongue and collar"],
    sizes: sneakerSizes, colors: ["Black/Red", "Grey/Green", "Navy/Orange"], material: "Mesh, TPR", sku: "SZ-SPRX-0040"
  },
  {
    id: 41, name: "SM-323 Casual Sneakers", brand: "Sparx", price: 999, image: snWhiteLow, category: 'sneakers',
    description: "Everyday casual sneakers — light on the pocket and built for daily Indian wear.",
    details: ["Synthetic upper", "Cushioned insole", "Anti-skid TPR outsole", "Lace-up closure", "Lightweight construction"],
    sizes: sneakerSizes, colors: ["White", "Black", "Navy"], material: "Synthetic, TPR", sku: "SZ-SPRX-0041"
  },
  {
    id: 42, name: "SX-0125 Walking Shoes", brand: "Sparx", price: 1499, image: snGreyPerf, category: 'sneakers',
    description: "Performance walking shoes with shock-absorbing soles for everyday fitness walks.",
    details: ["Engineered mesh upper", "EVA cushioned midsole", "Memory-tech insole", "Lace closure", "Durable rubber outsole"],
    sizes: sneakerSizes, colors: ["Grey", "Black", "Blue"], material: "Mesh, EVA, Rubber", sku: "SZ-SPRX-0042"
  },
  {
    id: 43, name: "SD-0306 Floater Sandals", brand: "Sparx", price: 699, image: shGreySlipon, category: 'shoes',
    description: "Lightweight floater sandals with adjustable straps — built for monsoon-friendly Indian wear.",
    details: ["PU upper straps", "EVA cushioned footbed", "Hook-and-loop adjustability", "Anti-slip outsole", "Water-friendly construction"],
    sizes: sneakerSizes, colors: ["Black", "Grey", "Brown"], material: "PU, EVA", sku: "SZ-SPRX-0043"
  },
  {
    id: 44, name: "SC-0461 Sport Slip-on", brand: "Sparx", price: 1199, image: shGreySlipon, category: 'shoes', isNew: true,
    description: "Easy slip-on sport shoes for gym, walks, and casual outings.",
    details: ["Stretch knit upper", "Slip-on construction", "Cushioned insole", "Flexible TPR sole", "Pull-tab heel"],
    sizes: sneakerSizes, colors: ["Grey/Black", "Navy/White"], material: "Knit, TPR", sku: "SZ-SPRX-0044"
  },
  {
    id: 45, name: "SX-0517 Trail Sneakers", brand: "Sparx", price: 1699, image: snOliveChunky, category: 'sneakers',
    description: "Rugged trail-style sneakers with chunky grip for outdoor adventures.",
    details: ["Synthetic and mesh upper", "Reinforced toe", "Aggressive lugged outsole", "Padded ankle collar", "Cushioned insole"],
    sizes: sneakerSizes, colors: ["Olive/Black", "Grey/Orange"], material: "Synthetic, Mesh, Rubber", sku: "SZ-SPRX-0045"
  },

  // ============ EXTRAS (5) — premium picks ============
  {
    id: 46, name: "Jordan 1 Mid", brand: "Nike", price: 12995, image: snRedHi, category: 'sneakers', isNew: true, isFeatured: true,
    description: "Inspired by the original AJ1, the Jordan 1 Mid offers iconic basketball style with Air-Sole cushioning.",
    details: ["Leather and synthetic upper", "Encapsulated Air-Sole unit", "Solid rubber outsole", "Padded mid-top collar", "Wings logo on collar"],
    sizes: sneakerSizes, colors: ["Chicago Red/Black", "White/Black"], material: "Leather, Rubber", sku: "SZ-NIKE-0046"
  },
  {
    id: 47, name: "Gazelle Indoor", brand: "Adidas", price: 11499, image: snNavyStripes, category: 'sneakers', isFeatured: true,
    description: "A futsal-inspired terrace classic. Premium suede, gum sole, and bold colorways.",
    details: ["Premium suede upper", "Leather T-toe overlay", "Gum rubber outsole", "Iconic 3-Stripes", "Padded tongue and collar"],
    sizes: sneakerSizes, colors: ["Navy/White", "Maroon/White"], material: "Suede, Leather, Rubber", sku: "SZ-ADID-0047"
  },
  {
    id: 48, name: "Mayze Stack Luxe", brand: "Puma", price: 8499, image: snBlackLux, category: 'sneakers',
    description: "A stacked-sole statement sneaker in luxe leather — high-fashion meets PUMA heritage.",
    details: ["Premium leather upper", "Stacked rubber platform", "Foam comfort sockliner", "Iconic PUMA Formstrip", "Bold branding"],
    sizes: sneakerSizes, colors: ["Black/Gold", "White/Black"], material: "Leather, Rubber", sku: "SZ-PUMA-0048"
  },
  {
    id: 49, name: "Graphic Print Oversized Tee", brand: "Puma", price: 1899, image: apWhiteGraphic, category: 'apparel', isNew: true,
    description: "An oversized cotton tee with bold front graphic — a streetwear statement.",
    details: ["Heavyweight cotton jersey", "Oversized drop-shoulder fit", "Front graphic print", "Ribbed crew neck", "Curved hem"],
    sizes: apparelSizes, colors: ["White", "Black"], material: "100% Cotton", sku: "SZ-PUMA-0049"
  },
  {
    id: 50, name: "Slim Tapered Indigo Jeans", brand: "Adidas", price: 2499, image: apBlueJeans, category: 'apparel',
    description: "Slim-tapered indigo jeans with stretch — a versatile staple for everyday styling.",
    details: ["Stretch cotton denim", "Slim tapered fit", "Mid rise", "5-pocket construction", "Branded leather patch"],
    sizes: jeansSizes, colors: ["Indigo", "Black"], material: "Cotton/Elastane", sku: "SZ-ADID-0050"
  },
];

export const featuredProducts = products.filter(p => p.isFeatured);

export const getProductById = (id: number): Product | undefined =>
  products.find(p => p.id === id);

export const sizeCharts: Record<Product['category'], { title: string; headers: string[]; rows: string[][] }> = {
  sneakers: {
    title: 'Footwear Size Chart (Indian / UK)',
    headers: ['IND/UK', 'US', 'EU', 'CM'],
    rows: [
      ['6', '7', '40', '25.0'],
      ['7', '8', '41', '25.7'],
      ['8', '9', '42', '26.5'],
      ['9', '10', '43', '27.3'],
      ['10', '11', '44', '28.0'],
      ['11', '12', '45', '28.8'],
      ['12', '13', '46', '29.5'],
    ],
  },
  shoes: {
    title: 'Footwear Size Chart (Indian / UK)',
    headers: ['IND/UK', 'US', 'EU', 'CM'],
    rows: [
      ['6', '7', '40', '25.0'],
      ['7', '8', '41', '25.7'],
      ['8', '9', '42', '26.5'],
      ['9', '10', '43', '27.3'],
      ['10', '11', '44', '28.0'],
      ['11', '12', '45', '28.8'],
      ['12', '13', '46', '29.5'],
    ],
  },
  apparel: {
    title: 'Apparel Size Chart',
    headers: ['Size', 'Measurement (cm)'],
    rows: [
      ['S', 'Chest 91-96'],
      ['M', 'Chest 97-102'],
      ['L', 'Chest 103-108'],
      ['XL', 'Chest 109-114'],
      ['XXL', 'Chest 115-120'],
      ['28', 'Waist 71'],
      ['30', 'Waist 76'],
      ['32', 'Waist 81'],
      ['34', 'Waist 86'],
      ['36', 'Waist 91'],
      ['38', 'Waist 96'],
    ],
  },
};

