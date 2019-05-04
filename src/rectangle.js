import Point from './point.js';

const defaultRectangleOptions = {
  isInteger: false
};

export default class Rectangle {
  /*
   * Initialize parameter options and bounding points.
   * a, b refer to opposing points of the rectangle.
   */
  constructor(a, b, options = {}) {
    this._options = {...defaultRectangleOptions, ...options};
    this.setBoundingPoints(a, b);
  }

  /*
   * Using floor to give c++ int behavior if isInteger == true.
   */
  setBoundingPoints(a = new Point(), b = new Point()) {
    this.a = a;
    this.b = b;
  }

  isPointInRectangle(pt) {
    let xTest = this.a.x <= pt.x && pt.x <= this.b.x;
    let yTest = this.a.y <= pt.y && pt.y <= this.b.y;

    return xTest && yTest;
  }

  /*
   * Check if the rectables overlap by any amount.
   */
  doRectaglesOverlap(rect) {
    // check if rectangles are out-of-range in x direction.
    if (rect.a.x > this.b.x || this.a.x > rect.b.x) {
      return false;
    }

    // check if rectangles are out-of-range in y direction.
    if (rect.a.y > this.b.y || this.a.y > rect.b.y) {
      return false;
    }

    return true;
  }

  /*
   * Calculate the sum of all points that are in the rectangle.
   * ptArray is NOT preprocessed.
   * Run time complexity is O(n).
   * Memory complexity is O(1).
   */
  sumOfPointsInRectangle(ptArray) {
    let sum = 0;
    let ptArrayLength = ptArray.length;

    for (let index = 0; index < ptArrayLength; index++) {
      if (this.isPointInRectangle(ptArray[index])) {
        sum += ptArray[index].x + ptArray[index].y;
      }
    }

    return sum;
  }

  /*
   * Calculate the sum of all points that are in the rectangle.
   * ptArray is preprocessed. Sorted from least to greatest.
   * Run time complexity is O(n).
   * Memory complexity is O(1).
   */
  // sumOfPreprocessedPointsInRectangle(ptArray) {
  // }
}
