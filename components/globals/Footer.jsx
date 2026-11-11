import Image from "next/image"
import FooterLinks from "./FooterLinks";

const Footer = () => {
    const bigImg = "https://cdn.prod.website-files.com/68eda376f70ff119166dcbfd/68f2f812bf77d1636d027539_Casavera%20Logo%20Text%20Large.svg"
    const smallImg =
      "https://cdn.prod.website-files.com/68eda376f70ff119166dcbfd/68f2f204bf77d1636d0200f8_Casavera%20Logo%20White.svg";
    
      const pages = [
        { href: "/", title: "home" },
        { href: "/about", title: "about" },
        { href: "/properties", title: "properties" },
        { href: "/blog", title: "blog" },
        { href: "/contact", title: "talk to agent" }
      ];
      const cms = [
        { href: "/property", title: "property" },
        { href: "/blog-cms", title: "blog CMS" },

      ];
      const utility = [
        { href: "/style-guide", title: "style guide" },
        { href: "/licenses", title: "licenses" },
        { href: "/changelog", title: "changelog" },

      ];


  return (
    <footer className="bg-black p-8 lg:p-16 text-white">
      <div className="lg:flex justify-between gap-8 space-y-6">
        <div className="lg:w-2/5">
          <Image src={smallImg} alt="logo img" width={250} height={250} />
          <p>
            Casavera offers thoughtfully selected modern homes, guided by a
            commitment to trust, quality, and personalized service.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl leading-tight">Page</h3>
          <FooterLinks links={pages} />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl leading-tight">
            CMS <br /> Pages
          </h3>
          <FooterLinks links={cms} />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl leading-tight">
            Utility <br /> Pages
          </h3>
          <FooterLinks links={utility} />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl leading-tight">Contact</h3>
          <p>bukola@gmai.com</p>
          <p>+123445677</p>
        </div>
      </div>
      <div className="space-y-12">
        <div className="space-y-6 md:flex justify-between items-center">
          <p>
            powered by: <b>Tech365</b>
          </p>
          <p>© 2025 Sodol Templates.All right Reserved</p>
        </div>
        <div>
          <Image
            src={bigImg}
            alt="big logo image"
            width={1000}
            height={1000}
            className="w-full"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer