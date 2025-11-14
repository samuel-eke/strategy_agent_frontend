import React from "react";

/**
 * NavigationButtons - Navigation buttons for stepping through form
 * Single responsibility: Render back/next navigation
 */
export default function NavigationButtons({
	currentStep,
	canGoNext,
	onBack,
	onNext,
	isLastStep,
}) {
	return (
		<div>
			<button
				type="button"
				onClick={onBack}
				disabled={currentStep === 0}
				className={`mr-3 px-4 py-2 rounded-md border transition-colors ${
					currentStep === 0
						? "text-gray-400 border-gray-200 cursor-not-allowed"
						: "text-gray-700 border-gray-300 hover:bg-gray-50"
				}`}>
				Back
			</button>
			{!isLastStep ? (
				<button
					type="button"
					onClick={onNext}
					disabled={!canGoNext}
					className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 transition-colors">
					Next
				</button>
			) : null}
		</div>
	);
}
