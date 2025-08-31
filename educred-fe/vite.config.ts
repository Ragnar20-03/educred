import { defineConfig } from "vite";

import { nodePolyfills } from "vite-plugin-node-polyfills";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [

    tailwindcss(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
    }),
  ],

});
