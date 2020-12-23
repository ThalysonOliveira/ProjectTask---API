import User from '../models/User';

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: 'Email ja cadastrado!' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json(user);
  }

  async update(req, res) {}
}

export default new UserController();
