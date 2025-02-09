import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  // entityId and entityType are used to store the id and type of the entity that was changed
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'entityType'
  },
  entityType: {
    type: String,
    required: true,
    enum: ['Project', 'Task']
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete']
  },
  changes: {
    type: Map,
    of: {
      oldValue: { type: String },
      newValue: { type: String }
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Log', logSchema);
