import { useStyles } from "./styles";
import React, { FC } from "react";
import { ProgressBarProps } from "./types";

export const ProgressBar: FC<ProgressBarProps> = ({ percentage }) => {
  const classes = useStyles();

  return (
    <div className={classes.progressBarContainer}>
      <div
        className={classes.progressBar}
        style={{
          width: `${Math.min(Math.max(percentage, 0), 100)}%`,
          backgroundColor: percentage < 50 ? "#f39c12" : "#2ecc71",
        }}
      />
    </div>
  );
};
