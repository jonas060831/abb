"use client"
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';

import { MdRsvp, MdHomeFilled } from "react-icons/md";

const RsvpButton = () => {

  const router = useRouter()
  const url = usePathname()

  const [onRsvp, setIsOnRsvp] = useState(false)
  useEffect(() => {

    if(url.includes('rsvp')) {
        setIsOnRsvp(true)
    } else {
        setIsOnRsvp(false)
    }
  }, [url,onRsvp])

  if(onRsvp) return (
    <button
     className="rsvp_button"
     onClick={() => router.push('/')}
    >
     <MdHomeFilled size={38}/>
    </button>
  )

  return (
    <button
     className="rsvp_button"
     onClick={() => router.push('/rsvp')}
    >
        <MdRsvp size={50}/>
    </button>
  )
}

export default RsvpButton