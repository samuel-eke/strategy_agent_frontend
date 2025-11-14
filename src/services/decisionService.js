import axios from "axios";

const API_ENDPOINT =
	"https://eke-eke.app.n8n.cloud/webhook-test/decision-analysis";

const axiosInstance = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		"Content-Type": "application/json",
		Accept: "*",
		"strategic-agent": "samuelagentai",
	},
});

/**
 * Format decision form data before submission
 * Converts string numbers to actual numbers
 */
export const formatDecisionData = (values) => {
	return {
		...values,
		options: values.options.map((opt) => ({
			...opt,
			estimated_cost: Number(opt.estimated_cost),
			estimated_benefit: Number(opt.estimated_benefit),
		})),
	};
};

/**
 * Submit decision data to the API
 * Returns success/error response
 */
export const submitDecisionToAPI = async (formData) => {
	try {
		const formattedData = formatDecisionData(formData);
		const response = await axiosInstance.post("", formattedData);
		console.log("Decision submitted successfully:", formattedData);
		return {
			success: true,
			data: response.data,
		};
	} catch (error) {
		console.error("Error submitting decision:", error);
		const errorMessage =
			error.response?.data?.message ||
			error.message ||
			"Failed to submit decision. Please try again.";
		return {
			success: false,
			error: errorMessage,
		};
	}
};
