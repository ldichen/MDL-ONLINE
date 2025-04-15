/*
 * @Author: DiChen
 * @Date: 2025-04-15 21:44:19
 * @LastEditors: DiChen
 * @LastEditTime: 2025-04-15 21:46:01
 */
import { writable } from "svelte/store";
import { browser } from "$app/environment";

type Theme = "light" | "dark";

// 从本地存储获取初始主题，如果没有则默认为 'light'
const userTheme = browser && (localStorage.getItem("theme") as Theme);
const initialTheme =
  userTheme ||
  (browser && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

// 创建主题 store
export const theme = writable<Theme>(initialTheme);

// 同步到本地存储和文档根元素的数据属性
theme.subscribe((value) => {
  if (browser) {
    localStorage.setItem("theme", value);
    document.documentElement.setAttribute("data-theme", value);
  }
});

// 切换主题的辅助函数
export function toggleTheme() {
  theme.update((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
}
