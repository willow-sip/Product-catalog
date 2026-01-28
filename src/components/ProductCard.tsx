import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div>
      <img src={product.image} alt={product.title}/>
      <div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div>
          <span>{product.price} $</span>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};