import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { SectionHeading } from "../../components/section-heading";

const articles = [
  {
    _id: "1",
    date: "December 08, 2024",
    category: "Swimming",
    title: "Make a splash: pool, open water",
    description:
      "Sport is not just a way to stay fit, but a lifestyle that inspires achievements and self-improvement…",
    image: "/images/article-1.jpg",
  },
  {
    _id: "2",
    date: "December 08, 2024",
    category: "Cycling",
    title: "Pedal power: boost your cycling performance!",
    description:
      "Are you ready to take your workouts to the next level? Whether you're a seasoned athlete or just starting your fitness j...",
    image: "/images/article-2.jpg",
  },
  {
    _id: "3",
    date: "December 08, 2024",
    category: "Snowboarding",
    title: "Snowboard sensation: must-have snowboard gear!",
    description:
      "Sport is not just a way to stay fit, but a lifestyle that inspires achievements and self-improvement…",
    image: "/images/article-3.jpg",
  },
];

export const Articles = () => {
  const [viewStartIndex, setViewStartIndex] = useState(0);

  return (
    <section className="mb-24">
      <div className="container">
        <div className="flex justify-between">
          <SectionHeading heading={"Our articles"} subHeading={"Discover insights and knowledge in our articles"} />
        </div>
        <ul className="mt-4 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {articles.map(({ _id, image, date, category, title, description }) => (
            <li key={_id} className="card card-compact card-side card-bordered bg-base-100">
              <figure className="shrink-0">
                <img src={image} alt={title} className="w-40 h-full sm:w-52" />
              </figure>
              <div className="card-body">
                <div className="flex justify-between text-slate-500">
                  <span>{date}</span>
                  <span>{category}</span>
                </div>
                <h3 className="text-lg text-slate-800 font-display font-bold tracking-wide">{title}</h3>
                <p className="text-slate-500">{description}</p>
                <button className="btn btn-sm group px-6 rounded-3xl flex items-center gap-2 bg-white">
                  <span className="text-sm text-slate-700">View more</span>
                  <FaArrowRight className="icon text-secondary group-[&:hover]:translate-x-2 transition" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
