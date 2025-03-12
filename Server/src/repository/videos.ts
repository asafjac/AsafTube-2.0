import { sql } from "../index";

export const uploadVideo = async (title: string): Promise<void> => {
  await sql`
    INSERT INTO "Videos"."Videos"
    (title, duration, video_link, thumbnail)
    VALUES (${title}, 1, 'Test', 'Test');
`;

  return;
};
