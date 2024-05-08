import useAccessToken from "@/hooks/useAccessToken";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardProps {}

const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  const navigate = useNavigate();
  const { accessToken } = useAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return <div>{accessToken || "--"}</div>;
};

export default Dashboard;
