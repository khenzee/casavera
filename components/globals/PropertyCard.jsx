import Image from 'next/image'

const PropertyCard = ({property}) => {
  return (
    <div className="bg-white text-black p-4 border border-gray-200 rounded-2xl">
      <div className="relative rounded-2xl overflow-hidden aspect-5/3">
        <Image
          src={property.image}
          alt="property image"
          width={500}
          height={500}
          className="object-cover h-full"
        />
        <div className="absolute bottom-2 left-2 flex gap-2 ">
          {property.details.map((detail, index) => {
            return (
              <div
                key={index}
                className="bg-white text-black px-4 py-2 rounded-lg"
              >
                {detail}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between p-4 space-y-4">
        <div className='space-y-6 '>
          <h2 className="text-2xl">{property.title}</h2>
          <p>{property.address}</p>
        </div>
        <div className='flex self-end'>
          <div className='bg-amber-200 px-4 py-2 mb-4 rounded-lg'>
            <h4 className="text-lg">{property.price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard