import { sql } from "../index";
import { put } from "@vercel/blob";
import { readFileSync } from "fs";

export const uploadVideoToDB = async (
  title: string,
  duration: number,
  videoLink: string,
  thumbnailLink: string,
): Promise<void> => {
  await sql`
    INSERT INTO "Videos"."Videos"
    (title, duration, video_link, thumbnail)
    VALUES (${title}, ${duration}, ${videoLink}, ${thumbnailLink});
`;

  return;
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
