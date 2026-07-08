import mongoose from 'mongoose';

const concernSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  assemblyConstituency: { type: String, required: true },
  description: { type: String, required: true },
  attachment: { type: String },
  citizenName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  anonymous: { type: Boolean, default: false },
  status: { type: String, default: 'Submitted' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  department: { type: String },
  assignedOfficer: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estimatedResolution: { type: String },
  deadline: { type: Date },
  timeline: [
    {
      status: { type: String, required: true },
      remarks: { type: String, required: true },
      updatedBy: { type: String, required: true },
      department: { type: String },
      timestamp: { type: Date, default: Date.now },
    }
  ],
}, { timestamps: true });

const Concern = mongoose.models.Concern || mongoose.model('Concern', concernSchema);
export default Concern;
