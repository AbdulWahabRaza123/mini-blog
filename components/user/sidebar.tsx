"use client";
import { useGetCurrentUserQuery } from "@/lib/redux/services/user-api";
import { FileText, Home, LogOut, PlusCircle, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOutClient } from "@/lib/supabase-client-logout";
export const sidebarItems = [
  { link: "/user", label: "Dashboard", icon: Home },
  { link: "/user/posts/create", label: "Create Post", icon: PlusCircle },
  { link: "/user/posts", label: "My Posts", icon: FileText },
];
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
export const SidebarComp = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading } = useGetCurrentUserQuery(undefined);
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="mt-8">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.link}
              onClick={() => {
                router.push(item.link);
                setSidebarOpen(false);
              }}
              className={`w-full cursor-pointer flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                pathname === item.link
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {isLoading ? "loading name..." : data?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {isLoading ? "loading email..." : data?.email}
            </p>
          </div>
        </div>
        <button
          onClick={signOutClient}
          className="flex cursor-pointer items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
