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
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* Barra De Navegacion */}
      <div className='h-[10vh] fixed top-0 w-full z-10'>
        <NavBar page={page} />
      </div>
      {/* Contenido Principial */}
      <main className='flex flex-row bg-purple-100 mt-[10vh]'>
        <div className='w-4/12'>
          <MenuLateral />
        </div>
        <div className='w-9/12 px-20 pt-10 pb-20 overflow-y-scroll bg-white h-[82vh]'>
          {/* Contenido */}
          {children}
        </div>
      </main>
      <footer className='bg-gray-200 text-center text-lightBeige py-6 fixed bottom-0 w-full px-50'>
        <span>© 2023 LITMEDIA. Todos los derechos reservados.</span>
      </footer>
    </div>
  )
}
