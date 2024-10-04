"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="m-12 bg-gray-700 p-12 text-white">
			<h2 className="text-3xl">Something went wrong!</h2>
			<p className="p-2">
				You need to configure your environment variables, check the Readme.md
				file
			</p>
			<p className="p-2">
				The environment variables are MAPBOX_API, UNSPLASH_ACCESS_KEY and
				AIRTABLE_TOKEN. Create these environment variables with values inside
				.env.local file.
			</p>

			<button onClick={() => reset()}>Try again</button>
		</div>
	);
}
