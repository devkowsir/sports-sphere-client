import React, { useMemo, useState } from "react";
import { FaSortAmountDown, FaSortAmountUp, FaInfo, FaEdit, FaStar, FaUser, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SectionHeading } from "../../components/section-heading";

const products = [
  {
    _id: "1",
    image: "/images/popular-product-1.jpg",
    itemName: "Intense running shoes",
    categoryName: "Running",
    description: "Durable and lightweight shoes for long-distance running.",
    price: 120.99,
    rating: 4.7,
    customizations: [{ name: "Custom fit, color options", cost: 10 }],
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
    customizations: [{ name: "Team logo, size customization", cost: 10 }],
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
    customizations: [{ name: "Personalized color and size options", cost: 10 }],
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
    customizations: [{ name: "Sponsor branding, color schemes", cost: 10 }],
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
    customizations: [{ name: "Color and size options", cost: 10 }],
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
    customizations: [{ name: "Grip size and string tension adjustment", cost: 10 }],
    processingTime: "3-5 days",
    stockStatus: 25,
    userEmail: "user6@example.com",
    userName: "Chris Wilson",
  },
];

export const MyEquipmentsRoute = () => {
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
            heading={"My Equipments List"}
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
        <div className="my-8 grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {sortedProducts.map(
            ({
              _id,
              image,
              itemName,
              categoryName,
              price,
              customizations,
              description,
              processingTime,
              rating,
              stockStatus,
            }) => (
              <div className="card card-bordered mx-auto w-full rounded-2xl shadow-xl">
                <figure className="relative shadow-sm aspect-[4/5]">
                  <img src={image} alt="" className="object-cover" />
                  <div className="absolute bottom-4 w-full h-max px-8 flex justify-between items-center text-slate-700 sm:bottom-8">
                    <div className="flex gap-1 items-center">
                      <FaStar className="text-orange-500" />
                      <span>{rating}</span>
                    </div>
                    <div className="font-semibold">${price}</div>
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex items-center text-slate-700">
                    <h3 className="text-xl md:text-2xl font-display font-bold">{itemName}</h3>
                    <div className="badge badge-secondary ml-1">{categoryName}</div>
                  </div>
                  <p className="text-sm md:text-base text-slate-500">{description}</p>
                  <div className="flex justify-between items-center text-sm md:text-base text-slate-700">
                    <div>
                      {processingTime} <span className="text-slate-500">to process</span>
                    </div>
                    <div>
                      {stockStatus} <span className="text-slate-500">in stock</span>
                    </div>
                  </div>
                  <table className="table table-xs md:table-sm border">
                    <thead>
                      <tr>
                        <th>Customization</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-500 text-xs md:text-sm">
                      {customizations.map(({ cost, name }, i) => (
                        <tr key={i}>
                          <td>{name}</td>
                          <td>{cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4 card-actions justify-end gap-4">
                    <Link to={`/edit-equipment/${_id}`} className="btn btn-primary">
                      <FaEdit />
                    </Link>
                    <button className="btn btn-error">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
