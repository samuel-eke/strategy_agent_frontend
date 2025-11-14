import React from "react";
import { DECISION_TYPES } from "../../utils/formConstants";

/**
 * DecisionTypeInput - Handles decision type selection
 * Single responsibility: Radio button selection for decision type
 */
export default function DecisionTypeInput({ value, onChange, error }) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				What kind of decision do you want to make?
			</label>
			<div className="space-y-2">
				{DECISION_TYPES.map((type) => (
					<label
						key={type}
						className="flex items-center space-x-3">
						<input
							type="radio"
							name="decision_type"
							value={type}
							checked={value === type}
							onChange={(e) => onChange("decision_type", e.target.value)}
							className="h-4 w-4 text-indigo-600 border-gray-300"
						/>
						<span className="capitalize">{type}</span>
					</label>
				))}
			</div>
			{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
		</div>
	);
}
