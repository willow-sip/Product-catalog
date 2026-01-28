import { CartItem as CartItemType } from '../types/product';
import { useCartStore } from '../store/сartStore';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const updateNumber = useCartStore((state) => state.updateNumber);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div>
      <img src={item.image} alt={item.title}/>
      <div>
        <h3>{item.title}</h3>
        <p>{item.category}</p>
      </div>
      
      <div>
        <div>
            <button
                onClick={() => updateNumber(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
            >
            -
            </button>
            <span>{item.quantity}</span>
            <button
                onClick={() => updateNumber(item.id, item.quantity + 1)}
            >
            +
            </button>
        </div>
        
        <div>
          <p>{(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => removeItem(item.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};
