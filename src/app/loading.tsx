import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> */}
        <Image
          src="/Spinner@1x-1.0s-200px-200px.svg"
          alt="Loading..."
          width={200}
          height={200}
          className="w-[100px] h-[100px]"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
