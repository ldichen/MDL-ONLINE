/*
 * @Author: DiChen
 * @Date: 2025-04-15 21:33:57
 * @LastEditors: DiChen
 * @LastEditTime: 2025-04-24 00:07:14
 */
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html",
      precompress: false,
      strict: true,
    }),
    paths: {
      base: process.env.VITE_BASE_PATH || "",
      relative: false,
    },
  },
};

export default config;
