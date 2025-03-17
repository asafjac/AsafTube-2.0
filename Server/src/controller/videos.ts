import { Request, Response } from "express";
import { uploadMultipleVideos } from "../manager/videos";

export const uploadVideos = async (
  { body, files }: Request,
  res: Response,
): Promise<void> => {
  if (!files) {
    res.status(400).send("No file uploaded.");
    return;
  }

  if (!Array.isArray(files)) {
    res.status(400).send("Files uploaded in wrong format.");
    return;
  }

  if (body.titles.length !== files.length) {
    res.status(400).send("Number of titles does not match number of files.");
    return;
  }

  await uploadMultipleVideos(files, body.titles);

  res.status(200).send("Video uploaded successfully.");
};
