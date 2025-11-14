import React from "react";
import OptionField from "./OptionField";

/**
 * OptionItem - Single option card with all input fields
 * Single responsibility: Render and manage single option input fields
 */
export default function OptionItem({
	option,
	index,
	onFieldChange,
	onRemove,
	errors,
	canRemove,
}) {
	const handleChange = (field) => (e) => {
		onFieldChange(index, field, e.target.value);
	};

	return (
		<div className="p-4 border rounded-lg bg-gray-50">
			<div className="flex justify-between items-center mb-3">
				<span className="text-sm font-medium text-gray-700">
					Option {index + 1}
				</span>
				{canRemove && (
					<button
						type="button"
						onClick={() => onRemove(index)}
						className="text-red-500 hover:text-red-700 text-sm font-medium">
						Remove
					</button>
				)}
			</div>

			<div className="space-y-3">
				<OptionField
					label="Option Name"
					value={option.name}
					onChange={handleChange("name")}
					placeholder="e.g., Option A"
					error={errors[`option_${index}_name`]}
				/>

				<OptionField
					label="Description"
					type="textarea"
					rows={2}
					value={option.description}
					onChange={handleChange("description")}
					placeholder="What this option entails..."
					error={errors[`option_${index}_description`]}
				/>

				<div className="grid grid-cols-3 gap-3">
					<OptionField
						label="Estimated Cost ($)"
						type="number"
						value={option.estimated_cost}
						onChange={handleChange("estimated_cost")}
						placeholder="0"
						error={errors[`option_${index}_cost`]}
					/>

					<OptionField
						label="Estimated Benefit ($)"
						type="number"
						value={option.estimated_benefit}
						onChange={handleChange("estimated_benefit")}
						placeholder="0"
						error={errors[`option_${index}_benefit`]}
					/>

					<OptionField
						label="Timeline"
						value={option.timeline}
						onChange={handleChange("timeline")}
						placeholder="e.g., 3 months"
						error={errors[`option_${index}_timeline`]}
					/>
				</div>
			</div>
		</div>
	);
}
