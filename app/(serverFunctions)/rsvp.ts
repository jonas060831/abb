// Define the type of the RSVP entry
export interface RsvpEntry {
  guestNames: string[];
  contactEmail: string;
  contactNumber: string;
  attendance: string;
  rsvpId: string;
}



// GET all RSVPs
export const getAllRsvp = async (): Promise<any> => {
  try {
    const res = await fetch('/api/rsvp');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
};

// POST a new RSVP
export const addNewRsvp = async (formData: Omit<RsvpEntry, 'rsvpId'>): Promise<any> => {
  try {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch('/api/rsvp', options);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
};
