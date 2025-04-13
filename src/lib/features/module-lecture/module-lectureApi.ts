import { api } from "@/lib/api/apiSlice";

const moduleLectureApi = api.injectEndpoints({
  endpoints: (builder) => ({
    CreateModule: builder.mutation({
      query: (post) => ({
        url: `/module/create`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["module", "course"],
    }),
    CreateLecture: builder.mutation({
      query: (post) => ({
        url: `/lecture/create`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["module", "lecture", "course"],
    }),
    getSingleModule: builder.query({
      query: (id) => `/module/single/${id}`,
      providesTags: ["module"],
    }),
    getSingleLecture: builder.query({
      query: (id) => `/lecture/single/${id}`,
      providesTags: ["lecture"],
    }),
    updateModule: builder.mutation({
      query: (post) => ({
        url: `/module/update/${post._id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["module", "course"],
    }),
    updateLecture: builder.mutation({
      query: (post) => ({
        url: `/lecture/update/${post._id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["lecture", "course"],
    }),
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/module/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["module", "course"],
    }),
    deleteLecture: builder.mutation({
      query: (id) => ({
        url: `/lecture/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lecture", "course"],
    }),
    getModules: builder.query({
      query: () => `/module/all`,
      providesTags: ["module"],
    }),
    getLectures: builder.query({
      query: () => `/lecture/all`,
      providesTags: ["lecture"],
    }),
  }),
});

export const {
  useCreateModuleMutation,
  useCreateLectureMutation,
  useGetSingleModuleQuery,
  useGetSingleLectureQuery,
  useUpdateModuleMutation,
  useUpdateLectureMutation,
  useDeleteModuleMutation,
  useDeleteLectureMutation,
  useGetModulesQuery,
  useGetLecturesQuery,
} = moduleLectureApi;
