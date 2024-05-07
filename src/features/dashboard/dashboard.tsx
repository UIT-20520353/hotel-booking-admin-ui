import useAccessToken from "@/hooks/useAccessToken";
import React from "react";

interface DashboardProps {}

const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  const { accessToken } = useAccessToken();

  return <div>{accessToken || "--"}</div>;
};

export default Dashboard;
