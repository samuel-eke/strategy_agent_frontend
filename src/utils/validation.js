/**
 * Form validation logic
 * Validates each step of the decision wizard
 */

export const validateStep = (step, values) => {
	const errors = {};

	switch (step) {
		case 0:
			if (!values.decision_type) {
				errors.decision_type = "Please choose a decision type.";
			}
			break;

		case 1:
			if (!values.title || values.title.trim().length < 3) {
				errors.title = "Enter a title (at least 3 characters).";
			}
			break;

		case 2:
			if (!values.description || values.description.trim().length < 10) {
				errors.description =
					"Provide a detailed description (at least 10 characters).";
			}
			break;

		case 3:
			if (values.options.length === 0) {
				errors.options = "Add at least one option.";
			} else {
				values.options.forEach((opt, idx) => {
					if (!opt.name)
						errors[`option_${idx}_name`] = "Option name is required.";
					if (!opt.description)
						errors[`option_${idx}_description`] =
							"Option description is required.";
					if (!opt.estimated_cost)
						errors[`option_${idx}_cost`] = "Estimated cost is required.";
					if (!opt.estimated_benefit)
						errors[`option_${idx}_benefit`] = "Estimated benefit is required.";
					if (!opt.timeline)
						errors[`option_${idx}_timeline`] = "Timeline is required.";
				});
			}
			break;

		case 4:
			if (values.constraints.length === 0) {
				errors.constraints = "Select at least one constraint.";
			}
			break;

		case 5:
			if (values.stakeholders.length === 0) {
				errors.stakeholders = "Select at least one stakeholder.";
			}
			break;

		case 6:
			if (!values.urgency) {
				errors.urgency = "Select the urgency level.";
			}
			break;

		default:
			break;
	}

	return errors;
};

/**
 * Check if current step is valid
 */
export const isStepValid = (step, values) => {
	const errors = validateStep(step, values);
	return Object.keys(errors).length === 0;
};
