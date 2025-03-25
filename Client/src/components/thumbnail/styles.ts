import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  thumbnail: {
    position: "relative",
    width: 200,
    height: 120,
    overflow: "hidden",
    borderRadius: 8,
    cursor: "pointer",
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
