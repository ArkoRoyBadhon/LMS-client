import { api } from "@/lib/api/apiSlice";

const enrollmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createEnrollment: builder.mutation({
      query: (post) => ({
        url: `/enrollment/create`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["enrollment"],
    }),
    userPersonal: builder.query({
      query: () => `/enrollment/all-by-user-personal`,
      providesTags: ["enrollment"],
    }),
    singleForUser: builder.query({
      query: ({ id, search }) =>
        `/enrollment/single-for-user/${id}?search=${encodeURIComponent(
          search || ""
        )}`,
      providesTags: ["enrollment"],
    }),
    nextVideo: builder.mutation({
      query: ({ id }) => ({
        url: `/enrollment/next-video/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["enrollment"],
    }),
  }),
});

export const {
  useCreateEnrollmentMutation,
  useUserPersonalQuery,
  useSingleForUserQuery,
  useNextVideoMutation,
} = enrollmentApi;
