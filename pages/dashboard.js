/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import Platform from "./components/Platform";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Dashboard - LITMEDIA</title>
        <meta name="description" content="Dashboard del proyecto LITMEDIA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


       <header className="bg-blue-400 text-white p-6">
        <h1 className="text-4xl">Dashboard - LITMEDIA</h1>
        <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right" href="/">
            Cerrar sesión
        </Link>
      </header>

      <main className="flex-grow p-6">
        <h2 className="text-2xl mb-4">¿Qué deseas hacer hoy?</h2>

        <div className="flex flex-col space-y-4">
            <Link href="/components/foromultimedia" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Crear Espacio de Lectura Multimedia
            </Link>
      
            <Link href="/components/contenidoLiterario" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Ver contenido literario disponible
            </Link>
        </div>
        <h2 className="text-2xl mb-4">Objetivos específicos del proyecto:</h2>
        <Platform />
      </main>

      <footer className="bg-blue-400 text-white p-6 text-center">
        <p>© 2023 LITMEDIA. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
