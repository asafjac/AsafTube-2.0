import { FC } from "react";
import { useStyles } from "./styles.ts";
import { ThumbnailProps } from "./types.ts";
import { formatDuration } from "./functions.ts";

export const Thumbnail: FC<ThumbnailProps> = ({ image, title, duration }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.thumbnail}>
        <img src={image} alt={title} className={classes.image} />
        <div className={classes.duration}>{formatDuration(duration)}</div>
      </div>
      <div className={classes.title}>{title}</div>
    </div>
  );
};
