import { useStyles } from "./styles";
import React, { FC } from "react";
import { ProgressBarProps } from "./types";

export const ProgressBar: FC<ProgressBarProps> = ({ percentage }) => {
  const classes = useStyles();

  return (
    <>
      <p>{`Uploading: ${Math.floor(percentage)}%`}</p>
      <div className={classes.progressBarContainer}>
        <div
          className={classes.progressBar}
          style={{
            width: `${percentage}%`,
            backgroundColor: "#2ecc71",
          }}
        />
      </div>
    </>
  );
};
