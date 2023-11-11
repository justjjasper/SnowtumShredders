'use server'
import { postReviewAPI } from "../config"

interface ReviewBodyType {
  name: string | undefined;
  email: string | undefined;
  title: string | undefined;
  body: string | undefined;
  rating: number
}

export const submitReview = async (e: FormData, reviewBody: ReviewBodyType, csrfToken: string) => {
  // handle backend/database logic

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