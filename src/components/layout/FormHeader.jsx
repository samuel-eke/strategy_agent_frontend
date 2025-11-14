import React from "react";

/**
 * FormHeader - Display form title and current step
 * Single responsibility: Show form title and step indicator
 */
export default function FormHeader({ currentStep, totalSteps }) {
	return (
		<div className="flex items-center justify-between mb-4">
			<h2 className="text-xl font-semibold text-gray-900">Create a decision</h2>
			<div className="text-sm text-gray-500">
				Step {currentStep + 1} of {totalSteps}
			</div>
		</div>
	);
}
