export function getResizeImage(
  url: string,
  { width, height, quality }: { width?: number; height?: number; quality?: number }
) {
  // https://cdn.khmercoder.com/cdn-cgi/image/width=80,quality=75/8c3f18af-e61b-436d-a75c-c4d760cf8033.png
  const defaultQuality = 75;
  const newUrl = new URL(url);

  if (!newUrl.hostname.startsWith('cdn.khmercoder.com')) {
    return url;
  }

  const params: string[] = [];
  if (width) params.push(`width=${width}`);
  if (height) params.push(`height=${height}`);
  params.push(`quality=${quality ?? defaultQuality}`);

  newUrl.pathname = `/cdn-cgi/image/${params.join(',')}${newUrl.pathname}`;
  return newUrl.toString();
}
