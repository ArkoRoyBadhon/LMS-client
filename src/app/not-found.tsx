import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)] bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page Not Found</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-hover transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
