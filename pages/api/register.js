import db from '../.././pages/api/db';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  if (req.method === 'POST') {
    const { documento, nombre, contrasena } = req.body;

    try {
      // Comprueba si el documento ya existe
      const userExists = await db.query('SELECT * FROM reader_club_users WHERE documento = $1', [documento]);
      
      if(userExists.rows.length > 0){
        return res.status(409).json({message: "El usuario con este documento ya existe"});
      }

      // Cifra la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      // Inserta el nuevo usuario en la base de datos
      await db.query(
        'INSERT INTO reader_club_users (documento, nombre, contrasena) VALUES ($1, $2, $3)',
        [documento, nombre, hashedPassword]
      );

      // Retorna una respuesta exitosa
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Hubo un error al crear el usuario' });
    }
  } else {
    // Manejo de otros métodos de HTTP
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default registerUser;
