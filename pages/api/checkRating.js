// pages/api/checkRating.js
import db from './db';

const checkRating = async (req, res) => {
  if (req.method === 'GET') {
    const { clubId, userId } = req.query;

    try {
      const result = await db.query(
        'SELECT rating_value FROM ratings WHERE idclub = $1 AND userid = $2', 
        [clubId, userId]
      );

      if (result.rows.length > 0) {
        // Si hay resultados, significa que el usuario ya ha calificado.
        res.status(200).json({ hasRated: true, rating: result.rows[0].rating_value });
      } else {
        res.status(200).json({ hasRated: false });
      }
    } catch (error) {
      console.error("Error checking user rating:", error);
      res.status(500).json({ message: 'Error al verificar la calificación del usuario' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default checkRating;
