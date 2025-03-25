import React, { FC, useEffect, useState } from "react";
import Thumbnail from "../thumbnail";
import { useStyles } from "./styles.ts";
import { CarouselProps } from "./types.ts";
import { calcMaxThumbnailCount } from "./functions.ts";
import { gap, thumbnailWidth } from "./consts.ts";
import { useScroll } from "./useScroll";

export const Carousel: FC<CarouselProps> = ({ thumbnails }) => {
  const [thumbnailCount, setThumbnailCount] = useState(() =>
    calcMaxThumbnailCount(thumbnailWidth, gap),
  );

  useEffect(() => {
    const updateThumbnailCount = () => {
      setThumbnailCount(calcMaxThumbnailCount(thumbnailWidth, gap));
    };
    window.addEventListener("resize", updateThumbnailCount);
    return () => window.removeEventListener("resize", updateThumbnailCount);
  }, []);

  const classes = useStyles({
    thumbnailWidth,
    gap,
    thumbnailCount,
  });

  const { carouselRef, canScrollLeft, canScrollRight, scroll } = useScroll(
    thumbnails.length,
    thumbnailCount,
  );

  const scrollLeft = () => scroll("left");
  const scrollRight = () => scroll("right");

  return (
    <div className={classes.carouselWrapper}>
      {canScrollLeft && (
        <button
          className={`${classes.button} ${classes.prevButton}`}
          onClick={scrollLeft}
        >
          ◀
        </button>
      )}
      <div className={classes.carousel} ref={carouselRef}>
        {thumbnails.map((thumb, index) => (
          <Thumbnail width={thumbnailWidth} key={index} {...thumb} />
        ))}
      </div>
      {canScrollRight && (
        <button
          className={`${classes.button} ${classes.nextButton}`}
          onClick={scrollRight}
        >
          ▶
        </button>
      )}
    </div>
  );
};
