
import React from 'react';
import type { View } from './types';

interface InteractiveCatalogSectionProps {
    onNavigate: (view: View) => void;
}

const InteractiveCatalogSection: React.FC<InteractiveCatalogSectionProps> = ({ onNavigate }) => {
    const catalogCoverUrl = 'https://cdn.ipaper.io/iPaper/Papers/0ae94f9f-dbf1-41ce-8890-85ef3c56310d/Pages/1/Zoom.jpg';

    return (
        <section>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-black tracking-tight">Nuestro Catálogo Digital</h2>
                <p className="mt-2 text-lg text-gray-600">Haz clic en la portada para descubrir las últimas novedades y ofertas.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
                <div 
                    onClick={() => onNavigate('catalog')}
                    className="relative aspect-[1.5/1] md:aspect-[4/3] bg-gray-100 rounded-lg shadow-lg overflow-hidden border w-full max-w-xl mx-auto group cursor-pointer transform hover:-translate-y-2 transition-transform duration-300"
                    role="button"
                    aria-label="Ver catálogo"
                >
                    <img
                        src={catalogCoverUrl}
                        alt="Portada del Catálogo de BeautyShopVella"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="text-white text-lg font-bold bg-black/50 px-6 py-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                            Ver Catálogo
                        </div>
                    </div>
                </div>

                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Descubre las Últimas Novedades</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
                        Explora nuestro catálogo digital más reciente. Hojea las páginas, descubre productos y encuentra ofertas exclusivas.
                    </p>
                    <button
                        onClick={() => onNavigate('catalog')}
                        className="inline-block bg-[var(--color-secondary)] text-black font-semibold py-3 px-8 rounded-md shadow-sm hover:bg-[#E0CDBF] transition-colors"
                    >
                        Ver Catálogo Completo
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InteractiveCatalogSection;
