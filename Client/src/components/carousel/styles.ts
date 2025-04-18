import { createUseStyles } from "react-jss";
import { stylesClasses, stylesProps } from "./types.ts";

export const useStyles = createUseStyles<stylesClasses, stylesProps>({
  carouselWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  button: {
    transition: "width 0.5s",
    "&:hover": {
      width: `${50}px`,
    },
    "&:focus": {
      outline: "none",
    },
    "&:active": {
      width: `${60}px`,
    },

    aspectRatio: "1/1",
    width: 40,
    background: "rgba(0,0,0,0.8)",
    color: "#ffffff",
    border: "none",
    padding: "0",
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    borderRadius: "50%",
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  prevButton: {
    left: 0,
  },
  nextButton: {
    right: 0,
  },
  carousel: ({ thumbnailWidth, gap, thumbnailCount }) => ({
    display: "flex",
    overflowX: "hidden",
    gap,
    padding: 10,
    scrollBehavior: "smooth",
    width: (thumbnailWidth + 2 * gap) * thumbnailCount, // 4 thumbnails at a time, each ~220px wide
  }),
});
