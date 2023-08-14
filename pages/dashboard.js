/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import Historietas from "./components/dashelper";
import Link from "next/link";
import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBook } from "../redux/bookSlice";
import { setCurrentClub } from "../redux/clubSlice";
import Swal from 'sweetalert2';

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
   console.log("🚀 ~ values:", values)
   
  dispatch(setBook({ 
    libroAsociado: values.libroAsociado, 
    nombre: values.nombre, 
    autor: values.autor, 
    generoLiterario: values.generoLiterario, 
    descripcion: values.descripcion 
  }));

  setIsModalVisible(false);

  try {
    const response = await axios.post('/api/createClub', values);
    if(response.data && response.data.id) {
      dispatch(setCurrentClub({ id: response.data.id }));
      Swal.fire({
        icon: 'success',
        title: '¡Buen trabajo!',
        text: 'Club creado correctamente, ya puedes empezar'
      });
      
      router.push("/components/clubLectura");
    } else {
      throw new Error('No se pudo obtener el ID del club');
    }
  } catch (error) {
    console.log("🚀 ~ error:", error)
    message.error('Hubo un error al crear el club');
  }

  router.push("/components/clubLectura");
  };

  const handleLogout = async () => {
    try {
        // Hacer una petición al backend para cerrar la sesión
        const response = await axios.post('/api/logout');
        
        if (response.status === 200) {
            // Mostrar alerta de cierre de sesión
            Swal.fire({
                icon: 'success',
                title: '¡Hasta luego!',
                text: 'Cerrando sesión, vuelve pronto!'
            });

            // Redirige al usuario a la página de inicio de sesión
            router.push('/');
        } else {
            throw new Error("Error al cerrar la sesión");
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al cerrar la sesión, por favor intenta de nuevo.'
        });
    }
};
  
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Dashboard - LITMEDIA</title>
        <meta name="description" content="Dashboard del proyecto LITMEDIA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-400 text-white p-6">
        <h1 className="text-4xl">Dashboard - LITMEDIA</h1>
        <button
  onClick={handleLogout}
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
>
  Cerrar sesión
</button>

      </header>

      <main className="flex-grow p-6">
    <h2 className="text-2xl mb-4">¿Qué deseas hacer hoy?</h2>

    <div className="flex flex-col space-y-4 items-center"> {/* items-center para centrar los botones */}
      {/* Primer botón */}
      <Link href="/components/foromultimedia">
        <button className="w-64 text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
          Crear Espacio de Lectura Multimedia
        </button>
      </Link>

      {/* Segundo botón */}
      <Link href="/components/contenidoLiterario">
        <button className="w-64 text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
          Ver contenido literario disponible
        </button>
      </Link>

      {/* Tercer botón */}
      <button 
        onClick={handleOpenModal} 
        className="w-64 text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
      >
        Crear club de lectura
      </button>

      {/* Cuarto botón */}
      <Link href="/components/listClubs">
        <button className="w-64 text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
          Ver listado de Clubs
        </button>
      </Link>
    </div>

    <h2 className="text-2xl mt-8 mb-4">Objetivos específicos del proyecto:</h2>
    <Historietas />
</main>


      <footer className="bg-blue-400 text-white p-6 text-center">
        <p>© 2023 LITMEDIA. Todos los derechos reservados.</p>
      </footer>

      <Modal
        title="Crear Club de Lectura"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Nombre del club"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa el nombre del club",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Libro asociado"
            name="libroasociado"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa el libro asociado al club",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Autor del libro"
            name="autor"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa el autor del libro",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Genero Literario"
            name="generoliterario"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa el genero literario del libro",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Descripción del libro"
            name="descripcion"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa la descripción del libro",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Agregar el resto de los campos del formulario aquí */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{backgroundColor: 'blue', borderColor: 'blue'}}>
              Confirmar
            </Button>
            <Button onClick={handleModalClose} style={{ marginLeft: 10 }}>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
