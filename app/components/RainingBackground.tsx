'use client';

import { useEffect, useState } from 'react';

// CAMBIO AQUÍ: Usamos la ruta local (Next.js busca automáticamente en la carpeta public)
const IMAGE_URL = "/maderoterapia (1).png"; 

const NUM_DROPS = 30; 

export default function RainingBackground() {
  const [drops, setDrops] = useState<any[]>([]);

  useEffect(() => {
    // ... (El resto del código sigue exactamente igual) ...
    const newDrops = Array.from({ length: NUM_DROPS }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw', 
      animationDuration: Math.random() * 10 + 5 + 's', 
      animationDelay: Math.random() * -15 + 's', 
      opacity: Math.random() * 0.3 + 0.1, 
      scale: Math.random() * 0.5 + 0.5, 
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-[-10%]"
          style={{
            left: drop.left,
            opacity: drop.opacity,
            transform: `scale(${drop.scale})`,
            animation: `fall ${drop.animationDuration} linear infinite ${drop.animationDelay}`,
          }}
        >
          {/* Aquí la etiqueta img usará la ruta local "/madera.png" */}
          <img 
            src={IMAGE_URL} 
            alt="" 
            className="w-16 h-16 object-contain" 
          />
        </div>
      ))}
    </div>
  );
}