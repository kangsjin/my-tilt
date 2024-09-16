import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";

const PropertyEditPate = async ({ params }: { params: any }) => {
  await connectDB();
  const propertyDoc = await Property.findById(params.id);
  const property = convertToSerializableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        방 정보를 찾을 수 없습니다.
      </h1>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-x-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
          {}
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPate;
