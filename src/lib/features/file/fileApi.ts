import { api } from "@/lib/api/apiSlice";

interface UploadFileResponse {
  url: string;
}

interface UploadMultiFileResponse {
  urls: string[];
}

const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<UploadFileResponse, FormData>({
      query: (data) => ({
        url: "/file/upload",
        method: "POST",
        body: data,
      }),
    }),
    multiUploadFile: builder.mutation<UploadMultiFileResponse, FormData>({
      query: (data) => ({
        url: "/file/upload/multiple",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadFileMutation, useMultiUploadFileMutation } = fileApi;
