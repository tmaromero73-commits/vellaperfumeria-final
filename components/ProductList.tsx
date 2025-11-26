
import React from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
// FIX: Changed import to use the actual component name. The error was due to HeroCarousel.tsx not having a default export, which will also be fixed.
import HeroCarousel from './HeroCarousel';
import type { Currency } from './currency';
import FeaturesSection from './FeaturesSection';
import InteractiveCatalogSection from './InteractiveCatalogSection';


const ProductList: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    onProductSelect: (product: Product) => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    currency: Currency;
    onQuickView: (product: Product) => void;
}> = ({ onNavigate, onProductSelect, onAddToCart, onQuickAddToCart, onBuyNow, currency, onQuickView }) => {
    const newArrivals = allProducts.slice(0, 4);
    const bestSellers = allProducts.filter(p => p.rating && p.rating >= 5).slice(0, 4);
    
    return (
        <div className="space-y-20">
            
            <HeroCarousel onNavigate={onNavigate} />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <section>
                    <h2 className="text-2xl font-extrabold text-black tracking-tight text-center mb-10">Novedades</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {newArrivals.map(product => (
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
                </section>
            </div>

            <FeaturesSection />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <section>
                    <h2 className="text-2xl font-extrabold text-black tracking-tight text-center mb-10">Más Vendidos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {bestSellers.map(product => (
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
                    <div className="text-center mt-12">
                        <button
                            onClick={() => onNavigate('products', 'all')}
                            className="btn-primary"
                        >
                            Ver toda la tienda
                        </button>
                    </div>
                </section>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <InteractiveCatalogSection onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default ProductList;
