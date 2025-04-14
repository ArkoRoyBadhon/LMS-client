import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { logout } from "../features/auth/AuthSlice";
import { useRouter } from "next/navigation";

// export const baseUrl = "http://localhost:5000/api/v1";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type ExtraOptionsWithRouter = {
  router?: ReturnType<typeof useRouter>;
};

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown,
  ExtraOptionsWithRouter
> = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  })(args as FetchArgs, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout());

    if (typeof window !== "undefined" && extraOptions?.router) {
      extraOptions.router.replace("/login");
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user", "enrollment", "course", "module", "lecture"],
  endpoints: () => ({}),
});
