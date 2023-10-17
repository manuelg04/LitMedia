/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import LiteraryDatabase from './bdLiteraria'
import { useRouter } from 'next/router'
import { Card, CardBody, CardFooter, Divider } from '@nextui-org/react'
import Layout from './layout'

export default function ContenidoLiterario () {
  const [contenido, setContenido] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=R8i2AA0z4l00eVG1Z62kRqAW023GFwET'
        )
        const books = response.data.results.books.map((book, index) => {
          return {
            id: index,
            tipo: 'Libro',
            titulo: book.title,
            autor: book.author,
            imagen: book.book_image
          }
        })
        setContenido(books)
      } catch (error) {
        console.error('Error fetching data from NYT Books API', error)
      }
    }
    fetchData()
  }, [])

  return (
    <Layout page={'Contenido literario'}>
      <LiteraryDatabase />
      <div className='grid grid-cols-5 justify-center'>
        {contenido.map(item => (
          <Card>
            <CardBody>
              <Image
                src={item.imagen || '/path-to-default-image.jpg'}
                alt={item.titulo}
                width={500}
                height={300}
                objectFit='cover'
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <div className='flex flex-col h-[142px]'>
                <h2 className='font-bold text-2xl mb-2'>{item.titulo}</h2>
                <p className='text-gray-700 text-base'>Tipo: {item.tipo}</p>
                <p className='text-gray-700 text-base'>Autor: {item.autor}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  )
}
