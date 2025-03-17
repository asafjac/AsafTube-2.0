import { Router } from "express";
import { uploadVideos } from "../controller/videos";
import multer from "multer";

export const upload = multer({
  dest: "uploads/",
});

export const videosRouter = Router();

videosRouter.post("/", upload.array("videos"), uploadVideos);
