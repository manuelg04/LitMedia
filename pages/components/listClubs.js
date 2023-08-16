/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/react-in-jsx-scope */
// components/listadodeClubs.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Typography } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setCurrentClubId } from '../../redux/clubSlice';
import { useRouter } from 'next/router';


const ListadodeClubs = () => {
  const [clubs, setClubs] = useState([]);
  const dispatch = useDispatch();  // Usa useDispatch para obtener el dispatch de Redux
  const router = useRouter();

  const handleClubClick = (club) => {
    dispatch(setCurrentClubId(club));
    router.push(`/club/${club.idclub}`);
  };

  useEffect(() => {
    const getClubs = async () => {
      const response = await axios.get('/api/obtenerClubs');
      setClubs(response.data);
    };
    getClubs();
  }, []);

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-10/12 p-6 mt-10 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Aquí puedes ver el listado de clubs creados por nuestros usuarios
        </h2>

        <List
          header={<div className="text-center font-bold">Lista de Clubs</div>}
          bordered
          dataSource={clubs}
          className="text-center"
          renderItem={club => (
            <List.Item className="text-center flex justify-center items-center" onClick={() => handleClubClick(club)}>
              <Link href={`/club/${club.idclub}`} className="w-full text-center">
  <Typography.Text mark>[{club.idclub}]</Typography.Text> 
  {club.nombre} - {club.libroasociado}
  <br />
  <Typography.Text type="secondary">{club.descripcion}</Typography.Text>
</Link>


            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ListadodeClubs;
