import axios from "axios";

import { baseApiUrl } from "./constants";

const config = {
  baseURL: baseApiUrl,
};

export const axiosApiInstance = axios.create(config);
