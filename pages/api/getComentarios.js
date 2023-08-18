import db from '../.././pages/api/db'; 

const getComments = async (req, res) => {
  if (req.method === 'GET') {
    const { club_id } = req.query;

    try {
      const result = await db.query(
        `SELECT c.id, c.user_id, u.nombre as user_name, c.comment, c.date
         FROM comments c
         JOIN reader_club_users u ON c.user_id = u.Id
         WHERE c.club_id = $1`,
        [club_id]
      );

      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error al obtener comentarios:", error.message);
      res.status(500).json({ message: 'Hubo un error al obtener los comentarios', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default getComments;
