import React, { useEffect, useState } from "react";
import { FaStar, FaUser } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { SectionHeading } from "../../components/section-heading";
import { getEquipment } from "../../lib/db";
import { SiteName } from "../../config";

export const EquipmentRoute = () => {
  const [equipment, setEquipment] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getEquipment(id).then((data) => setEquipment(data));
    document.title = `${SiteName} | Equipment Details`;
  }, []);

  return (
    <section className="my-12">
      <div className="container md:max-w-screen-md">
        <SectionHeading heading={"Equipment Details"} />
        {equipment ? (
          <div className="card card-bordered mx-auto w-96 rounded-2xl shadow-xl sm:w-full sm:card-side">
            <figure className="relative shadow-sm h-full sm:shrink-0 sm:w-1/2">
              <img src={equipment.image} alt="" />
              <div className="absolute bottom-4 w-full h-max px-8 flex justify-between items-center text-slate-700 sm:bottom-8">
                <div className="flex gap-1 items-center">
                  <FaStar className="text-orange-500" />
                  <span>{equipment.rating}</span>
                </div>
                <div className="font-semibold">${equipment.price}</div>
              </div>
            </figure>
            <div className="card-body">
              <div className="flex items-center text-slate-700">
                <h3 className="text-xl md:text-2xl font-display font-bold">{equipment.itemName}</h3>
                <div className="badge badge-secondary ml-1">{equipment.categoryName}</div>
              </div>
              <p className="text-sm md:text-base text-slate-500">{equipment.description}</p>
              <div className="flex justify-between items-center text-sm md:text-base text-slate-700">
                <div>
                  {equipment.processingTime} <span className="text-slate-500">to process</span>
                </div>
                <div>
                  {equipment.stockStatus} <span className="text-slate-500">in stock</span>
                </div>
              </div>
              {equipment.customizations?.length ? (
                <table className="mt-4 table table-xs md:table-sm border">
                  <thead>
                    <tr>
                      <th>Customization</th>
                      <th className="w-12">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-500 text-xs md:text-sm">
                    {(equipment.customizations ?? []).map(({ cost, name }, i) => (
                      <tr key={i}>
                        <td>{name}</td>
                        <td>${cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="mt-4 text-sm text-slate-500">No Customizations Offered.</div>
              )}
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <FaUser />
                <p className="ml-1">{equipment.userName}</p>
                <div>{equipment.userEmail}</div>
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
