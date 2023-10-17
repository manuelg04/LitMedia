// pages/club/[id].js

import { useEffect, useState } from 'react'
import axios from 'axios'
import CreateClubLectura from '..//components/clubLectura'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentClubId } from '../../redux/clubSlice'
import { useRouter } from 'next/router'
import React from 'react'
import { setBook } from '../../redux/bookSlice'
import Layout from '../components/layout'



const ClubPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const clubId = useSelector(state => state.club.idclub)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!clubId && id) {
      // Si no hay club en la tienda Redux y tenemos el ID del club, hacemos una llamada API.
      const fetchClub = async () => {
        try {
          const response = await axios.get(`/api/obtenerClub/${id}`)
          if (response.data) {
            dispatch(setCurrentClubId(response.data))
            if (response.data.libro) {
              // Si la respuesta contiene la información del libro
              dispatch(setBook(response.data.libro))
            }
          }
        } catch (error) {
          console.error('Error al obtener el club:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchClub()
    } else {
      setIsLoading(false)
    }
  }, [id, clubId, dispatch])

  if (isLoading) {
    return (
      <>
        <div>Cargando...</div>
      </>
    )
  }

  return (
    <Layout page={'LIBRO'}>
      <CreateClubLectura />
    </Layout>
  )
}

export default ClubPage
