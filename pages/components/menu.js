import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React, { Component }  from 'react';
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
    <div className='pl-[150px]'>
      {/* Card para "¿Qué deseas hacer hoy?" y los botones */}
      <div className='px-5'>
        {/* title */}
        <div className='pt-10'>
          <h2 className='text-2xl mb-4 text-center '>¿Qué deseas hacer hoy?</h2>
        </div>

        {/* Buttons */}
        <div>
          {/* Primer botón con ícono de ejemplo */}
          <div className='pt-5'>
            <Link href='/components/foromultimedia'>
              <button className='flex items-center w-full sm:w-64 text-lg bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:w-full'>
                <PlusCircleIcon className='h-6 w-6' /> Crear Espacio de Lectura
                Multimedia
              </button>
            </Link>
          </div>

          {/* Segundo botón con ícono de ejemplo */}
          <div className='pt-5'>
            <Link href='/components/contenidoLiterario'>
              <button className='flex items-center w-full text-lg bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                <EyeIcon className='h-6 w-6' />
                <p className='w-full'>Ver contenido literario disponible</p>
              </button>
            </Link>
          </div>

          {/* Tercer botón con ícono de ejemplo */}
          <div className='pt-5'>
            <button
              onClick={handleOpenModal}
              className='flex items-center w-full text-lg bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              <PlusCircleIcon className='h-6 w-6' />
              <p className='w-full'>Crear club de lectura</p>
            </button>
          </div>
        </div>

        {/* Cuarto botón con ícono de ejemplo */}
        <div className='pt-5'>
          <Link href='/components/listClubs'>
            <button className='flex items-center w-full text-lg bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              <PieChartIcon className='h-6 w-6' />
              <p className='w-full'>Ver listado de Clubs</p>
            </button>
          </Link>
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
