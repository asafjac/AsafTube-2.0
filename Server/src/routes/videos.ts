import { Router } from "express";
import { uploadVideo } from "../controller/videos";
import multer from "multer";
export const upload = multer({
  dest: "uploads/",
});

export const videosRouter = Router();

videosRouter.post("/", upload.single("video"), uploadVideo);
