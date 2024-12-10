import React, { useEffect, useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Loading } from "../../components/loading";
import { SectionHeading } from "../../components/section-heading";
import { SiteName } from "../../config";
import { getEquipments } from "../../lib/db";

export const AllEquipmentsRoute = () => {
  const [equipments, setEquipments] = useState(null);

  useEffect(() => {
    getEquipments().then((products) => setEquipments(products));
    document.title = `${SiteName} | All Equipments`;
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
          <div className="join border border-base-300">
            <button onClick={() => handleSort(1)} className="btn btn-square join-item">
              <FaSortAmountUp />
            </button>
            <button onClick={() => handleSort(-1)} className="btn btn-square join-item">
              <FaSortAmountDown />
            </button>
          </div>
        </div>
        <div className="my-8 overflow-x-auto">
          {equipments ? null : <Loading />}
          {equipments?.length == 0 ? (
            <div className="mt-8 text-center text-base-content/70">No equipments available!</div>
          ) : null}
          {equipments?.length ? (
            <table className="table border border-base-300">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-base-content/70">
                {equipments.map(({ _id, image, itemName, categoryName, price }) => (
                  <tr key={_id}>
                    <td className="w-20 aspect-[5/4] grow-0 shrink-0">
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </td>
                    <td>{itemName}</td>
                    <td>{categoryName}</td>
                    <td>${price}</td>
                    <th>
                      <Link to={`/equipment/${_id}`} className="btn btn-ghost">
                        View Details
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </section>
  );
};
