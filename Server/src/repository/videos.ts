import { sql } from "../index";
import { put } from "@vercel/blob";
import { readFileSync } from "fs";

export const uploadVideoToDB = async (
  title: string,
  duration: number,
  videoLink: string,
  thumbnailLink: string,
): Promise<any> => {
  return sql`
        INSERT INTO "Videos"
            (title, duration, video_link, thumbnail)
        VALUES (${title}, ${duration}, ${videoLink}, ${thumbnailLink});
    `;
};

export const uploadToBlob = async (
  filePath: string,
  fileName: string,
): Promise<string> => {
  const buffer = readFileSync(filePath);

  const { url } = await put(fileName, buffer, {
    access: "public",
  });

  return url;
};

export const getAllVideos = async () => {
  return sql`
        SELECT id, title, duration, upload_time, video_link, thumbnail
        FROM "Videos"
        ORDER BY upload_time DESC;
    `;
};
