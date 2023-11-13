'use client'

import React, { useState } from "react"

export default function Report( {review_id}: {review_id: number} ) {
  const [reported, setReported] = useState<boolean>(false)

  const handleReport = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const userConfirmed = window.confirm('Are you sure you want to report this review as inappropriate?')

    if (userConfirmed) {
      setReported(true)
      alert('Reported as Inappropriate >:(')
    }
  }

  return (
    <div className='spr-review-footer flex'>
      {/* //TODO contains onClikck function */}
      { reported ? (
        <span className='spr-review-reportreview uppercase text-[9px] font-bold ml-auto'>This review has been reported</span>
      ) : (
        <a className='spr-review-reportreview uppercase underline text-[9px] font-bold ml-auto'
          id={`report_${review_id}`}
          href='#'
          onClick={handleReport}>
          Report as Inappropriate
        </a>
      )}
    </div>
  )
}