import React, { useMemo, useState } from "react";
import { SectionHeading } from "../../components/section-heading";
import { Link } from "react-router-dom";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

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

export const AllEquipmentsRoute = () => {
  const [sortMode, setSortMode] = useState(null);

  const sortedProducts = useMemo(() => {
    if (!sortMode) return products;

    return [...products].sort((a, b) => (a.price == b.price ? 0 : a.price > b.price ? sortMode : -sortMode));
  }, [sortMode, products]);

  return (
    <section className="my-24">
      <div className="container">
        <div className="flex justify-between items-center">
          <SectionHeading
            heading={"Equipments List"}
            subHeading={"A breif table of all equipments from all vendors."}
          />
          <div className="join border">
            <button onClick={() => setSortMode((curr) => (curr == 1 ? null : 1))} className="btn btn-square join-item">
              <FaSortAmountUp />
            </button>
            <button
              onClick={() => setSortMode((curr) => (curr == -1 ? null : -1))}
              className="btn btn-square join-item"
            >
              <FaSortAmountDown />
            </button>
          </div>
        </div>
        <div className="my-8 border overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {sortedProducts.map(({ _id, image, itemName, categoryName, price }) => (
                <tr key={_id}>
                  <td className="w-20 aspect-[5/4] grow-0 shrink-0">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </td>
                  <td>{itemName}</td>
                  <td>{categoryName}</td>
                  <td>${price}</td>
                  <th>
                    <Link to={`/product/${_id}`} className="btn btn-ghost">
                      View Details
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
