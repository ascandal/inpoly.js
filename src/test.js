import Point from './point.js'
import Rectangle from './rectangle.js'

describe('Rectangle isPointInRectangle', () => {
  it('point in rectangle', () => {
    const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
    const point1 = new Point(0.5, 0.5);

    expect(rect1.isPointInRectangle(point1)).toBe(true);
  })

  it('point on boundary of rectangle', () => {
    const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
    const point1 = new Point(0.5, 1);

    expect(rect1.isPointInRectangle(point1)).toBe(true);
  })

  it('point not in rectangle', () => {
    const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
    const point1 = new Point(2, 2);

    expect(rect1.isPointInRectangle(point1)).toBe(false);
  })
})


describe('Rectangle doRectaglesOverlap', () => {
  it('rectangles overlap', () => {
    const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
    const rect2 = new Rectangle(new Point(0.5, 0.5), new Point(2, 2));

    expect(rect1.doRectaglesOverlap(rect2)).toBe(true);
  })

  it('rectangles overlap on boundary', () => {
    const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
    const rect2 = new Rectangle(new Point(1, 1), new Point(2, 2));

    expect(rect1.doRectaglesOverlap(rect2)).toBe(true);
  })

  it('rectangles do not overlap', () => {
    const rect1 = new Rectangle(new Point(0, 0), new Point(1, 1));
    const rect2 = new Rectangle(new Point(1.5, 1.5), new Point(2, 2));

    expect(rect1.doRectaglesOverlap(rect2)).toBe(false);
  })
})
