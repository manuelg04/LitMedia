// pages/api/getClubs.js
import db from '../.././pages/api/db';

const getClubs = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const query = `
        SELECT 
          clubs.*, 
          COALESCE(ROUND(AVG(ratings.rating_value)), 0) AS avg_rating
        FROM 
          list_clubs_created AS clubs
        LEFT JOIN 
          ratings ON clubs.idclub = ratings.idclub
        GROUP BY 
          clubs.idclub
        ORDER BY 
          clubs.idclub DESC
      `;

      const result = await db.query(query);

      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error al obtener los clubs: ", error);  // Puede ser útil registrar el error real para depuración.
      res.status(500).json({ message: 'Hubo un error al obtener los clubs' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default getClubs;
