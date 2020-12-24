import Project from '../models/Project';

class ProjectController {
  async list(req, res) {
    return res.json({ ok: true });
  }

  async index(req, res) {
    return res.json({ ok: true });
  }

  async store(req, res) {
    const { title, description } = req.body;
    const project = await Project.create({
      title,
      description,
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
