"use client";
import dynamic from "next/dynamic";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useSearchParams } from "next/navigation";

const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);

const PDFViewerPage = () => {
  const searchParams = useSearchParams();
  const pdf = searchParams.get("pdf");

  if (!pdf) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-2xl font-semibold mb-4">PDF Viewer</h1>
        <p className="text-red-500">
          No PDF URL provided. Please provide a valid URL.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold mb-4">PDF Viewer</h1>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
        <div
          style={{
            height: "750px",
            width: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Viewer fileUrl={pdf} />
        </div>
      </Worker>
    </div>
  );
};

export default PDFViewerPage;
