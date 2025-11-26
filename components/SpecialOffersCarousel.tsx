

import React, { useState, useEffect, useCallback } from 'react';
import type { Product } from './types';
import { allProducts } from './products';

interface SpecialOffersCarouselProps {
    onProductSelect?: (product: Product) => void;
}

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const slides = [
    {
        id: 1,
        title: "¡OFERTA ESTRELLA!",
        subtitle: "Tu Acondicionador Duologi por solo 6,99€",
        description: "Compra cualquier producto de la selección inferior y activa el precio especial.",
        buttonText: "Ver Selección",
        image: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F44961%2F44961_1.png",
        bgClass: "bg-fuchsia-100",
        textClass: "text-fuchsia-900",
        buttonClass: "bg-[#f78df685] text-black hover:bg-white hover:text-[#d946ef] border-2 border-[#f78df6]",
        targetId: "seleccion-oferta"
    },
    {
        id: 2,
        title: "LOVE NATURE SIMPLE JOYS",
        subtitle: "Nuevos Geles de Ducha Orgánicos",
        description: "Fresa, Mango y Aloe Vera. Aromas irresistibles para tu piel desde 4,99€.",
        buttonText: "Descubrir",
        image: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47440%2F47440_1.png",
        bgClass: "bg-fuchsia-50", 
        textClass: "text-fuchsia-900",
        buttonClass: "bg-[#f78df685] text-black hover:bg-white hover:text-[#d946ef] border-2 border-[#f78df6]",
        targetId: "seleccion-oferta" 
    },
    {
        id: 3,
        title: "DIVINE DARK VELVET",
        subtitle: "La esencia de la noche",
        description: "Nueva Eau de Parfum. Sofisticada, elegante y seductora.",
        buttonText: "Ver Fragancia",
        image: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46801%2F46801_1.png",
        bgClass: "bg-fuchsia-50", 
        textClass: "text-fuchsia-900",
        buttonClass: "bg-[#f78df685] text-black hover:bg-white hover:text-[#d946ef] border-2 border-[#f78df6]",
        targetId: null,
        productId: 46801
    }
];

const SpecialOffersCarousel: React.FC<SpecialOffersCarouselProps> = ({ onProductSelect }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
        setTouchStart(0);
        setTouchEnd(0);
    };

    const handleButtonClick = (slide: typeof slides[0]) => {
        if (slide.targetId) {
            const element = document.getElementById(slide.targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (slide.productId && onProductSelect) {
            const product = allProducts.find(p => p.id === slide.productId);
            if (product) {
                onProductSelect(product);
            }
        }
    };

    return (
        <div 
            className="relative w-full h-[450px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl mb-12 group border border-fuchsia-100 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
             {slides.map((slide, index) => (
                <div 
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${slide.bgClass}`}
                >
                    <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 gap-6">
                        <div className={`md:w-1/2 text-center md:text-left space-y-4 ${slide.textClass} ${index === currentIndex ? 'animate-fade-in-up' : ''}`}>
                            <span className="inline-block py-1 px-3 rounded-full bg-white/80 text-xs font-bold tracking-widest mb-2 shadow-sm uppercase text-black">
                                Catálogo 16
                            </span>
                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">{slide.title}</h2>
                            <h3 className="text-lg md:text-2xl font-semibold opacity-90">{slide.subtitle}</h3>
                            <p className="text-base md:text-lg opacity-80 max-w-md mx-auto md:mx-0">{slide.description}</p>
                            <button 
                                onClick={() => handleButtonClick(slide)}
                                className={`mt-6 px-8 py-3 rounded-full font-bold shadow-lg transition-transform transform hover:scale-105 active:scale-95 ${slide.buttonClass}`}
                            >
                                {slide.buttonText}
                            </button>
                        </div>
                        <div className="md:w-1/2 h-full flex items-center justify-center relative">
                            {/* Decorate circles behind image */}
                            <div className="absolute w-64 h-64 bg-white/40 rounded-full blur-3xl -z-10 transform scale-150"></div>
                            <img 
                                src={slide.image} 
                                alt={slide.title} 
                                className={`max-h-[200px] md:max-h-[320px] w-auto object-contain drop-shadow-2xl transform transition-transform duration-1000 ${index === currentIndex ? 'scale-105' : 'scale-95'}`} 
                            />
                        </div>
                    </div>
                </div>
             ))}

             <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white p-2 md:p-3 rounded-full text-black backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md" aria-label="Anterior">
                <ChevronLeftIcon />
             </button>
             <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white p-2 md:p-3 rounded-full text-black backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md" aria-label="Siguiente">
                <ChevronRightIcon />
             </button>

             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((slide, index) => (
                    <button 
                        key={slide.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-black' : 'w-2 bg-black/30 hover:bg-black/50'}`}
                        aria-label={`Ir a diapositiva ${index + 1}`}
                    />
                ))}
             </div>
             
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default SpecialOffersCarousel;
