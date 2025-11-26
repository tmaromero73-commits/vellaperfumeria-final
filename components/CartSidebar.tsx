
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { CartItem, View } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    currency: Currency;
    onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
    onRemoveItem: (cartItemId: string) => void;
    onCheckout: () => void; 
    isCheckingOut: boolean;
    checkoutError: string | null;
    onNavigate: (view: View, payload?: any) => void;
    onClearCart?: () => void;
}

const FREE_SHIPPING_THRESHOLD = 35;
const DISCOUNT_THRESHOLD = 35; 
const DISCOUNT_PERCENTAGE = 0.15; 
const SHIPPING_COST = 6.00;
const GIFT_THRESHOLD = 35;

const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const GiftBoxIcon = ({ color = "black" }: { color?: string }) => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12V22H4V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 7H2V12H22V7Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22V7" stroke={color === 'white' ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, currency, onUpdateQuantity, onRemoveItem, onNavigate, onClearCart }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const discountAmount = useMemo(() => {
        if (subtotal >= DISCOUNT_THRESHOLD) {
            return subtotal * DISCOUNT_PERCENTAGE;
        }
        return 0;
    }, [subtotal]);

    const hasShippingSaver = useMemo(() => {
        return cartItems.some(item => item.product.isShippingSaver);
    }, [cartItems]);

    const shippingCost = useMemo(() => {
        if (hasShippingSaver || subtotal >= FREE_SHIPPING_THRESHOLD) {
            return 0;
        }
        return SHIPPING_COST;
    }, [subtotal, hasShippingSaver]);

    const total = subtotal - discountAmount + shippingCost;
    const amountForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
    const hasGift = subtotal > GIFT_THRESHOLD;

    // --- WHATSAPP ORDER LOGIC ---
    const handleWhatsAppOrder = () => {
        if (cartItems.length === 0) return;

        let message = `¡Hola! Quiero realizar un pedido en Vellaperfumeria:\n\n`;
        
        cartItems.forEach(item => {
            let itemLine = `- ${item.product.name} (x${item.quantity})`;
            if (item.selectedVariant) {
                const variantInfo = Object.values(item.selectedVariant).join(', ');
                itemLine += ` [${variantInfo}]`;
            }
            message += `${itemLine}\n`;
        });

        message += `\nTotal estimado: ${formatCurrency(total, currency)}`;
        message += `\n\nPor favor, indicadme los pasos para finalizar el pago. ¡Gracias!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '34661202616'; 
        // Updated to use api.whatsapp.com/send for better compatibility
        window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`, '_blank');
    };

    // --- MAIN ACTION: GO TO SUMMARY ---
    // Instead of redirecting to external site immediately (which causes issues with multiple items),
    // we take the user to the internal Checkout Summary page.
    const handleGoToSummary = () => {
        onNavigate('checkoutSummary');
        onClose();
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-heading"
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-fuchsia-50/70">
                    <h2 id="cart-heading" className="text-xl font-bold tracking-wide text-[var(--color-primary-solid)]">Tu Cesta</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white text-fuchsia-800 transition-colors" aria-label="Cerrar carrito">
                        <CloseIcon />
                    </button>
                </div>

                {cartItems.length > 0 ? (
                    <>
                        {/* Items List */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/40">
                            {/* Free Gift Item Logic */}
                            {hasGift && (
                                <div className="flex gap-4 items-center bg-black text-white p-3 rounded-xl border border-gray-800 shadow-sm transition-shadow animate-pop">
                                    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-lg border border-gray-200 p-1">
                                        <GiftBoxIcon color="black" />
                                    </div>
                                    <div className="flex-grow flex flex-col">
                                        <h3 className="font-semibold text-sm leading-tight text-white">Caja de Regalo Mediana (Negra)</h3>
                                        <p className="text-xs text-gray-400 mt-1">¡Regalo BLACK FRIDAY (+35€)!</p>
                                        <div className="flex items-center justify-between mt-2">
                                             <p className="font-bold text-base text-green-400">GRATIS</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 items-start bg-white p-3 rounded-xl border border-fuchsia-100 shadow-sm hover:shadow-md transition-shadow">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-contain rounded-lg border border-gray-50 p-1 bg-white" />
                                    <div className="flex-grow flex flex-col">
                                        <h3 className="font-semibold text-sm leading-tight text-gray-900">{item.product.name}</h3>
                                        {item.selectedVariant && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                {Object.entries(item.selectedVariant).map(([key, value]) => `${key}: ${value}`).join(', ')}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between mt-3">
                                             <p className="font-bold text-base text-[var(--color-primary-solid)]">{formatCurrency(item.product.price * item.quantity, currency)}</p>
                                             <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-500 p-1 transition-colors" aria-label={`Eliminar ${item.product.name}`}>
                                                <TrashIcon />
                                            </button>
                                        </div>
                                        <div className="flex items-center border border-gray-200 rounded-lg w-fit mt-2 bg-white overflow-hidden">
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 font-semibold text-gray-600 hover:text-[var(--color-primary-solid)] hover:bg-fuchsia-50 transition-colors" aria-label="Reducir cantidad">-</button>
                                            <span className="px-2 text-sm font-medium text-gray-800">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-semibold text-gray-600 hover:text-[var(--color-primary-solid)] hover:bg-fuchsia-50 transition-colors" aria-label="Aumentar cantidad">+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer / Summary */}
                        <div className="p-6 border-t bg-white space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10">
                             {/* Promo Messages */}
                             {discountAmount > 0 ? (
                                <div className="text-center text-sm font-semibold text-[var(--color-primary-solid)] p-3 bg-fuchsia-50 rounded-xl border border-fuchsia-100 flex items-center justify-center gap-2">
                                    <span>🎉</span>
                                    <span>¡Felicidades! <b>15% de descuento</b> aplicado.</span>
                                </div>
                            ) : amountForFreeShipping > 0 ? (
                                <div className="text-center text-sm">
                                    <p className="text-gray-600 mb-2"><span className="font-bold text-black">BLACK FRIDAY:</span> Te faltan <span className="font-bold text-[var(--color-primary-solid)]">{formatCurrency(amountForFreeShipping, currency, { decimals: 2 })}</span> para envío <b>GRATIS</b>.</p>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <div className="bg-gradient-to-r from-fuchsia-300 to-[var(--color-primary-solid)] h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-sm font-semibold text-green-700 p-3 bg-green-50 rounded-xl border border-green-100 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                                    <span>¡BLACK FRIDAY: Envío GRATIS activado!</span>
                                </div>
                            )}

                            <div className="space-y-2 text-sm text-gray-700 pt-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">{formatCurrency(subtotal, currency)}</span>
                                </div>
                                {discountAmount > 0 && (
                                     <div className="flex justify-between text-fuchsia-600 bg-fuchsia-50 text-[var(--color-primary-solid)]">
                                        <span>Descuento (15%)</span>
                                        <span className="font-semibold">-{formatCurrency(discountAmount, currency)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Envío</span>
                                    <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : ''}`}>{shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost, currency)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end font-bold text-xl pt-3 border-t border-gray-100 text-gray-900">
                                <span>Total</span>
                                <span className="text-3xl text-[var(--color-primary-solid)] tracking-tight">{formatCurrency(total, currency)}</span>
                            </div>
                            
                            <div className="flex flex-col gap-3 pt-2">
                                {/* MAIN CHECKOUT BUTTON: GO TO SUMMARY */}
                                <button 
                                    onClick={handleGoToSummary}
                                    className="w-full text-center bg-[var(--color-primary)] text-black hover:bg-white hover:text-[var(--color-primary-solid)] border-2 border-[var(--color-primary-solid)] font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-fuchsia-200 transform hover:-translate-y-0.5 flex justify-center items-center cursor-pointer no-underline"
                                >
                                     VER RESUMEN / PAGAR
                                </button>

                                {/* Option 2: WhatsApp Order (Reliable Fallback) */}
                                <button 
                                    onClick={handleWhatsAppOrder}
                                    className="w-full flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 font-bold py-3 px-6 rounded-xl transition-all shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z" />
                                    </svg>
                                    Pedir por WhatsApp (661-202-616)
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
                        <div className="bg-fuchsia-50 p-6 rounded-full mb-4">
                            <svg className="h-12 w-12 text-fuchsia-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <p className="text-xl font-bold text-gray-800 mb-2">Tu cesta está vacía</p>
                        <p className="text-gray-500 mb-8">¡Añade productos para comenzar tu pedido!</p>
                        <button 
                            onClick={onClose}
                            className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg"
                        >
                            Seguir comprando
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
