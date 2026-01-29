import { useEffect, useMemo, useState } from 'react';
import { productService } from '../api/ProductApi';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { Search } from '../components/Search';
import { Filter } from '../components/Filter';
import { Sorting } from '../components/Sorting';
import { Pagination } from '../components/Pagination';

export const CatalogPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState<'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('price-asc');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 12;

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

    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts];

        switch (selectedSort) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }

        return sorted;
    }, [filteredProducts, selectedSort]);

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


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

                <Sorting selectedSort={selectedSort} onSortChange={setSelectedSort} />
            </div>

            <p>{filteredProducts.length} product(-s) shown out of {products.length}</p>

            {sortedProducts.length === 0 ? (
                <div>
                    <p>Products not found</p>
                </div>
            ) : (
                <>
                    <div>
                        {paginatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}
        </div>
    );
};
