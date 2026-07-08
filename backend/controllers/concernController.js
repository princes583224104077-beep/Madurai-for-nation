import { validationResult } from 'express-validator';
import Concern from '../models/Concern.js';
import { getNextTrackingId, assignDepartment } from '../services/trackingService.js';
import { sendNotification } from '../services/notificationService.js';

const createTimelineEntry = ({ status, remarks, updatedBy, department }) => ({
  status,
  remarks,
  updatedBy,
  department,
  timestamp: new Date(),
});

export const createConcern = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      title,
      category,
      assemblyConstituency,
      description,
      citizenName,
      email,
      phone,
      anonymous,
      priority,
    } = req.body;

    const attachment = req.file ? req.file.filename : undefined;
    const trackingId = await getNextTrackingId();
    const department = assignDepartment(category);
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);

    const concern = await Concern.create({
      trackingId,
      title,
      category,
      assemblyConstituency,
      description,
      attachment,
      citizenName,
      email,
      phone,
      anonymous: anonymous === 'true' || anonymous === true,
      status: 'Submitted',
      priority: priority || 'Medium',
      department,
      assignedOfficer: '',
      createdBy: req.user ? req.user._id : undefined,
      estimatedResolution: '7 Days',
      deadline,
      timeline: [createTimelineEntry({
        status: 'Submitted',
        remarks: 'Concern Registered',
        updatedBy: 'Citizen',
        department,
      })],
    });

    await sendNotification({
      email: concern.email,
      subject: 'Your Madurai Concern has been registered',
      message: `Your concern ${trackingId} has been registered successfully.`,
    });

    res.status(201).json({
      success: true,
      message: 'Concern Registered Successfully',
      trackingId: concern.trackingId,
      status: concern.status,
      estimatedResolution: concern.estimatedResolution,
    });
  } catch (error) {
    next(error);
  }
};

export const publicCreateConcern = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      title,
      category,
      assemblyConstituency,
      description,
      citizenName,
      email,
      phone,
      anonymous,
      priority,
    } = req.body;

    const attachment = req.file ? req.file.filename : undefined;
    const trackingId = await getNextTrackingId();
    const department = assignDepartment(category);
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);

    const concern = await Concern.create({
      trackingId,
      title,
      category,
      assemblyConstituency,
      description,
      attachment,
      citizenName,
      email,
      phone,
      anonymous: anonymous === 'true' || anonymous === true,
      status: 'Submitted',
      priority: priority || 'Medium',
      department,
      assignedOfficer: '',
      estimatedResolution: '7 Days',
      deadline,
      timeline: [createTimelineEntry({
        status: 'Submitted',
        remarks: 'Concern Registered',
        updatedBy: 'Citizen',
        department,
      })],
    });

    await sendNotification({
      email: concern.email,
      subject: 'Your Madurai Concern has been registered',
      message: `Your concern ${trackingId} has been registered successfully.`,
    });

    res.status(201).json({
      success: true,
      message: 'Concern Registered Successfully',
      trackingId: concern.trackingId,
      status: concern.status,
      estimatedResolution: concern.estimatedResolution,
    });
  } catch (error) {
    next(error);
  }
};

export const getTrackingDetails = async (req, res, next) => {
  try {
    const trackingId = req.params.trackingId;
    const concern = await Concern.findOne({ trackingId });
    if (!concern) {
      return res.status(404).json({ success: false, message: 'Concern not found' });
    }
    res.json({ success: true, concern, timeline: concern.timeline });
  } catch (error) {
    next(error);
  }
};

export const getMyConcerns = async (req, res, next) => {
  try {
    const concerns = await Concern.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, concerns });
  } catch (error) {
    next(error);
  }
};

export const updateConcernStatus = async (req, res, next) => {
  try {
    const concern = await Concern.findOne({ trackingId: req.params.trackingId });
    if (!concern) {
      return res.status(404).json({ success: false, message: 'Concern not found' });
    }

    const { status, assignedOfficer, department, remarks } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    concern.status = status;
    if (assignedOfficer) concern.assignedOfficer = assignedOfficer;
    if (department) concern.department = department;
    concern.timeline.push(createTimelineEntry({
      status,
      remarks: remarks || `Status updated to ${status}`,
      updatedBy: req.user.role === 'admin' ? 'Admin' : req.user.name,
      department: department || concern.department,
    }));
    await concern.save();

    res.json({ success: true, concern });
  } catch (error) {
    next(error);
  }
};

export const assignConcern = async (req, res, next) => {
  try {
    const concern = await Concern.findOne({ trackingId: req.params.trackingId });
    if (!concern) {
      return res.status(404).json({ success: false, message: 'Concern not found' });
    }

    const { assignedOfficer, department, remarks } = req.body;
    if (!assignedOfficer || !department) {
      return res.status(400).json({ success: false, message: 'assignedOfficer and department are required' });
    }

    concern.assignedOfficer = assignedOfficer;
    concern.department = department;
    concern.timeline.push(createTimelineEntry({
      status: concern.status,
      remarks: remarks || `Assigned to ${assignedOfficer} in ${department}`,
      updatedBy: req.user.name,
      department,
    }));
    await concern.save();

    res.json({ success: true, concern });
  } catch (error) {
    next(error);
  }
};

export const addTimelineUpdate = async (req, res, next) => {
  try {
    const concern = await Concern.findOne({ trackingId: req.params.trackingId });
    if (!concern) {
      return res.status(404).json({ success: false, message: 'Concern not found' });
    }

    const { status, remarks, department, updatedBy } = req.body;
    if (!status || !remarks) {
      return res.status(400).json({ success: false, message: 'Status and remarks are required' });
    }

    concern.timeline.push(createTimelineEntry({
      status,
      remarks,
      updatedBy: updatedBy || req.user.name,
      department: department || concern.department,
    }));

    if (status) concern.status = status;
    await concern.save();

    res.json({ success: true, concern });
  } catch (error) {
    next(error);
  }
};

export const deleteConcern = async (req, res, next) => {
  try {
    const concern = await Concern.findOneAndDelete({ trackingId: req.params.trackingId });
    if (!concern) {
      return res.status(404).json({ success: false, message: 'Concern not found' });
    }
    res.json({ success: true, message: 'Concern deleted' });
  } catch (error) {
    next(error);
  }
};
