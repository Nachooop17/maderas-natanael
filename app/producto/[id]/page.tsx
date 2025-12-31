import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Esta función busca los datos del producto según el ID de la URL
async function obtenerProducto(id: string) {
  const producto = await prisma.producto.findUnique({
    where: { id },
  })
  if (!producto) return null
  return producto
}

export default async function PaginaProducto({ params }: { params: { id: string } }) {
  // Await params for Next.js 15+ compatibility (just in case) or direct access in 14
  const { id } = await params
  const producto = await obtenerProducto(id)

  if (!producto) {
    notFound()
  }

  // Mensaje para WhatsApp
  const mensajeWhatsapp = `Hola, me interesa el producto ${producto.nombre} que vi en la web.`
  const linkWhatsapp = `https://wa.me/569XXXXXXXX?text=${encodeURIComponent(mensajeWhatsapp)}`
  // RECUERDA CAMBIAR EL 569XXXXXXXX POR TU NÚMERO REAL

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Volver al catálogo
      </Link>

      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg">
        {/* Lado Izquierdo: Imagen Grande */}
        <div className="relative w-full h-96 md:h-[500px]">
          <Image
            src={producto.imagenUrl}
            alt={producto.nombre}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Lado Derecho: Info y Botón */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{producto.nombre}</h1>
          <p className="text-2xl text-green-600 font-semibold mb-6">
            ${producto.precio.toLocaleString("es-CL")}
          </p>
          
          <div className="prose max-w-none mb-8 text-gray-700">
            <h3 className="text-xl font-bold mb-2">Descripción:</h3>
            <p>{producto.descripcion || "Sin descripción disponible."}</p>
          </div>

          <a
            href={linkWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full text-center text-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Pedir por WhatsApp</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}