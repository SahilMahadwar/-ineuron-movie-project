import axios from "axios";

import { baseTmdbApiUrl } from "./constants";

const config = {
  baseURL: baseTmdbApiUrl,
};
export const axiosTmdbInstance = axios.create(config);
