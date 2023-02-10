import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { axiosApiInstance } from "../lib/axiosApiInstance";

export function useAuth() {
  return useContext(AuthContext);
}
