/*! PanSwipe - v1.0.0
 * https://github.com/ascandal/PanSwipe
 *
 * Copyright (c) 2019 Angelo L. Scandaliato
 * Licensed under the MIT license
 */

const defaultOptions = {
  startPosition: 0,
  lowerBound: -Infinity,
  upperBound: Infinity,
  panSpeed: 0.0025,
  swipeSpeed: 0.8,
  direction: "horizontal",
  cycle: false,
  allowPanPastNext: false,
  animationSpeed: 0.8
};

const hammerDirection = {
  "horizontal": Hammer.DIRECTION_HORIZONTAL,
  "vertical": Hammer.DIRECTION_VERTICAL
};

/*
 * A semi-discrete touch API to update a scalar position value.
 * On slow pan movements, the position updates continuously and follows the pan movement.
 * On fast pan or swipe movements, an automated transition function is triggered
 * to update the position to the next pivot position.
 */
class PanSwipe {
  constructor(options = {}) {
    // Initialize parameter options.
    this._options = { ...defaultOptions, ...options};


    // Bind callback functions.
    this._fireCallback = this._fireCallback.bind(this);
    this._handlePan = this._handlePan.bind(this);
    this._handlePanStart = this._handlePanStart.bind(this);
    this._handlePanEnd = this._handlePanEnd.bind(this);
  }

  setCallback(callback = () => {}) {
    this._callback = callback;
  }

  /*
   * Start the touch event listeners and
   * the animation loop to send data to the callback function.
   */
  start(callback) {
    this._touchControl.on("pan", this._handlePan);
    this._touchControl.on("panstart", this._handlePanStart);
    this._touchControl.on("panend", this._handlePanEnd);

    this.setCallback(callback);

    this._animFrameID = requestAnimationFrame(this._fireCallback, this);
  }

  stop() {
    this._touchControl.off("pan", this._handlePan);
    this._touchControl.off("panstart", this._handlePanStart);
    this._touchControl.off("panend", this._handlePanEnd);

    cancelAnimationFrame(this._animFrameID);
  }

  reset() {
    this._position = this._options.startPosition;
  }

  /*
   * Fires the position data.
   * Manages the requestAnimationFrame loop.
   */
  _fireCallback(timeStamp) {
    this._animationToPositionTarget();

    this._callback({
      position: this._position,
      timeStamp: timeStamp
    });

    this._animFrameID = requestAnimationFrame(this._fireCallback, this);
  }

  /*
   * Smoothly animates the position to the next position target.
   */
  _animationToPositionTarget() {
    if(this._positionTarget === undefined) { return; }

    this._position = this._options.animationSpeed * (this._position - this._positionTarget) + this._positionTarget;

    if(Math.abs(this._position - this._positionTarget) < 0.0001) {
      this._position = this._positionTarget;
      this._positionTarget = undefined;
    }
  }

  /*
   * Immediately updates the position based on pan movement.
   */
  _handlePan(event) {
    if(this._positionTarget !== undefined) { return; }

    const deltaPosition = this._options.direction === "horizontal" ? event.deltaX : event.deltaY;

    this._position = this._positionPanStart +  this._options.panSpeed * deltaPosition;

    // prevent pan past lower and upper bound positions.
    this._position = Math.max(this._options.lowerBound, this._position);
    this._position = Math.min(this._options.upperBound, this._position);

    // prevent pan past nearest lower and upper pivot positions.
    if(!this._options.allowPanPastNext) {
      this._position = Math.max(this._lbPositionPanStart, this._position);
      this._position = Math.min(this._ubPositionPanStart, this._position);
    }

    this._detectSwipe(event);
  }

  /*
   * Sets the current position's bounds.
   * Used if allowPanPastNext is false.
   */
  _handlePanStart(event) {
    this._positionTarget = undefined;

    this._positionPanStart = this._position;
    this._lbPositionPanStart = Math.max(this._options.lowerBound, Math.round(this._position - 1));
    this._ubPositionPanStart = Math.min(this._options.upperBound, Math.round(this._position + 1));
  }

  /*
   * On Panend, determines the next position target for _animationToPositionTarget.
   */
  _handlePanEnd(event) {
    if(this._positionTarget !== undefined) { return; }

    this._positionTarget = Math.round(this._position);
  }

  /*
   * On Swipe, determines the next position target for _animationToPositionTarget.
   */
  _detectSwipe(event) {
    const velocity = this._options.direction === "horizontal" ? event.velocityX : event.velocityY;

    if(Math.abs(velocity) < this._options.swipeSpeed) { return; }

    switch(event.direction) {
      case Hammer.DIRECTION_LEFT:
      case Hammer.DIRECTION_DOWN:
        this._positionTarget = this._lbPositionPanStart;
        break;
      case Hammer.DIRECTION_RIGHT:
      case Hammer.DIRECTION_UP:
        this._positionTarget = this._ubPositionPanStart;
        break;
    };
  }

}