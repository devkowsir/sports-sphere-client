import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { SectionHeading } from "../../components/section-heading";

export const EditEquipmentRoute = () => {
  const [formState, setFormState] = useState({
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
  });

  const handleChange = (e) => {
    setFormState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleCustomizationChange = (e) => {
    console.log(e);
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
    console.log(e.target);
    if (index >= formState.customizations.length) return;
    setFormState((state) => ({
      ...state,
      customizations: state.customizations.filter((_, i) => index !== i),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const itemName = e.target["itemName"].value;
    const categoryName = e.target["categoryName"].value;
    const image = e.target["image"].value;
    const price = parseInt(e.target["price"].value);
    const rating = parseInt(e.target["rating"].value);
    const processingTime = e.target["processingTime"].value;
    const stockStatus = parseInt(e.target["stockStatus"].value);
    const description = e.target["description"].value;
    const customizations = [...e.target.querySelectorAll("[data-name=customization]")]
      .map((customizationContainer) => {
        const name = customizationContainer.querySelector("input[name=name]").value.trim();
        const cost = parseInt(customizationContainer.querySelector("input[name=cost]").value);
        if (name.length == 0) return null;
        return { name, cost };
      })
      .filter((c) => c !== null);
    const userName = e.target["userName"].value;
    const userEmail = e.target["userEmail"].value;

    console.log({
      itemName,
      categoryName,
      image,
      price,
      rating,
      processingTime,
      stockStatus,
      customizations,
      description,
      userName,
      userEmail,
    });
  };

  return (
    <section className="my-12">
      <div className="container md:max-w-2xl">
        <SectionHeading heading={"Edit Equipment"} subHeading={"Edit this equipment."} />
        <form className="mt-4 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <label className="form-control">
            <span className="label text-sm text-slate-500 font-medium">Item Name</span>
            <input
              type="text"
              name="itemName"
              className="input input-sm text-slate-700"
              onChange={handleChange}
              value={formState.itemName}
              required
            />
          </label>
          <label className="form-control">
            <span className="label text-sm text-slate-500 font-medium">Category Name</span>
            <input
              type="text"
              name="categoryName"
              className="input input-sm text-slate-700"
              onChange={handleChange}
              value={formState.categoryName}
              required
            />
          </label>
          <label className="col-span-2 form-control">
            <span className="label text-sm text-slate-500 font-medium">Image</span>
            <input
              type="text"
              name="image"
              className="input input-sm text-slate-700"
              onChange={handleChange}
              value={formState.image}
              required
            />
          </label>
          <label className="form-control">
            <span className="label text-sm text-slate-500 font-medium">Price</span>
            <input
              type="number"
              name="price"
              min={0}
              className="input input-sm text-slate-700"
              onChange={handleChange}
              value={formState.price}
              required
            />
          </label>
          <label className="form-control">
            <span className="label text-sm text-slate-500 font-medium">Rating</span>
            <input
              type="number"
              name="rating"
              min={0}
              max={5}
              className="input input-sm text-slate-700"
              onChange={handleChange}
              value={formState.rating}
              required
            />
          </label>
          <label className="form-control">
            <span className="label text-sm text-slate-500 font-medium">Processing Time</span>
            <input
              type="text"
              name="processingTime"
              className="input input-sm text-slate-700"
              onChange={handleChange}
              value={formState.processingTime}
              required
            />
          </label>
          <label className="form-control">
            <span className="label text-sm text-slate-500 font-medium">Stock Status</span>
            <input
              type="number"
              name="stockStatus"
              min={0}
              className="input input-sm text-slate-700"
              onChange={handleChange}
              value={formState.stockStatus}
              required
            />
          </label>
          <div className="col-span-2" style={{ marginTop: "16px" }}>
            <p className={`text-sm text-slate-500 font-medium ${formState.customizations.length ? "" : "mb-2"}`}>
              Customizations
            </p>
            {formState.customizations.length ? (
              <div className="flex gap-4">
                <span className="label grow text-slate-500 text-sm">Name</span>
                <span className="label w-24 sm:w-1/6 text-slate-500 text-sm">Cost</span>
                <div className="w-10 h-8"></div>
              </div>
            ) : null}
            {formState.customizations.map(({ name, cost }, i) => (
              <div className="mb-2 flex gap-4" key={i} data-name="customization">
                <input
                  type="text"
                  name="name"
                  data-index={i}
                  className="input input-sm grow"
                  value={name}
                  onChange={handleCustomizationChange}
                />
                <input
                  type="number"
                  name="cost"
                  min={0}
                  data-index={i}
                  className="input input-sm w-24 sm:w-1/6"
                  value={cost}
                  onChange={handleCustomizationChange}
                />
                <button
                  type="button"
                  className="btn btn-sm text-red-500"
                  data-index={i}
                  onClick={handleCustomizationRemove}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-sm w-max text-primary" onClick={handleCustomizationAdd}>
              <FaPlus />
            </button>
          </div>
          <label className="col-span-2 form-control">
            <span className="label text-sm text-slate-500 font-medium">Description</span>
            <textarea
              name="description"
              className="textarea text-slate-700"
              rows={3}
              onChange={handleChange}
              value={formState.description}
              required
            />
          </label>
          <label className="form-control">
            <span className="label text-sm text-slate-500 font-medium">User Name</span>
            <input
              type="text"
              name="userName"
              className="input input-sm text-slate-700 read-only:bg-base-200 read-only:cursor-not-allowed"
              defaultValue={formState.userName}
              readOnly
            />
          </label>
          <label className="form-control">
            <span className="label text-sm text-slate-500 font-medium">User Email</span>
            <input
              type="email"
              name="userEmail"
              className="input input-sm text-slate-700 read-only:bg-base-200 read-only:cursor-not-allowed"
              defaultValue={formState.userEmail}
              readOnly
            />
          </label>
          <button className="btn btn-neutral">Update Equipment</button>
        </form>
      </div>
    </section>
  );
};
