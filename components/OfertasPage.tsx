
import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

// Banner Data from provided HTML
const banners = [
    {
        id: 'black-friday',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=b4f0fbe7-2786-457d-b0d1-2fcf05e82f5b&name=1_Promo_split_Week1_600x450&inputFormat=jpg',
        title: 'Esta semana: Compra 2 con un 60% dto',
        buttonText: 'SOLO HASTA 25.11',
        action: 'scroll-black-friday'
    },
    {
        id: 'magical-midnights',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=10eada9f-b5ef-4854-911a-34f17f58b371&name=2_Promo_split_NewCollection_600x450&inputFormat=jpg',
        title: 'Nueva Colección especial Navidad',
        buttonText: 'COMPRA PARA BRILLAR',
        link: 'https://vellaperfumeria.com/plp/magical-midnights-collection'
    },
    {
        id: 'wellosophy-pack',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=e12555ba-0c42-4991-9821-7327bc9eae12&name=focus_banner_PWP&inputFormat=png',
        title: '¡Tu plan personalizado de nutrición!',
        buttonText: 'Ver más',
        link: 'https://vellaperfumeria.com/campaigns/editorials/wellosophy/personalised-wellness-pack'
    },
    {
        id: 'wellosophy-sub',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=b7da6e77-1fb1-46be-80cb-7bd1157cc06a&name=focus_banner_WS_bis&inputFormat=png',
        title: '¡Suscríbete a Wellosophy!',
        buttonText: 'Ver más',
        link: 'https://vellaperfumeria.com/go-to/wellosophy-nutrition-subscription'
    },
    {
        id: 'gift-sets',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=e6a950aa-3fef-457c-bcbf-1058993497d0&name=3_Promo_split_GiftSets_600x450&inputFormat=jpg',
        title: 'NUEVOS Sets perfectos para regalar',
        buttonText: 'COMPRAR REGALOS',
        link: 'https://vellaperfumeria.com/gift-ideas/gift-sets-and-bundles'
    },
    {
        id: 'novage',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=6efc6ae1-0a1d-4df6-97f8-d785fa0c0476&name=5_Promo_split_Novage_600x450&inputFormat=jpg',
        title: 'Contorno de Ojos con 40% dto',
        buttonText: 'ELIGE EL TUYO',
        link: 'https://vellaperfumeria.com/brands/novage-plus'
    },
    {
        id: 'duologi',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=df88458d-0b4f-4f26-80a4-bc41f7aade2b&name=6_Promo_split_Duologi_600x450&inputFormat=jpg',
        title: 'Pide tu Acondicionador (rico o ligero) Duologi por solo 6,99€ comprando un producto de la lista',
        buttonText: 'VER MÁS',
        action: 'scroll-duologi'
    },
    {
        id: 'deodorants',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=ff411183-8497-4756-bad2-c5de537fc1be&name=7_Promo_split_Backcover_600x450&inputFormat=jpg',
        title: 'Cada Roll On por solo 3,99€',
        buttonText: 'VER LA COLECCIÓN',
        link: 'https://vellaperfumeria.com/bath-body/deodorants-and-antiperspirants'
    }
];

// Acondicionadores Duologi (La Oferta)
const conditionerIds = [44960, 44961];
const conditionerProducts = allProducts.filter(p => conditionerIds.includes(p.id));

// Productos Selección (Trigger Products)
const triggerProductIds = [
    47440, 46987, 47009, // Love Nature Simple Joys
    46642, 46731, 45799, 45800, 47450, // Essense & Co
    46801, // Divine Dark Velvet
    46968, 46969, 46970, 46971, // Milk & Honey
    36151, // Tender Care
    47878, // Esponja
    47677, // Cepillo
    47202, // Crema Manos Pasión
];
const triggerProducts = allProducts.filter(p => triggerProductIds.includes(p.id));

// Black Friday Products
const blackFridayProductIds = [38557, 42236, 38556, 42255, 41059, 47104, 47006];
const blackFridayProducts = allProducts.filter(p => blackFridayProductIds.includes(p.id));


const OfertasPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, onAddToCart, onQuickAddToCart, onBuyNow, onProductSelect, onQuickView }) => {

    const handleBannerClick = (banner: typeof banners[0]) => {
        if (banner.action === 'scroll-duologi') {
            const element = document.getElementById('duologi-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (banner.action === 'scroll-black-friday') {
            const element = document.getElementById('black-friday-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (banner.link) {
            window.open(banner.link, '_self');
        }
    };

    return (
        <div className="bg-white min-h-screen">
             {/* Header Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-6">Solo las mejores ofertas</h1>
                </div>
                
                {/* Tabs / Navigation Visual */}
                <div className="border-b border-gray-200 mb-6">
                    <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
                        <button className="border-b-2 border-brand-primary text-brand-primary font-semibold py-2 px-1 whitespace-nowrap">
                            Solo las mejores ofertas
                        </button>
                    </div>
                </div>

                {/* Intro Text */}
                <div className="mb-8 text-gray-700 text-base leading-relaxed max-w-4xl">
                    <p>Si buscas gangas y descuentos, ¡estás en el lugar adecuado! Hemos reunido aquí todas las mejores ofertas de la campaña actual para que no te pierdas ninguna.</p>
                </div>
            </div>

            {/* Banners Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {banners.map((banner) => (
                         <div 
                            key={banner.id} 
                            className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
                            onClick={() => handleBannerClick(banner)}
                         >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img 
                                    src={banner.imageUrl} 
                                    alt={banner.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
                                <h3 className="text-xl font-bold mb-4 leading-tight shadow-black drop-shadow-md">
                                    {banner.title}
                                </h3>
                                <button className="bg-[#f78df685] text-black border-2 border-[#f78df6] font-bold py-2 px-6 rounded-sm uppercase text-sm tracking-wider hover:bg-white hover:text-[#d946ef] transition-colors shadow-lg">
                                    {banner.buttonText}
                                </button>
                            </div>
                         </div>
                    ))}
                </div>
            </div>

            {/* Black Friday Section */}
            <div id="black-friday-section" className="bg-fuchsia-50 py-12 border-t border-fuchsia-100 scroll-mt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider mb-4">Black Friday</span>
                        <h2 className="text-3xl font-extrabold text-black mb-4">Compra 2 con un 60% Dto.</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Combina tus favoritos de esta selección y llévatelos con un descuento espectacular.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {blackFridayProducts.map(product => (
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
            </div>

            {/* Duologi Interactive Section */}
            <div id="duologi-section" className="bg-white py-12 border-t border-gray-100 scroll-mt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-black mb-4">Configura tu Pack Duologi</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            1. Añade uno de los productos de selección a tu cesta.<br/>
                            2. ¡Llévate tu acondicionador favorito por solo 6,99€!
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-10">
                        {/* Step 1: The Trigger Products */}
                        <div className="lg:col-span-8">
                             <div className="flex items-center gap-3 mb-6 border-b border-fuchsia-200 pb-4">
                                <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">1</div>
                                <h3 className="text-xl font-bold text-gray-900">Elige tu producto de selección</h3>
                             </div>
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {triggerProducts.slice(0, 6).map(product => (
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

                        {/* Step 2: The Reward */}
                        <div className="lg:col-span-4 bg-fuchsia-50 rounded-xl p-6 border border-fuchsia-100 h-fit sticky top-24 shadow-sm">
                             <div className="flex items-center gap-3 mb-6 border-b border-fuchsia-100 pb-4">
                                <div className="bg-brand-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">2</div>
                                <h3 className="text-xl font-bold text-gray-900">Elige tu Acondicionador</h3>
                             </div>
                             <div className="space-y-6">
                                {conditionerProducts.map(product => (
                                    <div key={product.id} className="relative">
                                         <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                                            SOLO 6,99€
                                        </div>
                                        <ProductCard
                                            product={product}
                                            currency={currency}
                                            onAddToCart={onAddToCart}
                                            onQuickAddToCart={onQuickAddToCart}
                                            onBuyNow={onBuyNow}
                                            onProductSelect={onProductSelect}
                                            onQuickView={onQuickView}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfertasPage;
