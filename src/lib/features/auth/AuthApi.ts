import { api } from "@/lib/api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (post) => ({
        url: "/auth/register",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation({
      query: (post: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: `/auth/logout`,
          method: "POST",
          body: {},
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
