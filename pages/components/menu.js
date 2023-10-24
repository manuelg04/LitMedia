import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { EyeIcon, PieChartIcon, PlusCircleIcon } from 'lucide-react'
import { Modal, Form, Input, Button, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { uploadFile } from '../api/firebase'
import { setBook } from '../../redux/bookSlice'
import { setCurrentClubId } from '../../redux/clubSlice'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function MenuLateral () {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }
  const handleModalClose = () => {
    setIsModalVisible(false)
  }
  const handleSubmit = async values => {
    try {
      // Si hay una foto seleccionada, súbela a Firebase primero
      if (values.fotoLibro && values.fotoLibro[0]) {
        const file = values.fotoLibro[0].originFileObj // Acceder al archivo original
        const url = await uploadFile(file) // Subir archivo (considera cambiar el nombre de esta función a algo como 'uploadImageFile' si subes imágenes y no PDFs)

        values.fotoLibroUrl = url // Agrega la URL a values para enviarla al servidor
      }

      // Guarda el libro y su URL en Redux
      dispatch(
        setBook({
          libroAsociado: values.libroAsociado,
          nombre: values.nombre,
          autor: values.autor,
          generoLiterario: values.generoLiterario,
          descripcion: values.descripcion,
          fotoLibroUrl: values.fotoLibroUrl // Guarda la URL en Redux también
        })
      )

      // Elimina fotoLibro de values, ya que solo necesitas enviar la URL al servidor
      delete values.fotoLibro

      const response = await axios.post('/api/createClub', values)
      if (response.data && response.data.idclub) {
        dispatch(setCurrentClubId({ idclub: response.data.idclub }))
        setIsModalVisible(false)

        Swal.fire({
          icon: 'success',
          title: '¡Buen trabajo!',
          text: 'Club creado correctamente, ya puedes empezar'
        })

        router.push('/components/clubLectura')
      }
    } catch (error) {
      console.error('Error creating the club:', error)
      message.error('Hubo un error al crear el club')
    }
  }
  return (
    <div className=''>
      {/* Card para "¿Qué deseas hacer hoy?" y los botones */}
      <div className='px-2
      2xl:w-full pb-4 
      xl:w-full pb-4 w-96
      lg:w-full pb-4 w-96
      md:w-screen flex flex-col 
      sm:w-screen flex flex-col
      min-[320px]:w-screen flex flex-col w-screen
      '>
        {/* title */}
        <div className='pt-10 md:pt-3 sm:pt-3 min-[320px]:pt-3'>
          <h2 className='text-2xl mb-4 text-center xl:text-lg lg:text-xs md:text-sm sm:text-sm min-[320px]:text-xs'>
            ¿Qué deseas hacer hoy?
          </h2>
        </div>

        {/* Buttons */}
        <div className='
        flex 
        2xl:flex-col gap-y-2
        xl:flex-col gap-y-2 
        lg:flex-col gap-y-2 
        md:flex-row gap-x-2 
        sm:flex-row gap-y-2 
        min-[320px]:flex-col'>
          {/* Primer botón con ícono de ejemplo */}
          <div className='pt-5 md:pt-0 sm:pt-0 min-[320px]:pt-1'>
            <Link href='/components/foromultimedia'>
              <button className='
              flex items-center bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold rounded focus:outline-none focus:shadow-outline 
              2xl:text-2xl
              xl:text-xl
              lg:text-lg py-2 px-4 
              md:text-md gap-x-1 
              sm:text-sm gap-x-1 
              min-[320px]:text-xs w-full gap-y-1'>
                <PlusCircleIcon className='h-6 w-6' />
                <p className='w-full'>Crear Espacio de Lectura Multimedia</p>
              </button>
            </Link>
          </div>

          {/* Segundo botón con ícono de ejemplo */}
          <div className='pt-5 md:pt-0 sm:pt-0 min-[320px]:pt-1'>
            <Link href='/components/contenidoLiterario'>
              <button className='flex items-center bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold rounded focus:outline-none focus:shadow-outline 
              2xl:text-2xl
              xl:text-xl
              lg:text-lg py-2 px-4 
              md:text-md w-8 gap-x-1 
              sm:text-sm w-8 gap-x-1 
              min-[320px]:text-xs w-full gap-y-1'>
                <EyeIcon className='h-6 w-6' />
                <p className='w-full'>Ver contenido literario disponible</p>
              </button>
            </Link>
          </div>

          {/* Tercer botón con ícono de ejemplo */}
          <div className='pt-5 md:pt-0 sm:pt-0 min-[320px]:pt-1'>
            <button
              onClick={handleOpenModal}
              className='flex items-center bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold rounded focus:outline-none focus:shadow-outline 
              2xl:text-2xl
              xl:text-xl
              lg:text-lg py-2 px-4  
              md:text-md w-8 gap-x-1 
              sm:text-sm w-8 gap-x-1 
              min-[320px]:text-xs w-full gap-y-1'
            >
              <PlusCircleIcon className='h-6 w-6' />
              <p className='w-full'>Crear club de lectura</p>
            </button>
          </div>
          {/* Cuarto botón con ícono de ejemplo */}
          <div className='pt-5 md:pt-0 sm:pt-0 min-[320px]:pt-1'>
            <Link href='/components/listClubs'>
              <button className='flex items-center bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold rounded focus:outline-none focus:shadow-outline 
              2xl:text-2xl
              xl:text-xl
              lg:text-lg py-2 px-4  
              md:text-md w-8 gap-x-1 
              sm:text-sm w-8 gap-x-1 
              min-[320px]:text-xs w-full gap-y-1'>
                <PieChartIcon className='h-6 w-6' />
                <p className='w-full'>Ver listado de Clubs</p>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Modal
        title='Crear Club de Lectura'
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Form.Item
            label='Nombre del club'
            name='nombre'
            rules={[
              {
                required: true,
                message: 'Por favor, ingresa el nombre del club'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Libro asociado'
            name='libroasociado'
            rules={[
              {
                required: true,
                message: 'Por favor, ingresa el libro asociado al club'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Autor del libro'
            name='autor'
            rules={[
              {
                required: true,
                message: 'Por favor, ingresa el autor del libro'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Genero Literario'
            name='generoliterario'
            rules={[
              {
                required: true,
                message: 'Por favor, ingresa el genero literario del libro'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Descripción del libro'
            name='descripcion'
            rules={[
              {
                required: true,
                message: 'Por favor, ingresa la descripción del libro'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Foto del libro'
            name='fotoLibro'
            valuePropName='fileList'
            getValueFromEvent={e => {
              if (Array.isArray(e)) {
                return e
              }
              return e && e.fileList
            }}
            rules={[
              {
                required: true,
                message: 'Por favor, sube una foto del libro'
              }
            ]}
          >
            <Upload
              name='fotoLibro'
              listType='picture'
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Subir foto</Button>
            </Upload>
          </Form.Item>
          {/* Agregar el resto de los campos del formulario aquí */}
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              style={{ backgroundColor: 'blue', borderColor: 'blue' }}
            >
              Confirmar
            </Button>
            <Button onClick={handleModalClose} style={{ marginLeft: 10 }}>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
