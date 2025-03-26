import React, { FC, useRef } from "react";
import { UploadBtnProps } from "./types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideos } from "../../utils/queries.ts";
import { queryKeys } from "../../utils/consts.ts";
import { Video } from "../../utils/types.ts";
import type { DefaultError } from "@tanstack/query-core";

export const UploadBtn: FC<UploadBtnProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation<Video[], DefaultError, File[]>({
    mutationFn: uploadVideos,
    onSuccess: (uploadedVideos) => {
      queryClient.setQueryData(queryKeys.getVideos, (oldVideos: Video[]) => [
        ...uploadedVideos,
        ...oldVideos,
      ]);
    },

    onSettled: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
  });

  return (
    <div>
      <input
        multiple
        type="file"
        accept="video/mp4"
        hidden
        ref={inputRef}
        onChange={({ target }) => {
          target.files && mutate(Array.from(target.files));
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
