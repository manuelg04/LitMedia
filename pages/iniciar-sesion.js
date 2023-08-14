import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch , useSelector } from 'react-redux'; // Importa el useDispatch
import { setUser } from '../redux/userSlice'; // Importa la acción setUser del slice
import Swal from "sweetalert2";


function Login() {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user.usuario);
  console.log("🚀 ~ userName:", userName)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/loginuser', { documento: document, contrasena: password });

      if (response.status === 200) {
        // Obtiene el nombre de usuario desde la respuesta
        dispatch(setUser({ nombre: response.data.nombre, id: response.data.id }));


        Swal.fire({
          icon: 'success',
          title: '¡Buen trabajo!',
          text: 'Credenciales correctas, estamos iniciando sesión'
        });

        // Redirige al usuario al dashboard si el inicio de sesión fue exitoso
        router.push('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Documento o contraseña incorrecta, por favor verifica tus credenciales'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Documento o contraseña incorrecta, por favor verifica tus credenciales'
      });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="document" className="sr-only">
                Documento
              </label>
              <input
                id="document"
                name="document"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Documento"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
        <p>No estás registrado? <a href="/registrarse" className="text-indigo-600 hover:text-indigo-700 cursor-pointer">¡Hazlo ahora!</a></p>
      </div>
      </div>
    </div>
  );
}

export default Login;
