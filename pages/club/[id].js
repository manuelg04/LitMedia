// pages/club/[id].js

import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateClubLectura from '..//components/clubLectura';
import { selectCurrentClub } from '../../redux/selectorClub';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentClub } from '../../redux/clubSlice';
import { useRouter } from 'next/router';
import React from 'react';
import { setBook } from '../../redux/bookSlice';

const ClubPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const club = useSelector(selectCurrentClub);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  

  useEffect(() => {
    if (!club && id) {
      // Si no hay club en la tienda Redux y tenemos el ID del club, hacemos una llamada API.
      const fetchClub = async () => {
        try {
          const response = await axios.get(`/api/obtenerClub/${id}`);
          if (response.data) {
            dispatch(setCurrentClub(response.data));
            if (response.data.libro) {  // Si la respuesta contiene la información del libro
                dispatch(setBook(response.data.libro));
            }
        }
        
        } catch (error) {
          console.error('Error al obtener el club:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchClub();
    } else {
      setIsLoading(false);
    }
  }, [id, club, dispatch]);

  if (isLoading) {
    return(
      <>
    <div>
      Cargando...
      </div>
     
      </>

      )
     
  }

  return <CreateClubLectura />;
};

export default ClubPage;

