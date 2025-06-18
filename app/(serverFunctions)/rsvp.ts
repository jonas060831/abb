
export interface RsvpEntry {
  guestNames: string[];
  contactEmail: string;
  contactNumber: string;
  attendance: string;
  rsvpId: string;
  createdAt?: string;
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
  guestEmail: string,
  rsvpEmailToGuestTemplate: string
): Promise<{ success: true; data: string } | { success: false; error: string }> => {
  try {
    const res = await fetch('/api/emails/rsvp-confirmation-guest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guestEmail, rsvpEmailToGuestTemplate }),
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

export const sendRSVPConfirmationEmailToEventOwner = async (rsvpEmailToOwnerTemplate: string): Promise<{ success: true; data: string } | { success: false; error: string }> => {

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ rsvpEmailToOwnerTemplate })
    }

    const res = await fetch('/api/emails/rsvp-confirmation-event-owner', options)

    const data = await res.json()

    return { success: true, data }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: (error as Error).message
    }
  }
}

export const getRsvpById = async (rsvpId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/rsvp/update/${rsvpId}`, {
      cache: 'no-store', // Ensures fresh data for server components
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    
    if (data.success) {
      return data.data; // Return the actual RSVP data
    } else {
      return null; // Return null if not successful
    }
  } catch (error) {
    console.error('Error fetching RSVP:', error);
    return null; // Return null on error
  }
};

export const updateRsvp = async (rsvpId: string, rsvpData: RsvpEntry) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/rsvp/update/${rsvpId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsvpData),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating RSVP:', error);
    return {
      success: false,
      error: (error as Error).message
    };
  }
};
