
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

export interface RsvpPostResponse {
  success: boolean;
  data?: RsvpEntry;
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
  formData: RsvpEntry
): Promise<RsvpPostResponse> => {
  try {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch('/api/rsvp', options);
    const data: RsvpPostResponse = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
};


//send rsvp email to the guest
export const sendRSVPConfirmationEmailToGuest = async (
  senderEmail: string,
  testEmail: string
): Promise<{ success: true; data: string } | { success: false; error: string }> => {
  try {
    const res = await fetch('/api/emails/rsvp-confirmation-guest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderEmail, testEmail }),
    });

    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
