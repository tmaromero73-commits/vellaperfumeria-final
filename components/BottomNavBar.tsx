

import React, { useState, useEffect } from 'react';
import type { View } from './types';

// Icons
const HomeIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 transition-transform duration-200" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const ShopIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 transition-transform duration-200" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const GiftIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 transition-transform duration-200" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m-6 0a2 2 0 00-2 2v11a2 2 0 002 2h6a2 2 0 002-2V10a2 2 0 00-2-2h-6z" />
    </svg>
);

const CatalogIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 transition-transform duration-200" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const HelpIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 transition-transform duration-200" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2 : 1.5}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 .863-.29 1.66-.785 2.298l-1.397 1.4c-.42.42-.663 1.004-.663 1.622v.51m-3.46-3.46a.75.75 0 011.06 0l2.5 2.5a.75.75 0 01-1.06 1.06l-2.5-2.5a.75.75 0 010-1.06zM12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);

interface BottomNavBarProps {
    onNavigate: (view: View, payload?: any) => void;
    currentView: View;
}

interface NavItem {
    view: View;
    label: string;
    icon: React.FC<{ isActive: boolean }>;
    payload?: any;
    isExternal?: boolean;
    href?: string;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onNavigate, currentView }) => {
    const [vParam, setVParam] = useState<string | null>(null);

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
    
    const navItems: NavItem[] = [
        { view: 'home', label: 'Inicio', icon: HomeIcon, payload: undefined, isExternal: true, href: homeUrl },
        { view: 'products', label: 'Tienda', icon: ShopIcon, payload: 'all' },
        { view: 'catalog', label: 'Catálogo', icon: CatalogIcon, payload: undefined },
        { view: 'ofertas', label: 'Ofertas', icon: GiftIcon, payload: undefined },
        { view: 'contact', label: 'Ayuda', icon: HelpIcon, payload: undefined }, 
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] z-50 pb-safe transition-all">
            <nav className="flex justify-around items-end h-[4.5rem] pb-2">
                {navItems.map(item => {
                    const isActive = !item.isExternal && (item.view === 'products'
                        ? (currentView === 'products' || currentView === 'productDetail')
                        : currentView === item.view);
                        
                    const Icon = item.icon;

                    const commonClasses = `flex flex-col items-center justify-center w-full h-full transition-all duration-200 active:scale-90 touch-manipulation ${
                                isActive ? 'text-fuchsia-600' : 'text-gray-500 hover:text-fuchsia-500'
                            }`;

                    if (item.isExternal && item.href) {
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_self"
                                className={commonClasses}
                                aria-label={item.label}
                            >
                                <div className={`p-1 rounded-full transition-all ${isActive ? 'bg-fuchsia-50' : ''}`}>
                                    <Icon isActive={isActive} />
                                </div>
                                <span className={`text-[10px] font-medium mt-1 leading-none transition-all ${isActive ? 'font-bold translate-y-0' : 'font-normal'}`}>{item.label}</span>
                            </a>
                        );
                    }

                    return (
                        <button
                            key={item.label}
                            onClick={() => {
                                onNavigate(item.view, item.payload);
                                window.scrollTo(0, 0);
                            }}
                            className={commonClasses}
                            aria-label={item.label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <div className={`p-1 rounded-full transition-all ${isActive ? 'bg-fuchsia-50' : ''}`}>
                                <Icon isActive={isActive} />
                            </div>
                            <span className={`text-[10px] font-medium mt-1 leading-none transition-all ${isActive ? 'font-bold translate-y-0' : 'font-normal'}`}>{item.label}</span>
                        </button>
                    )
                })}
            </nav>
        </div>
    );
};

export default BottomNavBar;
