import mongoose, { Schema, model, models } from 'mongoose';

// Notice Schema
const NoticeSchema = new Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Event Schema
const EventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String },
  location: { type: String },
  desc: { type: String },
});

// Faculty Schema
const FacultySchema = new Schema({
  title: { type: String }, // Dr., Assistant Professor, Associate Professor, etc.
  initial: { type: String },
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
  qual: { type: String },
  exp: { type: String }, // Years of experience
  spec: { type: String }, // Area of Specialization
  conferences: { type: String },
  journals: { type: String },
  phone: { type: String },
  email: { type: String },
  isHead: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

export const Notice = models.Notice || model('Notice', NoticeSchema);
export const Event = models.Event || model('Event', EventSchema);
export const Faculty = models.Faculty || model('Faculty', FacultySchema);
