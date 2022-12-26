import express from "express";
import splitController from "./split.controller";

const splitRouter = express.Router();

splitRouter.get("/list", splitController.getAll);

export default splitRouter;
