// src/api/timeRecommendation.js
import axios from './axiosInstance';

export const fetchTimeRecommendations = async (schoolType, month, grade) => {
  const response = await axios.get(
    `/api/time-recommendations?schoolType=${schoolType}&month=${month}&grade=${grade}`
  );
  return response.data;
};

