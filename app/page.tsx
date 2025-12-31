import { prisma } from "@/lib/prisma"
import RainingBackground from "./components/RainingBackground"; 
import Link from "next/link";
import Search from "./components/Search";

export const dynamic = 'force-dynamic';

// 1. Aquí recibimos los parámetros de búsqueda de la URL
export default async function Home({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  
  // 2. Extraemos el texto (o vacío si no hay nada)
  const query = searchParams?.q || '';

  // 3. Filtramos la base de datos
  const productos = await prisma.producto.findMany({
    where: {
      nombre: {
        contains: query,
        mode: 'insensitive', // Ignora mayúsculas/minúsculas
      },
    },
    orderBy: { creadoEn: 'desc' }
  })

  const TELEFONO_TIENDA = "56931222885" 
  const MAPA_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.815667123456!2d-70.6482!3d-33.4372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI2JzEzLjkiUyA3MMKwMzgnNTMuNSJX!5e0!3m2!1ses!2scl!4v1600000000000!5m2!1ses!2scl"
  // (Nota: Puse un mapa genérico de ejemplo porque el link anterior parecía roto, 
  // puedes volver a poner el tuyo si funciona).

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative z-10">
      
      <RainingBackground />

      {/* ENCABEZADO */}
      <header className="bg-white shadow-sm p-4 md:p-8 text-center sticky top-0 z-20 transition-all">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Maderas Natanael
        </h1>
        <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-lg">
          Lo más nuevo en maderoterapia
        </p>
      </header>

      {/* BUSCADOR */}
    {/*div className="max-w-md mx-auto my-8 px-4">
        <Search />
      </div> */}

      {/* CUERPO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-4 py-6 md:p-6 flex-grow w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          
          {productos.map((prod) => (
            <div key={prod.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              
              {/* IMAGEN */}
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
                    <p className="text-2xl md:text-3xl font-bold text-green-700 mt-1">${prod.precio.toLocaleString("es-CL")}</p>
                </div>
                
                <div className="mt-auto">
                  <Link
                    href={`/producto/${prod.id}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-3 rounded-lg transition-colors shadow-sm text-sm md:text-base"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {productos.length === 0 && (
             <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300 mx-4">
              <p className="text-xl font-medium text-center">No encontramos productos con ese nombre.</p>
              <Link href="/" className="text-blue-500 mt-2 hover:underline">Ver todos los productos</Link>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER - ICONOS RESTAURADOS AQUI */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 mt-12 border-t border-gray-800 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Maderas Natanael</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Expertos en maderoterapia, a la vanguardia de las últimas tendencias en diseño y único fabricante. 
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