import axios from "axios";

import { baseApiUrl } from "./constants";

const config = {
  baseURL: baseApiUrl,
};

console.log(config);

export const axiosApiInstance = axios.create(config);
