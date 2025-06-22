"use client";
import { PostDetails } from "@/types/post-details";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const PostCard = ({ post }: { post: PostDetails }) => {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 relative">
        {seeMore ? (
          <>
            <div
              onClick={() => setSeeMore(false)}
              className="flex items-center gap-1 cursor-pointer absolute top-4 right-4"
            >
              <ChevronUp className="text-gray-400 w-4 h-4" />
              <p className="text-[12px] text-gray-500 mb-0">See Less</p>
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => setSeeMore(true)}
              className="flex items-center gap-1 cursor-pointer absolute top-4 right-4"
            >
              <ChevronDown className="text-gray-400 w-4 h-4" />
              <p className="text-[12px] text-gray-500 mb-0">See More</p>
            </div>
          </>
        )}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 line-clamp-3">{post.summary}</p>
            {seeMore && (
              <>
                <hr className="mt-7 mb-4" />
                <div className="editor">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.content || "<p>No content available</p>",
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post?.createdAt?.toString() || "").toLocaleDateString()}
            </span>
          </div>
          <span className="text-xs text-gray-400">ID: {post.id}</span>
        </div>
      </div>
    </div>
  );
};
