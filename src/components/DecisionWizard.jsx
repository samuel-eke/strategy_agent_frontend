import React, { useState } from "react";

// Service imports
import { submitDecisionToAPI } from "../services/decisionService";

// Utility imports
import { initialFormState, createNewOption } from "../utils/formConstants";
import { validateStep } from "../utils/validation";

// Layout component imports
import FormHeader from "./layout/FormHeader";
import StepIndicator from "./layout/StepIndicator";
import NavigationButtons from "./layout/NavigationButtons";
import SubmitButton from "./layout/SubmitButton";
import ErrorAlert from "./layout/ErrorAlert";

// Input component imports
import DecisionTypeInput from "./inputs/DecisionTypeInput";
import TitleInput from "./inputs/TitleInput";
import DescriptionInput from "./inputs/DescriptionInput";
import ConstraintsInput from "./inputs/ConstraintsInput";
import StakeholdersInput from "./inputs/StakeholdersInput";
import UrgencyInput from "./inputs/UrgencyInput";

// Options component imports
import OptionsInput from "./options/OptionsInput";

// Success screen import
import Summary from "./Summary";

const TOTAL_STEPS = 7;

export default function DecisionWizard() {
	const [step, setStep] = useState(0);
	const [values, setValues] = useState(initialFormState());
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	/**
	 * Handle field changes
	 * Updates form state and clears errors for that field
	 */
	const handleFieldChange = (field, value) => {
		setValues((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	/**
	 * Handle option field changes
	 */
	const handleOptionFieldChange = (optionIndex, field, value) => {
		setValues((prev) => ({
			...prev,
			options: prev.options.map((opt, idx) =>
				idx === optionIndex ? { ...opt, [field]: value } : opt
			),
		}));
		setErrors((prev) => ({
			...prev,
			[`option_${optionIndex}_${field}`]: undefined,
		}));
	};

	/**
	 * Add a new option
	 */
	const handleAddOption = () => {
		setValues((prev) => ({
			...prev,
			options: [...prev.options, createNewOption()],
		}));
	};

	/**
	 * Remove an option
	 */
	const handleRemoveOption = (index) => {
		setValues((prev) => ({
			...prev,
			options: prev.options.filter((_, i) => i !== index),
		}));
	};

	/**
	 * Go to next step if current step is valid
	 */
	const handleNext = () => {
		const stepErrors = validateStep(step, values);
		if (Object.keys(stepErrors).length === 0) {
			setStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
		} else {
			setErrors(stepErrors);
		}
	};

	/**
	 * Go to previous step
	 */
	const handleBack = () => {
		setStep((prev) => Math.max(prev - 1, 0));
		setErrors({});
	};

	/**
	 * Submit form data to API
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		const stepErrors = validateStep(step, values);

		if (Object.keys(stepErrors).length > 0) {
			setErrors(stepErrors);
			return;
		}

		setIsSubmitting(true);
		setSubmitError(null);

		const result = await submitDecisionToAPI(values);

		if (result.success) {
			setSubmitted(true);
		} else {
			setSubmitError(result.error);
		}

		setIsSubmitting(false);
	};

	// Show success screen
	if (submitted) {
		return <Summary values={values} />;
	}

	// Validate current step for "Next" button
	const canGoNext = Object.keys(validateStep(step, values)).length === 0;
	const isLastStep = step === TOTAL_STEPS - 1;

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-xl mx-auto mt-12">
			<div className="bg-white shadow-lg rounded-lg p-6">
				<FormHeader
					currentStep={step}
					totalSteps={TOTAL_STEPS}
				/>

				{/* Form Content */}
				<div className="min-h-40 my-8">
					{step === 0 && (
						<DecisionTypeInput
							value={values.decision_type}
							onChange={handleFieldChange}
							error={errors.decision_type}
						/>
					)}

					{step === 1 && (
						<TitleInput
							value={values.title}
							onChange={handleFieldChange}
							error={errors.title}
						/>
					)}

					{step === 2 && (
						<DescriptionInput
							value={values.description}
							onChange={handleFieldChange}
							error={errors.description}
						/>
					)}

					{step === 3 && (
						<OptionsInput
							options={values.options}
							onAddOption={handleAddOption}
							onRemoveOption={handleRemoveOption}
							onFieldChange={handleOptionFieldChange}
							errors={errors}
							error={errors.options}
						/>
					)}

					{step === 4 && (
						<ConstraintsInput
							values={values.constraints}
							onChange={handleFieldChange}
							error={errors.constraints}
						/>
					)}

					{step === 5 && (
						<StakeholdersInput
							values={values.stakeholders}
							onChange={handleFieldChange}
							error={errors.stakeholders}
						/>
					)}

					{step === 6 && (
						<UrgencyInput
							value={values.urgency}
							onChange={handleFieldChange}
							error={errors.urgency}
						/>
					)}
				</div>

				{/* Form Footer */}
				<div className="mt-6 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<NavigationButtons
							currentStep={step}
							canGoNext={canGoNext}
							onBack={handleBack}
							onNext={handleNext}
							isLastStep={isLastStep}
						/>

						{isLastStep && (
							<SubmitButton
								isLoading={isSubmitting}
								disabled={!canGoNext}
							/>
						)}
					</div>

					<StepIndicator
						currentStep={step}
						totalSteps={TOTAL_STEPS}
					/>
				</div>

				{/* Error Alert */}
				<ErrorAlert message={submitError} />
			</div>
		</form>
	);
}
