import { login } from "../actions"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Acceso Dueño</h1>
        
        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Entrar
          </button>
        </form>
        
        <a href="/" className="block mt-4 text-center text-sm text-gray-500 hover:underline">
          ← Volver a la tienda
        </a>
      </div>
    </div>
  )
}