"use client"
import { getAllRsvp, sendEventReminderToGuest } from '@/app/(serverFunctions)/rsvp'
import extractFirstGuestAndEmail from '@/app/utils/extractFirstGuestNameAndEmail'
import EventReminderEmail from '@/emails/EventReminder'
import React, { MouseEventHandler } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const EventReminder = () => {


  const handleClick = async (event: any) => {
  event?.preventDefault();

  const rsvpDetails = await getAllRsvp();
  const { success, data } = rsvpDetails;

  if (success) {
    const extractedDetails = extractFirstGuestAndEmail(data);


    // Use for...of to handle async properly
    for (const user of extractedDetails) {
      const reminderToGuestEmail = renderToStaticMarkup(
        <EventReminderEmail guestName={user.firstName} />
      );

      // Await the send function
      await sendEventReminderToGuest(user.email, reminderToGuestEmail);
    }
  }
};


  return (
    <div>
        <button onClick={handleClick}>Send Reminder</button>
    </div>
  )
}

export default EventReminder