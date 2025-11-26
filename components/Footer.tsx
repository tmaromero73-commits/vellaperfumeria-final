
import React, { useState, useEffect } from 'react';
import type { View } from './types';

const ThreadsIcon = () => (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8.01 3.51c-1.35 0-2.45 1.1-2.45 2.45v.38c0 .28.22.5.5.5h1.5c.28 0 .5-.22.5-.5v-.38c0-.69.56-1.25 1.25-1.25h.19c.69 0 1.25.56 1.25 1.25v2.87c0 1.35-1.1 2.45-2.45 2.45h-.87c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5h.87c2.21 0 4-1.79 4-4V5.96c0-1.35-1.1-2.45-2.45-2.45h-2.12zm-3.09 3.1h-1.5c-.28 0-.5.22-.5.5v.38c0 1.35 1.1 2.45 2.45 2.45h.19c.69 0 1.25-.56 1.25-1.25V5.96c0-1.35-1.1-2.45-2.45-2.45H3.01c-1.35 0-2.45 1.1-2.45 2.45v2.12c0 2.21 1.79 4 4 4h.87c-.28 0-.5.22-.5.5v-1.5c0-.28-.22-.5-.5-.5h-.87c-.69 0-1.25-.56-1.25-1.25v-.38c0-.28-.22-.5-.5-.5z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919A118.663 118.663 0 0112 2.163zm0 1.442c-3.143 0-3.509.011-4.72.067-2.694.123-3.997 1.433-4.12 4.12C3.109 9.12 3.098 9.486 3.098 9.486 3.098 12c0 2.514.011 2.88.067 4.72.123 2.686 1.427 3.996 4.12 4.12 1.21.055 1.577.067 4.72.067 3.143 0 3.509-.011 4.72-.067 2.694-.123 3.997-1.433 4.12-4.12.056-1.84.067-2.206.067-4.72 0-2.514-.011-2.88-.067-4.72-.123-2.686-1.427-3.996-4.12-4.12-1.21-.055-1.577.067-4.72-.067zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.44a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 6.54a1.32 1.32 0 100-2.64 1.32 1.32 0 000 2.64z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z" />
    </svg>
);

const VisaIcon = () => (
    <svg className="w-10 h-6" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <rect width="38" height="24" rx="2" fill="white"/>
       <path d="M15.5 15.5L13.5 4.5H11.5L9 10.5L7.5 6.5L7 4.5H5L8.5 15.5H11L13 9.5L14.5 4.5H15.5V15.5Z" fill="#1A1F71"/>
       <path d="M20.5 15.5L22.5 4.5H20.5L19.5 9L18.5 4.5H16.5L18.5 15.5H20.5Z" fill="#1A1F71"/>
       <path d="M26.5 15.5L28.5 4.5H26.5L25 8.5L23.5 4.5H21.5L23.5 15.5H26.5Z" fill="#1A1F71"/>
       <path d="M32.5 4.5H29.5L28.5 9L27.5 4.5H25.5L28.5 15.5H30.5L34.5 4.5H32.5Z" fill="#1A1F71"/>
       <path d="M11 15.5L13 4.5H15L13 15.5H11Z" fill="#1A1F71"/>
       <path d="M25.7 6.8C25.2 6.6 24.6 6.5 24 6.5C22.6 6.5 21.5 7.2 21.5 8.6C21.5 9.6 22.4 10.2 23.1 10.5C23.8 10.8 24 11 24 11.3C24 11.7 23.6 11.9 23.1 11.9C22.5 11.9 22 11.8 21.6 11.6L21.3 12.8C21.8 13 22.5 13.1 23.1 13.1C24.7 13.1 25.8 12.3 25.8 10.9C25.8 9.8 25.1 9.2 24.3 8.9C23.6 8.6 23.3 8.3 23.3 8C23.3 7.7 23.7 7.5 24.1 7.5C24.6 7.5 25 7.6 25.4 7.8L25.7 6.8Z" fill="#1A1F71"/>
       <path d="M30.6 6.5H28.9L28 11.5L28.9 6.5Z" fill="#1A1F71"/>
       <path d="M32.9 6.5L32.5 8.6C32.3 7.9 32.1 7.2 31.8 6.5H30.2L30.6 8.6L30.2 11.5L31.1 6.5Z" fill="#1A1F71"/>
    </svg>
);

const MastercardIcon = () => (
    <svg className="w-10 h-6" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="2" fill="white"/>
        <circle cx="13" cy="12" r="7" fill="#EB001B"/>
        <circle cx="25" cy="12" r="7" fill="#F79E1B"/>
        <path d="M19 16.4C20.3 15.4 21.2 13.8 21.2 12C21.2 10.2 20.3 8.6 19 7.6C17.7 8.6 16.8 10.2 16.8 12C16.8 13.8 17.7 15.4 19 16.4Z" fill="#FF5F00"/>
    </svg>
);

const PayPalIcon = () => (
    <svg className="w-10 h-6" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="2" fill="white"/>
        <path d="M26.5 7.5L23.5 7.5L22.5 13.5L26.5 7.5Z" fill="#003087"/>
        <path d="M22.5 13.5L20.5 13.5L21.5 7.5L24.5 7.5L22.5 13.5Z" fill="#003087"/>
        <path d="M14.5 7.5C15.5 7.5 16.5 8 16.5 9.5C16.5 10.5 16 11.5 15 11.5H13.5L14.5 7.5Z" fill="#003087"/>
        <path d="M10.5 7.5H13.5L12.5 13.5H9.5L10.5 7.5Z" fill="#003087"/>
        <path d="M13 12.5H11.5L12 9.5L13 12.5Z" fill="#009CDE"/>
        <path d="M16 10.5C16 11.5 15.5 12.5 14.5 12.5H13L13.5 9.5H15C15.5 9.5 16 9.8 16 10.5Z" fill="#009CDE"/>
        <path d="M20 7.5L18 13.5H16.5L18.5 7.5H20Z" fill="#009CDE"/>
    </svg>
);


interface FooterProps {
    onNavigate: (view: View, payload?: any) => void;
}

const FooterLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <li>
        <button 
            onClick={onClick}
            className="text-gray-400 hover:text-white transition-colors hover:underline"
        >
            {children}
        </button>
    </li>
);

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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

    return (
        <footer className="bg-black border-t border-gray-800 text-white font-sans">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
                    <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center text-center md:items-center md:text-center">
                         <a 
                             href={homeUrl}
                             target="_self"
                             className="inline-block hover:opacity-80 transition-opacity mb-4 cursor-pointer"
                         >
                             <img src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" alt="Vellaperfumeria Logo" className="h-36 w-auto mx-auto" />
                         </a>
                        <h2 className="text-xl font-bold tracking-wider text-white">Vellaperfumeria</h2>
                        <p className="text-gray-400 text-sm mt-2">
                            Tu esencia, tu belleza, tu tienda.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-base font-bold tracking-widest uppercase mb-4 text-white">Navegación</h3>
                        <ul className="space-y-2 text-sm">
                           <li>
                                <a
                                    href={homeUrl}
                                    target="_self"
                                    className="text-gray-400 hover:text-white transition-colors hover:underline"
                                >
                                    Inicio
                                </a>
                            </li>
                           <FooterLink onClick={() => onNavigate('products', 'all')}>Tienda</FooterLink>
                           <FooterLink onClick={() => onNavigate('products', 'skincare')}>Cuidado Facial</FooterLink>
                           <FooterLink onClick={() => onNavigate('products', 'makeup')}>Maquillaje</FooterLink>
                           <FooterLink onClick={() => onNavigate('products', 'perfume')}>Fragancias</FooterLink>
                           <FooterLink onClick={() => onNavigate('products', 'wellness')}>Wellness</FooterLink>
                           <FooterLink onClick={() => onNavigate('ofertas')}>Ideas Regalo</FooterLink>
                           <FooterLink onClick={() => onNavigate('catalog')}>Catálogo</FooterLink>
                           <FooterLink onClick={() => onNavigate('ia')}>Asistente IA</FooterLink>
                        </ul>
                    </div>

                     <div>
                        <h3 className="text-base font-bold tracking-widest uppercase mb-4 text-white">Ayuda</h3>
                        <ul className="space-y-2 text-sm">
                            <FooterLink onClick={() => onNavigate('about')}>Sobre Nosotros</FooterLink>
                            <FooterLink onClick={() => onNavigate('contact')}>Contacto</FooterLink>
                            <FooterLink onClick={() => onNavigate('blog')}>Blog</FooterLink>
                            <li className="text-gray-500">Política de Privacidad</li>
                        </ul>
                    </div>

                     <div>
                        <h3 className="text-base font-bold tracking-widest uppercase mb-4 text-white">Síguenos</h3>
                        <div className="flex justify-center md:justify-start space-x-4 text-white mb-6">
                           <span className="cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-110" aria-label="Threads"><ThreadsIcon /></span>
                           <span className="cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-110" aria-label="Instagram"><InstagramIcon /></span>
                           <span className="cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-110" aria-label="Facebook"><FacebookIcon /></span>
                           <a href="https://api.whatsapp.com/send?phone=34661202616" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-110" aria-label="WhatsApp"><WhatsAppIcon /></a>
                        </div>
                        
                        <h3 className="text-base font-bold tracking-widest uppercase mb-4 text-white">Métodos de Pago</h3>
                        <div className="flex justify-center md:justify-start space-x-2">
                            <VisaIcon />
                            <MastercardIcon />
                            <PayPalIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black border-t border-gray-800 py-6 text-center text-sm text-gray-500">
                <div className="container mx-auto px-4">
                    <p>&copy; {new Date().getFullYear()} Vellaperfumeria. Todos los derechos reservados.</p>
                    <p className="mt-2 text-xs font-mono text-gray-600">Versión Actualizada v2.0 (Live)</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
