import React from "react";

/**
 * OptionField - Individual input field for option properties
 * Single responsibility: Render single option field with label and error
 */
export default function OptionField({
	label,
	type = "text",
	value,
	onChange,
	error,
	placeholder,
	rows,
}) {
	const Component = type === "textarea" ? "textarea" : "input";

	return (
		<div>
			{label && (
				<label className="block text-xs font-medium text-gray-600 mb-1">
					{label}
				</label>
			)}
			<Component
				type={type === "textarea" ? undefined : type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				rows={rows}
				className="block w-full text-sm rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
			/>
			{error && <p className="text-red-500 text-xs mt-1">{error}</p>}
		</div>
	);
}
