import axios from "axios";
import { useState } from "react";

interface AxiosErrorResponse {
	response?: {
		data?: {
			message?: string;
		};
	};
}

function App(): JSX.Element {
	const [url, setUrl] = useState("");
	const [shortenedUrl, setShortenedUrl] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URI}/shorten`,
				{
					OriginalUrl: url,
				},
			);
			setShortenedUrl(response.data.shortUrl);
			navigator.clipboard
				.writeText(response.data.shortUrl)
				.then(() => {
					console.log("Shortened URL copied to clipboard");
				})
				.catch((err) => {
					console.error("Failed to copy the URL: ", err);
				});
			setError(""); // Clear any previous errors
		} catch (error: unknown) {
			const axiosError = error as AxiosErrorResponse;
			console.error("Error shortening the URL", axiosError);
			setError(axiosError.response?.data?.message ?? "An error occurred");
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
			<h1 className="text-4xl mb-8">URL Alternate</h1>
			<div className="flex flex-col items-center">
				<input
					type="text"
					placeholder="Enter URL"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="p-2 mb-4 rounded bg-gray-800 text-white"
				/>
				<button
					onClick={handleSubmit}
					className="p-2 mb-4 rounded bg-blue-500 hover:bg-blue-700"
				>
					Shorten URL
				</button>
				{error && (
					<div className="p-2 mb-4 rounded bg-red-500 text-white">
						{error}
					</div>
				)}
				{shortenedUrl && (
					<textarea
						readOnly
						value={shortenedUrl}
						className="p-2 rounded bg-gray-800 text-white min-w-56"
					/>
				)}
			</div>
		</div>
	);
}

export default App;
