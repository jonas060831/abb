'use client'

import { getAllRsvp, sendEventReminderToGuest } from '@/app/(serverFunctions)/rsvp';
import extractFirstGuestAndEmail from '@/app/utils/extractFirstGuestNameAndEmail';
import EventReminderEmail from '@/emails/EventReminder';
import React, { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

type RSVP = {
  guestNames: string[];
  contactEmail: string;
  [key: string]: any;
};

type ExtractedGuest = {
  firstName: string;
  email: string;
};

const EventReminder: React.FC = () => {
  const [isSending, setIsSending] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSending(true);

    try {
      const rsvpDetails = await getAllRsvp();
      const { success, data } = rsvpDetails as { success: boolean; data: RSVP[] };

      if (success) {
        const extractedDetails: ExtractedGuest[] = extractFirstGuestAndEmail(data);

        for (const user of extractedDetails) {
          const reminderToGuestEmail = renderToStaticMarkup(
            <EventReminderEmail guestName={user.firstName} />
          );

          await sendEventReminderToGuest(user.email, reminderToGuestEmail);
        }

        // After all reminders are sent
        alert('All reminders have been sent!');
      }
    } catch (error) {
      console.error('Error sending event reminders:', error);
      alert('An error occurred while sending reminders.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isSending}>
        {isSending ? 'Sending...' : 'Send Reminder'}
      </button>
    </div>
  );
};

export default EventReminder;
