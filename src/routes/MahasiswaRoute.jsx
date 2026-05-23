import { Navigate } from "react-router-dom";

const MahasiswaRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "mahasiswa") {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default MahasiswaRoute;
