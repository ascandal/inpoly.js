export type PointOptions = {
    isInteger?: boolean;
};

const defaultPointOptions = {
    isInteger: false,
};

export class Point {
    public x!: number;
    public y!: number;
    private _options: PointOptions = {};
    /*
     * Initialize parameter options and position coordinates.
     */
    constructor(
        x?: number,
        y?: number,
        options: PointOptions = defaultPointOptions,
    ) {
        this._options = { ...defaultPointOptions, ...options };
        this.setPosition(x, y);
    }

    /*
     * Using floor to give c++ int behavior if isInteger == true.
     */
    setPosition(x = 0, y = 0) {
        this.x = this._options.isInteger ? Math.floor(x) : x;
        this.y = this._options.isInteger ? Math.floor(y) : y;
    }
}
