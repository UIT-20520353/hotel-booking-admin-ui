import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/login";
import Dashboard from "./features/dashboard/dashboard";

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/">
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
