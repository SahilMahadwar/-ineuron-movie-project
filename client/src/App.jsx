import { Outlet } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <AuthProvider>
      <Outlet />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </AuthProvider>
  );
}

export default App;
