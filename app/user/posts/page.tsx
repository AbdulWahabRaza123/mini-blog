"use client";
import { PrimaryButton } from "@/components/ui/buttons/primary-btn";
import { PostCard } from "@/components/ui/cards/post-card";
import { PageSpinner } from "@/components/ui/spinners/page-spinner";
import { useGetPostsQuery } from "@/lib/redux/services/post-apis";
import { PostDetails } from "@/types/post-details";
import { Calendar, FileText, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
const PostsPage = () => {
  const router = useRouter();
  const { data: posts, isLoading } = useGetPostsQuery(undefined);
  if (isLoading) return <PageSpinner />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Posts</h1>
        <PrimaryButton
          handleSubmit={() => router.push("/user/posts/create")}
          className="max-w-fit"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Post
        </PrimaryButton>
      </div>

      {posts?.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first post to get started
          </p>
          <PrimaryButton
            handleSubmit={() => router.push("/user/posts/create")}
            className="max-w-fit"
          >
            Create Post
          </PrimaryButton>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts?.map((post: PostDetails) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
export default PostsPage;
