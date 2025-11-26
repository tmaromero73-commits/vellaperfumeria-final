
import React, { useState, useRef } from 'react';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';

// URL del Catálogo 16 actualizada
const INTERACTIVE_CATALOG_URL = 'https://es-catalogue.oriflame.com/oriflame/es/2025016?HideStandardUI=true&Page=1';
const FALLBACK_CATALOG_URL = 'https://es.oriflame.com/products/digital-catalogue-current';

interface CatalogPageProps {
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    currency: Currency;
}

const VisaIcon = () => (
    <svg className="w-10 h-6" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <rect width="38" height="24" rx="2" fill="white"/>
       <path d="M15.5 15.5L13.5 4.5H11.5L9 10.5L7.5 6.5L7 4.5H5L8.5 15.5H11L13 9.5L14.5 4.5H15.5V15.5Z" fill="#1A1F71"/>
       <path d="M20.5 15.5L22.5 4.5H20.5L19.5 9L18.5 4.5H16.5L18.5 15.5H20.5Z" fill="#1A1F71"/>
       <path d="M26.5 15.5L28.5 4.5H26.5L25 8.5L23.5 4.5H21.5L23.5 15.5H26.5Z" fill="#1A1F71"/>
       <path d="M32.5 4.5H29.5L28.5 9L27.5 4.5H25.5L28.5 15.5H30.5L34.5 4.5H32.5Z" fill="#1A1F71"/>
       <path d="M11 15.5L13 4.5H15L13 15.5H11Z" fill="#1A1F71"/>
       <path d="M25.7 6.8C25.2 6.6 24.6 6.5 24 6.5C22.6 6.5 21.5 7.2 21.5 8.6C21.5 9.6 22.4 10.2 23.1 10.5C23.8 10.8 24 11 24 11.3C24 11.7 23.6 11.9 23.1 11.9C22.5 11.9 22 11.8 21.6 11.6L21.3 12.8C21.8 13 22.5 13.1 23.1 13.1C24.7 13.1 25.8 12.3 25.8 10.9C25.8 9.8 25.1 9.2 24.3 8.9C23.6 8.6 23.3 8.3 23.3 8C23.3 7.7 23.7 7.5 24.1 7.5C24.6 7.5 25 7.6 25.4 7.8L25.7 6.8Z" fill="#1A1F71"/>
       <path d="M30.6 6.5H28.9L28 11.5L28.9 6.5Z" fill="#1A1F71"/>
       <path d="M32.9 6.5L32.5 8.6C32.3 7.9 32.1 7.2 31.8 6.5H30.2L30.6 8.6L30.2 11.5L31.1 6.5Z" fill="#1A1F71"/>
    </svg>
);

const MastercardIcon = () => (
    <svg className="w-10 h-6" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="2" fill="white"/>
        <circle cx="13" cy="12" r="7" fill="#EB001B"/>
        <circle cx="25" cy="12" r="7" fill="#F79E1B"/>
        <path d="M19 16.4C20.3 15.4 21.2 13.8 21.2 12C21.2 10.2 20.3 8.6 19 7.6C17.7 8.6 16.8 10.2 16.8 12C16.8 13.8 17.7 15.4 19 16.4Z" fill="#FF5F00"/>
    </svg>
);

const PayPalIcon = () => (
    <svg className="w-10 h-6" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="2" fill="white"/>
        <path d="M26.5 7.5L23.5 7.5L22.5 13.5L26.5 7.5Z" fill="#003087"/>
        <path d="M22.5 13.5L20.5 13.5L21.5 7.5L24.5 7.5L22.5 13.5Z" fill="#003087"/>
        <path d="M14.5 7.5C15.5 7.5 16.5 8 16.5 9.5C16.5 10.5 16 11.5 15 11.5H13.5L14.5 7.5Z" fill="#003087"/>
        <path d="M10.5 7.5H13.5L12.5 13.5H9.5L10.5 7.5Z" fill="#003087"/>
        <path d="M13 12.5H11.5L12 9.5L13 12.5Z" fill="#009CDE"/>
        <path d="M16 10.5C16 11.5 15.5 12.5 14.5 12.5H13L13.5 9.5H15C15.5 9.5 16 9.8 16 10.5Z" fill="#009CDE"/>
        <path d="M20 7.5L18 13.5H16.5L18.5 7.5H20Z" fill="#009CDE"/>
    </svg>
);

const CatalogPage: React.FC<CatalogPageProps> = ({ onAddToCart, onQuickAddToCart, onBuyNow, onProductSelect, onQuickView, currency }) => {
    const [quickAddCode, setQuickAddCode] = useState('');
    const [addStatus, setAddStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleQuickAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!quickAddCode.trim()) return;

        const code = parseInt(quickAddCode.trim());
        const product = allProducts.find(p => p.id === code);

        if (product) {
            onAddToCart(product, buttonRef.current, null);
            setAddStatus('success');
            setStatusMessage(`¡${product.name} añadido al carrito!`);
            setQuickAddCode('');
            
            setTimeout(() => {
                setAddStatus('idle');
                setStatusMessage('');
            }, 3000);
        } else {
            setAddStatus('error');
            setStatusMessage('Producto no encontrado en stock online. Contáctanos.');
            setTimeout(() => {
                setAddStatus('idle');
                setStatusMessage('');
            }, 3000);
        }
    };

    // Featured catalog products for the list below
    const catalogProducts = allProducts.slice(0, 8); 

    return (
        <div className="w-full px-2 sm:px-4 py-6 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-6 h-full">
                
                {/* Catalog Viewer */}
                <div className="flex-grow flex flex-col min-w-0">
                    <div className="mb-4 flex items-center gap-4 flex-wrap md:flex-nowrap justify-center md:justify-start">
                        <img 
                            src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                            alt="Vellaperfumeria Logo" 
                            className="h-20 w-auto object-contain" 
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight font-serif">Catálogo Actual (C16)</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Explora el Catálogo 16 y descubre las mejores ofertas de temporada.
                            </p>
                        </div>
                    </div>
                    
                    <div 
                        className="relative w-full flex-grow bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200" 
                        style={{ minHeight: '80vh' }} 
                    >
                        <iframe
                            data-ipaper="true"
                            src={INTERACTIVE_CATALOG_URL}
                            title="Catálogo Digital BeautyShopVella"
                            className="w-full h-full absolute inset-0"
                            frameBorder="0"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                    <div className="text-center mt-4">
                        <a href={FALLBACK_CATALOG_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-fuchsia-700 hover:underline font-medium">
                            ¿No puedes ver el catálogo? Abrir en ventana externa
                        </a>
                    </div>
                </div>

                {/* Quick Order Sidebar */}
                <div className="w-full md:w-80 lg:w-96 flex-shrink-0 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 sticky top-24">
                        <div className="flex items-center gap-2 mb-4 text-fuchsia-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <h2 className="text-lg font-bold text-black">Pedido Rápido</h2>
                        </div>
                        
                        <div className="bg-fuchsia-50 p-4 rounded-md mb-6 border border-fuchsia-100">
                            <p className="text-sm font-bold text-gray-800 mb-2">¿Cómo comprar?</p>
                            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                                <li>Mira el <strong>Código</strong> del producto en el catálogo.</li>
                                <li>Ingresa el código aquí.</li>
                                <li>¡Añádelo a tu cesta!</li>
                            </ol>
                        </div>

                        <form onSubmit={handleQuickAdd} className="space-y-3">
                            <div>
                                <label htmlFor="quickCode" className="sr-only">Código del producto</label>
                                <input
                                    type="number"
                                    id="quickCode"
                                    placeholder="Código (ej: 38497)"
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent"
                                    value={quickAddCode}
                                    onChange={(e) => setQuickAddCode(e.target.value)}
                                />
                            </div>
                            <button
                                ref={buttonRef}
                                type="submit"
                                disabled={!quickAddCode}
                                className="w-full bg-[#f78df685] text-black border-2 border-[#f78df6] font-bold py-3 px-4 rounded-md hover:bg-white hover:text-[#d946ef] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
                            >
                                Añadir a la cesta
                            </button>
                        </form>

                        {statusMessage && (
                            <div className={`mt-4 p-3 rounded-md text-sm font-medium animate-fade-in ${
                                addStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                                {statusMessage}
                            </div>
                        )}

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-xs font-semibold text-gray-500 text-center mb-3 uppercase tracking-wider">Pagos seguros con:</p>
                            <div className="flex justify-center gap-3 grayscale-0 opacity-100">
                                <VisaIcon />
                                <MastercardIcon />
                                <PayPalIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products from Catalog (Visual Baskets) */}
            <div className="mt-12 border-t border-gray-200 pt-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-black tracking-tight">Productos Destacados del Catálogo</h2>
                    <p className="mt-2 text-lg text-gray-600">Compra directamente tus favoritos</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {catalogProducts.map(product => (
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
            </div>

            <div className="js-logout-data" data-url-eshoplogout="https://es-eshop.oriflame.com/iframe/internal/Services.aspx"></div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default CatalogPage;
