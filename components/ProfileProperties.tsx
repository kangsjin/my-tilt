"use client";
import deleteProperty from "@/app/actions/deleteProperty";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfileProperties = ({
  properties: initialProperties,
}: {
  properties: any;
}) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm("정말 이 방을 삭제하시겠습니까?");

    if (!confirmed) return;

    await deleteProperty(propertyId);

    const updatedProperties = properties.filter(
      (property: any) => property._id !== propertyId
    );
    setProperties(updatedProperties);

    toast.success("성공적으로 방이 삭제되었습니다.");
  };

  return properties.map((property: any) => {
    return (
      <div className="mb-10">
        <Link href={`/properties/${property._id}`}>
          <Image
            className="h-32 w-full rounded-md object-cover"
            src={property.images[0]}
            alt="Property 1"
            width={1000}
            height={200}
          />
        </Link>
        <div className="mt-2">
          <p className="text-lg font-semibold">{property.name}</p>
          <p className="text-gray-600">
            주소 {property.location.street} {property.location.city}{" "}
            {property.location.state}
          </p>
        </div>
        <div className="mt-2">
          <Link
            href={`/properties/${property._id}/edit`}
            className="bg-[#01a086] text-white px-3 py-3 rounded-md mr-2 hover:bg-[#01a086]"
          >
            수정
          </Link>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
            type="button"
            onClick={() => handleDeleteProperty(property._id)}
          >
            삭제
          </button>
        </div>
      </div>
    );
  });
};

export default ProfileProperties;
