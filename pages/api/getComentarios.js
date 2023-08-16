import db from '../.././pages/api/db';

const getComments = async (req, res) => {
  if (req.method === 'GET') {
    const { club_id } = req.query;
    console.log("🚀 ~ req.query:", req.query)
 
    

    try {
      const result = await db.query('SELECT * FROM comments WHERE club_id = $1 ORDER BY date DESC', [club_id]); // cambiado de book_id a club_id

      res.status(200).json(result.rows);
    } catch (error) {
      
      res.status(500).json({ message: 'Hubo un error al obtener los comentarios', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default getComments;
