import { Link } from 'react-router-dom';
import { useCartStore } from '../store/сartStore';
import { CartItem } from '../components/CartItem';

export const CartPage = () => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();

  const handleCheckout = () => {
    alert('Order created! Thanks.');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div>
        <div>
          <h2>Your cart is empty.</h2>
          <p>Add products to start shopping!</p>
          <Link to="/">To catalog</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>
      <div>
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <button onClick={clearCart}>Clear cart</button>
        </div>
        
        <div>
          <div>
            <h2>Total</h2>
            
            <div>
              <div>
                <span>Products: </span>
                <span>{getTotalItems()}</span>
              </div>
              
              <div>
                <span>Payment:</span>
                <span>{getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <button onClick={handleCheckout}>Create order</button>
          </div>
        </div>
      </div>
    </div>
  );
};