import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Tennis", image: "/images/sport-category-img-1.jpg", category: "/category/tennis" },
  { name: "Gymnastics", image: "/images/sport-category-img-2.jpg", category: "/category/gymnastics" },
  { name: "Cycling", image: "/images/sport-category-img-3.jpg", category: "/category/cycling" },
  { name: "Running", image: "/images/sport-category-img-4.jpg", category: "/category/running" },
];

export const Categories = () => {
  return (
    <section className="mb-24">
      <ul className="container grid gap-4 text-white font-semibold sm:grid-cols-2 lg:grid-cols-4">
        {categories.map(({ name, image, category }) => (
          <li key={category} className="group relative h-56 p-8 flex flex-col overflow-hidden rounded-xl">
            <h3 className="mt-auto mb-4 text-xl">{name}</h3>
            <Link
              to={category}
              className="relative isolate w-max after:absolute after:bottom-0 after:left-0 after:-z-[1] after:w-full after:h-0.5 after:bg-secondary"
            >
              Go to category
            </Link>
            <div
              className="absolute inset-0 -z-[1] bg-center bg-cover"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </li>
        ))}
      </ul>
    </section>
  );
};
