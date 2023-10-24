/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */

import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()
  const books = [
    { imagen: '/4acuerdos.png', autor: 'Juan Manuel', nombre: '4 acuerdos' },
    {
      imagen: '/ceguera.jpg',
      autor: 'Jose Saramago',
      nombre: 'Ensayo sobre la ceguera'
    },
    {
      imagen: '/donquijote.png',
      autor: 'Don Quijote',
      nombre: 'Don quijote de la mancha'
    },
    { imagen: '/harry.png', autor: 'Harry', nombre: 'Harry Potter' },
    {
      imagen: '/saramago.jpg',
      autor: 'Jose saramago',
      nombre: 'Ensayo sobre la lucidez'
    },
    {
      imagen: '/soledad.jpg',
      autor: 'Gabriel Garcia Marquez',
      nombre: '1000 años de soledad'
    }
  ]

  const handleLoginClick = () => {
    router.push('/iniciar-sesion')
  }

  return (
    <div className='bg-white min-h-screen flex flex-col'>
      <Head>
        <title>LITMEDIA - Club de Lectura</title>
        <meta
          name='description'
          content='Espacio literario multimedia para la comunidad universitaria: Club de Lectura LITMEDIA en la Universidad San Buenaventura de Cali'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header
        className='flex items-center text-black shadow-xl bg-purple-200 
      2xl:h-[10vh]
      xl:h-[10vh] 
      lg:h-[8vh] 
      md:h-[6vh] 
      sm:h-[6vh] 
      min-[320px]:h-[6vh]'
      >
        <div
          className='flex justify-between items-center align-middle w-screen
        2xl:px-20
        xl:px-20 
        lg:px-16 
        md:px-10 
        sm:px-8 
        min-[320px]: px-8'
        >
          <span
            className='font-bold 
          2xl:text-2xl 
          xl:text-xl 
          lg:text-lg 
          md:text-md 
          sm:text-sm 
          min-[320px]:text-xs '
          >
            LITMEDIA
          </span>
          <span
            className='text-center items-center
          2xl:text-2xl
          xl:text-xl 
          lg:text-lg 
          md:text-md 
          sm:text-sm 
          min-[320px]:mt-1 text-xs '
          >
            ¡Bienvenidos al Club de Lectura LITMEDIA!
          </span>
          <button
            onClick={handleLoginClick}
            className='bg-white text-blue-400 hover:bg-blue-200 rounded focus:outline-none focus:shadow-outline
            2xl:text-2xl py-2 px-4 
            xl:text-xl py-2 px-4 
            lg:text-lg py-2 px-4 
            md:text-md py-2 px-4 
            sm:text-sm py-2 px-4 
            min-[320px]:py-1 px-1 mt-1 text-xs  '
          >
            Iniciar Sesión
          </button>
        </div>
      </header>

      <main className='flex-grow flex flex-col '>
        {/* Primer frame */}
        <div
          className='bg-purple-100 
        2xl:h-[80vh] flex-row  flex w-full items-center 
        xl:h-[80vh] flex-row flex w-full items-center 
        lg:flex-row h-[80vh] flex w-full items-center 
        md:flex-col h-[87vh] py-40 
        sm:flex-col h-[87vh] py-40 
        min-[320px]:flex-col h-[87vh] py-32 '
        >
          <div className='flex items-center
          2xl:w-1/2 px-20  
          xl:w-1/2 px-14  
          lg:w-1/2 px-14  
          md:w-screen px-14
          sm:w-screen px-14 
          min-[320px]:w-screen px-14'>
            <div className='mb-10'>
              <h2
                className='font-bold mb-4 text-center
              2xl:text-2xl 
              xl:text-xl 
              lg:text-lg 
              md:text-md 
              sm:text-sm 
              min-[320px]:text-xs '>
                Acerca de LITMEDIA
              </h2>
              <p
                className='text-justify
              2xl:text-lg 
              xl:text-lg 
              lg:text-sm 
              md:text-sm 
              sm:text-sm 
              min-[320px]: text-xs'
              >
                En LITMEDIA, nos apasiona la literatura y queremos compartir esa
                pasión con la comunidad universitaria de la Universidad San
                Buenaventura de Cali. Explora nuestra plataforma multimedia,
                accede a diversos materiales de lectura, participa en
                actividades literarias interactivas y expande tu mundo a través
                de la lectura.
              </p>
            </div>
          </div>
          <div className='flex flex-col 
          2xl:w-1/2 px-20 justify-center 
          xl:w-1/2 px-14 justify-center 
          lg:w-1/2 px-14 justify-center 
          md:px-14 justify-center
          sm:w-screen
          min-[320px]: '>
            <div className='w-full mb-10'>
              <h3 className='font-bold mb-4 text-center
              2xl:text-2xl 
              xl:text-xl 
              lg:text-lg 
              md:text-md 
              sm:text-sm 
              min-[320px]: text-xs '>
                ¿Qué ofrecemos?
              </h3>
              <p
                className='text-justify
              2xl:text-lg 
              xl:text-lg 
              lg:text-sm 
              md:text-sm 
              sm:text-sm 
              min-[320px]:text-xs '>
                Amplia variedad de libros y obras literarias. Guías de discusión
                para fomentar la creatividad y el pensamiento crítico.
                Actividades literarias interactivas. Tecnología multimedia para
                enriquecer la experiencia de lectura.
              </p>
            </div>
            <div className='mb-5'>
              <h3 className='font-bold mb-4 text-center
              2xl:text-2xl 
              xl:text-xl 
              lg:text-lg 
              md:text-md 
              sm:text-sm 
              min-[320px]: text-xs '>
                ¿Cómo unirse al Club de Lectura LITMEDIA?
              </h3>
              <p className='text-lg text-justify
              2xl:text-lg 
              xl:text-lg 
              lg:text-sm 
              md:text-sm 
              sm:text-sm 
              min-[320px]:text-xs '>
                ¡Es fácil unirse a nuestra comunidad de lectores! Simplemente
                sigue estos pasos: Regístrate en nuestra plataforma. Explora
                nuestra biblioteca y elige tu próxima lectura. Participa en las
                discusiones y actividades literarias. Disfruta de la experiencia
                de leer y compartir con otros amantes de la literatura.
              </p>
            </div>
          </div>
        </div>
        {/* Segundo frame */}
        <div
          className='flex flex-row justify-center w-full 
        2xl:h-[92vh] 
        xl:h-[92vh] 
        lg:h-[92vh] 
        md:h-[92vh] 
        sm:h-[92vh] 
        min-[320px]: '
        >
          <div
            className='w-full md:w-1/2 mb-10 py-20
          2xl:pt-8 
          xl:pt-8 
          lg:pt-5 
          md:pt-5 
          sm:pt-5 
          min-[320px]:pt-5 '>
            <h3 className='font-bold mb-4 text-center
            2xl:text-2xl 
            xl:text-xl 
            lg:text-lg 
            md:text-md 
            sm:text-sm 
            min-[320px]: text-xs'>
              Nuestros libros más populares
            </h3>
            <div className='grid grid-cols-3 gap-4 pt-36'>
              {books.map((book, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <img
                    src={book.imagen}
                    alt={book.nombre}
                    className='w-24 h-36 mb-2'
                  />
                  <h4 className='font-semibold text-center'>{book.nombre}</h4>
                  <p className='text-sm text-gray-600'>{book.autor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* tercer frame */}
        <div className='flex flex-row justify-center w-full bg-purple-100
        2xl:h-[93vh] 
        xl:h-[93vh] 
        lg:h-[93vh] 
        md:h-[93vh] 
        sm:h-[93vh] 
        min-[320px]: '>
          <div className='w-full mb-10'>
            <h3 className='font-bold mb-4 text-center pt-7
            2xl:text-2xl 
            xl:text-xl 
            lg:text-lg 
            md:text-md 
            sm:text-sm 
            min-[320px]: text-xs'>
              Testimonios de Nuestros Miembros
            </h3>
            <div className='grid grid-cols-3 gap-4 
            2xl:px-36 py-40 
            xl:px-36 py-36 
            lg:px-16 py-36 
            md:px-14 py-44 
            sm:px-14 py-44 
            min-[320px]:px-0 py-16'>
              {[
                {
                  nombre: 'Carolina R.',
                  foto: '/carolina.png',
                  opinion:
                    'Ser parte de LITMEDIA ha enriquecido enormemente mi vida literaria. He descubierto autores y géneros que antes no consideraba, y el ambiente de la comunidad es simplemente insuperable.'
                },
                {
                  nombre: 'Andrés G.',
                  foto: '/boy.png',
                  opinion:
                    'LITMEDIA ha sido mi refugio literario durante este último año. El apoyo, las discusiones y las actividades han sido una fuente de alegría y aprendizaje constante.'
                },
                {
                  nombre: 'Lucía M.',
                  foto: '/andrea.png',
                  opinion:
                    'Unirse a este club de lectura ha sido una de las mejores decisiones que he tomado. He conocido a personas maravillosas y he aprendido mucho de cada discusión. ¡Gracias LITMEDIA!'
                }
              ].map((testimonio, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center space-x-4'
                >
                  <img
                    src={testimonio.foto}
                    alt={testimonio.nombre}
                    className='w-[300px] h-[300px] rounded-full
                    md:w-[200px] h-[200px]'
                  />
                  <div className='flex flex-col'>
                    <h4 className='font-semibold'>{testimonio.nombre}</h4>
                    <p className='text-sm text-gray-600 italic'>
                      "{testimonio.opinion}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className='bg-gray-600 text-center text-white p-5 mt-auto'>
        <p>
          © {new Date().getFullYear()} LITMEDIA - Club de Lectura. Todos los
          derechos reservados.
        </p>
      </footer>
    </div>
  )
}
