/* eslint-disable react/react-in-jsx-scope */
import { SmileOutlined, HeartOutlined, BookOutlined } from '@ant-design/icons';

export default function Historietas() {
  return (
    <div>
      <h3 className='text-center'>Diseñar y desarrollar una plataforma multimedia para la gestión del club de lectura:</h3>
      <p className='text-center'>La plataforma permitirá a los estudiantes acceder a diversos materiales de lectura y participar en actividades literarias interactivas.</p>

      <h4 className='text-center py-4'>Materiales de Lectura:</h4>
      <ul>
        <li className='text-center'><SmileOutlined /> Historietas</li>
        <li className='text-center'><HeartOutlined /> Revistas</li>
        <li className='text-center'><BookOutlined /> Ficción (novelas, cuentos)</li>
        {/* Agrega más íconos según sea necesario */}
      </ul>

      {/* Aquí puedes agregar el código y los componentes necesarios para implementar la plataforma */}
    </div>
  );
}
