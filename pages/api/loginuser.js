import db from '../.././pages/api/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'YOUR_SECRET_KEY';  // Cambia esto a una llave secreta más segura y considera usar variables de entorno.

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

      const nombreUsuario = user.rows[0].nombre; // Suponiendo que el campo se llama "nombre" en la tabla "reader_club_users"
      const idUsuario = user.rows[0].id;

      // Genera un JWT
      const token = jwt.sign({ userId: idUsuario, username: nombreUsuario }, SECRET_KEY, { expiresIn: '1h' });

      // Establece el JWT en una cookie segura
      res.setHeader('Set-Cookie', `auth=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60}`);
    
      // Retorna una respuesta exitosa
      res.status(200).json({ message: 'Inicio de sesión exitoso', nombre: nombreUsuario, id: idUsuario });
    } catch (error) {
      
      res.status(500).json({ message: 'Hubo un error al iniciar sesión' });
    }
  } else {
    // Manejo de otros métodos de HTTP
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default loginUser;
