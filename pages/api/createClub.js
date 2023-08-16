import db from '../.././pages/api/db'; // Asegúrate de reemplazar esta ruta con la ubicación de tu archivo de configuración de la base de datos

const createClubLectura = async (req, res) => {
  if (req.method === 'POST') {
    const { nombre, libroasociado, autor, generoliterario, descripcion } = req.body;
  

    try {
      // Inserta la nueva fila en la base de datos y devuelve el ID del club recién creado
      const result = await db.query(
        'INSERT INTO list_clubs_created (nombre, libroasociado, autor, generoliterario, descripcion) VALUES ($1, $2, $3, $4, $5) RETURNING idclub',
        [nombre, libroasociado, autor, generoliterario, descripcion]
      );

      // Retorna una respuesta exitosa con el ID del club
      res.status(201).json({ message: 'Club de lectura creado exitosamente', idclub: result.rows[0].idclub });
    } catch (error) {
      console.error("Error al crear el club de lectura:", error.message);
      res.status(500).json({ message: 'Hubo un error al crear el club de lectura', error: error.message });
    }
  } else {
    // Manejo de otros métodos de HTTP
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default createClubLectura;
