interface ImageUnavailableProps {
  label?: string;
  className?: string;
}

const ImageUnavailable = ({ label = 'Image unavailable', className = '' }: ImageUnavailableProps) => (
  <div
    className={`flex h-full w-full items-center justify-center bg-secondary text-center text-sm font-medium text-muted-foreground ${className}`}
    role="img"
    aria-label={label}
  >
    {label}
  </div>
);

export default ImageUnavailable;