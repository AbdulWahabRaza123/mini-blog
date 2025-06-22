"use client";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { sidebarItems } from "./sidebar";
import { useGetCurrentUserQuery } from "@/lib/redux/services/user-api";
interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}
export const HeaderComp = ({ setSidebarOpen }: HeaderProps) => {
  const { data } = useGetCurrentUserQuery(undefined);
  const pathname = usePathname();
  const currentPage =
    sidebarItems.find((item) => item.link === pathname)?.label || "dashboard";
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 capitalize">
          {currentPage}
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Welcome, {data?.name || "N/A"}
          </span>
        </div>
      </div>
    </header>
  );
};
