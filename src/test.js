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
