import { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ForoVideosLectura() {
  const [youtubeURL, setYoutubeURL] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/youtubeVideo', { youtubeURL });
      setYoutubeURL('');

      const urlParams = new URLSearchParams(new URL(youtubeURL).search);
      setVideoId(urlParams.get('v'));
      setYoutubeURL('');

      console.log(res.data.message);
    } catch (error) {
      console.error('Error al subir el vídeo', error);
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      author: 'Usuario',
      avatar: 'https://via.placeholder.com/35',
      content: newComment,
      datetime: dayjs().fromNow(),
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-darkBlue space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="flex-1 flex flex-col lg:flex-row w-full p-6 text-lightBeige">
        <div className="bg-lightBlue lg:w-1/3 p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notas Literarias</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {/* Here you can insert the literary notes content */}
            <p className="text-gray-700">Aquí van las notas literarias...</p>
          </div>
        </div>

        <div className="bg-lightBeige lg:w-2/3 p-6 rounded-xl shadow-lg space-y-6">
          <form onSubmit={handleSubmit} className="mb-4">
            <label htmlFor="youtubeURL" className="block text-sm font-medium text-gray-700">YouTube URL</label>
            <input
              type="url"
              id="youtubeURL"
              required
              className="mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              value={youtubeURL}
              onChange={(e) => setYoutubeURL(e.target.value)}
            />
            <button type="submit" className="bg-green-500 mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Submit
            </button>
          </form>

          {videoId && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mb-4"
            ></iframe>
          )}

          <div className="comments-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sección de Discusión LITMEDIA</h2>
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                required
                className="mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ingresa tu comentario aquí..."
              />
              <button type="submit" className="bg-green-500 mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Post Comment
              </button>
            </form>

            <ul className="space-y-6">
              {comments.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div style={{ backgroundImage: `url(${item.avatar})` }} className="bg-cover bg-center w-10 h-10 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.content}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.datetime}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <footer className="bg-darkBlue text-center text-lightBeige py-6">
        <p>© 2023 LITMEDIA. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
