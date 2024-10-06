import express from "express";

const router = express.Router();
import { shortener, redirectUrl } from "../controller/url.controller.js";

router.route("/shorten").post(shortener);
router.route("/:id").get(redirectUrl);

export default router;
