import express from "express";
import uploadController from "./upload.controller";

const uploadRouter = express.Router();

uploadRouter.get("/list", uploadController.getAll);

export default uploadRouter;
