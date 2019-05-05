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
  sumOfPointsInRectangle(ptArray, ptArrayBoundingRect) {
    let sum = 0;
    const ptArrayLength = ptArray.length;

    // return right away if bounding rectangle does not overlay.
    if (ptArrayBoundingRect && !this.doRectaglesOverlap(ptArrayBoundingRect)) {
      return sum;
    }

    for (let index = 0; index < ptArrayLength; index++) {
      if (this.isPointInRectangle(ptArray[index])) {
        sum += ptArray[index].x + ptArray[index].y;
      }
    }

    return sum;
  }

  /*
   * Calculate the sum of all points that are in the rectangle.
   * ptArray is preprocessed by a kdTree.
   * Run time complexity is O(d*n^(1-1/d))
   * Memory complexity is O(1)
   */
  sumOfPreprocessedPointsInRectangle(ptArray, kdTree) {
    let sum = 0;

    // Iterate over all points in the bounding box
    // idx = index of point in points array
    kdTree.range([this.a.x, this.a.y], [this.b.x, this.b.y], (idx) => {
      sum += ptArray[idx][0] + ptArray[idx][1];
    });

    return sum;
  }
}
