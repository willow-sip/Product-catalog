import { useEffect, useState } from 'react';
import { productService } from '../ProductApi';
import { Product } from '../types/product';

export const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products catalog</h1>
      
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.title}/>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
};
