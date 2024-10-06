export const htmlTemplate = (msg) => {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0"
		/>
		<title>Error - URL Not Found</title>
		<style>
			body {
				background-color: #121212;
				color: #ffffff;
				font-family: "Arial", sans-serif;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100vh;
				margin: 0;
			}
			.container {
				text-align: center;
			}
			h1 {
				font-size: 3em;
				margin-bottom: 0.5em;
			}
			p {
				font-size: 1.2em;
			}
			.error-icon {
				font-size: 5em;
				margin-bottom: 0.5em;
				color: #ff5252;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="error-icon">⚠️</div>
			<h1>${msg}</h1>
		</div>
	</body>
</html>
`;
};
