import { Point } from "./point.js";

export type RectangleOptions = {
    isInteger?: boolean;
};

const defaultRectangleOptions = {
    isInteger: false,
};

export class Rectangle {
    public a!: Point;
    public b!: Point;
    private _options: RectangleOptions = {};

    /*
     * Initialize parameter options and bounding points.
     * a, b refer to opposing points of the rectangle.
     */
    constructor(
        a: Point,
        b: Point,
        options: RectangleOptions = defaultRectangleOptions,
    ) {
        this._options = { ...defaultRectangleOptions, ...options };
        this.setBoundingPoints(a, b);
    }

    /*
     * Using floor to give c++ int behavior if isInteger == true.
     */
    setBoundingPoints(a?: Point, b?: Point) {
        this.a = a || new Point();
        this.b = b || new Point();
    }

    isPointInRectangle(pt: Point) {
        const xTest = this.a.x <= pt.x && pt.x <= this.b.x;
        const yTest = this.a.y <= pt.y && pt.y <= this.b.y;

        return xTest && yTest;
    }

    /*
     * Check if the rectables overlap by any amount.
     */
    doRectaglesOverlap(rect: Rectangle) {
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
    sumOfPointsInRectangle(ptArray: Point[], ptArrayBoundingRect: Rectangle) {
        let sum = 0;
        const ptArrayLength = ptArray.length;

        // return right away if bounding rectangle does not overlay.
        if (
            ptArrayBoundingRect &&
            !this.doRectaglesOverlap(ptArrayBoundingRect)
        ) {
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
    sumOfPreprocessedPointsInRectangle(
        ptArray: Array<[number, number]>,
        kdTree: any,
    ) {
        let sum = 0;

        // Iterate over all points in the bounding box
        // idx = index of point in points array
        kdTree.range(
            [this.a.x, this.a.y],
            [this.b.x, this.b.y],
            (idx: number) => {
                sum += ptArray[idx][0] + ptArray[idx][1];
            },
        );

        return sum;
    }
}
