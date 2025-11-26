
import React, { useRef, useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import type { Product, VariantOption } from './types';
import { type Currency, formatCurrency } from './currency';
import { allProducts } from './products';
import ImageLightbox from './ImageLightbox';

interface ProductDetailPageProps {
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}

// SVG Icons
const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const TruckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 17a2 2 0 10-4 0 2 2 0 004 0zM19 17a2 2 0 10-4 0 2 2 0 004 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h2a1 1 0 001-1V7.572a1 1 0 00-.218-.671l-1.5-2.25a1 1 0 00-.868-.451H13v11z" />
    </svg>
);

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2-2 2 2m-2 4v6m2-6l2 2-2 2M15 3l2 2-2 2m-2-4v4m2 4l2 2-2 2m-8 4h12" />
    </svg>
);

const StarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const getDefaultVariant = (product: Product): Record<string, string> | null => {
    if (!product.variants) return null;
    const defaultVariant: Record<string, string> = {};
    for (const key in product.variants) {
        if (product.variants[key].length > 0) {
           defaultVariant[key] = product.variants[key][0].value;
        }
    }
    return defaultVariant;
};

const getStockInfo = (stock: number): { text: string; color: string } => {
    if (stock === 0) {
        return { text: 'Agotado', color: 'text-orange-600' };
    }
    if (stock <= 10) {
        return { text: '¡Date prisa! Pocas unidades', color: 'text-amber-600' };
    }
    return { text: 'En stock', color: 'text-green-600' };
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, currency, onAddToCart, onQuickAddToCart, onBuyNow, onProductSelect, onQuickView }) => {
    const [selectedVariant, setSelectedVariant] = useState<Record<string, string> | null>(getDefaultVariant(product));
    const [currentImageUrl, setCurrentImageUrl] = useState(product.imageUrl);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const addToCartBtnRef = useRef<HTMLButtonElement>(null);
    const buyNowBtnRef = useRef<HTMLButtonElement>(null);

    // Reset state when product changes
    useEffect(() => {
        setSelectedVariant(getDefaultVariant(product));
        setCurrentImageUrl(product.imageUrl);
        window.scrollTo(0,0);
    }, [product]);

    // Update image when variant changes
    useEffect(() => {
        let variantImageUrl: string | null = null;

        if (product.variants && selectedVariant) {
            for (const variantType in product.variants) {
                const selectedValue = selectedVariant[variantType];
                if (selectedValue) {
                    const variantOption = product.variants[variantType].find(
                        v => v.value === selectedValue
                    );
                    if (variantOption?.imageUrl) {
                        variantImageUrl = variantOption.imageUrl;
                        break;
                    }
                }
            }
        }
        setCurrentImageUrl(variantImageUrl || product.imageUrl);
    }, [selectedVariant, product.variants, product.imageUrl]);

    const handleVariantChange = (variantType: string, value: string) => {
        setSelectedVariant(prev => ({ ...(prev || {}), [variantType]: value }));
    };

    const stockInfo = getStockInfo(product.stock);
    const isOutOfStock = product.stock === 0;
    const isDiscounted = product.regularPrice && product.regularPrice > product.price;
    const discountPercentage = isDiscounted
        ? Math.round(((product.regularPrice! - product.price) / product.regularPrice!) * 100)
        : 0;

    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="md:flex">
                    {/* Product Image Gallery */}
                    <div className="md:w-1/2 bg-fuchsia-50/50 p-8 relative group">
                        <div className="relative aspect-square rounded-2xl bg-white shadow-inner p-4 cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
                            <img 
                                src={currentImageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-contain transition-transform duration-500 hover:scale-105" 
                            />
                            {isDiscounted && (
                                <div className="absolute top-4 left-4 bg-fuchsia-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                                    -{discountPercentage}%
                                </div>
                            )}
                             <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                            </div>
                        </div>
                        
                        {/* Thumbnail Gallery (Simulated if variants have images) */}
                        {product.variants && Object.values(product.variants).some((opts: VariantOption[]) => opts.some(o => o.imageUrl)) && (
                             <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                                {Object.values(product.variants).flat().filter((opt: VariantOption) => opt.imageUrl).map((opt: VariantOption, idx: number) => (
                                    <button 
                                        key={idx}
                                        onClick={() => {
                                            // Find which variant type this option belongs to
                                            const type = Object.keys(product.variants!).find(key => product.variants![key].includes(opt));
                                            if (type) handleVariantChange(type, opt.value);
                                        }}
                                        className={`w-16 h-16 border-2 rounded-lg overflow-hidden flex-shrink-0 ${currentImageUrl === opt.imageUrl ? 'border-fuchsia-500' : 'border-transparent hover:border-fuchsia-300'}`}
                                    >
                                        <img src={opt.imageUrl!} alt={opt.value} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                             </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                        <div className="mb-2">
                            <span className="text-sm font-bold text-fuchsia-600 uppercase tracking-wider">{product.brand}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            {product.rating && (
                                <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className={i < Math.floor(product.rating!) ? "w-4 h-4" : "w-4 h-4 text-gray-300"} />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm font-semibold text-amber-700">{product.rating}</span>
                                    <span className="mx-2 text-gray-300">|</span>
                                    <span className="text-xs text-gray-500">{product.reviewCount} reseñas</span>
                                </div>
                            )}
                            {stockInfo.text === 'En stock' && (
                                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    En stock
                                </span>
                            )}
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-fuchsia-700">{formatCurrency(product.price, currency)}</span>
                                {isDiscounted && (
                                    <span className="text-xl text-gray-400 line-through">{formatCurrency(product.regularPrice!, currency)}</span>
                                )}
                            </div>
                            {product.isShippingSaver && (
                                <div className="inline-block mt-2 bg-fuchsia-100 text-fuchsia-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                                    🚚 ENVÍO GRATIS
                                </div>
                            )}
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>

                        {/* Variants Selection */}
                        {product.variants && (
                            <div className="space-y-6 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                {Object.keys(product.variants).map((type) => {
                                    const options = product.variants![type];
                                    if (!Array.isArray(options)) return null;
                                    
                                    return (
                                        <div key={type}>
                                            <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                                                {type}: <span className="text-fuchsia-600">{selectedVariant?.[type]}</span>
                                            </h3>
                                            <div className="flex flex-wrap gap-3">
                                                {options.map(option => {
                                                    const isSelected = selectedVariant?.[type] === option.value;
                                                    if (option.colorCode) {
                                                        return (
                                                            <button
                                                                key={option.value}
                                                                onClick={() => handleVariantChange(type, option.value)}
                                                                className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all transform hover:scale-110 ${isSelected ? 'border-fuchsia-600 ring-2 ring-offset-2 ring-fuchsia-200' : 'border-white'}`}
                                                                style={{ backgroundColor: option.colorCode }}
                                                                aria-label={`Seleccionar color ${option.value}`}
                                                                title={option.value}
                                                            />
                                                        );
                                                    }
                                                    return (
                                                        <button
                                                            key={option.value}
                                                            onClick={() => handleVariantChange(type, option.value)}
                                                            className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${isSelected ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-fuchsia-300 hover:text-fuchsia-600'}`}
                                                        >
                                                            {option.value}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-auto space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    ref={addToCartBtnRef}
                                    onClick={() => onAddToCart(product, addToCartBtnRef.current, selectedVariant)}
                                    disabled={isOutOfStock}
                                    className={`flex-1 bg-[var(--color-primary)] text-black border-2 border-[var(--color-primary-solid)] font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-fuchsia-200 transition-all transform hover:-translate-y-1 hover:bg-white hover:text-[var(--color-primary-solid)] ${isOutOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200 shadow-none hover:text-gray-400 hover:bg-gray-200 hover:transform-none' : ''}`}
                                >
                                    {isOutOfStock ? 'Agotado' : 'Añadir a la cesta'}
                                </button>
                                
                                {!isOutOfStock && (
                                    <button
                                        ref={buyNowBtnRef}
                                        onClick={() => onBuyNow(product, buyNowBtnRef.current, selectedVariant)}
                                        className="flex-1 bg-black text-white border-2 border-black font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-gray-400 transition-all transform hover:-translate-y-1 hover:bg-gray-800"
                                    >
                                        Comprar Ahora
                                    </button>
                                )}
                            </div>
                            
                            {/* Value Props */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <TruckIcon className="text-fuchsia-500" />
                                    <span>Envío rápido 24/48h</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <SparklesIcon className="text-fuchsia-500" />
                                    <span>Garantía de calidad</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How To Use Section */}
            {product.howToUse && (
                <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Modo de Uso</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">{product.howToUse}</p>
                </div>
            )}

            {/* Reviews Mockup */}
            <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Opiniones de Clientes ({product.reviewCount})</h2>
                <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-fuchsia-100 flex items-center justify-center">
                                    <UserIcon />
                                </div>
                                <span className="font-semibold text-gray-900">María G.</span>
                            </div>
                            <div className="flex text-amber-400"><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4"/></div>
                        </div>
                        <p className="text-gray-600">"¡Me encanta este producto! La calidad es increíble y el envío fue super rápido. Definitivamente volveré a comprar."</p>
                    </div>
                     <div className="border-b border-gray-100 pb-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-fuchsia-100 flex items-center justify-center">
                                    <UserIcon />
                                </div>
                                <span className="font-semibold text-gray-900">Laura P.</span>
                            </div>
                            <div className="flex text-amber-400"><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4"/><StarIcon className="w-4 h-4 text-gray-300"/></div>
                        </div>
                        <p className="text-gray-600">"Muy buen producto, cumple con lo que promete. El packaging es precioso."</p>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-8">También te podría gustar</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedProducts.map(related => (
                            <ProductCard
                                key={related.id}
                                product={related}
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
            )}

            {/* Lightbox */}
            {isLightboxOpen && (
                <ImageLightbox 
                    imageUrl={currentImageUrl} 
                    altText={product.name} 
                    onClose={() => setIsLightboxOpen(false)} 
                />
            )}
        </div>
    );
};

export default ProductDetailPage;
