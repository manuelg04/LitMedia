/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head";
import Historietas from "./components/dashelper";
import Link from "next/link";
import { useState } from "react";
import { Modal, Form, Input, Button, message, Upload } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { setCurrentClubId } from "../redux/clubSlice"
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile } from "./api/firebase";
import { setBook } from "../redux/bookSlice";
import { EyeIcon, PieChartIcon, PlusCircleIcon } from "lucide-react";
import SimpleBarChart from "./components/chart";

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
    try {
      // Si hay una foto seleccionada, súbela a Firebase primero
      if (values.fotoLibro && values.fotoLibro[0]) {
        const file = values.fotoLibro[0].originFileObj;  // Acceder al archivo original
        const url = await uploadFile(file);  // Subir archivo (considera cambiar el nombre de esta función a algo como 'uploadImageFile' si subes imágenes y no PDFs)
  
        values.fotoLibroUrl = url;  // Agrega la URL a values para enviarla al servidor
      }
  
      // Guarda el libro y su URL en Redux
      dispatch(setBook({ 
          libroAsociado: values.libroAsociado, 
          nombre: values.nombre, 
          autor: values.autor, 
          generoLiterario: values.generoLiterario, 
          descripcion: values.descripcion,
          fotoLibroUrl: values.fotoLibroUrl  // Guarda la URL en Redux también
      }));
  
      // Elimina fotoLibro de values, ya que solo necesitas enviar la URL al servidor
      delete values.fotoLibro;
  
      const response = await axios.post('/api/createClub', values);
      if (response.data && response.data.idclub) {
        dispatch(setCurrentClubId({ idclub: response.data.idclub }));
        setIsModalVisible(false);
        
        Swal.fire({
          icon: 'success',
          title: '¡Buen trabajo!',
          text: 'Club creado correctamente, ya puedes empezar'
        });
        
        router.push("/components/clubLectura");
      }
    } catch (error) {
      console.error("Error creating the club:", error);
      message.error('Hubo un error al crear el club');
    }
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

      <header className="bg-gray-500 text-white p-6">
        <h1 className="text-4xl">Dashboard - LITMEDIA</h1>
        <button
  onClick={handleLogout}
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
>
  Cerrar sesión
</button>

      </header>

      <main className="flex-grow p-6 flex flex-col justify-center items-center h-screen">
      <div className="flex justify-between gap-4 mb-8 w-full max-w-6xl">

{/* Card para "¿Qué deseas hacer hoy?" y los botones */}
<div className="bg-white p-1 mt-9 rounded shadow-lg">
  <h2 className="text-2xl mb-4 text-center">¿Qué deseas hacer hoy?</h2>

  <div className="flex flex-col space-y-4 items-center">
    {/* Primer botón con ícono de ejemplo */}
    <Link href="/components/foromultimedia">
      <button className="flex justify-center items-center w-64 text-lg bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        <PlusCircleIcon className="h-6 w-6 mr-2"/> Crear Espacio de Lectura Multimedia
      </button>
    </Link>

    {/* Segundo botón con ícono de ejemplo */}
    <Link href="/components/contenidoLiterario">
      <button className="flex justify-center items-center w-64 text-lg bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        <EyeIcon className="h-6 w-6 mr-2"/> Ver contenido literario disponible
      </button>
    </Link>

    {/* Tercer botón con ícono de ejemplo */}
    <button onClick={handleOpenModal} className="flex justify-center items-center w-64 text-lg bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      <PlusCircleIcon className="h-4 w-4 mr-7"/> Crear club de lectura
    </button>

    {/* Cuarto botón con ícono de ejemplo */}
    <Link href="/components/listClubs">
      <button className="flex justify-center items-center w-64 text-lg bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        <PieChartIcon className="h-4 w-4 mr-8"/> Ver listado de Clubs
      </button>
    </Link>
  </div>
</div>

{/* Card de calificación */}
<div className="bg-white p-6 rounded shadow-lg flex-1 flex flex-col items-center mt-9 ">
      <h2 className="text-xl mb-2 text-justify">🌟 LITMEDIA es reconocido ampliamente como el mejor club de lectura en la región del Valle del Cauca, específicamente en Cali, Colombia. Nuestro compromiso con la promoción de la literatura, la creación de espacios para el debate y el fomento del amor por la lectura nos ha posicionado en el corazón de nuestra comunidad. Agradecemos profundamente a cada miembro por ser parte de esta maravillosa experiencia y contribuir a nuestra misión. ¡Gracias por pertenecer a LITMEDIA y hacerlo posible!</h2>
      <p className="mb-2">Gracias por pertenecer a LITMEDIA</p>
      <span className="text-4xl">😃</span> {/* Emoji de felicidad */}
      <div className="mt-2 flex items-center">
        <span className="text-yellow-500 text-xl mr-2">⭐⭐⭐⭐⭐</span>
        <span>5.0</span>
      </div>
    </div>
    </div>

{/* Card para "Objetivos específicos del proyecto:" */}
<div className="flex justify-between gap-4 w-full max-w-6xl">
<div className="bg-white p-6 rounded shadow-lg flex-1">
      <h2 className="text-2xl mb-4 text-center">Objetivos específicos del proyecto:</h2>
      <Historietas />
    </div>

 {/* Card para el gráfico */}
 <div className="bg-white p-6 rounded shadow-lg flex-1">
      <h2 className="text-2xl mb-4 text-center">Resumen de lectura</h2>
      <SimpleBarChart />
    </div>
    </div>
</main>

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

<Form.Item
    label="Foto del libro"
    name="fotoLibro"
    valuePropName="fileList"
    getValueFromEvent={e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }}
    rules={[
        {
            required: true,
            message: "Por favor, sube una foto del libro",
        },
    ]}
>
    <Upload
        name="fotoLibro"
        listType="picture"
        beforeUpload={() => false}
    >
        <Button icon={<UploadOutlined />}>Subir foto</Button>
    </Upload>


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
