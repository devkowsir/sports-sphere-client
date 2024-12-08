import React, { useEffect, useState } from "react";
import { FaStar, FaUser } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { SectionHeading } from "../../components/section-heading";
import { BackendUrl } from "../../config";

export const ProductRoute = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${BackendUrl}/api/equipment/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <section className="my-12">
      <div className="container md:max-w-screen-md">
        <SectionHeading heading={"Product Details"} />
        {product ? (
          <div className="card card-bordered mx-auto w-96 rounded-2xl shadow-xl sm:w-full sm:card-side">
            <figure className="relative shadow-sm h-full sm:shrink-0 sm:w-1/2">
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
              {product.customizations?.length ? (
                <table className="table table-xs md:table-sm border">
                  <thead>
                    <tr>
                      <th>Customization</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-500 text-xs md:text-sm">
                    {(product.customizations ?? []).map(({ cost, name }, i) => (
                      <tr key={i}>
                        <td>{name}</td>
                        <td>{cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
              <div className="flex items-center justify-between text-sm md:text-base text-slate-500">
                <FaUser />
                <p className="ml-1">{product.userName}</p>
                <div>{product.userEmail}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading loading-lg" />
        )}
      </div>
    </section>
  );
};
