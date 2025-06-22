import { PostDetails } from "@/types/post-details";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      async queryFn(_arg, _api, _extraOptions, _baseQuery) {
        try {
          const response = await axios.get("/api/posts/list");
          return { data: response.data.data as PostDetails[] };
        } catch (error: any) {
          return {
            error: {
              status: error.response?.status || 500,
              data: error.response?.data?.error || error.message,
            },
          };
        }
      },
      keepUnusedDataFor: 60,
      providesTags: ["Posts"],
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
