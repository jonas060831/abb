"use client"
import { getAllRsvp, RsvpEntry } from '@/app/(serverFunctions)/rsvp'
import React, { useEffect, useMemo, useState } from 'react'

const ConfirmedHeadCount = () => {

  const [rsvp, setRsvp] =  useState<RsvpEntry[]>([]);

  useEffect(() => {
      
      fetchAllRsvps()
  }, [rsvp])

  const fetchAllRsvps = async () => {
  try {
    const res = await getAllRsvp();

    if (res && Array.isArray(res.data)) {
      //setRsvp(res.data.length);
      setRsvp(res.data)
    } else {
      console.warn("No RSVPs found or invalid response format.");
      setRsvp([]);
    }
  } catch (error) {
    console.error("Failed to fetch RSVPs:", error);
    setRsvp([]);
  }
};

const totalHeadcount = useMemo(() => {
    return rsvp.reduce((total, guest) => total + guest.guestNames.length, 0);
  }, [rsvp]);


  if(rsvp.length === 0) return <p style={{ position: 'absolute', display: 'flex', alignSelf: 'center', justifySelf: 'center', marginTop: '-36rem' }}><img src='/medias/svgs/loading-spinner-black.svg' alt='' style={{ width: '25px' }}/></p>
  
  //because 0 also evaluate to false
  // if(rsvp.length === 0) return null

  return (
    <p style={{ position: 'absolute', display: 'flex', alignSelf: 'center', justifySelf: 'center', marginTop: '-36rem', fontFamily: 'var(--font-raleway)' }}>{totalHeadcount} Confirmed</p>
  )
}

export default ConfirmedHeadCount