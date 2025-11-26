
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
// Types
import type { View, Product, CartItem } from './components/types';
import type { Currency } from './components/currency';
import { blogPosts } from './components/blogData';
import { allProducts } from './components/products';
// API
import { fetchServerCart } from './components/api';
// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ShopPage from './components/ShopPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartSidebar from './components/CartSidebar';
import OfertasPage from './components/OfertasPage';
import AsistenteIAPage from './components/AsistenteIAPage';
import CatalogPage from './components/CatalogPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import QuickViewModal from './components/QuickViewModal';
import Breadcrumbs, { type BreadcrumbItem } from './components/Breadcrumbs';
import BottomNavBar from './components/BottomNavBar';
import CheckoutSummaryPage from './components/CheckoutSummaryPage';

type AppView = {
    current: View;
    payload?: any;
};

// Global Floating WhatsApp Icon
const WhatsAppFloatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z" />
    </svg>
);

const App: React.FC = () => {
    const [view, setView] = useState<AppView>({ current: 'home' });
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [currency, setCurrency] = useState<Currency>('EUR');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [vParam, setVParam] = useState<string | null>(null);
    const [isLoadingCart, setIsLoadingCart] = useState(false);
    const [showTechInfo, setShowTechInfo] = useState(false);

    // Function to parse URL parameters and determine view
    const parseUrlParams = useCallback(() => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const v = urlParams.get('v');
            if (v) setVParam(v);

            const productId = urlParams.get('product_id');
            const category = urlParams.get('category');
            const targetView = urlParams.get('view');
            const postId = urlParams.get('post_id');

            if (productId) {
                const product = allProducts.find(p => p.id === parseInt(productId));
                if (product) {
                    setView({ current: 'productDetail', payload: product });
                    return;
                }
            } 
            
            if (category) {
                setView({ current: 'products', payload: category });
                return;
            } 
            
            if (targetView === 'blogPost' && postId) {
                const post = blogPosts.find(p => p.id === parseInt(postId));
                if (post) {
                    setView({ current: 'blogPost', payload: post });
                    return;
                }
            }

            if (targetView) {
                 if (['home', 'products', 'productDetail', 'ofertas', 'ia', 'catalog', 'about', 'contact', 'blog', 'blogPost', 'checkoutSummary'].includes(targetView)) {
                     setView({ current: targetView as View });
                     return;
                 }
            }
            
        } catch (e) {
            console.error("Error processing URL params", e);
        }
    }, []);

    // Initial Load & API Cart Fetch
    useEffect(() => {
        parseUrlParams();
        
        // Logic to fetch cart from server if 'v' param exists
        const initCart = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const v = urlParams.get('v');
            
            if (v) {
                setIsLoadingCart(true);
                try {
                    // Fetch from API
                    const serverCart = await fetchServerCart(v);
                    if (serverCart && serverCart.length > 0) {
                        setCartItems(serverCart);
                        // DIRECTLY SHOW THE CART SUMMARY PAGE
                        setView({ current: 'checkoutSummary' });
                    } else {
                        // Fallback to local storage if server has nothing
                        loadLocalCart();
                        // DEMO MODE: If cart is empty on initial load in demo, fill it and go to checkout
                        if (window.location.hostname.includes('googleusercontent')) {
                             const mockProduct = allProducts.find(p => p.id === 46801); // Divine
                             if(mockProduct) {
                                 setCartItems([{ id: 'demo-1', product: mockProduct, quantity: 1, selectedVariant: null }]);
                                 setView({ current: 'checkoutSummary' });
                             }
                        }
                    }
                } catch (error) {
                    console.error("Failed to sync with server cart", error);
                    loadLocalCart();
                } finally {
                    setIsLoadingCart(false);
                }
            } else {
                loadLocalCart();
            }
        };

        const loadLocalCart = () => {
            try {
                const storedCart = localStorage.getItem('vellaperfumeria_cart');
                if (storedCart) {
                    setCartItems(JSON.parse(storedCart));
                }
            } catch (error) {
                console.error("Failed to load cart from localStorage", error);
            }
        };

        initCart();

    }, [parseUrlParams]);

    // Handle Browser Back/Forward Buttons
    useEffect(() => {
        const handlePopState = () => {
            parseUrlParams();
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [parseUrlParams]);

    // Update URL when View Changes
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        // Preserve 'v' param
        const currentV = params.get('v');
        
        const newParams = new URLSearchParams();
        if (currentV) newParams.set('v', currentV);

        if (view.current === 'productDetail' && view.payload) {
            newParams.set('product_id', (view.payload as Product).id.toString());
        } else if (view.current === 'products' && view.payload && view.payload !== 'all') {
            newParams.set('category', view.payload);
        } else if (view.current === 'blogPost' && view.payload) {
             newParams.set('view', 'blogPost');
             newParams.set('post_id', view.payload.id);
        } else if (view.current !== 'home') {
            newParams.set('view', view.current);
        }

        const newSearch = newParams.toString();
        const newUrl = `${window.location.pathname}${newSearch ? '?' + newSearch : ''}`;
        
        // Only push state if the URL actually changed to avoid duplicate history entries
        if (newUrl !== window.location.pathname + window.location.search) {
             window.history.pushState({}, '', newUrl);
        }
    }, [view]);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        if (!isLoadingCart) {
            try {
                localStorage.setItem('vellaperfumeria_cart', JSON.stringify(cartItems));
            } catch (error) {
                console.error("Failed to save cart to localStorage", error);
            }
        }
    }, [cartItems, isLoadingCart]);
    
    // Scroll to top on view change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const handleNavigate = useCallback((newView: View, payload?: any) => {
        setView({ current: newView, payload });
    }, []);

    const handleProductSelect = (product: Product) => {
        handleNavigate('productDetail', product);
    };

    const handleAddToCart = (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        const cartItemId = selectedVariant 
            ? `${product.id}-${Object.values(selectedVariant).join('-')}`
            : `${product.id}`;
            
        const existingItem = cartItems.find(item => item.id === cartItemId);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { id: cartItemId, product, quantity: 1, selectedVariant }]);
        }
        
        setIsCartOpen(true);
    };
    
    const handleQuickAddToCart = (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        handleAddToCart(product, buttonElement, selectedVariant);
        if (!isCartOpen) setIsCartOpen(true);
    };

    // New: Buy Now Logic (Add & Navigate directly to Checkout)
    const handleBuyNow = (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => {
        const cartItemId = selectedVariant 
            ? `${product.id}-${Object.values(selectedVariant).join('-')}`
            : `${product.id}`;
            
        const existingItem = cartItems.find(item => item.id === cartItemId);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { id: cartItemId, product, quantity: 1, selectedVariant }]);
        }
        
        // Skip sidebar, go straight to checkout summary
        handleNavigate('checkoutSummary');
    };

    const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveItem(cartItemId);
        } else {
            setCartItems(cartItems.map(item =>
                item.id === cartItemId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const handleRemoveItem = (cartItemId: string) => {
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
    };

    // Checkout is now handled entirely in CartSidebar via direct redirect
    const handleCheckout = () => {
        handleNavigate('checkoutSummary');
        setIsCartOpen(false);
    };

    const handleSelectPost = (post: any) => {
        handleNavigate('blogPost', post);
    };

    const renderContent = () => {
        switch (view.current) {
            case 'home':
                return <ProductList onNavigate={handleNavigate} onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onBuyNow={handleBuyNow} currency={currency} onQuickView={setQuickViewProduct} />;
            case 'products':
                return <ShopPage initialCategory={view.payload || 'all'} currency={currency} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onBuyNow={handleBuyNow} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} />;
            case 'productDetail':
                return <ProductDetailPage product={view.payload} currency={currency} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onBuyNow={handleBuyNow} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} />;
            case 'ofertas':
                return <OfertasPage currency={currency} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onBuyNow={handleBuyNow} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} />;
            case 'ia':
                return <AsistenteIAPage cartItems={cartItems} />;
            case 'catalog':
                return <CatalogPage onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onBuyNow={handleBuyNow} onProductSelect={handleProductSelect} onQuickView={setQuickViewProduct} currency={currency} />;
            case 'blog':
                 return <BlogPage posts={blogPosts} onSelectPost={handleSelectPost} />;
            case 'blogPost':
                 return <BlogPostPage post={view.payload} allPosts={blogPosts} onSelectPost={handleSelectPost} onBack={() => handleNavigate('blog')} />;
            case 'checkoutSummary':
                return <CheckoutSummaryPage cartItems={cartItems} currency={currency} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onNavigate={handleNavigate} />;
            default:
                return <ProductList onNavigate={handleNavigate} onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} onQuickAddToCart={handleQuickAddToCart} onBuyNow={handleBuyNow} currency={currency} onQuickView={setQuickViewProduct} />;
        }
    };
    
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

    const buildBreadcrumbs = (): BreadcrumbItem[] => {
        const baseUrl = 'https://vellaperfumeria.com/tienda'; // Changed from root to /tienda
        const params = new URLSearchParams();
        if (vParam) params.append('v', vParam);
        const queryString = params.toString();
        const homeUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        
        const homeCrumb: BreadcrumbItem = { 
            label: 'Inicio', 
            href: homeUrl,
            target: '_self'
        };
        const crumbs = [homeCrumb];

        switch(view.current) {
            case 'home':
                crumbs.push({ label: 'Tienda' });
                break;
            case 'products':
                crumbs.push({ label: 'Tienda', onClick: () => handleNavigate('products', 'all') });
                if (view.payload && view.payload !== 'all') {
                    const categoryName = categories.find(c => c.key === view.payload)?.name || view.payload;
                    crumbs.push({ label: categoryName });
                }
                break;
            case 'productDetail':
                {
                    const product = view.payload as Product;
                    const categoryName = categories.find(c => c.key === product.category)?.name || product.category;
                    crumbs.push({ label: 'Tienda', onClick: () => handleNavigate('products', 'all') });
                    crumbs.push({ label: categoryName, onClick: () => handleNavigate('products', product.category) });
                    crumbs.push({ label: product.name });
                }
                break;
            case 'ofertas':
                crumbs.push({ label: 'Ideas Regalo' });
                break;
             case 'ia':
                crumbs.push({ label: 'Asistente IA' });
                break;
            case 'catalog':
                crumbs.push({ label: 'Catálogo' });
                break;
            case 'blog':
                crumbs.push({ label: 'Blog' });
                break;
            case 'blogPost':
                crumbs.push({ label: 'Blog', onClick: () => handleNavigate('blog') });
                crumbs.push({ label: view.payload.title });
                break;
            case 'checkoutSummary':
                crumbs.push({ label: 'Finalizar Compra' });
                break;
        }

        return crumbs;
    };

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-gray-800 relative">

            {/* Global Loader if connecting to "Server" */}
            {isLoadingCart && (
                <div className="fixed top-0 left-0 w-full h-1 bg-fuchsia-100 z-50">
                    <div className="h-full bg-fuchsia-600 animate-[loading_1s_ease-in-out_infinite]"></div>
                    <style>{`
                        @keyframes loading {
                            0% { width: 0%; margin-left: 0; }
                            50% { width: 50%; margin-left: 25%; }
                            100% { width: 0%; margin-left: 100%; }
                        }
                    `}</style>
                </div>
            )}

            {/* Floating WhatsApp Button */}
            <a 
                href="https://api.whatsapp.com/send?phone=34661202616&text=Hola,%20tengo%20una%20consulta%20sobre%20mi%20pedido%20en%20Vellaperfumeria."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-24 md:bottom-8 right-6 z-[60] bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center gap-2 group border-2 border-white"
                aria-label="Chat de WhatsApp"
            >
                <WhatsAppFloatIcon />
                <span className="hidden group-hover:inline-block font-bold whitespace-nowrap transition-all">Ayuda 661-202-616</span>
            </a>
            
             {/* Tech Info Button */}
             <button
                onClick={() => setShowTechInfo(!showTechInfo)}
                className="fixed bottom-4 left-4 z-50 text-[10px] bg-gray-200 hover:bg-gray-300 text-gray-600 px-2 py-1 rounded opacity-50 hover:opacity-100"
            >
                {showTechInfo ? 'Ocultar Info Técnica' : 'Info Técnica'}
            </button>
            {showTechInfo && (
                <div className="fixed bottom-12 left-4 z-50 bg-white p-4 rounded shadow-lg border text-xs max-w-sm">
                    <p><strong>Origen (CORS):</strong> {window.location.origin}</p>
                    <p><strong>API Configurada:</strong> {process.env.API_KEY ? 'Sí' : 'No'}</p>
                    <p className="mt-2 text-gray-500">Copia el Origen y añádelo a tu plugin WP CORS.</p>
                </div>
            )}

            <Header
                onNavigate={handleNavigate}
                currency={currency}
                onCurrencyChange={setCurrency}
                cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                onCartClick={() => setIsCartOpen(true)}
            />
             <main className="flex-grow py-8 mb-20 md:mb-0">
                <Breadcrumbs items={buildBreadcrumbs()} />
                {renderContent()}
            </main>
            <Footer onNavigate={handleNavigate} />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                currency={currency}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
                isCheckingOut={false}
                checkoutError={null}
                onNavigate={handleNavigate}
                onClearCart={() => setCartItems([])} 
            />

            <BottomNavBar onNavigate={handleNavigate} currentView={view.current} />

            {quickViewProduct && (
                <QuickViewModal
                    product={quickViewProduct}
                    currency={currency}
                    onClose={() => setQuickViewProduct(null)}
                    onAddToCart={handleAddToCart}
                    onProductSelect={(p) => {
                        setQuickViewProduct(null);
                        handleProductSelect(p);
                    }}
                />
            )}
            
            <style>{`
                :root {
                    --color-primary: #f78df685; /* Transparent Rose */
                    --color-primary-solid: #d946ef; /* Solid Rose */
                    --color-secondary: #ffffff; 
                    --color-accent: #c026d3; /* fuchsia-600 */
                }
                /* Global Selection Color */
                ::selection {
                    background-color: var(--color-primary-solid);
                    color: white;
                }
                
                .btn-primary {
                    background-color: var(--color-primary);
                    color: black !important;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    border: 2px solid var(--color-primary-solid);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .btn-primary:hover {
                    background-color: white;
                    color: var(--color-primary-solid) !important;
                    border-color: var(--color-primary-solid);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
                
                 .bg-brand-primary { background-color: var(--color-primary); }
                 .text-brand-primary { color: var(--color-primary-solid); }
                 
                 .bg-brand-secondary { background-color: var(--color-secondary); }
                 .text-brand-accent { color: var(--color-accent); }
                 
                 .border-brand-primary { border-color: var(--color-primary-solid); }
                 
                 .ring-brand-primary { --tw-ring-color: var(--color-primary-solid); }

                 .hover-underline-effect {
                    display: inline-block;
                    position: relative;
                 }
                 .hover-underline-effect::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    transform: scaleX(0);
                    height: 2px;
                    bottom: -2px;
                    left: 0;
                    background-color: var(--color-primary-solid);
                    transform-origin: bottom right;
                    transition: transform 0.25s ease-out;
                 }
                 .hover-underline-effect:hover::after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
                 }
                 .logo-inverted { filter: brightness(0) invert(1); }
                 @keyframes pop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.3); }
                    100% { transform: scale(1); }
                 }
                 .animate-pop {
                    animation: pop 0.3s ease-out;
                 }
            `}</style>
        </div>
    );
};

export default App;
