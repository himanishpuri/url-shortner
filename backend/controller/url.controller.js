import validUrl from "valid-url";
import Url from "../models/url.model.js";
import { nanoid } from "nanoid";
import asyncHandler from "express-async-handler";
import { htmlTemplate } from "../static/error.js";

export const shortener = asyncHandler(async (req, res, next) => {
	const { OriginalUrl } = req.body;
	try {
		if (!validUrl.isWebUri(OriginalUrl)) {
			res.status(400);
			throw new Error("Invalid URL");
		}
		let url = await Url.findOne({ origUrl: OriginalUrl });
		if (url) {
			return res.status(200).json({
				shortUrl: url.shortUrl,
			});
		}

		const urlId = nanoid(6);
		// const shortUrl = `${req.protocol}://${req.get("host")}/${urlId}`;

		url = await Url.create({
			origUrl: OriginalUrl,
			urlId,
		});

		return res.status(200).json({
			shortUrl: url.shortUrl,
		});
	} catch (error) {
		res.json({ message: error.message });
	}
});

export const redirectUrl = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	try {
		const urlID = await Url.findOne({ urlId: id });
		if (!urlID) {
			res.status(404);
			throw new Error("URL not found");
		}
		urlID.clicks++;
		await urlID.save();

		return res.redirect(urlID.origUrl);
	} catch (error) {
		res.send(htmlTemplate(error.message));
	}
});
