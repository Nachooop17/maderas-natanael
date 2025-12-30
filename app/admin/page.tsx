import { prisma } from "@/lib/prisma"
import { crearProducto, eliminarProducto } from "../actions"

export default async function AdminPage() {
  const productos = await prisma.producto.findMany({
    orderBy: { creadoEn: 'desc' }
  })

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8 text-white">Panel de Administración</h1>

      {/* SECCIÓN FORMULARIO */}
      {/* Agregamos 'text-gray-900' para que las letras sean oscuras */}
      <div className="bg-gray-100 p-6 rounded-lg mb-10 text-gray-900 shadow-md">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2">Agregar Nuevo Producto</h2>
        
        <form action={crearProducto} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Nombre del Producto</label>
            <input 
              name="nombre" 
              type="text" 
              required 
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white" 
              placeholder="Ej: Rodillo Masajeador" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Precio</label>
            <input 
              name="precio" 
              type="number" 
              required 
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white" 
              placeholder="9990" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Foto del Producto</label>
            <input 
              name="imagen" 
              type="file" 
              accept="image/*" 
              required 
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-700" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors mt-2"
          >
            Guardar Producto
          </button>
        </form>
      </div>

      {/* SECCIÓN LISTA DE PRODUCTOS */}
      <h2 className="text-xl font-semibold mb-4 text-white">Inventario Actual</h2>
      
      <div className="grid gap-4">
        {productos.map((prod) => (
          // Agregamos 'text-gray-900' aquí también
          <div key={prod.id} className="flex items-center justify-between border p-4 rounded-lg bg-white shadow-sm text-gray-900">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-200 rounded overflow-hidden">
                 <img src={prod.imagenUrl} alt={prod.nombre} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-lg">{prod.nombre}</p>
                <p className="text-green-600 font-bold">${prod.precio}</p>
              </div>
            </div>
            
            <form action={eliminarProducto.bind(null, prod.id)}>
              <button className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 px-3 py-1 rounded font-medium transition-colors">
                Eliminar
              </button>
            </form>
          </div>
        ))}
        
        {productos.length === 0 && (
          <p className="text-gray-400 italic text-center py-8">No hay productos todavía.</p>
        )}
      </div>
    </div>
  )
}