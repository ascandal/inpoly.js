/**
 * @preserve
 * Framework-agnostic entry point for inpoly.js.
 * @author Angelo L. Scandaliato
 */

import { Point } from "./point.js";
import { Rectangle } from "./rectangle.js";
import { calculateBoundingRectangle } from "./utilities.js";

// ─────────────────────────────────────────────
// Runtime exports
// ─────────────────────────────────────────────
export { Point, Rectangle, calculateBoundingRectangle };

// ─────────────────────────────────────────────
// Type-only exports (erased from the JS bundle)
// ─────────────────────────────────────────────
// export type {
// } from "./types/inpoly.js";
