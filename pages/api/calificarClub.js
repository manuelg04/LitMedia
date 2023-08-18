// pages/api/calificarClub.js
import db from './db';

const calificarClub = async (req, res) => {
  if (req.method === 'POST') {
    const { club_id, rating } = req.body;

    // 1. Almacena la calificación en la tabla `ratings`.
    try {
      await db.query(
        'INSERT INTO ratings (idclub, rating_value) VALUES ($1, $2)', 
        [club_id, rating]
      );
    } catch (error) {
      console.error("Error insertando la calificación:", error);
      res.status(500).json({ message: 'Error al insertar calificación' });
      return;
    }

    // 2. Calcula el promedio de calificaciones para ese club.
    let avgRating;
    try {
      const result = await db.query(
        'SELECT AVG(rating_value) as avg_rating FROM ratings WHERE idclub = $1', 
        [club_id]
      );
      avgRating = result.rows[0].avg_rating;
    } catch (error) {
      console.error("Error calculando el promedio:", error);
      res.status(500).json({ message: 'Error al calcular el promedio' });
      return;
    }

    // 3. Actualiza el promedio en la tabla `list_clubs_created`.
    try {
      await db.query(
        'UPDATE list_clubs_created SET avg_rating = $1 WHERE idclub = $2', 
        [avgRating, club_id]
      );
    } catch (error) {
      console.error("Error actualizando el promedio en el club:",  error);
      res.status(500).json({ message: 'Error al actualizar el promedio del club' });
      return;
    }

    res.status(200).json({ message: 'Calificación almacenada y promedio actualizado' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default calificarClub;
