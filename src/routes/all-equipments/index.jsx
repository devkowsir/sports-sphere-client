import React, { useEffect, useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Loading } from "../../components/loading";
import { SectionHeading } from "../../components/section-heading";
import { getEquipments } from "../../lib/db";

export const AllEquipmentsRoute = () => {
  const [equipments, setEquipments] = useState(null);

  useEffect(() => {
    getEquipments().then((products) => setEquipments(products));
  }, []);

  const handleSort = (sort) => {
    setEquipments(null);

    getEquipments({ sort }).then((products) => setEquipments(products));
  };

  return (
    <section className="my-24">
      <div className="container">
        <div className="flex justify-between items-center">
          <SectionHeading
            heading={"Equipments List"}
            subHeading={"A breif table of all equipments from all vendors."}
          />
          <div className="join border">
            <button onClick={() => handleSort(1)} className="btn btn-square join-item">
              <FaSortAmountUp />
            </button>
            <button onClick={() => handleSort(-1)} className="btn btn-square join-item">
              <FaSortAmountDown />
            </button>
          </div>
        </div>
        <div className="my-8 overflow-x-auto">
          {equipments ? (
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
                {equipments.map(({ _id, image, itemName, categoryName, price }) => (
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
