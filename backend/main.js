import dotenv from "dotenv";
dotenv.config({
	path: "./.env",
});
import ConnectDB from "./database/dbConfig.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

ConnectDB()
	.then(() => {
		app.on("error", (error) => {
			console.error(`Error: ${error.message}`);
		});

		app.listen(PORT, (error) => {
			if (error) {
				console.error(`Error: ${error.message}`);
			}
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error(`Error: ${error.message}`);
	});
