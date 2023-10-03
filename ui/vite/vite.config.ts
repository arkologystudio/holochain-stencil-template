import { resolve } from "path";

export default {
  resolve: {
    alias: {
      "@stencil-components": resolve("..", "stencil"),
    },
  },
  // ... other Vite config options ...
};
