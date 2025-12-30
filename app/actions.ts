'use server'

import { prisma } from "@/lib/prisma" // El @ apunta a la raiz ahora
import { revalidatePath } from "next/cache"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { v2 as cloudinary } from 'cloudinary'

// Función para guardar un producto
export async function crearProducto(formData: FormData) {
  const nombre = formData.get("nombre") as string
  const precio = parseFloat(formData.get("precio") as string)
  const archivo = formData.get("imagen") as File // <--- Ahora recibimos un ARCHIVO

  let imagenUrl = ""

  // Lógica de subida a Cloudinary
  if (archivo && archivo.size > 0) {
    // Convertimos el archivo a un formato que Cloudinary entienda
    const arrayBuffer = await archivo.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Subimos la imagen y esperamos la respuesta
    const respuesta: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (err, result) => {
        if (err) reject(err)
        resolve(result)
      }).end(buffer)
    })

    imagenUrl = respuesta.secure_url // <--- Aquí obtenemos el link real
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
export async function eliminarProducto(id: number) {
  await prisma.producto.delete({
    where: { id },
  })

  revalidatePath("/admin")
  revalidatePath("/")
}
export async function login(formData: FormData) {
  const password = formData.get("password") as string
  
  // AQUÍ DEFINES TU CONTRASEÑA MAESTRA
  // En el futuro, esto vendrá de una variable de entorno segura
  const CLAVE_SECRETA = "admin123" 

  if (password === CLAVE_SECRETA) {
    // Si la clave es correcta, creamos una cookie llamada "admin_session"
    (await
          // Si la clave es correcta, creamos una cookie llamada "admin_session"
          cookies()).set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // Dura 1 semana
      path: "/",
    })
    redirect("/admin")
  } else {
    // Si falla, no hacemos nada (o podrías retornar un error)
    console.log("Clave incorrecta")
  }
}

export async function logout() {
  (await cookies()).delete("admin_session")
  redirect("/")
}