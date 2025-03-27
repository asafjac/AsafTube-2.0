import { uploadToBlob, uploadVideoToDB } from "../repository/videos";
import ffmpeg from "fluent-ffmpeg";
import { rmSync } from "fs";
import { v4 } from "uuid";
import { getAllVideos as getAllVideosRepo } from "../repository/videos";

export const getAllVideos = getAllVideosRepo;
export const uploadSingleVideo = async (
  video: Express.Multer.File,
  sendEvent: () => void,
) => {
  const duration = await getVideoDuration(video);
  sendEvent();
  console.log(`Duration Extracted for ${video.originalname}`);

  const videoLink = await uploadToBlob(video.path, video.originalname);
  sendEvent();
  console.log(`${video.originalname} been uploaded to blob`);

  const thumbnailPath = await generateThumbnail(video);
  sendEvent();
  console.log(`thumbnail generated for ${video.originalname}`);

  const thumbnailLink = await uploadToBlob(thumbnailPath, `${v4()}.png`);
  sendEvent();
  console.log(`${video.originalname} thumbnail uploaded to blob`);

  const uploadedVideo = (
    await uploadVideoToDB(
      video.originalname,
      duration,
      videoLink,
      thumbnailLink,
    )
  )[0];
  sendEvent();
  console.log(`${video.originalname} uploaded to DB`);

  // Remove files after it has been uploaded
  rmSync(video.path);
  rmSync(thumbnailPath);
  sendEvent();
  console.log(`${video.originalname} temp files removed`);

  return uploadedVideo;
};

const getVideoDuration = (file: Express.Multer.File): Promise<number> =>
  new Promise((resolve) =>
    ffmpeg.ffprobe(file.path, (err, metadata) => {
      if (err || !metadata.format.duration) {
        console.error("Error getting video duration:", err);
        resolve(0); // Set duration to 0 on error as the error isn't critical

        return;
      }

      resolve(metadata.format.duration);
    }),
  );

const generateThumbnail = (file: Express.Multer.File): Promise<string> => {
  const thumbnailFolder = "thumbnails";
  const filename = `${v4()}.png`;

  const percentageToScreenshot = Math.floor(Math.random() * 101);

  return new Promise((resolve) =>
    ffmpeg(file.path)
      .screenshot({
        filename: filename,
        timestamps: [`${percentageToScreenshot}%`],
        count: 1,
        folder: thumbnailFolder,
        size: "200x113",
      })
      .on("end", () => {
        resolve(`${thumbnailFolder}/${filename}`);
      }),
  );
};

export const uploadMultipleVideos = (
  videos: Express.Multer.File[],
  sendEvent: () => void,
) =>
  Promise.all(
    videos.map(async (video) => await uploadSingleVideo(video, sendEvent)),
  );
