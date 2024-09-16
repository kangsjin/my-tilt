"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId: string) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);

  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;
  if (isBookmarked) {
    //if property is already bookmarked, remove it from bookmarks
    user.bookmarks.pull(propertyId);
    message = "이 방은 찜하기를 취소했습니다.";
    isBookmarked = false;
  } else {
    //if property is not bookmarked, add it to bookmarks
    user.bookmarks.push(propertyId);
    message = "이 방을 찜했습니다.";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/properties/saved", "page");

  return { message, isBookmarked };
}

export default bookmarkProperty;
