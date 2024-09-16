"use client";
import { useEffect, useState } from "react";
import {
  setDefaults,
  fromAddress,
  setKey,
  setLanguage,
  setRegion,
} from "react-geocode";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import { PropertyType } from "@/utils/types";
import Spinner from "./Spinner";

const PropertyMap = ({ property }: { property: PropertyType }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });

  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setKey(process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY!);
  setLanguage("en");
  setRegion("de");

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        //check geocode results
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (geocodeError) {
    return <div className="text-xl">No location found</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        width={"100%"}
        height={"500px"}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
        viewState={{ longitude: lng!, latitude: lat!, zoom: 12 }}
      >
        <Marker longitude={lng!} latitude={lat!} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
