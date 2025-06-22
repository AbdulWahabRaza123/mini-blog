// features/user/userApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { supabaseBrowser } from '@/lib/supabase-client';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: async (): Promise<any> => {
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.getUser();
    if (error) return { error };
    return { data: data.user };
  },
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      queryFn: async () => {
        const supabase = supabaseBrowser();
        const { data: authUser, error } = await supabase.auth.getUser();
        if (error || !authUser?.user) return { error };
        const userId = authUser.user.id;
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();
        if (profileError) return { error: profileError };
        return {
          data: {
            id: userId,
            email: authUser.user.email,
            createdAt: authUser.user.created_at,
            name:
              authUser.user.user_metadata?.name || profileData?.name || null,
          },
        };
      },
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
