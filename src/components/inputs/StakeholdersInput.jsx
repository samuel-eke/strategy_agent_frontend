import React from "react";
import { COMMON_DEPARTMENTS } from "../../utils/formConstants";

/**
 * StakeholdersInput - Handles stakeholders selection
 * Single responsibility: Checkbox selection for stakeholder departments
 */
export default function StakeholdersInput({ values, onChange, error }) {
	const handleToggle = (department) => {
		const updated = values.includes(department)
			? values.filter((x) => x !== department)
			: [...values, department];
		onChange("stakeholders", updated);
	};

	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Select stakeholder departments
			</label>
			<div className="space-y-2">
				{COMMON_DEPARTMENTS.map((dept) => (
					<label
						key={dept}
						className="flex items-center space-x-3">
						<input
							type="checkbox"
							checked={values.includes(dept)}
							onChange={() => handleToggle(dept)}
							className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
						<span>{dept}</span>
					</label>
				))}
			</div>
			{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
		</div>
	);
}
