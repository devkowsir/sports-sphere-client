import React from "react";
import { SectionHeading } from "../../components/section-heading";
import { Reveal } from "react-awesome-reveal";

export const Hot = () => {
  return (
    <Reveal triggerOnce>
      <section className="mb-24">
        <div className="container flex flex-col items-center justify-between gap-8 lg:gap-4 lg:flex-row">
          <div className="xl:shrink-0 xl:w-6/12">
            <img src="/images/hot.jpg" alt="" className="rounded-xl" />
          </div>
          <div className="xl:w-5/12">
            <SectionHeading
              heading={"We create new and interesting solutions"}
              subHeading={
                "Discover our commitment to innovation as we continuously develop new and engaging solutions tailored to your needs. From cutting-edge technologies to creative approaches, we strive to provide fresh perspectives and exceed expectations in every endeavor."
              }
              className="[&>h2]:text-4xl"
            />
            <div className="max-w-full mt-4 flex gap-4">
              {[1, 2, 3].map((id) => (
                <div key={id}>
                  <img src={`/images/equipment-hot-${id}.jpg`} className="w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};
