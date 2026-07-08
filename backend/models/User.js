import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  assemblyConstituency: { type: String, required: true },
  constituency: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'mp', 'admin'], default: 'citizen' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
