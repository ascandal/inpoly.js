import Rectangle from './rectangle.js'
import Point from './point.js';

/*
 * Returns the rectangle that contains all the points in the given array.
 */
export function calculateBoundingRectangle (ptArray) {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;

  let maxX = -Number.MAX_SAFE_INTEGER;
  let maxY = -Number.MAX_SAFE_INTEGER;

  let ptArrayLength = ptArray.length;

  for (let index = 0; index < ptArrayLength; index++) {
    minX = Math.min(ptArray[index].x, minX);
    minY = Math.min(ptArray[index].y, minY);

    maxX = Math.max(ptArray[index].x, maxX);
    maxY = Math.max(ptArray[index].y, maxY);
  }

  return new Rectangle(new Point(minX, minY), new Point(maxX, maxY));
}
