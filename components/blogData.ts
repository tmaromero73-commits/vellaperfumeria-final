
import React from 'react';

export interface BlogPost {
    id: number;
    title: string;
    author: string;
    date: string;
    category: string;
    imageUrl: string;
    headerImageUrl: string;
    excerpt: string;
    content: React.ReactNode;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: '4 Trucos de Maquillaje para las Fiestas',
        author: 'Vellaperfumeria',
        date: '25 de Junio, 2024',
        category: 'Maquillaje',
        imageUrl: 'https://images.unsplash.com/photo-1599948128635-131846430397?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
        headerImageUrl: 'https://images.unsplash.com/photo-1599948128635-131846430397?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
        excerpt: '¡Va quedando menos para la Navidad! Llegan fechas especiales y de celebración. ¿Necesitas una guía de maquillaje para las próximas fiestas? ¡No te preocupes! Estás a punto de aprender 4 trucos que potenciarán tu maquillaje de ahora en adelante.',
        content: React.createElement('div', { className: "space-y-6 text-lg leading-relaxed text-gray-800" },
            React.createElement('p', null, '¡Va quedando menos para la Navidad! Llegan fechas especiales y de celebración. ¿Necesitas una guía de maquillaje para las próximas fiestas? ¡No te preocupes! Estás a punto de aprender 4 trucos que potenciarán tu maquillaje de ahora en adelante. ¡No solo en Navidad! ¡Sigue leyendo!'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, '1. Detalles dorados'),
            React.createElement('p', null, 'Recuerda que los detalles dorados en los ojos son un acierto seguro para las fiestas. Aplica una sombra dorada en el párpado móvil para un toque de glamour instantáneo.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, '2. Piel jugosa y luminosa'),
            React.createElement('p', null, 'Una piel bien preparada es la base de cualquier buen maquillaje. Utiliza una prebase iluminadora y una base de acabado jugoso. No olvides el iluminador en los puntos altos del rostro para un extra de luz.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, '3. Labios protagonistas'),
            React.createElement('p', null, 'Unos labios rojos o en tonos vino son perfectos para las celebraciones. Para una mayor duración, perfila y rellena los labios con un lápiz del mismo tono antes de aplicar el labial.'),
            React.createElement('blockquote', { className: "border-l-4 border-fuchsia-300 pl-4 italic text-gray-600" }, 'Consejo: Si llevas unos labios potentes, opta por un maquillaje de ojos más sutil para equilibrar el look.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, '4. Mirada impactante'),
            React.createElement('p', null, 'Define bien tus cejas y no escatimes en la máscara de pestañas. Unas pestañas con volumen y bien definidas abrirán tu mirada y le darán un toque festivo y sofisticado.')
        ),
    },
    {
        id: 2,
        title: '¡Duerme bien! La Clave para una Piel Radiante',
        author: 'Vellaperfumeria',
        date: '22 de Junio, 2024',
        category: 'Salud y Cuerpo',
        imageUrl: 'https://images.unsplash.com/photo-1531385369587-190a0eb9338f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        headerImageUrl: 'https://images.unsplash.com/photo-1531385369587-190a0eb9338f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        excerpt: 'El descanso nocturno es tu mejor tratamiento de belleza. Descubre por qué dormir bien es indispensable para la salud y apariencia de tu piel.',
        content: React.createElement('div', { className: "space-y-6 text-lg leading-relaxed text-gray-800" },
            React.createElement('p', null, 'Cada día parece que surge una nueva tendencia en torno a la salud, pero este no es el caso. El descanso de la noche ha sido siempre un indispensable para nosotros ya que supone la recuperación del organismo después de un largo día. Además, durante las últimas dos décadas, se ha investigado en profundidad cómo el sueño afecta a nuestra piel.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, 'El Proceso de Reparación Nocturna'),
            React.createElement('p', null, 'Mientras dormimos, nuestra piel entra en modo de reparación. El flujo sanguíneo aumenta, lo que permite una mejor oxigenación y nutrición de las células. Es el momento en que se produce la mayor renovación celular y se sintetiza colágeno, la proteína que mantiene la piel firme y elástica.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, '¿Qué pasa si no duermes o suficiente?'),
             React.createElement('p', null, 'La falta de sueño provoca un aumento del cortisol, la hormona del estrés, que puede descomponer el colágeno y la elastina, acelerando la aparición de arrugas y flacidez. También puede manifestarse en forma de ojeras, bolsas y una piel más apagada y deshidratada.'),
            React.createElement('blockquote', { className: "border-l-4 border-fuchsia-300 pl-4 italic text-gray-600" }, 'Dormir entre 7 y 9 horas diarias es fundamental para que tu piel luzca descansada, luminosa y saludable.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, 'Potencia tu Descanso'),
            React.createElement('p', null, 'Para maximizar los beneficios del sueño, utiliza productos de cuidado nocturno. Una mascarilla de noche o una crema rica en activos reparadores ayudarán a tu piel en su proceso de regeneración, para que te despiertes con un rostro radiante.')
        ),
    },
    {
        id: 3,
        title: 'Tu Escote: ¿Sabes Cómo Cuidarlo?',
        author: 'Vellaperfumeria',
        date: '18 de Junio, 2024',
        category: 'Cuidado Facial',
        imageUrl: 'https://images.unsplash.com/photo-1512290746430-3ffb4fab31bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        headerImageUrl: 'https://images.unsplash.com/photo-1512290746430-3ffb4fab31bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        excerpt: 'A menudo olvidada, la piel del escote es delicada y necesita cuidados específicos. Aprende a mantenerla firme, suave y joven.',
        content: React.createElement('div', { className: "space-y-6 text-lg leading-relaxed text-gray-800" },
            React.createElement('p', null, 'Para muchas mujeres, el escote se convierte en una preocupación cuando envejecen. ¿Eres una de ellas? Sigue leyendo para descubrir más sobre esta zona de la piel y cómo cuidarla.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, 'El escote ¿qué es?'),
            React.createElement('p', null, 'El escote es la parte superior del pecho, la parte inferior del cuello y los hombros. Así como el rostro, esta zona está muy expuesta a los factores ambientales como el sol, lo que puede provocar un envejecimiento prematuro, manchas y pérdida de firmeza.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, 'Cuidados Esenciales para tu Escote'),
            React.createElement('ul', { className: "list-disc list-inside space-y-2 pl-4" },
                React.createElement('li', null, React.createElement('strong', null, 'Limpieza:'), ' No te olvides de limpiar esta zona a diario, igual que haces con tu rostro.'),
                React.createElement('li', null, React.createElement('strong', null, 'Exfoliación:'), ' Exfolia suavemente una vez por semana para eliminar células muertas y mejorar la textura.'),
                React.createElement('li', null, React.createElement('strong', null, 'Hidratación:'), ' Aplica tu crema hidratante corporal o una específica para el cuello y escote con movimientos ascendentes.'),
                React.createElement('li', null, React.createElement('strong', null, 'Protección solar:'), ' Es el paso más importante. Aplica protector solar a diario para prevenir el fotoenvejecimiento.')
            ),
            React.createElement('p', {className: "pt-4"}, 'Con estos sencillos pasos, mantendrás la piel de tu escote joven, firme y luminosa por más tiempo.')
        ),
    },
    {
        id: 4,
        title: 'Consigue tu Look de Ojos Ahumado con OnColour',
        author: 'Vellaperfumeria',
        date: '14 de Junio, 2024',
        category: 'Paso a Paso',
        imageUrl: 'https://images.unsplash.com/photo-1617895153857-82fe79adfcd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        headerImageUrl: 'https://images.unsplash.com/photo-1617895153857-82fe79adfcd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        excerpt: 'Crear un "smoky eye" puede dar miedo ¡lo entendemos! Para hacerlo más fácil, hemos creado unos pasos a seguir para que te sea más fácil.',
        content: React.createElement('div', { className: "space-y-6 text-lg leading-relaxed text-gray-800" },
            React.createElement('p', null, 'Crear un ahumado puede dar miedo ¡lo entendemos! Para hacerlo más fácil, hemos creado unos pasos a seguir para que te sea más fácil.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, 'Paso 1: ¡Empecemos!'),
            React.createElement('p', null, 'Usa el pincel para las sombras de ojos y aplica la sombra con precisión, así le darás intensidad. Aquí usamos la paleta de sombras de OnColour para un resultado espectacular.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, 'Paso 2: Define la Cuenca'),
            React.createElement('p', null, 'Con un tono de transición más claro, difumina la sombra en la cuenca del ojo para crear profundidad y un degradado suave. Este paso es clave para un ahumado bien integrado.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, 'Paso 3: Ilumina'),
            React.createElement('p', null, 'Aplica un punto de luz con una sombra clara y brillante en el lagrimal y en el arco de la ceja. Esto abrirá la mirada y le dará un toque de luz.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, 'Paso 4: Delinea y ¡Listo!'),
            React.createElement('p', null, 'Delinea las pestañas superiores e inferiores para enmarcar la mirada y aplica abundante máscara de pestañas. ¡Ya tienes tu look de ojos ahumado perfecto!')
        ),
    },
     {
        id: 5,
        title: 'Cómo Reparar el Cabello Dañado: Una Rutina Poderosa',
        author: 'Julie Gunn',
        date: '10 de Junio, 2024',
        category: 'Cuidado del Cabello',
        imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        headerImageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        excerpt: 'Las frecuentes decoloraciones, coloraciones y peinados con calor pueden dejar el cabello dañado. Descubre una rutina para revivirlo.',
        content: React.createElement('div', { className: "space-y-6 text-lg leading-relaxed text-gray-800" },
            React.createElement('p', null, 'Las frecuentes decoloraciones, coloraciones y peinados con calor pueden dejar el cabello dañado, quebradizo y sin vida. Afortunadamente, con los productos y la rutina adecuada, puedes devolverle la salud y el brillo a tu melena.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, '1. Hidratación Intensiva'),
            React.createElement('p', null, 'Utiliza champús y acondicionadores específicos para cabello dañado, ricos en ingredientes nutritivos como la queratina, aceites naturales y proteínas. Una vez por semana, aplica una mascarilla reparadora y déjala actuar durante al menos 20 minutos.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, '2. Reduce el uso de Calor'),
            React.createElement('p', null, 'Intenta limitar el uso de secadores, planchas y tenacillas. Cuando los uses, aplica siempre un protector térmico para minimizar el daño.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, '3. Cuidado al Desenredar'),
            React.createElement('p', null, 'Desenreda el cabello con suavidad, empezando por las puntas y subiendo hacia las raíces. Utiliza un peine de púas anchas o tus dedos, preferiblemente cuando el cabello esté húmedo y con acondicionador.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, '4. Sella las Puntas'),
            React.createElement('p', null, 'Aplica un sérum o aceite reparador en las puntas para sellar la cutícula, prevenir las puntas abiertas y aportar un extra de brillo y suavidad. ¡Tu cabello te lo agradecerá!')
        ),
    },
    {
        id: 6,
        title: '¿Por qué mis productos de cuidado facial hacen "pelotillas"?',
        author: 'Vellaperfumeria',
        date: '5 de Junio, 2024',
        category: 'Cuidado Facial',
        imageUrl: 'https://images.unsplash.com/photo-1556228852-6d45a7d8a341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        headerImageUrl: 'https://images.unsplash.com/photo-1556228852-6d45a7d8a341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        excerpt: '¿Alguna vez te has aplicado tus productos de cuidado facial y han comenzado a generar pelotillas? Descubre qué es el "pilling" y cómo evitarlo.',
        content: React.createElement('div', { className: "space-y-6 text-lg leading-relaxed text-gray-800" },
            React.createElement('p', null, '¿Alguna vez te has aplicado tus productos de cuidado facial y han comenzado a generar pelotillas como si se tratara de tu suéter de cachemira favorito? Si es así, eres otra víctima de los productos no absorbidos correctamente por tu piel. ¡Descubre qué es y cómo evitarlo!'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, '¿Qué es el "pilling"?'),
            React.createElement('p', null, 'El "pilling" ocurre cuando los productos de cuidado facial no se absorben bien y forman pequeños grumos o "pelotillas" en la superficie de la piel al frotarlos.'),
            React.createElement('h2', { className: "text-2xl font-bold pt-4" }, 'Causas Comunes'),
            React.createElement('ul', { className: "list-disc list-inside space-y-2 pl-4" },
                React.createElement('li', null, React.createElement('strong', null, 'Aplicar demasiado producto:'), ' La piel solo puede absorber una cantidad limitada.'),
                React.createElement('li', null, React.createElement('strong', null, 'No esperar lo suficiente:'), ' Hay que dar tiempo a que cada capa de producto se absorba antes de aplicar la siguiente.'),
                React.createElement('li', null, React.createElement('strong', null, 'Ingredientes incompatibles:'), ' Algunos ingredientes a base de silicona o polímeros pueden reaccionar entre sí.'),
                React.createElement('li', null, React.createElement('strong', null, 'Falta de exfoliación:'), ' Las células muertas impiden la correcta absorción.')
            ),
             React.createElement('h2', { className: "text-2xl font-bold pt-4" }, 'Cómo Evitarlo'),
            React.createElement('p', null, 'Aplica los productos a toquecitos en lugar de frotar, usa menos cantidad y espera un minuto entre cada producto. ¡Verás la diferencia!')
        ),
    }
];
