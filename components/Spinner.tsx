"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = () => {
  return (
    <ClipLoader
      color="#01a086"
      cssOverride={override}
      size={150}
      arial-label="Loading Spinner"
      loading
    />
  );
};

export default Spinner;
