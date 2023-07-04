import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{backgroundImage: "url('/libros.jpg')", backgroundSize: 'cover'}}>
      <Head>
        <title>LITMEDIA - Club de Lectura</title>
        <meta name="description" content="Espacio literario multimedia para la comunidad universitaria: Club de Lectura LITMEDIA en la Universidad San Buenaventura de Cali" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-400 text-white p-6">
        <h1 className="text-4xl font-bold">Club de Lectura LITMEDIA</h1>
        <p className="text-xl mt-2">Espacio literario multimedia para la comunidad universitaria</p>
      </header>

      <main className="flex-grow p-6">
        <h2 className="text-2xl mb-4">¡Bienvenidos al Club de Lectura LITMEDIA!</h2>
        <p>En LITMEDIA, nos apasiona la literatura y queremos compartir esa pasión con la comunidad universitaria de la Universidad San Buenaventura de Cali.</p>
        <p>Explora nuestra plataforma multimedia, accede a diversos materiales de lectura, participa en actividades literarias interactivas y expande tu mundo a través de la lectura.</p>

        <section className="mt-10">
          <h3 className="text-xl mb-4">¿Qué ofrecemos?</h3>
          <ul className="list-disc pl-6">
            <li>Amplia variedad de libros y obras literarias.</li>
            <li>Guías de discusión para fomentar la creatividad y el pensamiento crítico.</li>
            <li>Actividades literarias interactivas.</li>
            <li>Tecnología multimedia para enriquecer la experiencia de lectura.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h3 className="text-xl mb-4">¿Cómo unirse al Club de Lectura LITMEDIA?</h3>
          <p>¡Es fácil unirse a nuestra comunidad de lectores! Simplemente sigue estos pasos:</p>
          <ol className="list-decimal pl-6">
            <li>Regístrate en nuestra plataforma.</li>
            <li>Explora nuestra biblioteca y elige tu próxima lectura.</li>
            <li>Participa en las discusiones y actividades literarias.</li>
            <li>Disfruta de la experiencia de leer y compartir con otros amantes de la literatura.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h3 className="text-xl mb-4">¡Únete a LITMEDIA y descubre un mundo de palabras!</h3>
          <Link href="/registrarse">
            <button className="inline-block bg-blue-400 text-white p-2 rounded">Regístrate</button>
          </Link>
        </section>
      </main>

      <footer className="bg-blue-400 text-white p-6 text-center">
        <p>© {new Date().getFullYear()} LITMEDIA - Club de Lectura. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
