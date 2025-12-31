export function resolveImageSrc(src?: string | null) {
  if (!src) {
    return "/hero.jpg";
  }

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (src.startsWith("/")) {
    return src;
  }

  return `/${src}`;
}
