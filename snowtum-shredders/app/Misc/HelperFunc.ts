interface ThrottledFunction<T extends (...args: any[]) => void> {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ThrottledFunction<T> {
  let lastCallTime = 0;

  return function (this: ThisParameterType<T>) {
    const now = Date.now();

    if (now - lastCallTime >= delay) {
      func.apply(this, arguments as any);
      lastCallTime = now;
    }
  };
}

export function sortMetaData(metaData: MetaDataType[]) {
  // Define a custom sorting function
  const customSort = (a: MetaDataType, b: MetaDataType) => {
    const sizeA = parseInt(a.size);
    const sizeB = parseInt(b.size);

    if (isNaN(sizeA) && isNaN(sizeB)) {
      // Both sizes have 'W', compare them as strings
      return a.size.localeCompare(b.size);
    }

    // Compare numerical values
    return sizeA - sizeB;
  };

  // Sort the array using the custom sorting function
  const sortedMetaData = metaData.sort(customSort);

  return sortedMetaData;
}

export const calcAvgStarRating = (reviews: ReviewType[]) => {
  if (reviews.length === 0) {
    return 0
  }

  const totalRating = reviews.reduce((total, review) => total += review.snowboard_review_rating, 0)

  return totalRating / reviews.length
}