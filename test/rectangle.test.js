import { describe, it } from "node:test";
import assert from "node:assert/strict";
import createKDTree from "static-kdtree";
import {
    Point,
    Rectangle,
    calculateBoundingRectangle,
} from "../dist/index.mjs";

describe("Rectangle isPointInRectangle", () => {
    it("point in rectangle", () => {
        const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
        const point1 = new Point(0.5, 0.5);

        assert.strictEqual(rect1.isPointInRectangle(point1), true);
    });

    it("point on boundary of rectangle", () => {
        const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
        const point1 = new Point(0.5, 1);

        assert.strictEqual(rect1.isPointInRectangle(point1), true);
    });

    it("point not in rectangle", () => {
        const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
        const point1 = new Point(2, 2);

        assert.strictEqual(rect1.isPointInRectangle(point1), false);
    });
});

describe("Rectangle doRectaglesOverlap", () => {
    it("rectangles overlap", () => {
        const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
        const rect2 = new Rectangle(new Point(0.5, 0.5), new Point(2, 2));

        assert.strictEqual(rect1.doRectaglesOverlap(rect2), true);
    });

    it("rectangles overlap on boundary", () => {
        const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
        const rect2 = new Rectangle(new Point(1, 1), new Point(2, 2));

        assert.strictEqual(rect1.doRectaglesOverlap(rect2), true);
    });

    it("rectangles do not overlap", () => {
        const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
        const rect2 = new Rectangle(new Point(1.5, 1.5), new Point(2, 2));

        assert.strictEqual(rect1.doRectaglesOverlap(rect2), false);
    });
});

describe("Rectangle sumOfPointsInRectangle", () => {
    it("sum up x and y coordinates of all points that fall in rectangle", () => {
        const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));

        let pointArray = [];
        pointArray.push(new Point(0.5, 0.5));
        pointArray.push(new Point(0.5, 1));
        pointArray.push(new Point(2, 2));

        assert.strictEqual(rect1.sumOfPointsInRectangle(pointArray), 2.5);
    });

    it("given bounding rectangle", () => {
        const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));

        let pointArray = [];
        pointArray.push(new Point(0.5, 0.5));
        pointArray.push(new Point(0.5, 1));
        pointArray.push(new Point(2, 2));

        const ptBoundingRect = calculateBoundingRectangle(pointArray);

        assert.strictEqual(
            rect1.sumOfPointsInRectangle(pointArray, ptBoundingRect),
            2.5,
        );
    });
});

describe("Rectangle sumOfPreprocessedPointsInRectangle", () => {
    it("given preprocessed kd-tree data structure", () => {
        const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));

        let pointArray = [
            [0.5, 0.5],
            [0.5, 1.0],
            [2.0, 2.0],
        ];

        const kdTree = createKDTree(pointArray);

        assert.strictEqual(
            rect1.sumOfPreprocessedPointsInRectangle(pointArray, kdTree),
            2.5,
        );
    });
});
