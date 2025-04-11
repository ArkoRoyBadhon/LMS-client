"use client";

import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)] bg-red-50">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-danger">
          Something went wrong!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          {`We're sorry, but something unexpected happened. Please try again later.`}
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-danger/80 text-white font-semibold rounded-md shadow-md hover:bg-danger transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
