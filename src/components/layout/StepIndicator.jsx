import React from "react";

/**
 * StepIndicator - Visual indicator showing current step progress
 * Single responsibility: Display step progress dots
 */
export default function StepIndicator({ currentStep, totalSteps }) {
	return (
		<div className="flex items-center space-x-2">
			{Array.from({ length: totalSteps }).map((_, i) => (
				<span
					key={i}
					className={`h-2 w-2 rounded-full transition-colors ${
						i === currentStep
							? "bg-indigo-600"
							: i < currentStep
							? "bg-indigo-200"
							: "bg-gray-200"
					}`}
					aria-hidden="true"
				/>
			))}
		</div>
	);
}
