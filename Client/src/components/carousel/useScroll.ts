import { useEffect, useRef, useState } from "react";
import { canScroll, scroll } from "./functions";
import { gap, thumbnailWidth } from "./consts";

export const useScroll = (thumbnailsLength: number, thumbnailCount: number) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(
    thumbnailsLength > thumbnailCount,
  );

  const checkScroll = () => {
    if (carouselRef.current) {
      const { left, right } = canScroll(carouselRef.current);
      setCanScrollLeft(left);
      setCanScrollRight(right);
    }
  };

  useEffect(() => {
    checkScroll();
  }, [thumbnailsLength, thumbnailCount]);

  const handleScroll = (direction: "left" | "right") => {
    scroll(
      carouselRef.current,
      checkScroll,
      thumbnailCount,
      thumbnailWidth,
      gap,
      direction,
    );
  };

  return { carouselRef, canScrollLeft, canScrollRight, scroll: handleScroll };
};
