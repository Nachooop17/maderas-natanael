'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { v2 as cloudinary } from 'cloudinary'

// --- CONFIGURACIÓN EXPLÍCITA (ESTO SOLUCIONA EL ERROR API_KEY) ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Función para guardar un producto
export async function crearProducto(formData: FormData) {
  const nombre = formData.get("nombre") as string
  const precio = parseFloat(formData.get("precio") as string)
  const archivo = formData.get("imagen") as File

  let imagenUrl = ""

  // Lógica de subida a Cloudinary
  if (archivo && archivo.size > 0) {
    try {
      const arrayBuffer = await archivo.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Subimos la imagen y esperamos la respuesta
      const respuesta: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "maderas-natanael" }, // Carpeta opcional para organizar
          (err, result) => {
            if (err) reject(err)
            resolve(result)
          }
        ).end(buffer)
      })

      imagenUrl = respuesta.secure_url
    } catch (error) {
      console.error("Error subiendo a Cloudinary:", error)
      throw new Error("Error al subir la imagen")
    }
  } else {
    // Imagen por defecto si no suben nada
    imagenUrl = "https://via.placeholder.com/300" 
  }

  await prisma.producto.create({
    data: {
      nombre,
      precio,
      imagenUrl,
    },
  })

  revalidatePath("/admin")
  revalidatePath("/")
}

// Función para borrar un producto
// CAMBIO IMPORTANTE: 'id' es string porque en Neon es TEXT
export async function eliminarProducto(id: string) {
  await prisma.producto.delete({
    where: { id },
  })

  revalidatePath("/admin")
  revalidatePath("/")
}

export async function login(formData: FormData) {
  const password = formData.get("password") as string
  
  // AQUÍ DEFINES TU CONTRASEÑA MAESTRA
  const CLAVE_SECRETA = "admin123" 

  if (password === CLAVE_SECRETA) {
    // Si la clave es correcta, creamos la cookie
    (await cookies()).set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // Dura 1 semana
      path: "/",
    })
    redirect("/admin")
  } else {
    console.log("Clave incorrecta")
  }
}

export async function logout() {
  (await cookies()).delete("admin_session")
  redirect("/")
}