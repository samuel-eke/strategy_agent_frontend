import React from "react";

/**
 * DescriptionInput - Handles decision description input
 * Single responsibility: Textarea input for decision description
 */
export default function DescriptionInput({ value, onChange, error }) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Describe in detail the context of what you want to do
			</label>
			<textarea
				value={value}
				onChange={(e) => onChange("description", e.target.value)}
				rows={6}
				placeholder="Explain the background, goals, and current situation..."
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
			/>
			{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
		</div>
	);
}
