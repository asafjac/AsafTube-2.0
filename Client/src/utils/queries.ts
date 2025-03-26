import axios from "axios";
import { Video } from "./types.ts";

export const getVideos = async (): Promise<Video[]> =>
  (await axios.get(import.meta.env.VITE_SERVER_URL + "/videos")).data;
