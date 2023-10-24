/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import NavBar from '../components/navBar'
import MenuLateral from '../components/menu'

export default function Layout ({ page, children }) {
  console.log(page)
  console.log(children)
  return (
    // DashBoard
    <div className='overflow-y-hidden'>
      {/* MetaData */}
      <Head>
        <title>{page} - LITMEDIA</title>
        <meta name='description' content='Dashboard del proyecto LITMEDIA' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* Barra De Navegacion */}
      <div className='h-[10vh] fixed top-0 w-full z-10'>
        <NavBar page={page} />
      </div>
      {/* Contenido Principial */}
      <main className='flex bg-purple-100 mt-[8vh] 
      2xl:flex-row h-screen
      xl:flex-row 
      lg:flex-row 
      md:flex-col
      sm:flex-col 
      min-[320px]:flex-col'>
        <div className='
        2xl:w-3/12 pl-40 w-screen 
        xl:w-3/12 pl-40 w-screen 
        lg:w-3/12 pl-10 w-screen 
        md:pl-0 w-screen 
        sm:pl-0 w-screen 
        min-[320px]:pl-0 w-screen'>
          <MenuLateral />
        </div>
        <div className='bg-white h-[82vh] 
        2xl:w-9/12 overflow-y-scroll
        xl:w-9/12 overflow-y-scroll
        lg:w-9/12 px-20 pt-10 pb-20 overflow-y-scroll h-screen 
        md:h-full
        sm:h-full
        min-[320px]:h-full w-screen px-6'>
          {/* Contenido */}
          {children}
        </div>
      </main>
      <footer className='bg-gray-200 text-center text-lightBeige py-6 fixed bottom-0 w-full px-50 min-[320px]:py-0 items-center'>
        <span className='min-[320px]:text-xs'>© 2023 LITMEDIA. Todos los derechos reservados.</span>
      </footer>
    </div>
  )
}
