export type ThumbnailProps = {
  thumbnail: string;
  duration: number; // in seconds
  title: string;
  key?: number;
  width: number;
  video_link: string;
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
