import express from "express";
import friendsController from "./friends.controller";

const friendsRouter = express.Router();

friendsRouter.get("/list", friendsController.getAll);

export default friendsRouter;
