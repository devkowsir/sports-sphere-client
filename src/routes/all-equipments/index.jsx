import React, { useEffect, useMemo, useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Loading } from "../../components/loading";
import { SectionHeading } from "../../components/section-heading";
import { BackendUrl } from "../../config";

export const AllEquipmentsRoute = () => {
  const [sortMode, setSortMode] = useState(null);
  const [products, setProducts] = useState(null);

  const sortedProducts = useMemo(() => {
    if (!products) return null;
    if (!sortMode) return products;

    return [...products].sort((a, b) => (a.price == b.price ? 0 : a.price > b.price ? sortMode : -sortMode));
  }, [sortMode, products]);

  useEffect(() => {
    fetch(`${BackendUrl}/api/equipments`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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
        <div className="my-8 overflow-x-auto">
          {sortedProducts ? (
            <table className="table border">
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
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </section>
  );
};
