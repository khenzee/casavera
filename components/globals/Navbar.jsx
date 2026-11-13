"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toogleMenu() {
    setIsOpen(!isOpen);
  }

  const logo =
    "https://cdn.prod.website-files.com/68eda376f70ff119166dcbfd/68edc03857163ec22cf166b1_4ca8d5e8e465834c929c9f97e9e1154c_Navbar%20Logo.svg";

  const pages = [
    { href: "/", title: "home" },
    { href: "/about", title: "about" },
    { href: "/properties", title: "properties" },
    { href: "/blog", title: "blog" },
  ];
  return (
    <nav className="flex justify-center z-50">
      <div className="w-full lg:w-fit fixed top-4">
        <div className=" flex lg:inline-flex justify-between items-center gap-6 bg-amber-50 px-3 py-2 rounded-2xl">
          <div>
            <Link href={"/"}>
              <Image src={logo} alt="logo" width={200} height={200} />
            </Link>
          </div>
          <div className="hidden lg:flex gap-4 items-center">
            {pages.map((page, index) => (
              <Link href={page.href} key={index}>
                {page.title}
              </Link>
            ))}
          </div>
          <div className="hidden lg:block">
            <Link
              href={"/contact"}
              className="px-8 py-4 bg-black text-white rounded-lg"
            >
              Talk to Agent
            </Link>
          </div>
          <div className="lg:hidden">
            <button onClick={toogleMenu}>
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={
            `lg:hidden flex flex-col items-center px-6 py-8 rounded-2xl bg-amber-50 mt-4 gap-8 ${isOpen ? "block" : "hidden" }`
          }
        >
          {pages.map((page, index) => (
            <Link href={page.href} key={index}>
              {page.title}
            </Link>
          ))}
          <div className="mt-6">
            <Link
              href={"/contact"}
              className="px-8 py-4 bg-black text-white rounded-lg"
            >
              Talk to Agent
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
