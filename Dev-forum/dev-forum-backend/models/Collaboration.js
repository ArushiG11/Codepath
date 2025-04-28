import mongoose from 'mongoose';

const collaborationSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  description: { type: String, required: true },
  contactInfo: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Collaboration', collaborationSchema);
