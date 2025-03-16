import { Request, Response } from "express";
import { uploadVideo as uploadVideoManager } from "../manager/videos";

export const uploadVideo = async (
  { body, file }: Request,
  res: Response,
): Promise<void> => {
  if (!file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  await uploadVideoManager(file, body.title);

  res.status(200).send("Video uploaded successfully.");
};
