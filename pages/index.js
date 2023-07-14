/* eslint-disable react/react-in-jsx-scope */


import { Card, Rate } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import NavBar from './components/navBar';

export default function Home() {
  const books = [
    { imagen: '/4acuerdos.png', autor: 'Autor 1', nombre: 'Libro 1' },
    { imagen: '/ceguera.jpg', autor: 'Autor 2', nombre: 'Libro 2' },
    { imagen: '/donquijote.png', autor: 'Autor 3', nombre: 'Libro 3' },
    { imagen: '/harry.png', autor: 'Autor 4', nombre: 'Libro 4' },
    { imagen: '/saramago.jpg', autor: 'Autor 5', nombre: 'Libro 5' },
    { imagen: '/soledad.jpg', autor: 'Autor 6', nombre: 'Libro 6' },
  ];
  
  return (
    <div className={styles.body}>
      <Head>
        <title>LITMEDIA - Club de Lectura</title>
        <meta name="description" content="Espacio literario multimedia para la comunidad universitaria: Club de Lectura LITMEDIA en la Universidad San Buenaventura de Cali" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-4xl font-bold">Club de Lectura LITMEDIA</h1>
        <p className="text-xl mt-2">Espacio literario multimedia para la comunidad universitaria</p>
      </header>
      <NavBar />

      <main className="flex-grow p-6">
      <h2 className="text-2xl mb-4">¡Bienvenidos al Club de Lectura LITMEDIA!</h2>
      <Card
        style={{ width: 300, marginTop: 16 }}
        title="Somos más de 1k usuarios"
      >
        <div className={styles["profile-pictures"]}>
          {/* Recuerda reemplazar las rutas de las imágenes con las rutas correctas de las imágenes de los perfiles de los usuarios */}
          <img className={styles["profile-picture"]} src="/user-1.jpg" alt="User" />
          <img className={styles["profile-picture"]} src="/user-2.jpg" alt="User" />
          <img className={styles["profile-picture"]} src="/user-3.jpg" alt="User" />
          <img className={styles["profile-picture"]} src="/user-1.jpg" alt="User" />
          {/* ... */}
        </div>
        <Rate disabled defaultValue={4.8} />
      </Card>
      <p>En LITMEDIA, nos apasiona la literatura y queremos compartir esa pasión con la comunidad universitaria de la Universidad San Buenaventura de Cali.</p>
      <p>Explora nuestra plataforma multimedia, accede a diversos materiales de lectura, participa en actividades literarias interactivas y expande tu mundo a través de la lectura.</p>
      {/* ... */}

      <section id="libros" className="mt-10 bg-purple-200 p-6 rounded-lg font-bold">
  <h3 className="text-xl mb-4">Nuestros libros más populares</h3>
  <div className="grid grid-cols-6 gap-2">
    {books.map((book, index) => (
      <Card
        key={index}
        cover={
          <img
            alt={book.nombre}
            src={book.imagen}
            className={styles.imageBook}
          />
        }
        className="max-w-md rounded mx-auto"
      >
        <Card.Meta
          title={book.nombre}
          description={book.autor}
        />
      </Card>
    ))}
  </div>
</section>




        <section id="nosotros" className="mt-10">
        
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

        <section id="unirme" className="mt-10">
          <h3 className="text-xl mb-4">¡Únete a LITMEDIA y descubre un mundo de palabras!</h3>
          <Link href="/registrarse">
            <button className="inline-block bg-blue-400 text-white p-2 rounded mr-4">Regístrate</button>
          </Link>
          <Link href="/iniciar-sesion">
            <button className="inline-block bg-blue-400 text-white p-2 rounded">Iniciar sesión</button>
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} LITMEDIA - Club de Lectura. Todos los derechos reservados.</p>
      </footer>
    </div>
    </div>
  );
}