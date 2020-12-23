import User from '../models/User';
import bcrypt from 'bcryptjs';

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
  }
}

export default new SessionCotnroller();
