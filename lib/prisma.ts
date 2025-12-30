import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Definimos la función que crea la conexión
const prismaClientSingleton = () => {
  // Si estamos en Vercel (Producción), usamos el adaptador de Turso
  if (process.env.NODE_ENV === 'production') {
    const adapter = new PrismaLibSql({
      url: process.env.DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN
    })
    return new PrismaClient({ adapter })
  }
  
  // Si estamos en tu PC, usamos la base de datos normal
  return new PrismaClient()
}

export const prisma = globalForPrisma.prisma || prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma