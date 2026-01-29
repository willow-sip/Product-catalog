import { useEffect, useMemo, useState } from 'react';
import { productService } from '../api/ProductApi';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { Search } from '../components/Search';
import { Filter } from '../components/Filter';

export const CatalogPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
                const categoriesData = await productService.getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(product =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        return filtered;
    }, [products, searchQuery, selectedCategory]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Products catalog</h1>

            <div>
                <Search onSearch={setSearchQuery} />
            </div>

            <div className="mb-6">
                <Filter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </div>

            <p>{filteredProducts.length} product(-s) shown out of {products.length}</p>

            {filteredProducts.length === 0 ? (
                <div>
                    <p>Products not found</p>
                </div>
            ) : (
                <div>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};
