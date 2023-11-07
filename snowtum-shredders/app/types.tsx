interface ProductReviewType {
  snowboard_review_title: string;
  snowboard_review_author: string;
  snowboard_date: Date;
  snowboard_review_body: string;
  snowboard_review_rating: number
}

export interface MetaDataType {
  size: string;
  sku: number;
}

export interface ProductType {
  id: number;
  name: string;
  header_description: string;
  price: string;
  shape: string;
  sidecut: string;
  flex: string;
  rider_type: string;
  tech_story: string;
  camber_type: string;
  camber_description: string;
  camber_image: string;
  images: string[];
  reviews: ProductReviewType[];
  video: string;
  meta_data: MetaDataType[];
  description: string;
}

export interface ReviewType {
  review_id: number;
  snowboard_review_title: string;
  snowboard_review_author: string;
  snowboard_review_date: string;
  snowboard_review_body: string;
  snowboard_review_rating: number
}
