import { uploadToBlob, uploadVideoToDB } from "../repository/videos";
import ffmpeg from "fluent-ffmpeg";
import { rmSync } from "fs";
import { v4 } from "uuid";

export const uploadSingleVideo = async (
  video: Express.Multer.File,
  title: string,
  sendEvent: (msg: string) => void,
) => {
  const duration = await getVideoDuration(video);
  sendEvent(`Duration Extracted for ${title}`);

  const videoLink = await uploadToBlob(video.path, video.originalname);
  sendEvent(`${title} been uploaded to blob`);

  const thumbnailPath = await generateThumbnail(video);
  sendEvent(`thumbnail generated for ${title}`);
  const thumbnailLink = await uploadToBlob(thumbnailPath, `${v4()}.png`);
  sendEvent(`${title} thumbnail uploaded to blob`);

  await uploadVideoToDB(title, duration, videoLink, thumbnailLink);
  sendEvent(`${title} uploaded to DB`);

  // Remove files after it has been uploaded
  rmSync(video.path);
  rmSync(thumbnailPath);
  sendEvent(`${title} temp files removed`);
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

  return new Promise((resolve) =>
    ffmpeg(file.path)
      .screenshot({
        filename: filename,
        timestamps: [0],
        count: 1,
        folder: thumbnailFolder,
      })
      .on("end", () => {
        resolve(`${thumbnailFolder}/${filename}`);
      }),
  );
};

export const uploadMultipleVideos = async (
  videos: Express.Multer.File[],
  titles: string[],
  sendEvent: (msg: string) => void,
) => {
  await Promise.all(
    titles.map(async (title, index) => {
      await uploadSingleVideo(videos[index], title, sendEvent);
    }),
  );
};
