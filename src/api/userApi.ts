import { HttpHeaders, HttpResponse } from "@/models/http";
import { UserDetailProps } from "@/models/user";
import axiosClient, { handleRequest } from "./axiosClient";
import { PaginationProps } from "@/models/pagination";
import { EUserStatus } from "@/enums/user";

const userApi = {
  getUserList: (
    headers: HttpHeaders,
    pagination: PaginationProps
  ): Promise<HttpResponse<UserDetailProps[]>> => {
    const url = "/api/admin/users";
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          ...headers,
        },
        params: {
          size: pagination.size,
          sort: pagination.sort,
          page: pagination.page - 1,
          "role.notEquals": "ADMIN",
        },
      })
    );
  },
  getUserDetail: (
    headers: HttpHeaders,
    userId: string
  ): Promise<HttpResponse<UserDetailProps>> => {
    const url = `/api/admin/users/${userId}`;
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          ...headers,
        },
      })
    );
  },
  updateUserStatus: (
    headers: HttpHeaders,
    status: EUserStatus,
    userId: string
  ) => {
    const url = `/api/admin/users/${userId}`;
    return handleRequest(
      axiosClient.patch(
        url,
        { status },
        {
          headers: {
            ...headers,
          },
        }
      )
    );
  },
};

export default userApi;
