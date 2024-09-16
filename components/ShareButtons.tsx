import { FaShare } from "react-icons/fa";

const ShareButtons = ({ property }: { property: any }) => {
  return (
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaShare className="mr-2" />방 공유하기
    </button>
  );
};

export default ShareButtons;
