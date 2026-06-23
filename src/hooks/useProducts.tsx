import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Product,
  ProductImage,
  products as localProducts,
  validateProductImages,
} from '@/data/products';

type ProductRow = {
  id: number;
  name: string;
  slug: string;
  brand: string;
  price: number;
  category: string;
  is_new: boolean;
  is_featured: boolean;
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  material: string | null;
  sku: string;
};

type ProductImageRow = {
  product_id: number;
  url: string;
  alt: string;
  sort_order: number;
};

const mapProductRow = (row: ProductRow, images: ProductImage[] = []): Product => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  brand: row.brand,
  price: row.price,
  category: row.category as Product['category'],
  isNew: row.is_new,
  isFeatured: row.is_featured,
  description: row.description,
  details: row.details ?? [],
  sizes: row.sizes ?? [],
  colors: row.colors ?? [],
  material: row.material ?? undefined,
  sku: row.sku,
  images: validateProductImages(
    {
      id: row.id,
      name: row.name,
      sku: row.sku,
    },
    images
  ),
});

const fetchProducts = async (): Promise<Product[]> => {
  const { data: productRows, error: productError } = await supabase
    .from('products')
    .select('id,name,slug,brand,price,category,is_new,is_featured,description,details,sizes,colors,material,sku')
    .order('id', { ascending: true });

  if (productError) {
    console.warn('[product-image-validation] Unable to load backend products; using product metadata with empty image arrays', productError);
    return localProducts.map(product => ({ ...product, images: [] }));
  }

  if (!productRows?.length) {
    return localProducts.map(product => ({ ...product, images: [] }));
  }

  const productIds = productRows.map(product => product.id);
  const { data: imageRows, error: imageError } = await supabase
    .from('product_images')
    .select('product_id,url,alt,sort_order')
    .in('product_id', productIds)
    .order('sort_order', { ascending: true });

  if (imageError) {
    console.warn('[product-image-validation] Unable to load product images; rendering unavailable states only', imageError);
  }

  const imagesByProductId = new Map<number, ProductImage[]>();

  (imageRows ?? []).forEach((image: ProductImageRow) => {
    const productImages = imagesByProductId.get(image.product_id) ?? [];
    productImages.push({
      productId: image.product_id,
      url: image.url,
      alt: image.alt,
    });
    imagesByProductId.set(image.product_id, productImages);
  });

  return productRows.map((product: ProductRow) => mapProductRow(product, imagesByProductId.get(product.id) ?? []));
};

export const useProducts = () =>
  useQuery({
    queryKey: ['products-with-images'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

export const useProduct = (idOrSlug?: string) => {
  const productsQuery = useProducts();

  const product = useMemo(() => {
    if (!idOrSlug) return undefined;

    const numericId = Number(idOrSlug);
    if (Number.isFinite(numericId)) {
      return productsQuery.data?.find(item => item.id === numericId);
    }

    return productsQuery.data?.find(item => item.slug === idOrSlug);
  }, [idOrSlug, productsQuery.data]);

  return {
    ...productsQuery,
    product,
  };
};