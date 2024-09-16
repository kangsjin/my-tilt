import { get } from "http";
import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

type Property = {
  _id: string;
  name: string;
  type: string;
  beds: number;
  baths: number;
  square_feet: number;
  rent?: string;
  location: {
    city: string;
    state: string;
  };
  images: string[];
  rates: {
    weekly?: number;
    monthly?: number;
    nightly?: number;
  };
};

const PropertyCard = ({ property }: { property: Property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className="border border-gray-200 rounded-xl shadow-md relative">
      <Image
        src={`${property.images[0]}`}
        alt=""
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="md:hidden lg:inline" /> {property.beds} {""}
            <span className="md:hidden lg:inline">방 수</span>
          </p>
          <p>
            <FaBath className="md:hidden lg:inline" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">화장실</span>
          </p>
          <p>
            <FaRulerCombined className="md:hidden lg:inline" />
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">크기</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <p>
            <FaMoneyBill className="md:hidden lg:inline" /> 주당
          </p>
          <p>
            <FaMoneyBill className="md:hidden lg:inline" /> 월세
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700 mt-1" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-[#01a086] hover:bg-[#01a086] text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            자세히
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
