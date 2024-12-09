import React from "react";
import { SectionHeading } from "../../components/section-heading";

export const Hot = () => {
  return (
    <section className="mb-24">
      <div className="container flex flex-col items-center justify-between gap-8 lg:gap-4 lg:flex-row">
        <div className="xl:shrink-0 xl:w-6/12">
          <img src="/images/hot.jpg" alt="" />
        </div>
        <div className="xl:w-5/12">
          <SectionHeading
            heading={"We create new and interesting solutions"}
            subHeading={
              "Discover our commitment to innovation as we continuously develop new and engaging solutions tailored to your needs. From cutting-edge technologies to creative approaches, we strive to provide fresh perspectives and exceed expectations in every endeavor."
            }
            className="[&>h2]:text-4xl"
          />
          <div className="mt-4 flex gap-4">
            {[1, 2, 3].map((id) => (
              <img src={`/images/product-hot-${id}.jpg`} key={id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
