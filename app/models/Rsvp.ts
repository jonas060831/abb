import mongoose, { Schema, model, models } from 'mongoose';
import { unique } from 'next/dist/build/utils';

const RsvpSchema = new Schema(
  {
    guestNames: {
      type: [String],
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    attendance: {
      type: String,
      enum: ['Baptism Only', 'Reception Only', 'Both', 'Baptism & Reception'],
      required: true,
    },
    rsvpId: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite on hot reloads
const Rsvp = models.Rsvp || model('Rsvp', RsvpSchema);

export default Rsvp;
