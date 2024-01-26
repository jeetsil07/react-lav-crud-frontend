import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseapi = createApi({
  reducerPath: "baseapi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000" }),
  tagTypes: ['allEmp','cmpData','getDesg'],
  endpoints: () => ({}),
});
