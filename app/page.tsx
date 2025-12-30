import { prisma } from "@/lib/prisma"
import RainingBackground from "./components/RainingBackground"; 

export default async function Home() {
  const productos = await prisma.producto.findMany({
    orderBy: { creadoEn: 'desc' }
  })

  const TELEFONO_TIENDA = "56931222885" 
  const MAPA_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3365.0695914480643!2d-70.6939053!3d-33.413384199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c41f6f3a7953%3A0x882702ba62dc17c2!2sAutop.%20Costanera%20Nte.%203393%2C%20Renca%2C%20Regi%C3%B3n%20Metropolitana!5e1!3m2!1ses-419!2scl!4v1767054694962!5m2!1ses-419!2scl"

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative z-10">
      
      <RainingBackground />

      {/* ENCABEZADO OPTIMIZADO */}
      {/* p-4 en móvil, p-8 en escritorio (md). Sticky solo si lo prefieres, aquí le bajé el tamaño */}
      <header className="bg-white shadow-sm p-4 md:p-8 text-center sticky top-0 z-20 transition-all">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Maderas Natanael
        </h1>
        <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-lg">
          Lo más nuevo en madera terapia
        </p>
      </header>

      {/* CUERPO PRINCIPAL */}
      {/* Menos padding lateral (px-4) en móvil para aprovechar el ancho */}
      <main className="max-w-6xl mx-auto px-4 py-6 md:p-6 flex-grow w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          
          {productos.map((prod) => (
            <div key={prod.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              
              {/* IMAGEN: Altura ajustada (h-52 en móvil, h-64 en PC) */}
              <div className="h-52 md:h-64 overflow-hidden relative bg-gray-100 group">
                <img 
                  src={prod.imagenUrl} 
                  alt={prod.nombre} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* INFO DEL PRODUCTO */}
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 leading-tight">{prod.nombre}</h3>
                    <p className="text-2xl md:text-3xl font-bold text-green-700 mt-1">${prod.precio}</p>
                </div>
                
                <div className="mt-auto">
                  <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${TELEFONO_TIENDA}?text=Hola Maderas Natanael! Me interesa *${prod.nombre}* ($${prod.precio}).`}
                    className="block w-full bg-green-600 active:bg-green-700 hover:bg-green-700 text-white text-center font-bold py-3 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-.967-.272-.099-.47-.149-.669.198-.198.347-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    Pedir por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}

          {productos.length === 0 && (
             <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300 mx-4">
              <p className="text-xl font-medium text-center">No hay productos en vitrina.</p>
              <p className="text-sm mt-2 text-center">Ingresa al panel de administrador para subir el primero.</p>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 mt-12 border-t border-gray-800 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Maderas Natanael</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Expertos en madera terapia, a la vanguardia de las últimas tendencias en diseño y único fabricante. 
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-4 w-full flex flex-col items-center md:items-start">
              <li>
                <a href="https://www.facebook.com/alejandro.maderoterapia.salas/" target="_blank" className="flex items-center gap-3 hover:text-green-500 transition-colors">
                  <div className="bg-gray-800 p-2 rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </div>
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/maderasnatanael/" target="_blank" className="flex items-center gap-3 hover:text-green-500 transition-colors">
                  <div className="bg-gray-800 p-2 rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@maderasnatanael" target="_blank" className="flex items-center gap-3 hover:text-green-500 transition-colors">
                  <div className="bg-gray-800 p-2 rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                  </div>
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col h-full">
            <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider">Ubicación</h3>
            <div className="flex-grow w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700 h-48 min-h-[200px]">
              <iframe 
                src={MAPA_URL}
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-gray-800 mt-8 text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Maderas Natanael. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}