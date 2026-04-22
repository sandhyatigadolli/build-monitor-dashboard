
import axios from "axios";

const BASE_URL = "http://localhost:8083";

export const getSummary = () => axios.get(`${BASE_URL}/summary`);
export const getBuilds = () => axios.get(`${BASE_URL}/builds`);