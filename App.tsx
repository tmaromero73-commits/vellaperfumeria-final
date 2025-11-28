
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

const App: React.FC = () => {
    const [view, setView] = useState<AppView>({ current: 'home' });
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [currency, setCurrency] = useState<Currency>('EUR');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [isLoadingCart, setIsLoadingCart] = useState(false);

    // Navigation Logic
    const parseUrlParams = useCallback(() => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const v = urlParams.get('v');
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
            console.error("URL Parse Error", e);
        }
    }, []);

    useEffect(() => {
        parseUrlParams();
        const initCart = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const v = urlParams.get('v');
            if (v) {
                setIsLoadingCart(true);
                try {
                    const serverCart = await fetchServerCart(v);
                    if (serverCart && serverCart.length > 0) {
                        setCartItems(serverCart);
                        setView({ current: 'checkoutSummary' });
                    } else {
                        loadLocalCart();
                    }
                } catch (error) {
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
                if (storedCart) setCartItems(JSON.parse(storedCart));
            } catch (e) {}
        };
        initCart();
    }, [parseUrlParams]);

    useEffect(() => {
        const handlePopState = () => parseUrlParams();
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [parseUrlParams]);

    // Update URL logic
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
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

        const newUrl = `${window.location.pathname}${newParams.toString() ? '?' + newParams.toString() : ''}`;
        if (newUrl !== window.location.pathname + window.location.search) {
             window.history.pushState({}, '', newUrl);
        }
        window.scrollTo(0, 0);
    }, [view]);

    useEffect(() => {
        if (!isLoadingCart) {
            localStorage.setItem('vellaperfumeria_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoadingCart]);

    const handleNavigate = useCallback((newView: View, payload?: any) => {
        setView({ current: newView, payload });
    }, []);

    const handleAddToCart = (product: Product, btn: HTMLButtonElement | null, variant: Record<string, string> | null) => {
        const cartItemId = variant ? `${product.id}-${Object.values(variant).join('-')}` : `${product.id}`;
        const existing = cartItems.find(item => item.id === cartItemId);
        if (existing) {
            setCartItems(cartItems.map(item => item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCartItems([...cartItems, { id: cartItemId, product, quantity: 1, selectedVariant: variant }]);
        }
        setIsCartOpen(true);
    };

    const handleQuickAddToCart = (p: Product, b: HTMLButtonElement | null, v: Record<string, string> | null) => {
        handleAddToCart(p, b, v);
    };

    const handleBuyNow = (p: Product, b: HTMLButtonElement | null, v: Record<string, string> | null) => {
        // Add to cart logic first without opening sidebar
        const cartItemId = v ? `${p.id}-${Object.values(v).join('-')}` : `${p.id}`;
        const existing = cartItems.find(item => item.id === cartItemId);
        if (existing) {
            setCartItems(cartItems.map(item => item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCartItems([...cartItems, { id: cartItemId, product: p, quantity: 1, selectedVariant: v }]);
        }
        handleNavigate('checkoutSummary');
    };

    const handleUpdateQuantity = (id: string, qty: number) => {
        if (qty <= 0) {
            setCartItems(cartItems.filter(item => item.id !== id));
        } else {
            setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: qty } : item));
        }
    };

    const categories = [
        { key: 'all', name: 'Todos' }, { key: 'skincare', name: 'Facial' }, { key: 'makeup', name: 'Maquillaje' },
        { key: 'perfume', name: 'Fragancias' }, { key: 'wellness', name: 'Wellness' }
    ];

    const buildBreadcrumbs = (): BreadcrumbItem[] => {
        const crumbs: BreadcrumbItem[] = [{ label: 'Inicio', onClick: () => handleNavigate('home') }];
        if (view.current !== 'home') crumbs.push({ label: 'Tienda', onClick: () => handleNavigate('products', 'all') });
        if (view.current === 'checkoutSummary') crumbs.push({ label: 'Finalizar Compra' });
        return crumbs;
    };

    const renderContent = () => {
        const props = {
            currency,
            onAddToCart: handleAddToCart,
            onQuickAddToCart: handleQuickAddToCart,
            onBuyNow: handleBuyNow,
            onProductSelect: (p: Product) => handleNavigate('productDetail', p),
            onQuickView: setQuickViewProduct,
            onNavigate: handleNavigate
        };

        switch (view.current) {
            case 'home': return <ProductList {...props} />;
            case 'products': return <ShopPage initialCategory={view.payload || 'all'} {...props} />;
            case 'productDetail': return <ProductDetailPage product={view.payload} {...props} />;
            case 'ofertas': return <OfertasPage {...props} />;
            case 'ia': return <AsistenteIAPage cartItems={cartItems} />;
            case 'catalog': return <CatalogPage {...props} />;
            case 'blog': return <BlogPage posts={blogPosts} onSelectPost={(p) => handleNavigate('blogPost', p)} />;
            case 'blogPost': return <BlogPostPage post={view.payload} allPosts={blogPosts} onSelectPost={(p) => handleNavigate('blogPost', p)} onBack={() => handleNavigate('blog')} />;
            case 'checkoutSummary': return <CheckoutSummaryPage cartItems={cartItems} currency={currency} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={(id) => handleUpdateQuantity(id, 0)} onNavigate={handleNavigate} />;
            default: return <ProductList {...props} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-gray-800 relative">
            <a 
                href="https://api.whatsapp.com/send?phone=34661202616" 
                target="_blank" rel="noopener noreferrer"
                className="fixed bottom-24 md:bottom-8 right-6 z-[60] bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold hover:scale-105 transition-transform"
            >
                <span>💬 WhatsApp</span>
            </a>

            <Header onNavigate={handleNavigate} currency={currency} onCurrencyChange={setCurrency} cartCount={cartItems.reduce((a, i) => a + i.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
            
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
                onRemoveItem={(id) => handleUpdateQuantity(id, 0)} 
                onCheckout={() => { handleNavigate('checkoutSummary'); setIsCartOpen(false); }} 
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
                    onProductSelect={(p) => { setQuickViewProduct(null); handleNavigate('productDetail', p); }} 
                />
            )}
            
            <style>{`
                :root { --color-primary: #f78df685; --color-primary-solid: #d946ef; --color-secondary: #ffffff; --color-accent: #c026d3; }
                .btn-primary { background-color: var(--color-primary); color: black !important; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 600; border: 2px solid var(--color-primary-solid); }
                .btn-primary:hover { background-color: white; color: var(--color-primary-solid) !important; }
            `}</style>
        </div>
    );
};

export default App;
