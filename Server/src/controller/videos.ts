import { Request, Response } from "express";
import { uploadMultipleVideos } from "../manager/videos";
import { getAllVideos as getAllVideosManager } from "../manager/videos";

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

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  const amountOfStages = 6; // Amount of stages in the upload process, saved in order to calculate the step size
  const stepSize = 100 / files.length / amountOfStages; // Calculate the step size based on the amount of files and stages
  const sendEvent = () => {
    res.write(`data: ${stepSize}\n\n`);
  };

  console.log("Starting video upload");

  await uploadMultipleVideos(files, sendEvent)
    .catch((err) => {
      console.log(`Video upload failed with error: ${err}`);
      res.write(`data: Error occurred during video upload: ${err}\n\n`);
      res.end();
    })
    .then((videos) => {
      console.log("Video upload completed");
      res.end(`data: ${JSON.stringify(videos)}\n\n`);
    });
};

export const getAllVideos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const videos = await getAllVideosManager();

  res.send(videos);
};
