import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  status: { type: String, required: true },
  remarks: { type: String, required: true },
  updatedBy: { type: String, required: true },
  department: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Timeline = mongoose.models.Timeline || mongoose.model('Timeline', timelineSchema);
export default Timeline;
