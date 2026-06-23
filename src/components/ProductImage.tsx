import { useEffect, useState } from 'react';
import ImageUnavailable from '@/components/ImageUnavailable';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  loading?: 'eager' | 'lazy';
}

const ProductImage = ({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  loading = 'lazy',
}: ProductImageProps) => {
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    setHasLoadError(false);
  }, [src]);

  if (!src || hasLoadError) {
    return <ImageUnavailable className={fallbackClassName} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => {
        console.warn('[product-image-validation] Image URL failed to load', { src, alt });
        setHasLoadError(true);
      }}
      className={className}
    />
  );
};

export default ProductImage;