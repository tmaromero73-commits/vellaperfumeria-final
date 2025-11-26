
import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';

interface HeroCarouselProps {
    onNavigate: (view: View, payload?: any) => void;
}

const slides = [
    {
        imageUrl: 'https://media-cdn.oriflame.com/digitalPromotionsMedia/images/banner-media/ES/20899847/20866148.jpg',
        title: 'Un aroma muy femenino para vivir la noche',
        subtitle: '¡NUEVO! EAU DE PARFUM DIVINE DARK VELVET',
        buttonText: 'VER AHORA',
        view: 'products' as View,
        payload: 'perfume',
    },
    {
        imageUrl: 'https://media-cdn.oriflame.com/digitalPromotionsMedia/images/banner-media/ES/20900001/20866153.jpg',
        title: 'La mejor belleza para lucirte',
        subtitle: '¡Favoritos con hasta un 50% dto!',
        buttonText: 'VER LOS PRODUCTOS',
        view: 'ofertas' as View,
    },
    {
        imageUrl: 'https://media-cdn.oriflame.com/digitalPromotionsMedia/images/banner-media/ES/20899692/21035391.jpg',
        title: '12 días. 12 sorpresas. La emoción de la Navidad',
        subtitle: 'Calendario de Adviento 2025',
        buttonText: 'Comprar',
        view: 'ofertas' as View,
    },
];

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


const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="w-full h-[60vh] max-h-[500px] m-auto relative group rounded-lg overflow-hidden shadow-lg">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col items-center justify-center text-center text-white p-8">
                            <h2 className="text-4xl lg:text-5xl font-extrabold mb-3 drop-shadow-xl">{slide.subtitle}</h2>
                            <p className="text-xl lg:text-2xl font-light mb-6 drop-shadow-lg">{slide.title}</p>
                            <button
                                onClick={() => onNavigate(slide.view, (slide as any).payload)}
                                className="bg-[#f78df685] text-black border-2 border-[#f78df6] font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#d946ef] transition-colors shadow-lg transform hover:scale-105"
                            >
                                {slide.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
                
                {/* Navigation Buttons */}
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 hover:bg-white/80 p-3 rounded-full text-black transition-all opacity-0 group-hover:opacity-100" aria-label="Anterior">
                    <ChevronLeftIcon />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 hover:bg-white/80 p-3 rounded-full text-black transition-all opacity-0 group-hover:opacity-100" aria-label="Siguiente">
                    <ChevronRightIcon />
                </button>

                {/* Dots */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-6 bg-white shadow-md' : 'w-2 bg-white/60 hover:bg-white'}`}
                            aria-label={`Ir a diapositiva ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
