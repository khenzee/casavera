import { MoveRight } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export const Hero = () => {
    const heroImg =
      "https://cdn.prod.website-files.com/68eda376f70ff119166dcbfd/68ee143fb702c1f04de3ee69_98a8957b8110a99b7e376ec13832c431_Hero%20Image%20Homepage-p-3200.webp";
  return (
    <section className="relative h-screen overflow-y-hidden">
      <div className='w-full h-full '>
        <Image src={heroImg} alt="Hero Image" width={1200} height={800} className='object-cover w-full ' />
      </div>
      <div className="absolute left-0 bottom-0 p-8 lg:p-16 w-full lg:w-1/2 space-y-4 text-white" >
        <h5>Modern & Trusted</h5>
        <h1 className='text-[2.5rem] lg:text-[3.8rem] leading-tight ' >Exclusive Modern Homes for Sale</h1>
        <p>Minimalist elegance crafted for comfort and style.</p>
        <Link href="/properties" className='inline-flex justify-center items-center rounded-2xl p-2 space-x-4 flex-nowrap bg-white mt-8 text-black ' >
          <button>Explore Properties</button>
          <div className='p-4 bg-black text-white rounded-lg'><MoveRight /></div>
        </Link>
      </div>
    </section>
  );
}
