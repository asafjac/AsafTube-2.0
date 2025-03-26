import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  modalWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(5px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },

  modalContent: {
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: "50%",
    padding: "20px",
    background: "rgba(0, 0, 0, 0.95)",
  },
});
