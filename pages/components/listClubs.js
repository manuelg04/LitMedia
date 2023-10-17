/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/react-in-jsx-scope */
// components/listadodeClubs.js

import { useEffect, useState } from 'react'
import axios from 'axios'
import { List, Rate, Typography } from 'antd'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setCurrentClubId } from '../../redux/clubSlice'
import { useRouter } from 'next/router'
import { setBook } from '../../redux/bookSlice'
import { Card, CardBody, CardFooter, Divider } from '@nextui-org/react'
import Image from 'next/image'

import Layout from './layout'

const ListadodeClubs = () => {
  const [clubs, setClubs] = useState([])
  const dispatch = useDispatch() // Usa useDispatch para obtener el dispatch de Redux
  const router = useRouter()

  const handleClubClick = club => {
    dispatch(setCurrentClubId(club))

    // Actualizar los detalles del libro en el estado global
    dispatch(
      setBook({
        nombre: club.nombre,
        libroAsociado: club.libroasociado,
        autor: club.autor, // Asegúrate de que el objeto club tiene esta propiedad
        generoLiterario: club.generoLiterario, // Lo mismo aquí
        descripcion: club.descripcion,
        fotoLibroUrl: club.fotolibrourl
      })
    )
    router.push(`/club/${club.idclub}`)
  }

  useEffect(() => {
    const getClubs = async () => {
      try {
        // const response = await axios.get('/api/obtenerClubs')
        // setClubs(response.data)
        setClubs([
          {
            idclub: 56,
            nombre: '13',
            libroasociado: '13',
            autor: '13',
            generoliterario: '13',
            descripcion: '13',
            avg_rating: '5',
            fotolibrourl:
              'https://firebasestorage.googleapis.com/v0/b/litmedia-2cf97.appspot.com/o/images%2Fc93036b3-d62d-4e11-af27-a6e98b463c2b?alt=media&token=0ce098af-4cb3-4185-a13c-24617294cada'
          },
          {
            idclub: 55,
            nombre: '1',
            libroasociado: '1',
            autor: '1',
            generoliterario: '1',
            descripcion: '1',
            avg_rating: '5',
            fotolibrourl:
              'https://firebasestorage.googleapis.com/v0/b/litmedia-2cf97.appspot.com/o/images%2F59a9a424-076b-4d07-8eac-bed45257b218?alt=media&token=1959349c-ba8c-49cf-a27e-61c7e130a1ab'
          },
          {
            idclub: 54,
            nombre: 'tiempos de colera',
            libroasociado: 'el amor en tiempos de colera',
            autor: 'gabriel marquez',
            generoliterario: 'narrativa',
            descripcion: 'aaaa',
            avg_rating: '4',
            fotolibrourl:
              'https://firebasestorage.googleapis.com/v0/b/litmedia-2cf97.appspot.com/o/images%2F4bb90144-af0d-48e3-9bb4-042ecc9886a0?alt=media&token=e53bf944-19a7-4800-873e-73828f502ed9'
          },
          {
            idclub: 53,
            nombre: '23',
            libroasociado: '23',
            autor: '23',
            generoliterario: '23',
            descripcion: '23',
            avg_rating: '0',
            fotolibrourl:
              'https://firebasestorage.googleapis.com/v0/b/litmedia-2cf97.appspot.com/o/images%2F362907f3-792e-4a0c-bbc6-6b2139dcdc8d?alt=media&token=0f852cf0-47cf-4626-a16c-ab6fce127048'
          },
          {
            idclub: 52,
            nombre: '1',
            libroasociado: '1',
            autor: '1',
            generoliterario: '1',
            descripcion: '1',
            avg_rating: '5',
            fotolibrourl:
              'https://firebasestorage.googleapis.com/v0/b/litmedia-2cf97.appspot.com/o/images%2F9347e6b6-a1c9-43cf-8991-ff378e03dd9a?alt=media&token=a4a10b7d-b3a3-49d0-9ee8-076ac097ca18'
          },
          {
            idclub: 51,
            nombre: 'el principito',
            libroasociado: 'el principito',
            autor: 'nn',
            generoliterario: 'nn',
            descripcion: 'nn',
            avg_rating: '4',
            fotolibrourl: null
          },
          {
            idclub: 50,
            nombre: '1',
            libroasociado: '1',
            autor: '1',
            generoliterario: '1',
            descripcion: '1',
            avg_rating: '3',
            fotolibrourl: null
          }
        ])
      } catch (error) {
        console.log(error)
      }
    }
    getClubs()
  }, [])

  return (
    <Layout page={'LISTA DE CLUBS'}>
      <div className='bg-white'>
        <h2 className='text-2xl font-semibold mb-4 text-center text-blue-600'>
          Aquí puedes ver el listado de clubs creados por nuestros usuarios
        </h2>
        <div className='grid grid-cols-4 justify-center'>
          {clubs.map(club => (
            <Link href={`/club/${club.idclub}`}>
              <Card>
                <CardBody>
                  <img
                    src={club.fotolibrourl}
                    alt={`Imagen de ${club.libroasociado}`}
                    className='w-[300px] h-[300px] mb-4 object-cover rounded text-center'
                  />
                </CardBody>
                <Divider />
                <CardFooter>
                  <div className='flex flex-col h-[195px]'>
                    <p>
                      <Typography.Text mark>[{club.idclub}]</Typography.Text>
                    </p>
                    <p>Libro asociado:{club.libroasociado}</p>
                    <p>Nombre del libro: {club.nombre}</p>
                    <p>Autor: {club.autor}</p>
                    {/* Asegúrate de que 'club' tenga esta propiedad 'autor' */}
                    <Rate value={club.avg_rating} disabled />
                    <p>{club.descripcion}</p>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ListadodeClubs
