/* eslint-disable @typescript-eslint/no-explicit-any */
import { AmenityProps } from "@/models/amenity";
import { HttpHeaders, HttpResponse } from "@/models/http";
import axiosClient, { handleRequest } from "./axiosClient";
import { PaginationProps } from "@/models/pagination";

const amenityApi = {
  deleteAmenity: (
    id: number,
    headers: HttpHeaders
  ): Promise<HttpResponse<any>> => {
    const url = `/api/amenities/${id}`;
    return handleRequest(
      axiosClient.delete(url, {
        headers: {
          ...headers,
        },
      })
    );
  },
  getAllAmenities: (
    headers: HttpHeaders,
    pageable: PaginationProps,
    filter: { id: string; name: string }
  ): Promise<HttpResponse<AmenityProps[]>> => {
    const url = "/api/amenities";
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
  createAmenity: (
    name: string,
    headers: HttpHeaders
  ): Promise<HttpResponse<any>> => {
    const url = "/api/amenities";
    return handleRequest(
      axiosClient.post(url, { name }, { headers: { ...headers } })
    );
  },
  updateAmenity: (
    id: number,
    name: string,
    headers: HttpHeaders
  ): Promise<HttpResponse<any>> => {
    const url = `/api/amenities/${id}`;
    return handleRequest(
      axiosClient.patch(url, { name }, { headers: { ...headers } })
    );
  },
};

export default amenityApi;
