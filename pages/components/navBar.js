/* eslint-disable react/react-in-jsx-scope */
// Archivo: NavBar.jsx
/* eslint-disable react/react-in-jsx-scope */

// Archivo: NavBar.jsx
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'


export default function NavBar ({page}) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Hacer una petición al backend para cerrar la sesión
      const response = await axios.post('/api/logout')

      if (response.status === 200) {
        // Mostrar alerta de cierre de sesión
        Swal.fire({
          icon: 'success',
          title: '¡Hasta luego!',
          text: 'Cerrando sesión, vuelve pronto!'
        })

        // Redirige al usuario a la página de inicio de sesión
        router.push('/')
      } else {
        throw new Error('Error al cerrar la sesión')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al cerrar la sesión, por favor intenta de nuevo.'
      })
    }
  }
  return (
    <div className='
    flex bg-white
    2xl:px-40 justify-between sticky top-0 items-center h-[8vh] 
    xl:px-40 justify-between sticky top-0 items-center h-[8vh] 
    lg:px-16 justify-between sticky top-0 items-center h-[8vh] 
    md:px-12 justify-between sticky top-0 items-center h-[8vh] 
    sm:px-5 justify-between sticky top-0 items-center h-[8vh] 
    min-[320px]:px-2 justify-between sticky top-0 items-center h-[8vh]'>
      <span
        className='
        2xl:text-2xl 
        xl:text-xl 
        lg:text-lg 
        md:text-md 
        sm:text-sm 
        min-[320px]:text-xs'
        onClick={() => router.push('/dashboard')}
        style={{ cursor: 'pointer' }}
      >
        {page} - LITMEDIA
      </span>
      <button
        onClick={handleLogout}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right 
        2xl:text-2xl 
        xl:text-xl 
        lg:text-lg 
        md:text-md 
        sm:text-sm 
        min-[320px]:text-xs'
      >
        Cerrar sesión
      </button>
    </div>
  )
}
