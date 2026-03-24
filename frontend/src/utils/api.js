import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const optimizeResume = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/optimize`, data);
  return response.data;
};

export const getResumes = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/resumes/${userId}`);
  return response.data;
};

export const getResumeById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/resume/${id}`);
  return response.data;
};

export const getLatexSource = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/latex/${id}`);
  return response.data;
};
