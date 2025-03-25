export type ThumbnailProps = {
  image: string;
  duration: number; // in seconds
  title: string;
  key?: number;
  width: number;
};

export type stylesProps = {
  width: number;
};

export type stylesClasses =
  | "thumbnail"
  | "thumbnailPhoto"
  | "image"
  | "duration"
  | "title";
