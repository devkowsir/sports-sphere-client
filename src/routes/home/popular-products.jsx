import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { SectionHeading } from "../../components/section-heading";
import { Link } from "react-router-dom";
import { Rating } from "../../components/rating";

const products = [
  {
    _id: "1",
    image: "/images/popular-product-1.jpg",
    itemName: "Intense running shoes",
    categoryName: "Running",
    description: "Durable and lightweight shoes for long-distance running.",
    price: 120.99,
    rating: 4.7,
    customization: "Custom fit, color options",
    processingTime: "2-4 days",
    stockStatus: 15,
    userEmail: "user1@example.com",
    userName: "John Doe",
  },
  {
    _id: "2",
    image: "/images/popular-product-2.jpg",
    itemName: "Jersey for cycling",
    categoryName: "Cycling",
    description: "High-performance cycling jersey for endurance rides.",
    price: 75.5,
    rating: 4.8,
    customization: "Team logo, size customization",
    processingTime: "3-5 days",
    stockStatus: 30,
    userEmail: "user2@example.com",
    userName: "Jane Smith",
  },
  {
    _id: "3",
    image: "/images/popular-product-3.jpg",
    itemName: "Eye-catching running shoes",
    categoryName: "Running",
    description: "Stylish running shoes with enhanced comfort and grip.",
    price: 99.99,
    rating: 4.6,
    customization: "Personalized color and size options",
    processingTime: "2-3 days",
    stockStatus: 20,
    userEmail: "user3@example.com",
    userName: "Alice Johnson",
  },
  {
    _id: "4",
    image: "/images/popular-product-4.jpg",
    itemName: "Team crit jersey",
    categoryName: "Cycling",
    description: "Breathable team jersey for professional cycling races.",
    price: 60.0,
    rating: 4.5,
    customization: "Sponsor branding, color schemes",
    processingTime: "4-6 days",
    stockStatus: 10,
    userEmail: "user4@example.com",
    userName: "Michael Brown",
  },
  {
    _id: "5",
    image: "/images/popular-product-5.jpg",
    itemName: "Pink balaclava",
    categoryName: "Winter Sports",
    description: "Thermal balaclava for maximum warmth during winter activities.",
    price: 35.99,
    rating: 4.4,
    customization: "Color and size options",
    processingTime: "1-2 days",
    stockStatus: 50,
    userEmail: "user5@example.com",
    userName: "Emily Davis",
  },
  {
    _id: "6",
    image: "/images/popular-product-6.jpg",
    itemName: "Tennis racket Pro",
    categoryName: "Tennis",
    description: "Lightweight professional tennis racket for precision gameplay.",
    price: 89.99,
    rating: 4.3,
    customization: "Grip size and string tension adjustment",
    processingTime: "3-5 days",
    stockStatus: 25,
    userEmail: "user6@example.com",
    userName: "Chris Wilson",
  },
];
const CARD_WIDTH = 320;

export const PopularProducts = () => {
  const [viewStartIndex, setViewStartIndex] = useState(0);

  return (
    <section className="mb-24">
      <div className="container">
        <div className="flex justify-between">
          <SectionHeading
            heading={"Most Popular Products"}
            subHeading={"Browse through our collection of must-haves"}
          />
          <div className="flex gap-4">
            <button
              className={`btn btn-circle btn-outline`}
              onClick={() => setViewStartIndex((curr) => curr - 1)}
              disabled={viewStartIndex - 1 < 0}
            >
              <FaArrowLeft />
            </button>
            <button
              className={`btn btn-circle btn-outline`}
              onClick={() => setViewStartIndex((curr) => curr + 1)}
              disabled={viewStartIndex + 1 >= products.length}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <ul
            className="mt-4 flex transition"
            style={{
              width: CARD_WIDTH * products.length - 20,
              transform: `translateX(-${CARD_WIDTH * viewStartIndex}px)`,
            }}
          >
            {products.map(({ _id, itemName, image, price, rating }) => (
              <li key={_id} className="shrink-0 w-80 pr-5">
                <div className="card card-compact card-bordered bg-base-100">
                  <figure>
                    <img src={image} alt={itemName} />
                  </figure>
                  <div className="card-body text-center">
                    <h3 className="text-base font-display font-bold tracking-wide">{itemName}</h3>
                    <Rating className={"justify-center"} maxRating={5} achievedRating={rating} />
                    <span className="font-bold">${price}</span>
                    <Link to={`/product/${_id}`} className="btn btn-wide">
                      View Details
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
