import db from '../.././pages/api/db';
import bcrypt from 'bcrypt';

const loginUser = async (req, res) => {
  if (req.method === 'POST') {
    const { documento, contrasena } = req.body;

    try {
      // Comprueba si el usuario existe
      const user = await db.query('SELECT * FROM reader_club_users WHERE documento = $1', [documento]);
      
      if(user.rows.length === 0){
        return res.status(401).json({message: "Documento o contraseña incorrecta"});
      }

      // Comprueba si la contraseña es correcta
      const validPassword = await bcrypt.compare(contrasena, user.rows[0].contrasena);
      
      if(!validPassword){
        return res.status(401).json({message: "Documento o contraseña incorrecta"});
      }

      // Retorna una respuesta exitosa
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Hubo un error al iniciar sesión' });
    }
  } else {
    // Manejo de otros métodos de HTTP
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default loginUser;
