import { FaBookmark } from "react-icons/fa";

const BookmarkButton = ({ property }: { property: any }) => {
  return (
    <button className="bg-[#01a086] hover:bg-[#01a086] text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaBookmark className="mr-2" /> 찜하기
    </button>
  );
};

export default BookmarkButton;
