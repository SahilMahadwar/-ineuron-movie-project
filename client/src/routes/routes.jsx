import { AppLayout } from "@/layouts/app-layout";
import { HomePage } from "@/pages/home";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
