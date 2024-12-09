import api from "./axiosInstance";

export const fetchBillers = async () => {
  try {
    const response = await api.get(`${import.meta.env.VITE_BASE_BILLERS}`);
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

// Detail biller
export const detailBiller = async (id) => {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_BASE_BILLERS}/${id}`
    );
    console.log("Detail Biller Data:", response.data.biller);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch detail biller data");
    }
  } catch (error) {
    console.error(
      "Error fetching detail biller data:",
      error.response?.data || error
    );
    throw error;
  }
};

export const createBiller = async (data) => {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_BASE_BILLERS}`,
      data
    );
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create biller");
    }
  } catch (error) {
    console.error("Error creating biller:", error.response?.data || error);
    throw error;
  }
};

export const approveBranch = async (billerId) => {
  try {
    const response = await api.post(`/v1/billers/${billerId}/approve-branch`);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  fetchBillers,
  detailBiller,
  createBiller,
  approveBranch,
};
