// pages/api/logout.js

export default function logout(req, res) {
    if (req.method === 'POST') {
      // Borrar la cookie
      res.setHeader('Set-Cookie', `auth=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`);
      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } else {
      // Manejo de otros métodos de HTTP
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  