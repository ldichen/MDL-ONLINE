/**
 * 将内容下载为文件
 * @param content - 要下载的内容
 * @param filename - 文件名
 * @param contentType - 内容类型
 */
export function downloadFile(
  content: string,
  filename: string,
  contentType: string = "text/plain"
) {
  const blob = new Blob([content], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  // 清理
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
