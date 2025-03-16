import { uploadToBlob, uploadVideoToDB } from "../repository/videos";
import ffmpeg from "fluent-ffmpeg";
import { rmSync } from "fs";
import { v4 } from "uuid";

export const uploadVideo = async (file: Express.Multer.File, title: string) => {
  const duration = await getVideoDuration(file);

  const videoLink = await uploadToBlob(file.path, file.originalname);

  const thumbnailPath = await generateThumbnail(file);
  const thumbnailLink = await uploadToBlob(thumbnailPath, `${v4()}.png`);

  await uploadVideoToDB(title, duration, videoLink, thumbnailLink);

  // Remove files after it has been uploaded
  rmSync(file.path);
  rmSync(thumbnailPath);
};

const getVideoDuration = (file: Express.Multer.File): Promise<number> =>
  new Promise((resolve, reject) =>
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

  return new Promise((resolve, reject) =>
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
