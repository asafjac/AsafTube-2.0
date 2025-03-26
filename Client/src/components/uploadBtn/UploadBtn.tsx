import React, { FC, useRef, useState } from "react";
import { UploadBtnProps } from "./types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideos } from "../../utils/queries.ts";
import { queryKeys } from "../../utils/consts.ts";
import { Video } from "../../utils/types.ts";
import type { DefaultError } from "@tanstack/query-core";
import { Modal } from "../modal/Modal.tsx";
import { ProgressBar } from "../progressBar/ProgressBar.tsx";

export const UploadBtn: FC<UploadBtnProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const increaseProgress = (addedProgress: number) =>
    setProgress((prevProgress) => addedProgress + prevProgress);

  const queryClient = useQueryClient();

  const onUploadSuccess = (uploadedVideos: Video[]) => {
    queryClient.setQueryData(queryKeys.getVideos, (oldVideos: Video[]) => [
      ...uploadedVideos,
      ...oldVideos,
    ]);

    uploadCleanup();
  };

  const uploadCleanup = () => {
    setIsLoading(false);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {isLoading && <Modal content={<ProgressBar percentage={progress} />} />}
      <input
        multiple
        type="file"
        accept="video/mp4"
        hidden
        ref={inputRef}
        onChange={({ target }) => {
          setIsLoading(true);
          target.files &&
            uploadVideos(
              Array.from(target.files),
              increaseProgress,
              onUploadSuccess,
              uploadCleanup,
            );
        }}
      />
      <button
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        Upload More Videos
      </button>
    </div>
  );
};
