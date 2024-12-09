import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Loading } from "../../components/loading";
import { Rating } from "../../components/rating";
import { SectionHeading } from "../../components/section-heading";
import { getEquipments } from "../../lib/db";

const CARD_WIDTH = 320;

export const Popular = () => {
  const [viewStartIndex, setViewStartIndex] = useState(0);
  const [equipments, setEquipments] = useState(null);

  useEffect(() => {
    getEquipments().then((data) => setEquipments(data.slice(0, 6)));
  }, []);

  return (
    <section className="mb-24">
      <div className="container">
        <div className="flex justify-between">
          <SectionHeading
            heading={"Most Popular Equipments"}
            subHeading={"Browse through our collection of must-haves"}
          />
          {equipments ? (
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
                disabled={viewStartIndex + 1 >= equipments.length}
              >
                <FaArrowRight />
              </button>
            </div>
          ) : (
            <div className="loading loading-lg"></div>
          )}
        </div>
        {equipments == null ? <Loading /> : null}
        {equipments?.length == 0 ? null : <div className="text-center text-slate-700">No Equipments Found!</div>}
        {equipments?.length > 0 ? (
          <div className="overflow-hidden">
            <ul
              className="mt-4 flex transition"
              style={{
                width: CARD_WIDTH * equipments.length - 20,
                transform: `translateX(-${CARD_WIDTH * viewStartIndex}px)`,
              }}
            >
              {equipments.map(({ _id, itemName, image, price, rating }) => (
                <li key={_id} className="shrink-0 w-80 pr-5">
                  <div className="card card-compact card-bordered bg-base-100">
                    <figure>
                      <img src={image} alt={itemName} />
                    </figure>
                    <div className="card-body text-center">
                      <h3 className="text-base font-display font-bold tracking-wide">{itemName}</h3>
                      <Rating className={"justify-center"} maxRating={5} achievedRating={rating} />
                      <span className="font-bold">${price}</span>
                      <Link to={`/equipment/${_id}`} className="btn btn-wide">
                        View Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
};
