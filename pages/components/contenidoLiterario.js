/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import LiteraryDatabase from './bdLiteraria'
import { Card, CardBody, CardFooter, Divider } from '@nextui-org/react'
import Layout from './layout'

export default function ContenidoLiterario () {
  const [contenido, setContenido] = useState([])

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
      <div className='grid justify-center gap-x-2 gap-y-2 
      2xl:grid-cols-4 
      xl:grid-cols-4 
      lg:grid-cols-4 
      md:grid-cols-4 
      sm:grid-cols-4
      min-[320px]:grid-cols-1'>
        {contenido.map(item => (
          <Card key={item.id}>
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
              <div className='flex 
              2xl:h-[200px] flex-col  
              xl:h-[180px] flex-col 
              lg:h-[170px] flex-col  
              md:h-[100px] flex-col  
              sm:h-[110px] p-0
              min-[320px]: h-[70px]'>
                <h2 className='font-bold text-2xl mb-2 
                2xl:text-2xl
                xl:text-xl 
                lg:text-lg 
                md:text-md 
                sm:text-sm
                min-[320px]:text-xs'>{item.titulo}</h2>
                <p className='text-gray-700 text-base 
                2xl:text-2xl
                xl:text-xl 
                lg:text-lg 
                md:text-md 
                sm:text-sm
                min-[320px]:text-xs'>Tipo: {item.tipo}</p>
                <p className='text-gray-700 text-base 
                2xl:text-2xl
                xl:text-xl 
                lg:text-lg 
                md:text-md 
                sm:text-sm
                min-[320px]:text-xs'>Autor: {item.autor}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  )
}
