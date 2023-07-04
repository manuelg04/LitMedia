import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { message } from 'antd';
import { useRouter } from 'next/router';

export default function Registrarse() {
  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const router = useRouter();

  const handleDocumentoChange = (event) => {
    setDocumento(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Enviar los datos del formulario al punto final de la API
      const res = await axios.post('/api/register', {
        documento,
        nombre,
        contrasena,
      });
  
      // Mostrar mensaje de éxito
      message.success(res.data.message);
      // Redirigir al dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al registrar el usuario', error);
      if (error.response) {
        // El pedido se hizo y el servidor respondió con un estado fuera del rango de 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        message.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Head>
        <title>Registrarse - LITMEDIA</title>
        <meta name="description" content="Registro en el Club de Lectura LITMEDIA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold mb-4">Registrarse</h1>

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documento">
            Documento
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="documento"
            type="text"
            placeholder="Ingrese su documento"
            value={documento}
            onChange={handleDocumentoChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChange={handleNombreChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contrasena">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contrasena"
            type="password"
            placeholder="Ingrese su contraseña"
            value={contrasena}
            onChange={handleContrasenaChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}
