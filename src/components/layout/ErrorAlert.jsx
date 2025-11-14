import React from "react";

/**
 * ErrorAlert - Display error message
 * Single responsibility: Show error message in alert box
 */
export default function ErrorAlert({ message }) {
	if (!message) return null;

	return (
		<div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm animate-in fade-in">
			{message}
		</div>
	);
}
