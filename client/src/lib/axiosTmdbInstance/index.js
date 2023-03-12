import axios from "axios";

import { baseTmdbApiUrl, tmdbKey } from "./constants";

const config = {
  baseURL: baseTmdbApiUrl,
};

export const axiosTmdbInstance = axios.create(config);
