

import React, { useState, useRef, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

// Social Icons
const ThreadsIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8.01 3.51c-1.35 0-2.45 1.1-2.45 2.45v.38c0 .28.22.5.5.5h1.5c.28 0 .5-.22.5-.5v-.38c0-.69.56-1.25 1.25-1.25h.19c.69 0 1.25.56 1.25 1.25v2.87c0 1.35-1.1 2.45-2.45 2.45h-.87c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5h.87c2.21 0 4-1.79 4-4V5.96c0-1.35-1.1-2.45-2.45-2.45h-2.12zm-3.09 3.1h-1.5c-.28 0-.5.22-.5.5v.38c0 1.35 1.1 2.45 2.45 2.45h.19c.69 0 1.25-.56 1.25-1.25V5.96c0-1.35-1.1-2.45-2.45-2.45H3.01c-1.35 0-2.45 1.1-2.45 2.45v2.12c0 2.21 1.79 4 4 4h.87c-.28 0-.5.22-.5.5v-1.5c0-.28-.22-.5-.5-.5h-.87c-.69 0-1.25-.56-1.25-1.25v-.38c0-.28-.22-.5-.5-.5z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919A118.663 118.663 0 0112 2.163zm0 1.442c-3.143 0-3.509.011-4.72.067-2.694.123-3.997 1.433-4.12 4.12C3.109 9.12 3.098 9.486 3.098 9.486 3.098 12c0 2.514.011 2.88.067 4.72.123 2.686 1.427 3.996 4.12 4.12 1.21.055 1.577.067 4.72.067 3.143 0 3.509-.011 4.72-.067 2.694-.123 3.997-1.433 4.12-4.12.056-1.84.067-2.206.067-4.72 0-2.514-.011-2.88-.067-4.72-.123-2.686-1.427-3.996-4.12-4.12-1.21-.055-1.577.067-4.72-.067zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.44a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 6.54a1.32 1.32 0 100-2.64 1.32 1.32 0 000 2.64z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z" />
    </svg>
);

const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CartIcon = () => (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const NavLink: React.FC<{ onClick?: () => void, href?: string, children: React.ReactNode, className?: string }> = ({ onClick, href, children, className }) => {
    if (href) {
        return (
            <a href={href} target="_self" className={`text-base font-medium text-black hover:text-[var(--color-primary-solid)] transition-colors duration-200 ${className}`}>
                <span className="hover-underline-effect">{children}</span>
            </a>
        );
    }
    return (
        <button onClick={onClick} className={`text-base font-medium text-black hover:text-[var(--color-primary-solid)] transition-colors duration-200 ${className}`}>
            <span className="hover-underline-effect">{children}</span>
        </button>
    );
};


interface HeaderProps {
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [cartPulse, setCartPulse] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [vParam, setVParam] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            setVParam(urlParams.get('v'));
        } catch (e) {
            console.error("Error extracting params", e);
        }
    }, []);

    const homeUrl = (() => {
        const baseUrl = 'https://vellaperfumeria.com/tienda'; // Changed from root to /tienda
        const params = new URLSearchParams();
        if (vParam) params.append('v', vParam);
        const queryString = params.toString();
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    })();

    useEffect(() => {
        if (cartCount > 0) {
            setCartPulse(true);
            const timer = setTimeout(() => setCartPulse(false), 500);
            return () => clearTimeout(timer);
        }
    }, [cartCount]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMobileNav = (view: View, payload?: any) => {
        onNavigate(view, payload);
        setIsMobileMenuOpen(false);
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-30">
            {/* Top Bar */}
            <div className="bg-[var(--color-primary)] text-black py-1 text-[10px] md:text-xs font-medium border-b border-fuchsia-200/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="hidden md:flex items-center space-x-3 text-black">
                        <span className="cursor-pointer hover:opacity-75 transition-opacity" aria-label="Threads"><ThreadsIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity" aria-label="Instagram"><InstagramIcon /></span>
                        <span className="cursor-pointer hover:opacity-75 transition-opacity" aria-label="Facebook"><FacebookIcon /></span>
                        <a href="https://api.whatsapp.com/send?phone=34661202616" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:opacity-75 transition-opacity" aria-label="WhatsApp"><WhatsAppIcon /></a>
                    </div>
                    <div className="block w-full text-center text-black">
                        <span>
                            <span className="font-extrabold text-black">BLACK FRIDAY</span> | Envío GRATIS +35€
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* MOBILE HEADER: Centered Logo, Left Menu, Right Cart */}
                <div className="md:hidden flex items-center justify-between py-3 relative">
                    <div className="z-20">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="text-black p-2">
                            <MenuIcon />
                        </button>
                    </div>

                    {/* Logo Centered Absolute for mobile */}
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        <a href={homeUrl} target="_self" className="pointer-events-auto block cursor-pointer transition-transform hover:scale-105 duration-300">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria Logo" 
                                className="h-24 w-auto object-contain" 
                            />
                        </a>
                    </div>

                    <div className="z-20">
                        <button 
                            className={`cart-dest-icon relative p-2 text-black hover:text-[var(--color-primary-solid)] transition-colors ${cartPulse ? 'animate-pop' : ''}`}
                            onClick={onCartClick}
                        >
                            <CartIcon />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-fuchsia-600 rounded-full border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* DESKTOP HEADER: Stacked Layout - Logo Centered Top, Nav Below */}
                <div className="hidden md:flex flex-col items-center py-4 relative">
                    {/* Row 1: Logo Centered */}
                    <div className="w-full flex justify-center items-center relative mb-4">
                        <a href={homeUrl} target="_self" className="block cursor-pointer transition-transform hover:scale-105 duration-300">
                            <img 
                                src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                alt="Vellaperfumeria Logo" 
                                className="h-28 w-auto object-contain" 
                            />
                        </a>

                        {/* Cart Icon - Absolute Right in the Logo Row */}
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                            <button 
                                className={`cart-dest-icon relative p-2 text-black hover:text-[var(--color-primary-solid)] transition-colors ${cartPulse ? 'animate-pop' : ''}`}
                                onClick={onCartClick}
                            >
                                <CartIcon />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-fuchsia-600 rounded-full border-2 border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Row 2: Navigation Menu Centered */}
                    <nav className="flex justify-center space-x-8 w-full border-t border-gray-100 pt-4">
                        <NavLink href={homeUrl}>Inicio</NavLink>
                        <NavLink onClick={() => onNavigate('products', 'all')}>Tienda</NavLink>
                        <NavLink onClick={() => onNavigate('ofertas')}>Ideas Regalo</NavLink>
                        <NavLink onClick={() => onNavigate('catalog')}>Catálogo</NavLink>
                        <NavLink onClick={() => onNavigate('ia')}>Asistente IA</NavLink>
                        <NavLink onClick={() => onNavigate('blog')}>Blog</NavLink>
                    </nav>
                </div>
            </div>
            
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div ref={navRef} className="absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out">
                        <div className="p-5 flex justify-between items-center border-b bg-[var(--color-secondary)]">
                            <span className="font-bold text-lg text-[var(--color-primary-solid)]">Menú</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto py-4">
                             <a href={homeUrl} target="_self" className="block px-6 py-3 text-lg font-medium text-gray-800 hover:bg-fuchsia-50 hover:text-[var(--color-primary-solid)]">Inicio</a>
                             <button onClick={() => handleMobileNav('products', 'all')} className="block w-full text-left px-6 py-3 text-lg font-medium text-gray-800 hover:bg-fuchsia-50 hover:text-[var(--color-primary-solid)]">Tienda</button>
                             <button onClick={() => handleMobileNav('ofertas')} className="block w-full text-left px-6 py-3 text-lg font-medium text-gray-800 hover:bg-fuchsia-50 hover:text-[var(--color-primary-solid)]">Ideas Regalo</button>
                             <button onClick={() => handleMobileNav('catalog')} className="block w-full text-left px-6 py-3 text-lg font-medium text-gray-800 hover:bg-fuchsia-50 hover:text-[var(--color-primary-solid)]">Catálogo</button>
                             <button onClick={() => handleMobileNav('ia')} className="block w-full text-left px-6 py-3 text-lg font-medium text-gray-800 hover:bg-fuchsia-50 hover:text-[var(--color-primary-solid)]">Asistente IA</button>
                             <button onClick={() => handleMobileNav('blog')} className="block w-full text-left px-6 py-3 text-lg font-medium text-gray-800 hover:bg-fuchsia-50 hover:text-[var(--color-primary-solid)]">Blog</button>
                             <button onClick={() => handleMobileNav('contact')} className="block w-full text-left px-6 py-3 text-lg font-medium text-gray-800 hover:bg-fuchsia-50 hover:text-[var(--color-primary-solid)]">Ayuda / Contacto</button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
