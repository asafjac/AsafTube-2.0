import React, { FC } from "react";
import { useStyles } from "./styles.ts";
import { ThumbnailProps } from "./types.ts";
import { formatDuration } from "./functions.ts";

export const Thumbnail: FC<ThumbnailProps> = ({
  width,
  thumbnail,
  title,
  duration,
  key,
  video_link,
}) => {
  const classes = useStyles({ width });

  return (
    <div
      key={key}
      className={classes.thumbnail}
      onClick={() => {
        location.replace(video_link);
      }}
    >
      <div className={classes.thumbnailPhoto}>
        <img src={thumbnail} alt={title} className={classes.image} />
        <div className={classes.duration}>{formatDuration(duration)}</div>
      </div>
      <div className={classes.title}>{title}</div>
    </div>
  );
};
