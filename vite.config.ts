/*
 * @Author: DiChen
 * @Date: 2025-04-15 21:33:57
 * @LastEditors: DiChen
 * @LastEditTime: 2025-04-24 00:03:42
 */
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), "");

  // 将环境变量注入到 process.env
  process.env.VITE_BASE_PATH = env.VITE_BASE_PATH;

  return {
    plugins: [sveltekit()],
    // 确保静态资源的基础路径正确
    base: env.VITE_BASE_PATH || "",
  };
});
