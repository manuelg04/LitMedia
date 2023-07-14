/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import LiteraryDatabase from "./bdLiteraria";
import { useRouter } from "next/router";

export default function ContenidoLiterario() {
  const [contenido, setContenido] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=R8i2AA0z4l00eVG1Z62kRqAW023GFwET");
        const books = response.data.results.books.map((book, index) => {
          return {
            id: index,
            tipo: "Libro",
            titulo: book.title,
            autor: book.author,
            imagen: book.book_image,
          };
        });
        setContenido(books);
      } catch (error) {
        console.error("Error fetching data from NYT Books API", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
       <nav className="bg-darkBlue text-center py-4">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
        >
          Ir al inicio
        </button>
      </nav>
      <LiteraryDatabase />
      <div className="flex flex-wrap justify-center">
        {contenido.map((item) => (
          <div key={item.id} className="m-4 w-60">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={item.imagen || "/path-to-default-image.jpg"}
                alt={item.titulo}
                width={500}
                height={300}
                objectFit="cover"
                className="w-full"
              />
              <div className="p-6">
                <h2 className="font-bold text-2xl mb-2">{item.titulo}</h2>
                <p className="text-gray-700 text-base">Tipo: {item.tipo}</p>
                <p className="text-gray-700 text-base">Autor: {item.autor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
