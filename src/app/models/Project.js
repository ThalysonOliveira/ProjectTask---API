import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Project', ProjectSchema);
