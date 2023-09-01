/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */


import { Card } from 'antd';
import Head from 'next/head';
import NavBar from './components/navBar';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const books = [
    { imagen: '/4acuerdos.png', autor: 'Juan Manuel', nombre: '4 acuerdos' },
    { imagen: '/ceguera.jpg', autor: 'Jose Saramago', nombre: 'Ensayo sobre la ceguera' },
    { imagen: '/donquijote.png', autor: 'Don Quijote', nombre: 'Don quijote de la mancha' },
    { imagen: '/harry.png', autor: 'Harry', nombre: 'Harry Potter' },
    { imagen: '/saramago.jpg', autor: 'Jose saramago', nombre: 'Ensayo sobre la lucidez' },
    { imagen: '/soledad.jpg', autor: 'Gabriel Garcia Marquez', nombre: '1000 años de soledad' },
  ];
  
  const handleLoginClick = () => {
    router.push('/iniciar-sesion');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Head>
        <title>LITMEDIA - Club de Lectura</title>
        <meta name="description" content="Espacio literario multimedia para la comunidad universitaria: Club de Lectura LITMEDIA en la Universidad San Buenaventura de Cali" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="bg-gray-600 text-white p-10">
    <div className="flex justify-center items-center">
        <h1 className="text-6xl font-bold flex-grow">LITMEDIA</h1>
        
        <button onClick={handleLoginClick}  className="bg-white text-blue-400 hover:bg-blue-200 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Iniciar Sesión
        </button>
        
    </div>
    <p className="text-3xl mt-5 text-center">¡Bienvenidos al Club de Lectura LITMEDIA!</p>
</header>


      <NavBar />

      <main className="p-8 flex-grow flex flex-col items-center">
      <Card className="mb-10 md:w-1/2 shadow-xl" bordered={true}>
          <h2 className="text-xl font-bold mb-4 text-center">A cerca de LITMEDIA</h2>
          <p className="text-lg text-justify">
            En LITMEDIA, nos apasiona la literatura y queremos compartir esa pasión con la comunidad universitaria de la Universidad San Buenaventura de Cali. Explora nuestra plataforma multimedia, accede a diversos materiales de lectura, participa en actividades literarias interactivas y expande tu mundo a través de la lectura.
          </p>
        </Card>
       
        <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="w-full shadow-xl mb-10" bordered={true}>
            <h3 className="text-xl font-bold mb-4 text-center">¿Qué ofrecemos?</h3>
            <p className="text-lg text-justify">
              Amplia variedad de libros y obras literarias. Guías de discusión para fomentar la creatividad y el pensamiento crítico. Actividades literarias interactivas. Tecnología multimedia para enriquecer la experiencia de lectura.
            </p>
          </Card>
          <Card className="shadow-md mb-5" bordered={true}>
            <h3 className="text-xl font-bold mb-4">¿Cómo unirse al Club de Lectura LITMEDIA?</h3>
            <p className="text-lg text-justify">
              ¡Es fácil unirse a nuestra comunidad de lectores! Simplemente sigue estos pasos: Regístrate en nuestra plataforma. Explora nuestra biblioteca y elige tu próxima lectura. Participa en las discusiones y actividades literarias. Disfruta de la experiencia de leer y compartir con otros amantes de la literatura.
            </p>
          </Card>
        </div>
        <Card className="w-full md:w-1/2 shadow-xl mb-10" bordered={true}>
  <h3 className="text-xl font-bold mb-4 text-center">Nuestros libros más populares</h3>
  <div className="grid grid-cols-3 gap-4">
    {books.map((book, index) => (
      <div key={index} className="flex flex-col items-center">
        <img src={book.imagen} alt={book.nombre} className="w-24 h-36 mb-2"/>
        <h4 className="font-semibold text-center">{book.nombre}</h4>
        <p className="text-sm text-gray-600">{book.autor}</p>
      </div>
    ))}
  </div>
</Card>

<Card className="w-full md:w-1/2 shadow-xl mb-10" bordered={true}>
  <h3 className="text-xl font-bold mb-4 text-center">Testimonios de Nuestros Miembros</h3>
  <div className="grid grid-cols-1 gap-4">
    {[{
      nombre: "Carolina R.",
      foto: "/carolina.png",
      opinion: "Ser parte de LITMEDIA ha enriquecido enormemente mi vida literaria. He descubierto autores y géneros que antes no consideraba, y el ambiente de la comunidad es simplemente insuperable."
    }, {
      nombre: "Andrés G.",
      foto: "/boy.png",
      opinion: "LITMEDIA ha sido mi refugio literario durante este último año. El apoyo, las discusiones y las actividades han sido una fuente de alegría y aprendizaje constante."
    }, {
      nombre: "Lucía M.",
      foto: "/andrea.png",
      opinion: "Unirse a este club de lectura ha sido una de las mejores decisiones que he tomado. He conocido a personas maravillosas y he aprendido mucho de cada discusión. ¡Gracias LITMEDIA!"
    }].map((testimonio, index) => (
      <div key={index} className="flex items-center space-x-4">
        <img src={testimonio.foto} alt={testimonio.nombre} className="w-16 h-16 rounded-full"/>
        <div className="flex flex-col">
          <h4 className="font-semibold">{testimonio.nombre}</h4>
          <p className="text-sm text-gray-600 italic">"{testimonio.opinion}"</p>
        </div>
      </div>
    ))}
  </div>
</Card>


      </main>

      <footer className="bg-gray-600 text-center text-white p-5 mt-auto">
        <p>© {new Date().getFullYear()} LITMEDIA - Club de Lectura. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}