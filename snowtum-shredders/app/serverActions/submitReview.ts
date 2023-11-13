'use server'
import { postReviewAPI } from "../config"

interface ReviewBodyType {
  snowboard_id: number;
  author: string | undefined;
  email: string | undefined;
  title: string | undefined;
  body: string | undefined;
  date: string;
  rating: number
}

export const submitReview = async (e: FormData, reviewBody: ReviewBodyType, csrfToken: string) => {
  // handle backend/database logic

  const currentDate = new Date()
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  const formattedDate = currentDate.toLocaleDateString('en-US', options)

  reviewBody.date = formattedDate

  const data = await fetch(postReviewAPI, {
    method: 'POST',
    body: JSON.stringify(reviewBody),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    }
  })

  const res = await data.json()
  console.log(res)
}