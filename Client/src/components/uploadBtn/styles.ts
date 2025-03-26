import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  button: {
    width: `${200}px`,
    transition: "width 0.2s",
    "&:hover": {
      width: `${215}px`,
    },
    "&:focus": {
      outline: "none",
    },
    "&:active": {
      width: `${250}px`,
    },
  },
});
