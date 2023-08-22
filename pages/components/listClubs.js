/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/react-in-jsx-scope */
// components/listadodeClubs.js

import { useEffect, useState } from "react";
import axios from "axios";
import { List, Rate, Typography } from "antd";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCurrentClubId } from "../../redux/clubSlice";
import { useRouter } from "next/router";
import { setBook } from "../../redux/bookSlice";

const ListadodeClubs = () => {
  const [clubs, setClubs] = useState([]);
  const dispatch = useDispatch(); // Usa useDispatch para obtener el dispatch de Redux
  const router = useRouter();

  const handleClubClick = (club) => {
    dispatch(setCurrentClubId(club));

      // Actualizar los detalles del libro en el estado global
      dispatch(setBook({
        nombre: club.nombre,
        libroAsociado: club.libroasociado,
        autor: club.autor, // Asegúrate de que el objeto club tiene esta propiedad
        generoLiterario: club.generoLiterario, // Lo mismo aquí
        descripcion: club.descripcion,
        fotoLibroUrl: club.fotolibrourl,
    }));
    router.push(`/club/${club.idclub}`);
  };

  useEffect(() => {
    const getClubs = async () => {
      const response = await axios.get("/api/obtenerClubs");
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
          renderItem={(club) => (
            <List.Item
  className="flex flex-col items-center text-center my-4"
  onClick={() => handleClubClick(club)}
>
  <Link href={`/club/${club.idclub}`}>
    <img src={club.fotolibrourl} alt={`Imagen de ${club.libroasociado}`} className="w-32 h-32 mb-4 object-cover rounded" />
    <Typography.Text mark>[{club.idclub}]</Typography.Text>
    <br />
    <strong>{club.libroasociado}</strong>
    <br />
    {club.nombre}
    <br />
    {club.autor} {/* Asegúrate de que 'club' tenga esta propiedad 'autor' */}
    <br />
    <Rate value={club.avg_rating} disabled />
    <br />
    <Typography.Text type="secondary">
      {club.descripcion}
    </Typography.Text>
  </Link>
</List.Item>

          )}
        />
      </div>
    </div>
  );
};

export default ListadodeClubs;
