"use client";
import { HeaderComp } from "@/components/user/header";
import { SidebarComp } from "@/components/user/sidebar";
import { store } from "@/lib/redux/store";
import { useState } from "react";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Provider store={store}>
      <main className="min-h-screen bg-gray-50 flex">
        <SidebarComp
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="flex-1">
          <HeaderComp setSidebarOpen={setSidebarOpen} />
          <main className="p-6">{children}</main>
        </div>
      </main>
    </Provider>
  );
}
