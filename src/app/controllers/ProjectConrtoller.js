import Project from '../models/Project';

class ProjectController {
  async list(req, res) {
    return res.json({ ok: true });
  }

  async index(req, res) {
    const project = await Project.find();
    return res.json(project);
  }

  async store(req, res) {
    const { title, description } = req.body;
    const project = await Project.create({
      title,
      description,
      user: req.user_id,
    });

    return res.status(201).json(project);
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new ProjectController();
