type ReviewType = {
  review_id: number,
  snowboard_review_title: string,
  snowboard_review_author: string,
  snowboard_review_date: string,
  snowboard_review_body: string,
  snowboard_review_rating: number
}

type HoveredType = {
  star1: boolean,
  star2: boolean,
  star3: boolean,
  star4: boolean,
  star5: boolean,
}

type MetaDataType = {
  size: string,
  sku: number,
}

type ProductType = {
  id: number,
  name: string,
  header_description: string,
  price: string,
  shape: string,
  sidecut: string,
  flex: string,
  rider_type: string,
  tech_story: string,
  camber_type: string,
  camber_description: string,
  camber_image: string,
  images: string[],
  reviews: ReviewType[],
  video: string,
  meta_data: MetaDataType[],
  description: string,
}

type SnowboardProductType = {
  snowboard_id: number,
  snowboard_name: string,
  snowboard_price: number,
  snowboard_image: string,
  header_description: string,
  snowboard_meta_data: MetaDataType[],
}