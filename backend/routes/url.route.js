import express from "express";

const router = express.Router();
import { shortener, redirectUrl } from "../controller/url.controller.js";

router.route("/shorten").get(shortener);
router.route("/:id").get(redirectUrl);

export default router;
