const defaultPointOptions = {
    isInteger: false,
};

export default class Point {
    /*
     * Initialize parameter options and position coordinates.
     */
    constructor(x, y, options = {}) {
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
