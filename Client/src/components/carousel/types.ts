import { ThumbnailProps } from "../thumbnail/types.ts";

export type CarouselProps = {
  thumbnails: Omit<ThumbnailProps, "width">[];
};

export type stylesProps = {
  thumbnailWidth: number;
  gap: number;
  thumbnailCount: number;
};
export type stylesClasses =
  | "carouselWrapper"
  | "button"
  | "prevButton"
  | "nextButton"
  | "carousel";
