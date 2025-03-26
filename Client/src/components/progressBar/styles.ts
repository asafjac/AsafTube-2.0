import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  progressBarContainer: {
    width: "100%",
    height: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    transition: "width 0.4s ease-in-out",
  },
});
