import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';

class SessionCotnroller {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ error: 'Email incorreto' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    const { _id, name } = user;
    return res.json({
      user: {
        _id,
        name,
        email,
      },
      token: jwt.sign({ _id }, auth.secret, {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessionCotnroller();
