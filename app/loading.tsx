"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader
        color="#01a086"
        cssOverride={override}
        size={150}
        arial-label="Loading Spinner"
        loading
      />
    </div>
  );
};

export default LoadingPage;
