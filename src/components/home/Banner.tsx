"use client";
import { useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter();
  return (
    <div
      className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white px-5 lg:px-0"
      style={{ backgroundImage: "url('/bg.avif')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-primary">
          Welcome to Our Platform
        </h1>
        <p className="text-lg lg:text-xl mb-6 text-warning">
          Explore courses, gain knowledge, and achieve your goals with our
          expert instructors.
        </p>
        <button
          onClick={() => router.push("/courses")}
          className="bg-purple text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple/80 transition cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Banner;
