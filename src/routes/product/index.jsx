import React from "react";
import { SectionHeading } from "../../components/section-heading";
import { Rating } from "../../components/rating";
import { FaStar, FaUser } from "react-icons/fa6";

const product = {
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
};

export const ProductRoute = () => {
  return (
    <section className="my-12">
      <div className="container md:max-w-screen-md">
        <SectionHeading heading={"Product Details"} />
        <div className="card card-bordered mx-auto w-96 rounded-2xl shadow-xl sm:w-full sm:card-side">
          <figure className="relative w-1/2 shadow-sm h-full">
            <img src={product.image} alt="" />
            <div className="absolute bottom-4 w-full h-max px-8 flex justify-between items-center text-slate-700 sm:bottom-8">
              <div className="flex gap-1 items-center">
                <FaStar className="text-orange-500" />
                <span>{product.rating}</span>
              </div>
              <div className="font-semibold">${product.price}</div>
            </div>
          </figure>
          <div className="card-body">
            <div className="flex items-center text-slate-700">
              <h3 className="text-xl md:text-2xl font-display font-bold">{product.itemName}</h3>
              <div className="badge badge-secondary ml-1">{product.categoryName}</div>
            </div>
            <p className="text-sm md:text-base text-slate-500">{product.description}</p>
            <div className="flex justify-between items-center text-sm md:text-base text-slate-700">
              <div>
                {product.processingTime} <span className="text-slate-500">to process</span>
              </div>
              <div>
                {product.stockStatus} <span className="text-slate-500">in stock</span>
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
                {product.customizations.map(({ cost, name }, i) => (
                  <tr key={i}>
                    <td>{name}</td>
                    <td>{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between text-sm md:text-base text-slate-500">
              <FaUser />
              <p className="ml-1">{product.userName}</p>
              <div>{product.userEmail}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
