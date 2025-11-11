import React, { useState } from "react";
import axios from "axios";
import DecisionTypeStep from './DecisionTypeStep';
import TitleStep from './TitleStep';
import DescriptionStep from './DescriptionStep';
import OptionsStep from './OptionsStep';
import ConstraintsStep from './ConstraintsStep';
import StakeholdersStep from './StakeholdersStep';
import UrgencyStep from './UrgencyStep';
import Summary from './Summary';

const generateId = (prefix) =>
	`${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export default function DecisionWizard() {
	const [step, setStep] = useState(0);
	const [values, setValues] = useState({
		decision_id: generateId("dec"),
		decision_type: "",
		title: "",
		description: "",
		options: [
			{
				id: generateId("opt"),
				name: "",
				description: "",
				estimated_cost: "",
				estimated_benefit: "",
				timeline: "",
			},
		],
		constraints: [],
		stakeholders: [],
		urgency: "",
	});
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const validateStep = (currentStep = step) => {
		const e = {};
		if (currentStep === 0) {
			if (!values.decision_type)
				e.decision_type = "Please choose a decision type.";
		}
		if (currentStep === 1) {
			if (!values.title || values.title.trim().length < 3)
				e.title = "Enter a title (at least 3 characters).";
		}
		if (currentStep === 2) {
			if (!values.description || values.description.trim().length < 10)
				e.description =
					"Provide a detailed description (at least 10 characters).";
		}
		if (currentStep === 3) {
			if (values.options.length === 0) {
				e.options = "Add at least one option.";
			} else {
				values.options.forEach((opt, idx) => {
					if (!opt.name) e[`option_${idx}_name`] = "Option name is required.";
					if (!opt.description)
						e[`option_${idx}_description`] = "Option description is required.";
					if (!opt.estimated_cost)
						e[`option_${idx}_cost`] = "Estimated cost is required.";
					if (!opt.estimated_benefit)
						e[`option_${idx}_benefit`] = "Estimated benefit is required.";
					if (!opt.timeline)
						e[`option_${idx}_timeline`] = "Timeline is required.";
				});
			}
		}
		if (currentStep === 4) {
			if (values.constraints.length === 0)
				e.constraints = "Select at least one constraint.";
		}
		if (currentStep === 5) {
			if (values.stakeholders.length === 0)
				e.stakeholders = "Select at least one stakeholder.";
		}
		if (currentStep === 6) {
			if (!values.urgency) e.urgency = "Select the urgency level.";
		}
		setErrors(e);
		return Object.keys(e).length === 0;
	};

	const handleChange = (field) => (e) => {
		setValues((v) => ({ ...v, [field]: e.target.value }));
		setErrors((curr) => ({ ...curr, [field]: undefined }));
	};

	const handleOptionChange = (idx, field) => (e) => {
		setValues((v) => ({
			...v,
			options: v.options.map((opt, i) =>
				i === idx ? { ...opt, [field]: e.target.value } : opt
			),
		}));
		setErrors((curr) => ({ ...curr, [`option_${idx}_${field}`]: undefined }));
	};

	const addOption = () => {
		setValues((v) => ({
			...v,
			options: [
				...v.options,
				{
					id: generateId("opt"),
					name: "",
					description: "",
					estimated_cost: "",
					estimated_benefit: "",
					timeline: "",
				},
			],
		}));
	};

	const removeOption = (idx) => {
		setValues((v) => ({
			...v,
			options: v.options.filter((_, i) => i !== idx),
		}));
	};

	const handleArrayChange = (field) => (value) => {
		setValues((v) => {
			const current = v[field];
			const updated = current.includes(value)
				? current.filter((x) => x !== value)
				: [...current, value];
			return { ...v, [field]: updated };
		});
		setErrors((curr) => ({ ...curr, [field]: undefined }));
	};

	const next = () => {
		if (validateStep(step)) setStep((s) => Math.min(s + 1, 6));
	};

	const back = () => setStep((s) => Math.max(s - 1, 0));

	const submit = async (e) => {
		e.preventDefault();
		if (validateStep(step)) {
			setIsSubmitting(true);
			setSubmitError(null);

			// Format numbers and clean up the data
			const formattedValues = {
				...values,
				options: values.options.map((opt) => ({
					...opt,
					estimated_cost: Number(opt.estimated_cost),
					estimated_benefit: Number(opt.estimated_benefit),
				})),
			};

			try {
				await axios.post(
					"https://samueleke.app.n8n.cloud/webhook-test/decision-analysis",
					formattedValues,
					{
						headers: {
							'Content-Type': 'application/json',
							"Accept": "*",
							"strategic-agent":"samuelagentai",
						},
					}
				);
				console.log("Decision submitted:", formattedValues);
				setSubmitted(true);
			} catch (error) {
				console.error("Error submitting decision:", error);
				setSubmitError(
					error.response?.data?.message ||
						"Failed to submit decision. Please try again."
				);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	if (submitted)
		return <Summary values={values} />;

	return (
		<form
			onSubmit={submit}
			className="max-w-xl mx-auto mt-12">
			<div className="bg-white shadow-lg rounded-lg p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold">Create a decision</h2>
					<div className="text-sm text-gray-500">Step {step + 1} of 7</div>
				</div>

				{/* Card content - one question per card */}
				<div className="min-h-40">
					{step === 0 && (
						<DecisionTypeStep values={values} onChange={handleChange} error={errors.decision_type} />
					)}

					{step === 1 && (
						<TitleStep values={values} onChange={handleChange} error={errors.title} />
					)}

					{step === 2 && (
						<DescriptionStep values={values} onChange={handleChange} error={errors.description} />
					)}

					{step === 3 && (
						<OptionsStep values={values} addOption={addOption} removeOption={removeOption} onChangeOption={handleOptionChange} errors={errors} />
					)}

					{step === 4 && (
						<ConstraintsStep values={values} onToggle={handleArrayChange} error={errors.constraints} />
					)}

					{step === 5 && (
						<StakeholdersStep values={values} onToggle={handleArrayChange} error={errors.stakeholders} />
					)}

					{step === 6 && (
						<UrgencyStep values={values} onChange={handleChange} error={errors.urgency} />
					)}
				</div>

				{/* Navigation */}
				<div className="mt-6 flex items-center justify-between">
					<div>
						<button
							type="button"
							onClick={back}
							disabled={step === 0}
							className={`mr-3 px-4 py-2 rounded-md border ${
								step === 0
									? "text-gray-400 border-gray-200"
									: "text-gray-700 border-gray-300 hover:bg-gray-50"
							}`}>
							Back
						</button>
						{step < 6 ? (
							<button
								type="button"
								onClick={next}
								className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
								Next
							</button>
						) : (
							<button
								type="submit"
								className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center space-x-2"
								disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<svg
											className="animate-spin h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24">
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										<span>Submitting...</span>
									</>
								) : (
									"Submit"
								)}
							</button>
						)}
					</div>

					<div className="flex items-center space-x-2">
						{[0, 1, 2, 3, 4, 5, 6].map((i) => (
							<span
								key={i}
								className={`h-2 w-2 rounded-full ${
									i === step
										? "bg-indigo-600"
										: i < step
										? "bg-indigo-200"
										: "bg-gray-200"
								}`}
								aria-hidden
							/>
						))}
					</div>
				</div>
				{submitError && (
					<div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
						{submitError}
					</div>
				)}
			</div>
		</form>
	);
}
