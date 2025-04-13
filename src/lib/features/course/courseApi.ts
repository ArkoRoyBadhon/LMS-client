import { api } from "@/lib/api/apiSlice";

const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (post) => ({
        url: `/course/create`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["course"],
    }),
    getCourses: builder.query({
      query: () => `/course/all`,
      providesTags: ["course"],
    }),
    getSingleCourse: builder.query({
      query: (id) => `/course/single/${id}`,
      providesTags: ["course"],
    }),
    updateCourse: builder.mutation({
      query: (post) => ({
        url: `/course/update/${post._id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoursesQuery,
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
