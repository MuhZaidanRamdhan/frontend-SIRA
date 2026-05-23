import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Mahasiswa
import DashboardMahasiswa from "../pages/mahasiswa/Dashboard";
import Recommendation from "../pages/mahasiswa/Recommendation";
import History from "../pages/mahasiswa/History";

// Admin
import DashboardAdmin from "../pages/admin/Dashboard";
import UploadSilabus from "../pages/admin/UploadSilabus";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";
import Roadmap from "../pages/mahasiswa/Roadmap";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ScrollToTop from "../components/ScrollToTop";
import LandingPage from "../pages/LandingPage";
import MahasiswaRoute from "./MahasiswaRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* HOME */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* MAHASISWA */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MahasiswaRoute>
                  <DashboardMahasiswa />
                </MahasiswaRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendation"
            element={
              <ProtectedRoute>
                <MahasiswaRoute>
                  <Recommendation />
                </MahasiswaRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <MahasiswaRoute>
                  <History />
                </MahasiswaRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/roadmap"
            element={
              <ProtectedRoute>
                <MahasiswaRoute>
                  <Roadmap />
                </MahasiswaRoute>
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ADMIN */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <DashboardAdmin />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/recommendation"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Recommendation />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/roadmap"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Roadmap />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/upload-silabus"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <UploadSilabus />
                </AdminRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/history"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <History />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
