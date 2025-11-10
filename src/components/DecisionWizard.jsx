import React, { useState } from "react";
import axios from "axios";

const DECISION_TYPES = ["investment", "operational", "strategic", "hr"];
const URGENCY_LEVELS = ["low", "medium", "high"];
const COMMON_CONSTRAINTS = [
	"budget_limit",
	"time_sensitive",
	"regulatory_requirements",
	"technical_feasibility",
	"resource_availability",
	"stakeholder_approval",
];
const COMMON_DEPARTMENTS = [
	"Finance",
	"HR",
	"Operations",
	"Marketing",
	"Sales",
	"IT",
	"Legal",
	"Executive",
];

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
					formattedValues
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
		return (
			<div className="max-w-xl mx-auto mt-12">
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-semibold mb-3">All set ✅</h2>
					<p className="text-gray-700 mb-4">
						Your decision details were saved locally (check console).
					</p>
					<div className="text-sm text-gray-600 space-y-4">
						<div>
							<div className="font-medium">Type</div>
							<div className="mb-2 capitalize">{values.decision_type}</div>
						</div>
						<div>
							<div className="font-medium">Title</div>
							<div className="mb-2">{values.title}</div>
						</div>
						<div>
							<div className="font-medium">Description</div>
							<div className="mb-2 whitespace-pre-wrap">
								{values.description}
							</div>
						</div>
						<div>
							<div className="font-medium">
								Options ({values.options.length})
							</div>
							{values.options.map((opt) => (
								<div
									key={opt.id}
									className="mb-2 pl-4 border-l-2 border-gray-200">
									<div className="font-medium">{opt.name}</div>
									<div className="text-xs text-gray-500">
										Cost: ${opt.estimated_cost} | Benefit: $
										{opt.estimated_benefit} | Timeline: {opt.timeline}
									</div>
									<div className="text-sm">{opt.description}</div>
								</div>
							))}
						</div>
						<div>
							<div className="font-medium">Constraints</div>
							<div className="mb-2">{values.constraints.join(", ")}</div>
						</div>
						<div>
							<div className="font-medium">Stakeholders</div>
							<div className="mb-2">{values.stakeholders.join(", ")}</div>
						</div>
						<div>
							<div className="font-medium">Urgency</div>
							<div className="capitalize">{values.urgency}</div>
						</div>
					</div>
				</div>
			</div>
		);

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
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								What kind of decision do you want to make?
							</label>
							<div className="space-y-2">
								{DECISION_TYPES.map((t) => (
									<label
										key={t}
										className="flex items-center space-x-3">
										<input
											type="radio"
											name="decisionType"
											value={t}
											checked={values.decision_type === t}
											onChange={handleChange("decision_type")}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<span className="capitalize">{t}</span>
									</label>
								))}
							</div>
							{errors.decision_type && (
								<p className="text-red-500 text-sm mt-2">
									{errors.decision_type}
								</p>
							)}
						</div>
					)}

					{step === 1 && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Give it a title
							</label>
							<input
								type="text"
								value={values.title}
								onChange={handleChange("title")}
								placeholder="e.g., Q4 Infrastructure Investment Decision"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
							/>
							{errors.title && (
								<p className="text-red-500 text-sm mt-2">{errors.title}</p>
							)}
						</div>
					)}

					{step === 2 && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Describe in detail the context of what you want to do
							</label>
							<textarea
								value={values.description}
								onChange={handleChange("description")}
								rows={6}
								placeholder="Explain the background, goals, and current situation..."
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
							/>
							{errors.description && (
								<p className="text-red-500 text-sm mt-2">
									{errors.description}
								</p>
							)}
						</div>
					)}

					{step === 3 && (
						<div>
							<div className="flex justify-between items-center mb-4">
								<label className="block text-sm font-medium text-gray-700">
									Define your options
								</label>
								<button
									type="button"
									onClick={addOption}
									className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100">
									+ Add Option
								</button>
							</div>
							<div className="space-y-6">
								{values.options.map((opt, idx) => (
									<div
										key={opt.id}
										className="p-4 border rounded-lg bg-gray-50">
										<div className="flex justify-between mb-2">
											<span className="text-sm font-medium">
												Option {idx + 1}
											</span>
											{values.options.length > 1 && (
												<button
													type="button"
													onClick={() => removeOption(idx)}
													className="text-red-500 hover:text-red-700 text-sm">
													Remove
												</button>
											)}
										</div>
										<div className="space-y-3">
											<div>
												<input
													type="text"
													value={opt.name}
													onChange={handleOptionChange(idx, "name")}
													placeholder="Option name"
													className="block w-full text-sm rounded-md border-gray-300"
												/>
												{errors[`option_${idx}_name`] && (
													<p className="text-red-500 text-xs mt-1">
														{errors[`option_${idx}_name`]}
													</p>
												)}
											</div>
											<div>
												<textarea
													value={opt.description}
													onChange={handleOptionChange(idx, "description")}
													placeholder="What this option entails..."
													rows={2}
													className="block w-full text-sm rounded-md border-gray-300"
												/>
												{errors[`option_${idx}_description`] && (
													<p className="text-red-500 text-xs mt-1">
														{errors[`option_${idx}_description`]}
													</p>
												)}
											</div>
											<div className="grid grid-cols-3 gap-3">
												<div>
													<input
														type="number"
														value={opt.estimated_cost}
														onChange={handleOptionChange(idx, "estimated_cost")}
														placeholder="Est. cost"
														className="block w-full text-sm rounded-md border-gray-300"
													/>
													{errors[`option_${idx}_cost`] && (
														<p className="text-red-500 text-xs mt-1">
															{errors[`option_${idx}_cost`]}
														</p>
													)}
												</div>
												<div>
													<input
														type="number"
														value={opt.estimated_benefit}
														onChange={handleOptionChange(
															idx,
															"estimated_benefit"
														)}
														placeholder="Est. benefit"
														className="block w-full text-sm rounded-md border-gray-300"
													/>
													{errors[`option_${idx}_benefit`] && (
														<p className="text-red-500 text-xs mt-1">
															{errors[`option_${idx}_benefit`]}
														</p>
													)}
												</div>
												<div>
													<input
														type="text"
														value={opt.timeline}
														onChange={handleOptionChange(idx, "timeline")}
														placeholder="Timeline"
														className="block w-full text-sm rounded-md border-gray-300"
													/>
													{errors[`option_${idx}_timeline`] && (
														<p className="text-red-500 text-xs mt-1">
															{errors[`option_${idx}_timeline`]}
														</p>
													)}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							{errors.options && (
								<p className="text-red-500 text-sm mt-2">{errors.options}</p>
							)}
						</div>
					)}

					{step === 4 && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Select applicable constraints
							</label>
							<div className="space-y-2">
								{COMMON_CONSTRAINTS.map((constraint) => (
									<label
										key={constraint}
										className="flex items-center space-x-3">
										<input
											type="checkbox"
											checked={values.constraints.includes(constraint)}
											onChange={() =>
												handleArrayChange("constraints")(constraint)
											}
											className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
										/>
										<span className="capitalize">
											{constraint.replace(/_/g, " ")}
										</span>
									</label>
								))}
							</div>
							{errors.constraints && (
								<p className="text-red-500 text-sm mt-2">
									{errors.constraints}
								</p>
							)}
						</div>
					)}

					{step === 5 && (
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
											checked={values.stakeholders.includes(dept)}
											onChange={() => handleArrayChange("stakeholders")(dept)}
											className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
										/>
										<span>{dept}</span>
									</label>
								))}
							</div>
							{errors.stakeholders && (
								<p className="text-red-500 text-sm mt-2">
									{errors.stakeholders}
								</p>
							)}
						</div>
					)}

					{step === 6 && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								How urgent is this decision?
							</label>
							<div className="space-y-2">
								{URGENCY_LEVELS.map((level) => (
									<label
										key={level}
										className="flex items-center space-x-3">
										<input
											type="radio"
											name="urgency"
											value={level}
											checked={values.urgency === level}
											onChange={handleChange("urgency")}
											className="h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<span className="capitalize">{level}</span>
									</label>
								))}
							</div>
							{errors.urgency && (
								<p className="text-red-500 text-sm mt-2">{errors.urgency}</p>
							)}
						</div>
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
