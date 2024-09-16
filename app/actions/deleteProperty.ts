"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId: string) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  //verify user owns property
  if (property.owner.toString() !== userId.toString()) {
    throw new Error("Unathorized");
  }

  //extract public id from image URLs
  const publicIds = property.images.map((imageUrl: string) => {
    const parts = imageUrl.split("/");
    return parts.at(-1)?.split(".")[0];
  });

  // Delete images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy(`propertypulse/${publicId}`);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
