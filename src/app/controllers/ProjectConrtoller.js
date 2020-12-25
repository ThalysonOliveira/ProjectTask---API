import Project from '../models/Project';
import Task from '../models/Task';

class ProjectController {
  async list(req, res) {
    const { projectId } = req.params;
    const project = await Project.findById({ _id: projectId });
    return res.json(project);
  }

  async index(req, res) {
    const project = await Project.find().populate('user');
    return res.json(project);
  }

  async store(req, res) {
    const { title, description, tasks } = req.body;
    const project = await Project.create({
      title,
      description,
      user: req.user_id,
    });

    await Promise.all(
      tasks.map(async (task) => {
        const projectTask = new Task({ ...task, project: project._id });

        await projectTask.save();

        project.tasks.push(projectTask);
      })
    );

    await project.save();

    return res.status(201).json(project);
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    const { projectId } = req.params;
    await Project.findByIdAndRemove({ _id: projectId });
    return res.json({ message: 'Projeto exluido com sucesso' });
  }
}

export default new ProjectController();
