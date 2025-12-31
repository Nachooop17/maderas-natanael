'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    // Agregamos un form con preventDefault para controlar el "Enter"
    <form 
      className="relative flex flex-1 flex-shrink-0 mb-8"
      onSubmit={(e) => e.preventDefault()} 
    >
      <label htmlFor="search" className="sr-only">
        Buscar
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black bg-white" 
        // ^^^ AQUÍ AGREGUÉ 'text-black' y 'bg-white' PARA QUE SE VEA BIEN
        
        placeholder="Buscar productos..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('q')?.toString()}
      />
      
      {/* Icono de Lupa */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </form>
  );
}