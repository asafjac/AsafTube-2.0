import axios from "axios";
import { Video } from "./types.ts";
import { getLastDataOfEventStream } from "./functions.ts";

export const getVideos = async (): Promise<Video[]> =>
  (await axios.get(import.meta.env.VITE_SERVER_URL + "/videos")).data;

export const uploadVideos = async (videos: File[]): Promise<Video[]> => {
  const formData = new FormData();

  videos.forEach((video) => {
    formData.append("videos", video);
  });

  const response = await axios.post(
    import.meta.env.VITE_SERVER_URL + "/videos",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return JSON.parse(getLastDataOfEventStream(response.data));
};
