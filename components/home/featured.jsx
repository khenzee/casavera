import Link from 'next/link';
import React from 'react'
import PropertyCard from '../globals/PropertyCard';

const Featured = () => {
    const properties = [
      {
        image:
          "https://cdn.prod.website-files.com/68ef1028c638ee7245d8acd7/68fb23b9c3f5ac72c5409ab4_Thumbnail.webp",
        details: ["3 beds", "2 baths", "2,400 sq ft"],
        title: "the birch residence",
        address: "birch avenue, 33, san francisco",
        price: "$1,080,000"
      },
      {
        image:
          "https://cdn.prod.website-files.com/68ef1028c638ee7245d8acd7/68fb23a179eb019d7f47a90d_Thumbnail.webp",
        details: ["5 beds", "4 baths", "4,500 sq ft"],
        title: "the aspen retreat",
        address: "aspen hill, 72, san francisco",
        price: "$2,520,000"
      },
    ];

  return (
    <section className='p-8 lg:p-16'>
      <div className="lg:flex justify-between gap-16">
        <div className='space-y-4 lg:w-1/2 '>
          <h5>Featured Properties</h5>
          <h2 className="text-[1.5rem] lg:text-[2.8rem] leading-tight ">
            Handpicked Homes for Refined Living
          </h2>
          <p>
            Explore our curated selection of modern homes — thoughtfully chosen
            for their design, comfort, and lasting value.
          </p>
        </div>
        <div className='inline-flex items-end'>
          <Link href="/properties" className='px-8 py-4 rounded-2xl text-white bg-black'>Explore all properties</Link>
        </div>
      </div>
      <div className='grid md:grid-cols-2 gap-6'>
        {
            properties.map((property, index)=>{
                return(
                    <div key={index}>
                       <PropertyCard property = {property}/> 
                    </div>
                )
            })
        }
      </div>
    </section>
  );
}

export default Featured