/* eslint-disable react/react-in-jsx-scope */
// Archivo: NavBar.jsx
/* eslint-disable react/react-in-jsx-scope */

// Archivo: NavBar.jsx
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
    <div className='pt-6 h-[10vh] shadow-xl px-[180px]'>
      <span
        className='text-4xl'
        onClick={() => router.push('/dashboard')}
        style={{ cursor: 'pointer' }}
      >
        {page} - LITMEDIA
      </span>
      <button
        onClick={handleLogout}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right'
      >
        Cerrar sesión
      </button>
    </div>
  )
}
