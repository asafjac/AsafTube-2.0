export const canScroll = (carousel: HTMLDivElement | null) => {
  if (!carousel) return { left: false, right: false };

  return {
    left: carousel.scrollLeft > 0,
    right: carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth,
  };
};

export const scroll = (
  carousel: HTMLDivElement | null,
  checkScroll: () => void,
  thumbnailCount: number,
  thumbnailWidth: number,
  gap: number,
  direction: "left" | "right",
) => {
  if (!carousel) return;

  const scrollAmount = (thumbnailWidth + gap) * thumbnailCount; // Move by 4 thumbnails
  carousel.scrollBy({
    left: direction === "right" ? scrollAmount : -scrollAmount,
    behavior: "smooth",
  });

  carousel.addEventListener("scrollend", checkScroll, { once: true });
};

export const calcMaxThumbnailCount = (thumbnailWidth: number, gap: number) => {
  const { innerWidth } = window;
  return Math.floor(innerWidth / (thumbnailWidth + 2 * gap));
};
