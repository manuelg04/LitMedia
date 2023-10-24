/* eslint-disable react/react-in-jsx-scope */
import { SmileOutlined, HeartOutlined, BookOutlined } from '@ant-design/icons'

export default function Historietas () {
  return (
    <div>
      <h1 className='text-2xl mt-6 xl:text-xl lg:text-lg md:text-base sm:text-sm min-[320px]:text-xs'>
        Diseñar y desarrollar una plataforma multimedia para la gestión del club
        de lectura:
      </h1>
      <p className='xl:text-lg lg:text-sm md:text-sm sm:text-xs min-[320px]:text-xs'>
        La plataforma permitirá a los estudiantes acceder a diversos materiales
        de lectura y participar en actividades literarias interactivas.
      </p>

      <h4 className='text-2xl mt-4 xl:text-xl lg:text-lg md:text-base sm:text-sm min-[320px]:text-xs'>Materiales de Lectura:</h4>
      <ul className='mt-5 lg:mb-8 md:mb-8 sm:mb-8 min-[320px]:mb-8'>
        <li className='xl:text-sm md:text-sm sm:text-xs min-[320px]:text-xs'>
          <SmileOutlined /> Historietas
        </li>
        <li className='xl:text-sm md:text-sm sm:text-xs min-[320px]:text-xs'>
          <HeartOutlined /> Revistas
        </li>
        <li className='xl:text-sm md:text-sm sm:text-xs min-[320px]:text-xs'>
          <BookOutlined /> Ficción (novelas, cuentos)
        </li>
        {/* Agrega más íconos según sea necesario */}
      </ul>

      {/* Aquí puedes agregar el código y los componentes necesarios para implementar la plataforma */}
    </div>
  )
}
