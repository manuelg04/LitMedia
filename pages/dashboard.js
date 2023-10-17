/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import Historietas from './components/dashelper'
import SimpleBarChart from './components/chart'
import Layout from './components/layout'

export default function Dashboard () {
  return (
    <Layout page={'Dashboard'}>
      <h1 className='text-4xl mt-5 text-center'>LITMEDIA</h1>
      <div className='mt-5'>
        <span className='text-4xl'>😃</span>
        <span className='text-yellow-500 text-xl mr-2'>⭐⭐⭐⭐⭐</span>
        <span>5.0</span>
      </div>
      <p className='mt-5'>
        🌟 LITMEDIA es reconocido ampliamente como el mejor club de lectura en
        la región del Valle del Cauca, específicamente en Cali, Colombia.
        Nuestro compromiso con la promoción de la literatura, la creación de
        espacios para el debate y el fomento del amor por la lectura nos ha
        posicionado en el corazón de nuestra comunidad. Agradecemos
        profundamente a cada miembro por ser parte de esta maravillosa
        experiencia y contribuir a nuestra misión. ¡Gracias por pertenecer a
        LITMEDIA y hacerlo posible!
      </p>
      <h1 className='text-4xl mt-8'>Objetivos específicos del proyecto:</h1>
      <Historietas />
      <h2 className='text-2xl mb-4 text-center'>Resumen de lectura</h2>
      <SimpleBarChart />
    </Layout>
  )
}
