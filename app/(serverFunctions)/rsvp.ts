export interface RsvpEntry {
  guestNames: string[];
  contactEmail: string;
  contactNumber: string;
  attendance: string;
  rsvpId: string;
}

export interface RsvpResponse {
  success: boolean;
  data?: RsvpEntry[];
  rsvpId?: string;
  error?: string;
}

// GET all RSVPs
export const getAllRsvp = async (): Promise<RsvpResponse> => {
  try {
    const res = await fetch('/api/rsvp');
    const data: RsvpResponse = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
};

// POST a new RSVP
export const addNewRsvp = async (
  formData: Omit<RsvpEntry, 'rsvpId'>
): Promise<RsvpResponse> => {
  try {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch('/api/rsvp', options);
    const data: RsvpResponse = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
};
