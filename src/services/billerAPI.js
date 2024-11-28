import api from "./axiosInstance";

const fetchBillers = async () => {
  try {
    const response = await api.get(`/v1/billers`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch billers data");
    }
  } catch (error) {
    console.error(
      "Error fetching billers data:",
      error.response?.data || error
    );
    throw error;
  }
};

export default fetchBillers;
