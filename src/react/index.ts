export { MediaDeform } from "./MediaDeform.js";

// Re-export default for convenience
// **Remove default for CJS entry ergonomics.**
// export { MediaDeform as default } from "./MediaDeform.js";

/* Type-only re-exports */
// export type { MediaDeformProps } from "./MediaDeform.js";
export type { Settings, MediaDeformProps } from "src/types/media-deform.js"; // optional convenience

// Experimental helper for subscribing to MediaDeform events.
// Deprecated for handlers directly on MediaDeform.
// export { useMediaDeform } from './useMediaDeform.js';
