import { createUseStyles } from "react-jss";
import { stylesClasses, stylesProps } from "./types.ts";

export const useStyles = createUseStyles<stylesClasses, stylesProps>({
  thumbnail: ({ width }) => ({
    width: width,
    cursor: "pointer",
    userSelect: "none",
    transition: "width 0.3s",
    "&:hover": {
      width: `${width + 20}px`,
    },
  }),
  thumbnailPhoto: {
    width: "inherit",
    position: "relative",
    aspectRatio: 16 / 9,
    overflow: "hidden",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  duration: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: "2px 6px",
    fontSize: 12,
    borderRadius: 4,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
});
