import Rsvp from "../models/Rsvp";

// utils/generateRsvpId.ts
export const generateRsvpId = () => {
  const randomNumber = Math.floor(100 + Math.random() * 900); // NNN
  const letters = Array(3)
    .fill(null)
    .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))) // A-Z
    .join('');
  return `AS-${randomNumber}-${letters}`;
};


export const generateUniqueRsvpId = async () => {
  let unique = false;
  let rsvpId = '';

  while (!unique) {
    rsvpId = generateRsvpId();
    const existing = await Rsvp.findOne({ rsvpId });
    if (!existing) {
      unique = true;
    }
  }

  return rsvpId;
};

