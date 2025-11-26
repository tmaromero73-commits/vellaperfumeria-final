import React, { useEffect, useRef } from 'react';

const CloseIcon = () => (
    <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface ImageLightboxProps {
    imageUrl: string;
    altText: string;
    onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ imageUrl, altText, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Focus the modal for accessibility
        modalRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Vista ampliada de la imagen"
            tabIndex={-1}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20"
                aria-label="Cerrar vista ampliada"
            >
                <CloseIcon />
            </button>

            <div
                className="relative max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
            >
                <img
                    src={imageUrl}
                    alt={altText}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-in"
                />
            </div>
            <style>
            {`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out forwards;
                }
                @keyframes scale-in {
                    from { transform: scale(0.95); }
                    to { transform: scale(1); }
                }
                .animate-scale-in {
                    animation: scale-in 0.2s ease-out forwards;
                }
            `}
            </style>
        </div>
    );
};

export default ImageLightbox;
