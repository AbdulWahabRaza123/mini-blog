"use client";
import React from "react";
import { FileText } from "lucide-react";
import { useGetCurrentUserQuery } from "@/lib/redux/services/user-api";
import { useGetPostsQuery } from "@/lib/redux/services/post-apis";
import { PageSpinner } from "@/components/ui/spinners/page-spinner";

export default function Dashboard() {
  const { data: posts, isLoading: isPostsLoading } =
    useGetPostsQuery(undefined);
  const { data, isLoading: isUserLoading } = useGetCurrentUserQuery(undefined);
  if (isPostsLoading || isUserLoading) return <PageSpinner />;
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {data?.name || ""}!
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your content today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">
                {posts?.length || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            User Information
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {data?.name || "N/A"}
              </h3>
              <p className="text-gray-600">{data?.email || "N/A"}</p>
              <p className="text-sm text-gray-500">User ID: {data?.id || 0}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Joined:</span>
              <span className="ml-2 text-gray-900">
                {new Date(data?.createdAt || "").toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Status:</span>
              <span className="ml-2 text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
