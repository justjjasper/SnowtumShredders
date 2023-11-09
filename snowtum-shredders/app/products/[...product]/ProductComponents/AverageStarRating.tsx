import { starEmptySVG, starFilledSVG } from "../../../Misc/Icons";
import { calcAvgStarRating } from "../page";
import { ReviewType } from "../../../types";

interface AverageStarRatingProp {
  reviews: ReviewType[]
}
export default function AverageStarRating ( {reviews}: AverageStarRatingProp) {
  const starWidth = (calcAvgStarRating(reviews) * 100).toString()+ '%'

  return (
    <span className='star-rating flex relative'>
      <span className='star-empty'>
        {starEmptySVG}
        {starEmptySVG}
        {starEmptySVG}
        {starEmptySVG}
        {starEmptySVG}
      </span>
      <span className='star-filled absolute overflow-hidden whitespace-nowrap' style={{ width: starWidth}}>
        {starFilledSVG}
        {starFilledSVG}
        {starFilledSVG}
        {starFilledSVG}
        {starFilledSVG}
      </span>
  </span>
  )
}