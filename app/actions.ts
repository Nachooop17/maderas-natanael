'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { v2 as cloudinary } from 'cloudinary'

// --- ESTA ES LA PARTE QUE FALTA ---
// Forzamos la configuración explícita para que no haya dudas
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
// ----------------------------------

export async function crearProducto(formData: FormData) {
  const nombre = formData.get("nombre") as string
  const precio = parseFloat(formData.get("precio") as string)
  const imagen = formData.get("imagen") as File

  let imagenUrl = ""

  if (imagen && imagen.size > 0) {
    try {
      const buffer = await imagen.arrayBuffer()
      const bytes = Buffer.from(buffer)

      // Subida a Cloudinary usando una Promesa para esperar la respuesta
      const resultado = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "productos-maderas" }, // Carpeta opcional
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        uploadStream.end(bytes)
      })

      imagenUrl = resultado.secure_url
    } catch (error) {
      console.error("Error subiendo imagen:", error)
      throw new Error("No se pudo subir la imagen")
    }
  }

  // Guardar en Base de Datos (Neon/Postgres)
  await prisma.producto.create({
    data: {
      nombre,
      precio,
      imagenUrl
    }
  })

  revalidatePath("/")
  revalidatePath("/admin")
  redirect("/admin")
}

export async function eliminarProducto(id: string) {
  const productoId = Number(id)
  if (Number.isNaN(productoId)) {
    throw new Error("Invalid product id")
  }

  await prisma.producto.delete({
    where: { id: productoId }
  })

  revalidatePath("/")
  revalidatePath("/admin")
}