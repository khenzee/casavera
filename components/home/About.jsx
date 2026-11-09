import Image from 'next/image'


const About = () => {
    const abtImg ="https://cdn.prod.website-files.com/68eda376f70ff119166dcbfd/68f8ed66f7480a936bad691e_a43f55439fc67293bbbf66063f249cbc_Section%20About.webp";

    const stats = [
      { score: "10+", detail: "years of experience" },
      { score: "500+", detail: "modern home sold" },
      { score: "98%", detail: "client satisfaction rate" },
    ];

  return (
    <section className="p-8 space-y-4 lg:px-16 lg:p-16 lg:flex justify-between gap-24 ">
      <div className="space-y-6 lg:flex flex-col justify-between lg:w-1/4 ">
        <h5>About Casavera</h5>
        <div className="rounded-2xl overflow-hidden w-full">
          <Image
            src={abtImg}
            alt="About Image"
            height={500}
            width={500}
            className="object-cover w-full "
          />
        </div>
      </div>
      <div className="lg:w-3/4 space-y-24">
        <div className='space-y-4'>
          <h2 className="text-[1.5rem] lg:text-[2.8rem] leading-tight ">
            Casavera specializes in presenting modern, high-quality homes — each
            carefully selected and exclusively available for sale.
          </h2>
          <p>
            We are dedicated to connecting discerning buyers with properties
            that blend timeless design, comfort, and enduring value. With trust
            and professionalism at our core, Casavera offers peace of mind in
            every purchase.
          </p>
        </div>
        <div className='flex justify-between gap-4'>
            {
                stats.map((stat, index)=>{
                    return (
                      <div key={index} >
                        <h2 className="text-[1.5rem] lg:text-[2.8rem] leading-tight ">{stat.score}</h2>
                        <p>{stat.detail}</p>
                      </div>
                    );
                })
            }
        </div>
      </div>
    </section>
  );
}

export default About

