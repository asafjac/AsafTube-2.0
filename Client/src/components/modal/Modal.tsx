import { useStyles } from "./styles.ts";
import React, { FC } from "react";
import { ModalProps } from "./types.ts";

export const Modal: FC<ModalProps> = ({ content }) => {
  const classes = useStyles();

  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modalContent}>{content}</div>
    </div>
  );
};
