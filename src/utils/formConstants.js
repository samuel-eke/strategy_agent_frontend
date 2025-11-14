/**
 * ID Generator utility
 * Creates unique IDs with given prefix
 */
export const generateId = (prefix) =>
	`${prefix}-${Math.random().toString(36).substr(2, 9)}`;

/**
 * Decision form constants
 */
export const DECISION_TYPES = ["investment", "operational", "strategic", "hr"];
export const URGENCY_LEVELS = ["low", "medium", "high"];
export const COMMON_CONSTRAINTS = [
	"budget_limit",
	"time_sensitive",
	"regulatory_requirements",
	"technical_feasibility",
	"resource_availability",
	"stakeholder_approval",
];
export const COMMON_DEPARTMENTS = [
	"Finance",
	"HR",
	"Operations",
	"Marketing",
	"Sales",
	"IT",
	"Legal",
	"Executive",
];

/**
 * Initial form state
 */
export const initialFormState = () => ({
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

/**
 * Create new option template
 */
export const createNewOption = () => ({
	id: generateId("opt"),
	name: "",
	description: "",
	estimated_cost: "",
	estimated_benefit: "",
	timeline: "",
});
