"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="cursor-pointer">
      <FaArrowLeft />
    </button>
  );
};

export default BackButton;
