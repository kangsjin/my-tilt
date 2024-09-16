"use client";
import { useState, useEffect } from "react";
import { PropertyType } from "@/utils/types";
import { FaBookmark, FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { useSession } from "next-auth/react";
import { getSessionUser } from "@/utils/getSessionUser";
import { error } from "console";

const BookmarkButton = ({ property }: { property: PropertyType }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkBookmarkStatus(property._id)
      .then((res) => {
        setIsBookmarked(res.isBookmarked);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }, [property._id, userId, checkBookmarkStatus]);

  const handleBookmark = async () => {
    if (!userId) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    bookmarkProperty(property._id)
      .then((res) => {
        setIsBookmarked(res.isBookmarked);
        toast.success(res.message);
      })
      .catch((error) => toast.error(error.message));
  };

  if (loading) {
    return (
      <button
        disabled
        className="bg-gray-200 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      >
        로딩...
      </button>
    );
  }

  return isBookmarked ? (
    <button
      onClick={handleBookmark}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaHeart className="mr-2" /> 저장 취소
    </button>
  ) : (
    <button
      onClick={handleBookmark}
      className="bg-[#01a086] hover:bg-[#01a086] text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaRegHeart className="mr-2" /> 저장
    </button>
  );
};

export default BookmarkButton;
