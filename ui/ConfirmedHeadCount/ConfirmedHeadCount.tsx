"use client"
import { getAllRsvp } from '@/app/(serverFunctions)/rsvp'
import React, { useEffect, useState } from 'react'

const ConfirmedHeadCount = () => {

  const [rsvp, setRsvp] = useState<number | null>(null)

  useEffect(() => {
      
      fetchAllRsvps()
  }, [rsvp])

  const fetchAllRsvps = async () => {
  try {
    const res = await getAllRsvp();

    if (res && Array.isArray(res.data)) {
      setRsvp(res.data.length);
    } else {
      console.warn("No RSVPs found or invalid response format.");
      setRsvp(0);
    }
  } catch (error) {
    console.error("Failed to fetch RSVPs:", error);
    setRsvp(0);
  }
};


  if(rsvp === null && rsvp !== 0) return <p style={{ position: 'absolute', display: 'flex', alignSelf: 'center', justifySelf: 'center', marginTop: '-36rem' }}>Loading...</p>
  
  //because 0 also evaluate to false
  if(rsvp === 0) return null

  return (
    <p style={{ position: 'absolute', display: 'flex', alignSelf: 'center', justifySelf: 'center', marginTop: '-36rem' }}>{rsvp} Confirmed</p>
  )
}

export default ConfirmedHeadCount