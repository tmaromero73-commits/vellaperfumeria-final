




import React, { useEffect, useRef, useState } from 'react';
import type { Product } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
        return { text: 'Pocas unidades', color: 'text-amber-600' };
    }
    return { text: 'En stock', color: 'text-green-600' };
};


interface QuickViewModalProps {
    product: Product;
    currency: Currency;
    onClose: () => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, currency, onClose, onAddToCart, onProductSelect }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const addToCartBtnRef = useRef<HTMLButtonElement>(null);
    
    const [selectedVariant, setSelectedVariant] = useState<Record<string, string> | null>(getDefaultVariant(product));
    const [currentImageUrl, setCurrentImageUrl] = useState(product.imageUrl);


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        modalRef.current?.focus();
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    
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


    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-auto flex flex-col md:flex-row p-6 relative animate-fade-in-scale max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 z-10" aria-label="Cerrar">
                    <CloseIcon />
                </button>
                
                <div className="w-full md:w-1/2 flex items-center justify-center bg-white rounded-lg p-4">
                    <img src={currentImageUrl} alt={product.name} className="max-h-80 object-contain" />
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col pt-6 md:pt-0 md:pl-6 overflow-y-auto">
                    <h2 id="quick-view-title" className="text-2xl font-bold mb-1 pr-8">{product.name}</h2>
                    <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                    
                     <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 mb-4">
                        <p className={`text-3xl font-bold ${isDiscounted ? 'text-fuchsia-600' : 'text-gray-900'}`}>{formatCurrency(product.price, currency)}</p>
                        {isDiscounted && (
                            <>
                                <p className="text-xl text-gray-500 line-through">{formatCurrency(product.regularPrice!, currency)}</p>
                                <span className="bg-fuchsia-400 text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
                                    AHORRA {Math.round(((product.regularPrice! - product.price) / product.regularPrice!) * 100)}%
                                </span>
                            </>
                        )}
                    </div>
                    
                    <div className="text-gray-700 text-sm mb-4 flex-grow pr-2">
                         <p className="max-h-24 overflow-y-auto mb-4">{product.description}</p>

                        {product.variants && (
                            <div className="space-y-3">
                                {Object.keys(product.variants).map((type) => {
                                    const options = product.variants![type];
                                    if (!Array.isArray(options)) return null;
                                    
                                    return (
                                        <div key={type}>
                                            <h3 className="text-xs font-semibold text-gray-800 mb-1">
                                                {type}: <span className="font-normal">{selectedVariant?.[type]}</span>
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {options.map(option => {
                                                    const isSelected = selectedVariant?.[type] === option.value;
                                                    if (option.colorCode) {
                                                        return (
                                                            <button
                                                                key={option.value}
                                                                onClick={() => handleVariantChange(type, option.value)}
                                                                className={`w-6 h-6 rounded-full border-2 transition-all ${isSelected ? 'border-fuchsia-400 ring-1 ring-offset-1 ring-fuchsia-300' : 'border-gray-300'}`}
                                                                style={{ backgroundColor: option.colorCode }}
                                                                aria-label={`Seleccionar color ${option.value}`}
                                                            />
                                                        );
                                                    }
                                                    return (
                                                        <button
                                                            key={option.value}
                                                            onClick={() => handleVariantChange(type, option.value)}
                                                            className={`px-3 py-1 text-xs font-medium border rounded-md transition-colors ${isSelected ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
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
                    </div>

                    <div className="mt-auto space-y-3">
                        <div className="mb-2">
                            <p className="text-sm font-semibold">Disponibilidad: <span className={`font-bold ${stockInfo.color}`}>{stockInfo.text}</span></p>
                        </div>
                        <button
                            ref={addToCartBtnRef}
                            onClick={() => {
                                onAddToCart(product, addToCartBtnRef.current, selectedVariant);
                                onClose();
                            }}
                            disabled={isOutOfStock}
                            className={`w-full bg-[var(--color-primary)] text-black border-2 border-[var(--color-primary-solid)] font-bold py-3 rounded-lg hover:bg-white hover:text-[var(--color-primary-solid)] transition-colors ${isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' : ''}`}
                            aria-label={`Añadir ${product.name} al carrito`}
                        >
                            {isOutOfStock ? 'Agotado' : 'Añadir al carrito'}
                        </button>
                        <button 
                            onClick={() => {
                                onProductSelect(product);
                                onClose();
                            }}
                            className="w-full bg-gray-100 text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Ver detalles completos
                        </button>
                    </div>
                </div>
            </div>
            <style>
                {`
                @keyframes fade-in-scale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                `}
            </style>
        </div>
    );
};

export default QuickViewModal;
