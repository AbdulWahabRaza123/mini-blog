import React from "react";
import { Spinner } from "./spinner";

export const PageSpinner = () => {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <Spinner />
    </main>
  );
};
