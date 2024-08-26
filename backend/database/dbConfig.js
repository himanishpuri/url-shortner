import mongoose from "mongoose";

export default async function ConnectDB() {
	try {
		const dpRes = await mongoose.connect(process.env.MONGO_URI, {
			dbName: process.env.DB_NAME,
		});
		console.log(`MongoDB connected: ${dpRes.connection.name}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
	}
}
