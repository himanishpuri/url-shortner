import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
	urlId: {
		type: String,
		required: true,
	},
	origUrl: {
		type: String,
		required: true,
		unique: true,
	},
	clicks: {
		type: Number,
		required: true,
		default: 0,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

urlSchema.virtual("shortUrl").get(function () {
	return `${process.env.BACKEND_URI}/` + this.urlId;
});

export default mongoose.model("Url", urlSchema);
