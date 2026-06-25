import { X, Minus, Plus, ShoppingBag, Trash2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';
import ImageUnavailable from '@/components/ImageUnavailable';
import ProductImage from '@/components/ProductImage';


interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, removeFromCart, updateQuantity, updateSize, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { data: products = [] } = useProducts();
  const navigate = useNavigate();

  const missingSizes = items.some(i => !i.size);

  const handleCheckout = () => {
    if (missingSizes) {
      toast.error('Please select a size for every item');
      return;
    }
    if (!user) {
      toast.error('Please sign in to checkout');
      onClose();
      navigate('/auth');
      return;
    }
    toast.success('Proceeding to checkout...');
  };


  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-charcoal/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 shadow-soft-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="font-display text-2xl">YOUR CART</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/60 mb-4" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Add some items to get started
                </p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => {
                  const product = products.find(p => p.id === item.id);
                  const productImage = product?.images[0];
                  const sizes = product?.sizes ?? [];
                  const lineKey = `${item.id}|${item.size ?? ''}`;

                  return (
                    <div
                      key={lineKey}
                      className="flex gap-4 p-4 bg-secondary/50 rounded-lg"
                    >
                      {productImage ? (
                        <ProductImage
                          src={productImage.url}
                          alt={productImage.alt}
                          className="w-20 h-20 object-cover rounded-lg"
                          fallbackClassName="h-20 w-20 rounded-lg text-xs"
                        />
                      ) : (
                        <ImageUnavailable className="h-20 w-20 rounded-lg text-xs" />
                      )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-1 truncate">{item.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize mb-2">
                        {item.category}
                      </p>
                      <div className="mb-2">
                        <Select
                          value={item.size ?? ''}
                          onValueChange={(value) => updateSize(item.id, item.size, value)}
                        >
                          <SelectTrigger
                            aria-label="Select size"
                            className={`h-8 text-xs w-32 ${!item.size ? 'border-destructive text-destructive' : ''}`}
                          >
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {sizes.length === 0 ? (
                              <SelectItem value="One Size">One Size</SelectItem>
                            ) : (
                              sizes.map(s => (
                                <SelectItem key={s} value={s}>UK {s}</SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        {!item.size && (
                          <p className="mt-1 flex items-center gap-1 text-[10px] text-destructive">
                            <AlertCircle className="w-3 h-3" /> Pick a size to checkout
                          </p>
                        )}
                      </div>
                      <p className="font-medium">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Remove item"
                        onClick={() => removeFromCart(item.id, item.size)}
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  );
                })}

              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl">₹{totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              {missingSizes && (
                <p className="flex items-center gap-2 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3" /> Select a size for every item to continue
                </p>
              )}
              <Button
                variant="accent"
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={missingSizes}
              >
                {user ? 'Checkout' : 'Sign in to Checkout'}
              </Button>

              <Button 
                variant="ghost" 
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
