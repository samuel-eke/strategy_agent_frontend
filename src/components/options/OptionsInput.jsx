import React from "react";
import OptionItem from "./OptionItem";

/**
 * OptionsInput - Handles all options with add/remove functionality
 * Single responsibility: Manage list of options
 */
export default function OptionsInput({
	options,
	onAddOption,
	onRemoveOption,
	onFieldChange,
	errors,
	error,
}) {
	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Define your options
				</label>
				<button
					type="button"
					onClick={onAddOption}
					className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 font-medium">
					+ Add Option
				</button>
			</div>

			<div className="space-y-4">
				{options.map((option, idx) => (
					<OptionItem
						key={option.id}
						option={option}
						index={idx}
						onFieldChange={onFieldChange}
						onRemove={onRemoveOption}
						errors={errors}
						canRemove={options.length > 1}
					/>
				))}
			</div>

			{error && <p className="text-red-500 text-sm mt-3">{error}</p>}
		</div>
	);
}
