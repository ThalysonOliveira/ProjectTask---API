import jwt from 'jsonwebtoken';
import auth from '../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ erro: 'Token não existe' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const payload = await jwt.verify(token, auth.secret);
    req.user_id = payload._id;
  } catch (error) {
    return res.status(400).json({ error: 'Token invalido' });
  }

  next();
};
