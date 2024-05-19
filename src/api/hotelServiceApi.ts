/* eslint-disable @typescript-eslint/no-explicit-any */
import { HotelServiceProps } from "@/models/hotel-service";
import { HttpHeaders, HttpResponse } from "@/models/http";
import axiosClient, { handleRequest } from "./axiosClient";
import { PaginationProps } from "@/models/pagination";

const hotelServiceApi = {
  deleteHotelService: (
    id: number,
    headers: HttpHeaders
  ): Promise<HttpResponse<any>> => {
    const url = `/api/hotel-services/${id}`;
    return handleRequest(
      axiosClient.delete(url, {
        headers: {
          ...headers,
        },
      })
    );
  },
  getAllHotelServices: (
    headers: HttpHeaders,
    pageable: PaginationProps,
    filter: { id: string; name: string }
  ): Promise<HttpResponse<HotelServiceProps[]>> => {
    const url = "/api/hotel-services";
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          ...headers,
        },
        params: {
          size: pageable.size,
          sort: pageable.sort,
          page: pageable.page - 1,
          "id.equals": filter.id || null,
          "name.contains": filter.name || null,
        },
      })
    );
  },
  createHotelService: (
    name: string,
    headers: HttpHeaders
  ): Promise<HttpResponse<any>> => {
    const url = "/api/hotel-services";
    return handleRequest(
      axiosClient.post(url, { name }, { headers: { ...headers } })
    );
  },
  updateHotelService: (
    id: number,
    name: string,
    headers: HttpHeaders
  ): Promise<HttpResponse<any>> => {
    const url = `/api/hotel-services/${id}`;
    return handleRequest(
      axiosClient.patch(url, { name }, { headers: { ...headers } })
    );
  },
};

export default hotelServiceApi;
