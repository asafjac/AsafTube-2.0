import axios from "axios";
import { Video } from "./types.ts";
import { getLastDataOfEventStream } from "./functions.ts";
import { SSE } from "sse.js";

export const getVideos = async (): Promise<Video[]> =>
  (await axios.get(`${import.meta.env.VITE_SERVER_URL}/videos`)).data;

export const uploadVideos = (
  videos: File[],
  onProgress: (percentage: number) => void,
  onComplete: (uploadedVideos: Video[]) => void,
  onFail: (error: string) => void,
): void => {
  const formData = new FormData();

  videos.forEach((video) => {
    formData.append("videos", video);
  });

  const source = new SSE(`${import.meta.env.VITE_SERVER_URL}/videos`, {
    method: "POST",
    payload: formData,
  });

  source.addEventListener("message", (event: { data: string }) => {
    const msg = JSON.parse(event.data);

    typeof msg === "number"
      ? onProgress(msg)
      : Array.isArray(msg)
        ? onComplete(msg)
        : onFail(msg);
  });
};
