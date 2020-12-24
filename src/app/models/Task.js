import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    require: true,
  },
  assingnedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  completed: {
    type: Boolean,
    require: true,
    default: Date.now,
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
