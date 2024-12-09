import React, { useEffect, useState } from "react";
import { FaEdit, FaSortAmountDown, FaSortAmountUp, FaStar, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../../components/loading";
import { SectionHeading } from "../../components/section-heading";
import { useAuthContext } from "../../contexts/auth";
import { deleteEquipment, getEquipments } from "../../lib/db";

export const MyEquipmentsRoute = () => {
  const [equipments, setEquipments] = useState(null);
  const { user } = useAuthContext();

  const updateEquipments = () => {
    setEquipments(null);
    getEquipments({ email: user.email }).then((products) => setEquipments(products));
  };
  useEffect(updateEquipments, []);

  const handleDelete = async (id) => {
    try {
      document.getElementById("delete-modal").close();
      await deleteEquipment(id);
      updateEquipments();
      toast("Equipment deleted", { type: "success" });
    } catch (e) {
      console.error(e);
      toast("Error deleting equipment", { type: "error" });
    }
  };

  const handleSort = (sort) => {
    setEquipments(null);

    getEquipments({ sort, email: user.email }).then((products) => setEquipments(products));
  };

  return (
    <section className="my-24">
      <div className="container">
        <div className="flex justify-between items-center">
          <SectionHeading
            heading={"My Equipments List"}
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
        {equipments ? null : <Loading />}
        {equipments?.length == 0 ? (
          <div className="mt-8 text-center text-slate-700">You have not added any equipments!</div>
        ) : null}
        {equipments?.length > 0 ? (
          <div className="my-8 grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {equipments.map(
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
                <div key={_id} className="card card-bordered mx-auto w-full rounded-2xl shadow-xl">
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
                    {customizations.length > 0 ? (
                      <table className="table table-xs md:table-sm border">
                        <thead>
                          <tr>
                            <th>Customization</th>
                            <th className="w-12">Cost</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-500 text-xs md:text-sm">
                          {(customizations ?? []).map(({ cost, name }, i) => (
                            <tr key={i}>
                              <td>{name}</td>
                              <td>${cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-sm text-slate-500">No customization offered!</div>
                    )}
                    <div className="mt-4 card-actions justify-end gap-4">
                      <Link to={`/edit-equipment/${_id}`} className="btn btn-primary">
                        <FaEdit />
                      </Link>
                      <div>
                        <button
                          className="btn btn-error"
                          onClick={() => document.getElementById("delete-modal").showModal()}
                        >
                          <FaTrash />
                        </button>
                        <dialog id="delete-modal" className="modal">
                          <div className="modal-box text-center">
                            <h3 className="font-bold text-lg">Confirm delete equipment?</h3>
                            <div className="mt-8 flex justify-end gap-4">
                              <button
                                className="btn btn-outline"
                                onClick={() => document.getElementById("delete-modal").close()}
                              >
                                Cancel
                              </button>
                              <button className="btn btn-error" onClick={() => handleDelete(_id)}>
                                Delete
                              </button>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};
