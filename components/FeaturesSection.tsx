

import React from 'react';

// SVG Icons
const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 17a2 2 0 10-4 0 2 2 0 004 0zM19 17a2 2 0 10-4 0 2 2 0 004 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h2a1 1 0 001-1V7.572a1 1 0 00-.218-.671l-1.5-2.25a1 1 0 00-.868-.451H13v11z" />
    </svg>
);

const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m-6 0a2 2 0 00-2 2v11a2 2 0 002 2h6a2 2 0 002-2V10a2 2 0 00-2-2h-6z" />
    </svg>
);

const UserGroupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);


const FeaturesSection: React.FC = () => {
    const features = [
        {
            icon: <TruckIcon />,
            title: 'Envío GRATIS',
            description: 'Como Cliente VIP, consigues siempre envío gratis por pedidos superiores a 35€.',
        },
        {
            icon: <GiftIcon />,
            title: 'Programa de Fidelidad',
            description: 'En cada compra, recibirás Puntos Beauty para canjear por productos gratis.',
        },
        {
            icon: <UserGroupIcon />,
            title: 'Consejo Personalizado',
            description: 'Contacta con un Brand Partner siempre que lo necesites para resolver tus dudas.',
        }
    ];

    return (
        <section>
             <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-gray-50 flex items-center py-12 px-8 md:px-12 order-2 md:order-1">
                    <div className="max-w-md mx-auto space-y-8">
                         {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-6">
                                <div className="mt-1">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black mb-1">{feature.title}</h3>
                                    <p className="text-gray-700 text-base leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div 
                    className="order-1 md:order-2 min-h-[350px] md:min-h-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')" }}
                />
            </div>
        </section>
    );
};

export default FeaturesSection;