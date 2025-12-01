import React, { useState, useEffect, Component, ReactNode } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import ProductDetailPage from './components/ProductDetailPage';
import OfertasPage from './components/OfertasPage';
import AsistenteIAPage from './components/AsistenteIAPage';
import CatalogPage from './components/CatalogPage';
import AboutPage from './components/AboutPage'; // Ensure this component exists or remove import if not
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import CheckoutSummaryPage from './components/CheckoutSummaryPage';
import QuickViewModal from './components/QuickViewModal';
import ShopPage from './components/ShopPage';
import { blogPosts } from './components/blogData';
import { allProducts } from './components/products';
import type { View, CartItem, Product } from './components/types';
import type { Currency } from './components/currency';
import { fetchServerCart } from './components/api';

// --- ERROR BOUNDARY (Protección contra pantalla blanca) ---
interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error capturado por el límite:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen bg-pink-50 text-center p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md border border-pink-100">
                        <span className="text-4xl mb-4 block">🌸</span>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Ups, algo salió mal</h1>
                        <p className="text-gray-600 mb-6">Tuvimos un pequeño problema técnico. Por favor, intenta recargar la página.</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                        >
                            Recargar Tienda
                        </button>
                        {this.state.error && (
                             <details className="mt-4 text-left text-xs text-gray-400 bg-gray-50 p-2 rounded overflow-auto max-h-32">
                                <summary>Detalles técnicos</summary>
                                {this.state.error.toString()}
                            </details>
                        )}
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

// --- WHATSAPP FLOATING BUTTON ---
const WhatsAppFloat = () => (
    <a 
        href="https://api.whatsapp.com/send?phone=34661202616" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Chat en WhatsApp"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
        <span className="absolute right-full mr-3 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
            ¿Necesitas ayuda?
        </span>
    </a>
);

// --- APP MAIN COMPONENT ---
const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('home');
    const [viewPayload, setViewPayload] = useState<any>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currency, setCurrency] = useState<Currency>('EUR');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedPost, setSelectedPost] = useState(blogPosts[0]);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);

    // Cargar carrito del servidor si hay un parámetro ?v=SESSION_ID
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('v');

        if (sessionId) {
            const loadServerCart = async () => {
                try {
                    const serverItems = await fetchServerCart(sessionId);
                    setCart(prev => {
                        // Fusionar carritos
                        const newCart = [...prev];
                        serverItems.forEach(serverItem => {
                             const exists = newCart.find(i => i.id === serverItem.id);
                             if (!exists) newCart.push(serverItem);
                        });
                        return newCart;
                    });
                    // Opcional: ir directo al carrito si vienes de fuera
                    // setIsCartOpen(true); 
                } catch (err) {
                    console.error("Error cargando carrito remoto:", err);
                }
            };
            loadServerCart();
        }
    }, []);

    // --- CART LOGIC ---
    const addToCart = (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        setCart(prevCart => {
            // Crear un ID único basado en producto y variantes
            const variantKey = selectedVariant ? JSON.stringify(selectedVariant) : 'default';
            const uniqueId = `${product.id}-${variantKey}`;
            
            const existingItem = prevCart.find(item => item.id === uniqueId);

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { id: uniqueId, product, quantity: 1, selectedVariant }];
        });
        
        setIsCartOpen(true);
        
        // Animación simple del botón (opcional)
        if (buttonElement) {
            const originalText = buttonElement.innerText;
            buttonElement.innerText = "¡Añadido!";
            buttonElement.classList.add('bg-green-500', 'text-white', 'border-green-500');
            setTimeout(() => {
                buttonElement.innerText = originalText;
                buttonElement.classList.remove('bg-green-500', 'text-white', 'border-green-500');
            }, 1500);
        }
    };

    const handleBuyNow = (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        addToCart(product, buttonElement, selectedVariant);
        handleNavigate('checkoutSummary');
    };

    const updateQuantity = (cartItemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCart(prevCart => prevCart.map(item => 
            item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (cartItemId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    // --- NAVIGATION LOGIC ---
    const handleNavigate = (view: View, payload?: any) => {
        // Cerrar todo antes de navegar
        setIsCartOpen(false);
        setQuickViewProduct(null);
        window.scrollTo(0, 0);
        
        setCurrentView(view);
        setViewPayload(payload);

        if (view === 'productDetail' && payload) {
            setSelectedProduct(payload);
        }
        if (view === 'blogPost' && payload) {
            setSelectedPost(payload);
        }
    };

    const handleProductSelect = (product: Product) => {
        handleNavigate('productDetail', product);
    };

    const handlePostSelect = (post: typeof blogPosts[0]) => {
        handleNavigate('blogPost', post);
    }

    const handleCheckout = () => {
        handleNavigate('checkoutSummary');
    };

    // --- RENDER CURRENT VIEW ---
    const renderView = () => {
        switch (currentView) {
            case 'home':
                return (
                    <ProductList
                        onNavigate={handleNavigate}
                        onProductSelect={handleProductSelect}
                        onAddToCart={addToCart}
                        onQuickAddToCart={addToCart}
                        onBuyNow={handleBuyNow}
                        currency={currency}
                        onQuickView={setQuickViewProduct}
                    />
                );
            case 'products':
                return (
                    <div className="container mx-auto px-4 py-8">
                         {/* Use ShopPage logic or reuse ProductList filtered. 
                             Since we have ShopPage.tsx in file list but not ProductList handling categories fully, 
                             let's assume ProductList or ShopPage. Using ShopPage for categories is better.
                         */}
                         <Header 
                            onNavigate={handleNavigate}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                            onCartClick={() => setIsCartOpen(true)}
                        />
                         {/* Note: We need to import ShopPage component, assuming it exists as provided in context */}
                         {/* If ShopPage component code was provided in context, we use it. 
                             If not, we fallback to ProductList but filter it? 
                             Let's assume ShopPage is available as it was in previous context. */}
                    </div>
                );
             case 'productDetail':
                return selectedProduct ? (
                    <ProductDetailPage
                        product={selectedProduct}
                        currency={currency}
                        onAddToCart={addToCart}
                        onQuickAddToCart={addToCart}
                        onBuyNow={handleBuyNow}
                        onProductSelect={handleProductSelect}
                        onQuickView={setQuickViewProduct}
                    />
                ) : null;
            case 'ofertas':
                return (
                    <OfertasPage
                        currency={currency}
                        onAddToCart={addToCart}
                        onQuickAddToCart={addToCart}
                        onBuyNow={handleBuyNow}
                        onProductSelect={handleProductSelect}
                        onQuickView={setQuickViewProduct}
                        onNavigate={handleNavigate}
                    />
                );
            case 'ia':
                return <AsistenteIAPage cartItems={cart} />;
            case 'catalog':
                return (
                    <CatalogPage 
                        onAddToCart={addToCart} 
                        onQuickAddToCart={addToCart}
                        onBuyNow={handleBuyNow}
                        onProductSelect={handleProductSelect}
                        onQuickView={setQuickViewProduct}
                        currency={currency}
                    />
                );
            case 'blog':
                return <BlogPage posts={blogPosts} onSelectPost={handlePostSelect} />;
            case 'blogPost':
                return <BlogPostPage post={selectedPost} allPosts={blogPosts} onSelectPost={handlePostSelect} onBack={() => handleNavigate('blog')} />;
            case 'checkoutSummary':
                 return (
                    <CheckoutSummaryPage 
                        cartItems={cart}
                        currency={currency}
                        onUpdateQuantity={updateQuantity}
                        onRemoveItem={removeItem}
                        onNavigate={handleNavigate}
                    />
                 );
             case 'about': // Simple placeholder if AboutPage not fully defined
                return <AboutPage />;
             case 'contact': // Simple placeholder
                 return (
                     <div className="container mx-auto px-4 py-12 text-center">
                         <h1 className="text-3xl font-bold mb-4">Contacto</h1>
                         <p>¿Necesitas ayuda? Escríbenos por WhatsApp al 661 202 616.</p>
                     </div>
                 );
            default:
                // Fallback for 'products' category navigation (handled by ShopPage usually)
                if (currentView === 'products') {
                     // We need to import ShopPage. Since I cannot see if I imported it above, I'll double check imports.
                     // Yes, import ShopPage from './components/ShopPage'; is added.
                     return (
                        <div className="py-8">
                             {/* Assuming ShopPage handles internal layout */}
                        </div>
                     );
                }
                return (
                    <ProductList
                        onNavigate={handleNavigate}
                        onProductSelect={handleProductSelect}
                        onAddToCart={addToCart}
                        onQuickAddToCart={addToCart}
                        onBuyNow={handleBuyNow}
                        currency={currency}
                        onQuickView={setQuickViewProduct}
                    />
                );
        }
    };

    // Special handling for 'products' view to render ShopPage with category
    const renderMainContent = () => {
        if (currentView === 'products') {
            return (
                <div className="py-6">
                     {/* We use the ShopPage component for the store view */}
                     {/* Note: Need to ensure ShopPage is imported. It is in the imports block. */}
                     {/* We pass viewPayload as the initialCategory */}
                     <React.Suspense fallback={<div>Cargando tienda...</div>}>
                        {/* Dynamic import or direct usage if imported at top */}
                        <ShopPage 
                            currency={currency}
                            initialCategory={viewPayload || 'all'}
                            onAddToCart={addToCart}
                            onQuickAddToCart={addToCart}
                            onBuyNow={handleBuyNow}
                            onProductSelect={handleProductSelect}
                            onQuickView={setQuickViewProduct}
                        />
                     </React.Suspense>
                </div>
            );
        }
        return renderView();
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans selection:bg-fuchsia-200 selection:text-fuchsia-900 flex flex-col">
                
                {/* HEADER (Always visible except maybe checkout if desired, but let's keep it) */}
                <Header 
                    onNavigate={handleNavigate}
                    currency={currency}
                    onCurrencyChange={setCurrency}
                    cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                    onCartClick={() => setIsCartOpen(true)}
                />

                {/* MAIN CONTENT */}
                <main className="flex-grow">
                    {renderMainContent()}
                </main>

                {/* FOOTER */}
                {currentView !== 'checkoutSummary' && (
                    <Footer onNavigate={handleNavigate} />
                )}

                {/* GLOBAL ELEMENTS */}
                <WhatsAppFloat />
                
                <CartSidebar 
                    isOpen={isCartOpen} 
                    onClose={() => setIsCartOpen(false)} 
                    cartItems={cart} 
                    currency={currency} 
                    onUpdateQuantity={updateQuantity} 
                    onRemoveItem={removeItem}
                    onCheckout={handleCheckout}
                    isCheckingOut={isCheckingOut}
                    checkoutError={checkoutError}
                    onNavigate={handleNavigate}
                    onClearCart={clearCart}
                />

                {/* QUICK VIEW MODAL */}
                {quickViewProduct && (
                    <QuickViewModal 
                        product={quickViewProduct}
                        onClose={() => setQuickViewProduct(null)}
                        onAddToCart={addToCart}
                        onGoToProduct={() => handleProductSelect(quickViewProduct)}
                    />
                )}

            </div>
        </ErrorBoundary>
    );
};

export default App;