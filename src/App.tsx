import MainLayout from "@/components/layouts/main-layout";
import Dashboard from "@/features/dashboard/dashboard";
import HotelServiceManagement from "@/features/hotel-service-management";
import LoginPage from "@/features/login/login";
import UserManagement from "@/features/user-management";
import UserDetailPage from "@/features/user-management/pages/user-detail";
import React from "react";
import { Route, Routes } from "react-router-dom";

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="users">
          <Route path=":userId" element={<UserDetailPage />} />
          <Route index element={<UserManagement />} />
        </Route>
        <Route path="hotel-services">
          <Route index element={<HotelServiceManagement />} />
        </Route>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
