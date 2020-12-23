import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';
import crypto from 'crypto';
import mailer from '../../email/mailer';

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

  async recover(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ erro: 'Nenhum usuário cadastrado com esse email' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user._id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    mailer.sendMail({
      to: email,
      from: 'adminsup@gmail.com',
      subject: 'Recuperação de senha',
      text:
        'Você esqueceu sua senha? Não tem problema, utilize esse token:' +
        token,
    });

    return res.json({ message: 'Verifique seu email' });
  }

  async reset(req, res) {
    const { email, token, password } = req.body;

    const user = await User.findOne({ email }).select(
      '+passwordResetToken passwordResetExpires'
    );

    if (!user) {
      return res.status(400).json({ error: 'Email incorreto' });
    }

    if (token !== user.passwordResetToken) {
      return res.status(400).json({ error: 'Token invalido' });
    }

    const now = new Date();

    if (now > user.passwordResetExpires) {
      return res.status(400).json({ error: 'Token expirado, gere um novo' });
    }

    user.password = password;
    await user.save();
    return res.json({ message: 'Senha redefinida com sucesso' });
  }
}

export default new SessionCotnroller();
