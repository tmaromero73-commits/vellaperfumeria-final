
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const categories = [
    { key: 'all', name: 'Todos los productos' },
    { key: 'skincare', name: 'Cuidado Facial' },
    { key: 'makeup', name: 'Maquillaje' },
    { key: 'perfume', name: 'Fragancias' },
    { key: 'wellness', name: 'Wellness' },
    { key: 'hair', name: 'Cuidado del Cabello' },
    { key: 'personal-care', name: 'Cuidado Personal' },
    { key: 'men', name: 'Hombre' },
    { key: 'accessories', name: 'Accesorios' },
];

const ITEMS_PER_PAGE = 12;

const ShopPage: React.FC<{
    currency: Currency;
    initialCategory: string;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, initialCategory, onAddToCart, onQuickAddToCart, onBuyNow, onProductSelect, onQuickView }) => {
    
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [sortOrder, setSortOrder] = useState('menu_order');
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);

    // Reset page to 1 when category or sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, sortOrder]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = activeCategory === 'all'
            ? [...allProducts]
            : allProducts.filter(p => p.category === activeCategory);

        switch (sortOrder) {
            case 'popularity':
                filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'price':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'menu_order':
            default:
                break;
        }
        return filtered;
    }, [activeCategory, sortOrder]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    // Pagination Logic
    const totalItems = filteredAndSortedProducts.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    const currentProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredAndSortedProducts]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const currentCategoryName = categories.find(c => c.key === activeCategory)?.name || 'Tienda';

    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4 lg:w-1/5">
                    <h2 className="text-lg font-bold mb-4 border-b pb-2">Categorías</h2>
                    <ul className="space-y-2">
                        {categories.map(cat => (
                            <li key={cat.key}>
                                <button
                                    onClick={() => setActiveCategory(cat.key)}
                                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                                        activeCategory === cat.key
                                            ? 'bg-[var(--color-primary)] text-black font-bold border border-[var(--color-primary-solid)]'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="w-full md:w-3/4 lg:w-4/5">
                    <h1 className="text-2xl font-bold text-rose-600 tracking-tight mb-4">{currentCategoryName}</h1>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 p-4 bg-white rounded-lg shadow-sm border">
                        <p className="text-sm text-gray-700">
                           {totalItems > 0 
                             ? `Mostrando ${startItem}–${endItem} de ${totalItems} productos`
                             : 'No hay productos'
                           }
                        </p>
                        <form className="woocommerce-ordering">
                            <select 
                                name="orderby" 
                                className="orderby border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-rose-400 focus:border-rose-400 bg-white"
                                aria-label="Pedido de la tienda"
                                value={sortOrder}
                                onChange={handleSortChange}
                            >
                                <option value="menu_order">Orden predeterminado</option>
                                <option value="popularity">Ordenar por popularidad</option>
                                <option value="rating">Ordenar por puntuación media</option>
                                <option value="price">Ordenar por precio: bajo a alto</option>
                                <option value="price-desc">Ordenar por precio: alto a bajo</option>
                            </select>
                        </form>
                    </div>

                    {currentProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                                {currentProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        currency={currency}
                                        onAddToCart={onAddToCart}
                                        onQuickAddToCart={onQuickAddToCart}
                                        onBuyNow={onBuyNow}
                                        onProductSelect={onProductSelect}
                                        onQuickView={onQuickView}
                                    />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Anterior
                                    </button>
                                    
                                    <div className="flex gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${
                                                    currentPage === page
                                                        ? 'bg-black text-white shadow-md'
                                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-transparent'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16 border rounded-lg">
                            <p className="text-xl text-gray-600">No se encontraron productos en esta categoría.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ShopPage;
