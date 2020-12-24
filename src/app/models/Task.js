import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Task', TaskSchema);
