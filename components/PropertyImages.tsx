import Image from "next/image";

const PropertyImage = ({ images }: { images: string[] }) => {
  return (
    <section className="container mx-auto">
      {images.length === 1 ? (
        <Image
          src={images[0]}
          alt=""
          className="object-cover h-[400px] mx-auto rounded-xl"
          width={1800}
          height={400}
          priority={true}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index): React.ReactNode => {
            return (
              <div key={index} className="col-span-2">
                <Image
                  src={image}
                  alt=""
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PropertyImage;
