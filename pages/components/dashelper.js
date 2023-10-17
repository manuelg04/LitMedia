/* eslint-disable react/react-in-jsx-scope */
import { SmileOutlined, HeartOutlined, BookOutlined } from '@ant-design/icons'

export default function Historietas () {
  return (
    <div>
      <h1 className='text-2xl mt-6'>
        Diseñar y desarrollar una plataforma multimedia para la gestión del club
        de lectura:
      </h1>
      <p className=''>
        La plataforma permitirá a los estudiantes acceder a diversos materiales
        de lectura y participar en actividades literarias interactivas.
      </p>

      <h4 className='text-2xl mt-4'>Materiales de Lectura:</h4>
      <ul className='mt-5'>
        <li className=''>
          <SmileOutlined /> Historietas
        </li>
        <li className=''>
          <HeartOutlined /> Revistas
        </li>
        <li className=''>
          <BookOutlined /> Ficción (novelas, cuentos)
        </li>
        {/* Agrega más íconos según sea necesario */}
      </ul>

      {/* Aquí puedes agregar el código y los componentes necesarios para implementar la plataforma */}
    </div>
  )
}
