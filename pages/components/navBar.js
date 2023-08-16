/* eslint-disable react/react-in-jsx-scope */
// Archivo: NavBar.jsx
export default function NavBar() {
    

    return (
        <nav className="">
           <div className="bg-gray border-b border-gray-500 ">
  <div className="container mx-auto px-6 py-4">
    <div className="flex justify-between items-center">
    
      <div className="hidden sm:flex space-x-4">
        <a href="#inicio" className="text-gray-600 hover:text-gray-800">Inicio</a>
        <a href="#libros" className="text-gray-600 hover:text-gray-800">Libros</a>
        <a href="#nosotros" className="text-gray-600 hover:text-gray-800">Nosotros</a>
        <a href="#unirme" className="bg-blue-600 text-white px-4 py-0 rounded hover:bg-blue-700">Unirme</a>

      </div>

      <div className="sm:hidden">
        <button className="text-gray-500 focus:outline-none focus:text-gray-600">
          <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

        </nav>
    );
}
