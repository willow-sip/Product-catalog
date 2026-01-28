import { useCartStore } from '../store/сartStore';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    alert(`${product.title} was added to cart!`);
  };
  return (
    <div>
      <img src={product.image} alt={product.title}/>
      <div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div>
          <span>{product.price} $</span>
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};