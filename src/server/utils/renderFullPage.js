'use strict';

export default function renderFullPage(html, initialState) {
	const config = {
		API_URL: process.env.API_URL
	};

	return (
`<!doctype html>
<html lang="en">
	<head>
		<title>React SSR login</title>
	</head>

	<body>
		<div data-app>${html}</div>
		<script>
			window.__config = ${JSON.stringify(config)};
			window.__initialState = ${JSON.stringify(initialState)};
		</script>
		<script src="/js/app.js"></script>
	</body>
</html>`
	);
}
