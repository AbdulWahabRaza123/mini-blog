"use client";
import { OutlineButton } from "@/components/ui/buttons/outline-btn";
import { PrimaryButton } from "@/components/ui/buttons/primary-btn";
import { TextEditor } from "@/components/ui/editor/editor";
import { PageSpinner } from "@/components/ui/spinners/page-spinner";
import { useNotify } from "@/components/ui/use-notify";
import { useGetPostsQuery } from "@/lib/redux/services/post-apis";
import { useGetCurrentUserQuery } from "@/lib/redux/services/user-api";
import axios from "axios";
import { useState } from "react";
const CreatePostPage = () => {
  const notify = useNotify();
  const { data, isLoading: isUserLoading } = useGetCurrentUserQuery(undefined);
  const { refetch } = useGetPostsQuery(undefined);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    summary: "",
  });
  const [isSummaryGenerated, setIsSummaryGenerated] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const handleGenerateSummary = async () => {
    try {
      setIsSummaryLoading(true);
      const response = await axios.post("/api/posts/summary", {
        text: newPost.content,
      });
      const { data } = response;
      setNewPost((prev) => ({ ...prev, summary: data.summary }));
      setIsSummaryGenerated(true);
      notify({
        type: "success",
        title: "Summary generated successfully!",
      });
    } catch (error: any) {
      console.error("Error generating summary:", error);
      notify({
        type: "error",
        title: error?.message || "",
      });
    } finally {
      setIsSummaryLoading(false);
    }
  };
  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      notify({
        type: "error",
        title: "Title and content cannot be empty",
      });
      return;
    }
    try {
      setIsPostLoading(true);
      await axios.post("/api/posts/create", {
        title: newPost.title,
        content: newPost.content,
        summary: isSummaryGenerated ? newPost.summary : "",
        authorId: data?.id,
      });
      refetch();
      notify({
        type: "success",
        title: "Post created successfully!",
      });
      setNewPost({ title: "", content: "", summary: "" });
      setIsSummaryGenerated(false);
    } catch (error: any) {
      console.error("Error creating post:", error);
      notify({
        type: "error",
        title: error?.message || "Failed to create post",
      });
    } finally {
      setIsPostLoading(false);
    }
  };

  if (isUserLoading) return <PageSpinner />;
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600 mt-1">
            Share your thoughts with the world
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your post title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <TextEditor
              content={newPost.content}
              setContent={(value) => setNewPost({ ...newPost, content: value })}
            />
          </div>
          {isSummaryGenerated && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Summary
              </label>
              <textarea
                value={newPost.summary}
                disabled={true}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="AI Written Post"
              />
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Author Information
            </h3>
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {data?.name || "N/A"}
                </p>
                <p className="text-xs text-gray-500">
                  Author ID: {data?.id || ""}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <OutlineButton
              handleSubmit={() =>
                setNewPost({ title: "", content: "", summary: "" })
              }
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </OutlineButton>
            {!isSummaryGenerated ? (
              <PrimaryButton
                handleSubmit={handleGenerateSummary}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="max-w-fit"
                isLoading={isSummaryLoading}
              >
                Generate Summary
              </PrimaryButton>
            ) : (
              <PrimaryButton
                isLoading={isPostLoading}
                handleSubmit={handleCreatePost}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="max-w-fit"
              >
                Publish Post
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePostPage;
