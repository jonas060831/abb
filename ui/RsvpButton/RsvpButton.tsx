'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MdRsvp, MdHomeFilled } from 'react-icons/md'
import Image from 'next/image'
import LoadingSpinner from '@/public/medias/svgs/loading-spinner.svg'

const RsvpButton = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [onRsvp, setOnRsvp] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setOnRsvp(pathname.includes('/rsvp'))
    setLoading(false)
  }, [pathname])

  const handleClick = (path: string) => {
    if (pathname === path) return
    setLoading(true)
    router.push(path)
  }

  return (
    <button
      className="rsvp_button"
      onClick={() => handleClick(onRsvp ? '/' : '/rsvp')}
      disabled={loading}
    >
      {loading ? (
        <Image src={LoadingSpinner} alt="Loading..." width={38} height={38} />
      ) : onRsvp ? (
        <MdHomeFilled size={38} />
      ) : (
        <MdRsvp size={50} />
      )}
    </button>
  )
}

export default RsvpButton
