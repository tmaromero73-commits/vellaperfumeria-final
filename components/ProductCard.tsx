
import React, { useRef, useState, useEffect } from 'react';
import { type Currency, formatCurrency } from './currency';
import type { Product } from './types';

// --- ICONS ---
const HeartIcon: React.FC<{isFilled: boolean}> = ({ isFilled }) => (
    <svg className={`h-6 w-6 transition-colors duration-300 ${isFilled ? 'text-fuchsia-500 fill-current' : 'text-gray-400'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const StarIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={`w-3 h-3 ${className}`} style={style} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

// FULL GOOGLE PLAY LOGO
const GooglePlayLogoFull = () => (
    <div className="flex items-center justify-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 3.5L13.5 12L4.5 20.5V3.5Z" fill="white"/>
            <path d="M13.5 12L18.5 17L21.5 12L18.5 7L13.5 12Z" fill="white" fillOpacity="0.8"/>
            <path d="M18.5 17L13.5 12L4.5 20.5L18.5 17Z" fill="white" fillOpacity="0.6"/>
            <path d="M4.5 3.5L13.5 12L18.5 7L4.5 3.5Z" fill="white" fillOpacity="0.6"/>
        </svg>
        <span className="font-sans font-bold text-white text-xs">PAGAR CON GOOGLE PLAY</span>
    </div>
);

interface ProductCardProps {
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow?: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, currency, onAddToCart, onQuickAddToCart, onBuyNow, onProductSelect, onQuickView }) => {
    const [isWishlist, setIsWishlist] = useState(false);
    const [imgSrc, setImgSrc] = useState(product.imageUrl);
    const addToCartBtnRef = useRef<HTMLButtonElement>(null);
    const buyNowBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setImgSrc(product.imageUrl);
    }, [product.imageUrl]);

    const isDiscounted = product.regularPrice && product.regularPrice > product.price;
    const discountPercentage = isDiscounted
        ? Math.round(((product.regularPrice! - product.price) / product.regularPrice!) * 100)
        : 0;

    const hasManyVariants = product.variants && (Object.keys(product.variants).length > 1 || (product.variants['Color'] && product.variants['Color'].length > 4));

    const handleActionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (product.stock === 0) return;

        if (hasManyVariants) {
            onProductSelect(product);
        } else {
            let defaultVariant = null;
            if (product.variants) {
                defaultVariant = {};
                for (const key in product.variants) {
                     if (product.variants[key].length > 0) {
                        defaultVariant[key] = product.variants[key][0].value;
                     }
                }
            }
            onQuickAddToCart(product, addToCartBtnRef.current, defaultVariant);
        }
    };

    const handleBuyNowClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (product.stock === 0) return;

        if (hasManyVariants) {
            onProductSelect(product);
        } else {
            let defaultVariant = null;
            if (product.variants) {
                defaultVariant = {};
                for (const key in product.variants) {
                     if (product.variants[key].length > 0) {
                        defaultVariant[key] = product.variants[key][0].value;
                     }
                }
            }
            if (onBuyNow) {
                onBuyNow(product, buyNowBtnRef.current, defaultVariant);
            } else {
                onQuickAddToCart(product, addToCartBtnRef.current, defaultVariant);
            }
        }
    };

    return (
        <div 
            className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            role="article"
            aria-label={`Producto: ${product.name}`}
        >
            {/* Badge Section */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.tag && (
                    <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                        {product.tag}
                    </span>
                )}
                {isDiscounted && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                        -{discountPercentage}%
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button 
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors text-gray-400 hover:text-red-500"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsWishlist(!isWishlist);
                }}
            >
                <HeartIcon isFilled={isWishlist} />
            </button>

            {/* Image Section */}
            <div 
                className="relative aspect-square overflow-hidden bg-white cursor-pointer"
                onClick={() => onProductSelect(product)}
            >
                <img
                    src={imgSrc}
                    alt={product.name}
                    onError={() => setImgSrc('https://via.placeholder.com/300x300?text=Imagen+No+Disponible')}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow bg-white">
                <div className="mb-1 flex justify-between items-start">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{product.brand}</span>
                    {product.rating && (
                        <div className="flex items-center gap-1">
                            <StarIcon className="text-amber-400" />
                            <span className="text-xs font-medium text-gray-500">{product.rating}</span>
                        </div>
                    )}
                </div>

                <h3 
                    className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 hover:text-fuchsia-600 transition-colors cursor-pointer"
                    onClick={() => onProductSelect(product)}
                >
                    {product.name}
                </h3>

                {/* Price Section */}
                <div className="mt-auto pt-2">
                     <div className="flex items-center gap-2 flex-wrap mb-3">
                        <span className={`text-lg font-extrabold ${isDiscounted ? 'text-red-600' : 'text-gray-900'}`}>
                            {formatCurrency(product.price, currency)}
                        </span>
                        {isDiscounted && (
                            <span className="text-sm text-gray-400 line-through">
                                {formatCurrency(product.regularPrice!, currency)}
                            </span>
                        )}
                    </div>

                    {/* Action Buttons Grid */}
                    <div className="space-y-2">
                         {/* 1. Add to Cart (Standard) */}
                        <button
                            ref={addToCartBtnRef}
                            onClick={handleActionClick}
                            disabled={product.stock === 0}
                            className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all border ${
                                product.stock === 0
                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                            }`}
                        >
                            {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
                        </button>

                        {/* 2. GOOGLE PAY BUTTON - EXPLICIT & GREEN */}
                        {product.stock > 0 && (
                            <button
                                onClick={handleBuyNowClick}
                                className="w-full py-2.5 rounded-lg font-bold text-xs transition-all shadow-md hover:shadow-lg bg-black hover:bg-gray-800 border border-transparent flex items-center justify-center relative overflow-hidden"
                                title="Pagar ahora con Google Play"
                            >
                                <GooglePlayLogoFull />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
