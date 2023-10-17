/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/react-in-jsx-scope */
import { Rate } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../redux/selector'
import Swal from 'sweetalert2'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc' // UTC plugin
import timezone from 'dayjs/plugin/timezone' // timezone plugin
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useRouter } from 'next/router'
import {
  selectAutor,
  selectDescripcion,
  selectFotoLibroUrl,
  selectNombre
} from '../../redux/selectorBook'

const CreateClubLectura = () => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(localizedFormat)

  const [comentario, setComentario] = useState('')
  const [comments, setComments] = useState([])
  const [userHasRated, setUserHasRated] = useState(false) // Nuevo estado para verificar si el usuario ya ha calificado

  const [rating, setRating] = useState(0)

  const clubId = useSelector(state => state.club.idclub)

  const userId = useSelector(selectUserId)
  const router = useRouter()

  const nombreDelLibroAsociado = useSelector(selectNombre)

  const autorDelLibroAsociado = useSelector(selectAutor)

  const descripcionDelLibroAsociado = useSelector(selectDescripcion)

  const fotoLibroUrl = useSelector(selectFotoLibroUrl)

  useEffect(() => {
    const checkIfUserHasRated = async () => {
      try {
        const response = await axios.get(
          `/api/checkRating?clubId=${clubId}&userId=${userId}`
        )
        if (response.data.hasRated) {
          setUserHasRated(true)
          setRating(response.data.rating) // Establece la calificación anterior
        }
      } catch (error) {
        console.error('Error checking if user has rated:', error)
      }
    }

    fetchComments()
    checkIfUserHasRated() // Verifica si el usuario ya ha calificado al cargar el componente
  }, [clubId, userId])

  const handleRateChange = async value => {
    setRating(value)
    try {
      const response = await axios.post('/api/calificarClub', {
        club_id: clubId,
        rating: value,
        userid: userId
      })
      console.log('🚀 ~ response:', response)
      Swal.fire({
        icon: 'success',
        title: '¡Gracias por calificar mi club de lectura!',
        text: 'Tu opinion es muy importante para mi.'
      })
    } catch (error) {
      console.error('Error calificando el club:', error)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await axios.get('/api/getComentarios?club_id=' + clubId)

      setComments(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchComments() // Obtener los comentarios al cargar el componente
  }, [])

  const handleCommentSubmit = async () => {
    const commentData = {
      user_id: userId,
      club_id: clubId,
      comments: comentario
    } // Aquí agregas el timestamp local} // Aquí agregas el timestamp };

    if (!clubId) {
      // si clubActualId es null o undefined
      console.error('No se ha seleccionado ningún club')
      return // no hagas nada más en esta función
    }

    try {
      await axios.post('/api/crearComment', commentData)

      fetchComments()
      // Si todo va bien, limpia el campo del comentario
      setComentario('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout')
      if (response.status === 200) {
        // Redirigir al usuario a la página de inicio o donde desees
        router.push('/')
      }
    } catch (error) {
      console.error('Error cerrando la sesión:', error)
    }
  }

  return (
    <div>
      <div className='flex gap-6 mb-8'>
        <div className='flex-grow p-6 bg-white shadow-lg rounded-lg'>
          <h2 className='text-2xl font-bold mb-4'>
            Bienvenido al club de lectura del libro {nombreDelLibroAsociado}
          </h2>
          <p className='mb-4'>
            Este libro fue escrito por {autorDelLibroAsociado}. Descripción:{' '}
            {descripcionDelLibroAsociado}
          </p>
          <img
            src={fotoLibroUrl}
            alt='Imagen del libro'
            className='w-32 h-32 mb-4 object-cover rounded'
          />

          <div className='mt-2'>
            <Rate
              onChange={handleRateChange}
              value={rating}
              disabled={userHasRated}
            />
            <p className='mt-2 font-semibold'>Tu calificación: {rating}</p>
          </div>
        </div>

        <div className='w-1/3 bg-white p-6 shadow-lg rounded-lg'>
          <h2 className='text-xl font-bold mb-4'>Comentarios</h2>

          {comments.filter(comment => comment.comment !== '').length === 0 ? (
            <p className='mb-4 text-gray-600'>No hay comentarios.</p>
          ) : (
            comments.map(
              (comment, index) =>
                comment.comment !== '' && (
                  <div key={index} className='mb-4'>
                    <h5 className='font-semibold'>{comment.user_name}</h5>
                    {/* Aquí se muestra el timestamp del comentario. Asumiendo que "comment.createdAt" contiene la fecha de creación del comentario */}
                    <p className='text-sm text-gray-500'>
                      {comment.date &&
                        dayjs
                          .utc(comment.date)
                          .tz('America/Bogota')
                          .format('LLL')}
                    </p>
                    <p className='mt-2 text-gray-700'>{comment.comment}</p>
                  </div>
                )
            )
          )}

          <textarea
            rows={4}
            className='w-full border border-gray-300 rounded p-2 mt-2'
            placeholder='Escribe tu comentario aquí...'
            value={comentario}
            onChange={e => setComentario(e.target.value)}
          />
          <button
            className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700'
            onClick={handleCommentSubmit}
          >
            Enviar comentario
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateClubLectura
