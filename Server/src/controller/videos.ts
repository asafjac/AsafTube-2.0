import { Request, Response } from "express";
import { uploadVideo as uploadVideoRepo } from "../repository/videos";

export const uploadVideo = async ({ body, file }: Request, res: Response) => {
  console.log(body.title);
  console.log(file);

  // await uploadVideoRepo(body.title);
};
