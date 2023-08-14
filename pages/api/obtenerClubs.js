// pages/api/getClubs.js
import db from '../.././pages/api/db';

const getClubs = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const result = await db.query('SELECT * FROM list_clubs_created ORDER BY idclub DESC');

      res.status(200).json(result.rows);
    } catch (error) {
      
      res.status(500).json({ message: 'Hubo un error al obtener los clubs' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default getClubs;
