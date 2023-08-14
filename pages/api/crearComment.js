import db from '../.././pages/api/db'; 

const createComment = async (req, res) => {
  if (req.method === 'POST') {
    const { user_id, club_id, comments } = req.body;
  
    try {
      await db.query(
        'INSERT INTO comments (user_id, club_id, comment, date) VALUES ($1, $2, $3, NOW())',
        [user_id, club_id, comments]
      );

      res.status(201).json({ message: 'Comentario creado exitosamente' });
    } catch (error) {
      console.error("Error al crear comentario:", error.message);
      res.status(500).json({ message: 'Hubo un error al crear el comentario', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default createComment;
