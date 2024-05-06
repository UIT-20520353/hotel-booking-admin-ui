import { LoginRequestProps, LoginResponseProps } from "@/models/api/login";
import { HttpResponse } from "@/models/http";
import axiosClient, { handleRequest } from "./axiosClient";

const authApi = {
  login: (
    body: LoginRequestProps
  ): Promise<HttpResponse<LoginResponseProps>> => {
    const url = "/api/login";
    return handleRequest(axiosClient.post(url, body));
  },
};

export default authApi;
