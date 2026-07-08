import Concern from '../models/Concern.js';
import { formatTrackingId, getDepartmentByCategory } from '../utils/generateTrackingId.js';

export const getNextTrackingId = async () => {
  const year = new Date().getFullYear();
  const regex = new RegExp(`^JV-MDU-${year}-(\\d{6})$`);
  const latest = await Concern.find({ trackingId: regex }).sort({ trackingId: -1 }).limit(1);
  if (!latest || latest.length === 0) {
    return formatTrackingId(year, 1);
  }
  const last = latest[0].trackingId;
  const match = last.match(regex);
  const seq = match ? Number(match[1]) + 1 : 1;
  return formatTrackingId(year, seq);
};

export const assignDepartment = (category) => getDepartmentByCategory(category);
