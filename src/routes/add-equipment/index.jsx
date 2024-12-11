import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SiteName } from "../../config";
import { useAuthContext } from "../../contexts/auth";
import { addEquipment } from "../../lib/db";

const defaultState = {
  itemName: "",
  categoryName: "",
  image: "",
  price: 0,
  rating: 0,
  customizations: [{ name: "", cost: 0 }],
  processingTime: "",
  stockStatus: 0,
  description: "",
};

export const AddEquipmentRoute = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [formState, setFormState] = useState({ ...defaultState, userName: user.displayName, userEmail: user.email });

  const handleChange = (e) => {
    setFormState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleCustomizationChange = (e) => {
    const index = parseInt(e.target.dataset["index"]);
    if (index >= formState.customizations.length) return;
    setFormState((state) => ({
      ...state,
      customizations: state.customizations.map((c, i) => (index == i ? { ...c, [e.target.name]: e.target.value } : c)),
    }));
  };

  const handleCustomizationAdd = () => {
    setFormState((state) => ({
      ...state,
      customizations: [...state.customizations, { name: "", cost: 0 }],
    }));
  };

  const handleCustomizationRemove = (e) => {
    const index = parseInt(e.target.dataset["index"]);
    if (index >= formState.customizations.length) return;
    setFormState((state) => ({
      ...state,
      customizations: state.customizations.filter((_, i) => index !== i),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEquipment = {
      ...formState,
      customizations: [...e.target.querySelectorAll("[data-name=customization]")]
        .map((customizationContainer) => {
          const name = customizationContainer.querySelector("input[name=name]").value.trim();
          const cost = parseInt(customizationContainer.querySelector("input[name=cost]").value);
          if (name.length == 0) return null;
          return { name, cost };
        })
        .filter((c) => c !== null),
    };

    try {
      await addEquipment(newEquipment);
      setFormState({ ...defaultState, userName: user.displayName, userEmail: user.email });
      navigate("/my-equipments");
      toast("Equipment saved to db", { type: "success" });
    } catch (e) {
      toast("Error saving equipment", { type: "error" });
    }
  };

  useEffect(() => {
    document.title = `${SiteName} | Add Equipment`;
  }, []);

  return (
    <Fade triggerOnce>
      <section className="my-12">
        <div className="container md:max-w-2xl">
          <SectionHeading heading={"Add Equipment"} subHeading={"List a new equipment for sale."} />
          <form className="mt-4 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <label className="form-control">
              <span className="label text-sm text-base-content/50 font-medium">Item Name</span>
              <input
                type="text"
                name="itemName"
                className="input input-sm bg-base-200 text-base-content/70"
                onChange={handleChange}
                value={formState.itemName}
                required
              />
            </label>
            <label className="form-control">
              <span className="label text-sm text-base-content/50 font-medium">Category Name</span>
              <input
                type="text"
                name="categoryName"
                className="input input-sm bg-base-200 text-base-content/70"
                onChange={handleChange}
                value={formState.categoryName}
                required
              />
            </label>
            <label className="col-span-2 form-control">
              <span className="label text-sm text-base-content/50 font-medium">Image</span>
              <input
                type="text"
                name="image"
                className="input input-sm bg-base-200 text-base-content/70"
                onChange={handleChange}
                value={formState.image}
                required
              />
            </label>
            <label className="form-control">
              <span className="label text-sm text-base-content/50 font-medium">Price</span>
              <input
                type="number"
                name="price"
                min={0}
                step={0.01}
                className="input input-sm bg-base-200 text-base-content/70"
                onChange={handleChange}
                value={formState.price}
                required
              />
            </label>
            <label className="form-control">
              <span className="label text-sm text-base-content/50 font-medium">Rating</span>
              <input
                type="number"
                name="rating"
                min={0}
                step={0.1}
                max={5}
                className="input input-sm bg-base-200 text-base-content/70"
                onChange={handleChange}
                value={formState.rating}
                required
              />
            </label>
            <label className="form-control">
              <span className="label text-sm text-base-content/50 font-medium">Processing Time</span>
              <input
                type="text"
                name="processingTime"
                className="input input-sm bg-base-200 text-base-content/70"
                onChange={handleChange}
                value={formState.processingTime}
                required
              />
            </label>
            <label className="form-control">
              <span className="label text-sm text-base-content/50 font-medium">Stock Status</span>
              <input
                type="number"
                name="stockStatus"
                min={0}
                step={1}
                className="input input-sm bg-base-200 text-base-content/70"
                onChange={handleChange}
                value={formState.stockStatus}
                required
              />
            </label>
            <div className="col-span-2" style={{ marginTop: "16px" }}>
              <p
                className={`text-sm text-base-content/50 font-medium ${formState.customizations.length ? "" : "mb-2"}`}
              >
                Customizations
              </p>
              {formState.customizations.length ? (
                <div className="flex gap-4">
                  <span className="label grow text-base-content/50 text-sm">Name</span>
                  <span className="label w-24 sm:w-1/6 text-base-content/50 text-sm">Cost</span>
                  <div className="w-10 h-8"></div>
                </div>
              ) : null}
              {formState.customizations.map(({ name, cost }, i) => (
                <div className="mb-2 flex gap-4" key={i} data-name="customization">
                  <input
                    type="text"
                    name="name"
                    data-index={i}
                    className="input input-sm text-base-content/70 bg-base-200 grow"
                    value={name}
                    onChange={handleCustomizationChange}
                  />
                  <input
                    type="number"
                    name="cost"
                    min={0}
                    step={0.01}
                    data-index={i}
                    className="input input-sm text-base-content/70 bg-base-200 w-24 sm:w-1/6"
                    value={cost}
                    onChange={handleCustomizationChange}
                  />
                  <button
                    type="button"
                    className="btn btn-sm text-red-500"
                    data-index={i}
                    onClick={handleCustomizationRemove}
                    data-tooltip-id={`customization-delete-at-index-${i}`}
                    data-tooltip-content={"Delete this customization"}
                  >
                    <FaTrash />
                    <Tooltip id={`customization-delete-at-index-${i}`} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-sm w-max text-primary"
                onClick={handleCustomizationAdd}
                data-tooltip-id={"add-new-customization"}
                data-tooltip-content={"Add a new customization"}
              >
                <FaPlus />
                <Tooltip id={"add-new-customization"} />
              </button>
            </div>
            <label className="col-span-2 form-control">
              <span className="label text-sm text-base-content/50 font-medium">Description</span>
              <textarea
                name="description"
                className="textarea bg-base-200 text-base-content/70"
                rows={3}
                onChange={handleChange}
                value={formState.description}
                required
              />
            </label>
            <label className="form-control">
              <span className="label text-sm text-base-content/50 font-medium">User Name</span>
              <input
                type="text"
                name="userName"
                className="input input-sm text-base-content/50 bg-base-300 cursor-not-allowed"
                defaultValue={formState.userName}
                readOnly
              />
            </label>
            <label className="form-control">
              <span className="label text-sm text-base-content/50 font-medium">User Email</span>
              <input
                type="email"
                name="userEmail"
                className="input input-sm text-base-content/50 bg-base-300 cursor-not-allowed"
                defaultValue={formState.userEmail}
                readOnly
              />
            </label>
            <button className="btn btn-outline" type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button className="btn btn-neutral">Add Equipment</button>
          </form>
        </div>
      </section>
    </Fade>
  );
};
