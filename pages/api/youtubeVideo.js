import db from '../.././pages/api/db';

const YoutubeVideoHandler = async (req, res) => {
  const { youtubeURL } = req.body;

  try {
    // Asegúrate de validar y/o desinfectar la URL antes de guardarla en la base de datos
    await db.query('INSERT INTO youtube_videos (url) VALUES ($1)', [youtubeURL]);

    res.status(200).json({ message: 'Video successfully posted' });
  } catch (error) {
    res.status(500).json({ message: 'Error posting video' });
  }
};

export default YoutubeVideoHandler;
