import React, { useEffect, useState } from "react";
import { FaImage, FaUser } from "react-icons/fa6";
import { toast } from "react-toastify";
import { SiteName } from "../../config";
import { useAuthContext } from "../../contexts/auth";
import { isValidName, isValidPhotoURL } from "../../utils/input-validator";

const ProfileRoute = () => {
  const { user, updateProfile, reloadUser } = useAuthContext();
  const [formState, setFormState] = useState({
    fields: { name: user.displayName, "photo-url": user.photoURL },
    isEditing: false,
    isSubmitted: false,
  });

  const handleChange = (e) =>
    setFormState((state) => ({ ...state, fields: { ...state.fields, [e.target.name]: e.target.value } }));

  const isDirty =
    formState.fields.name?.trim() != user.displayName || formState.fields["photo-url"]?.trim() != user.photoURL;

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState((state) => ({ ...state, isSubmitted: true }));

    try {
      const displayName = e.target.name.value.trim();
      const photoURL = e.target["photo-url"].value.trim();

      if (!isValidName(displayName)) return;
      if (photoURL.length && !(await isValidPhotoURL(photoURL))) return;

      await updateProfile({ displayName, photoURL });
      reloadUser();

      setFormState((state) => ({ ...state, isEditing: false }));

      toast("Your profile has been updated successfully.", {
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) toast(error.message, { type: "error" });
      console.error(error.message, error);
    } finally {
      setFormState((state) => ({ ...state, isSubmitted: false }));
    }
  };

  useEffect(() => {
    setFormState((state) => ({ ...state, fields: { name: user.displayName, "photo-url": user.photoURL } }));
  }, [user]);

  useEffect(() => {
    document.title = `${SiteName} | Profile`;
  }, []);

  return (
    <section className="pt-24">
      <div className="container h-full flex flex-col justify-center items-center">
        <h1 className="mb-4 text-3xl font-bold text-base-content/75">Your Profile</h1>
        <div className="max-w-full w-96 overflow-hidden bg-base-200 rounded-xl">
          <div
            className={`flex items-stretch ${formState.isEditing ? "-translate-x-full" : "translate-x-0"} transition`}
          >
            <div className={`shrink-0 w-full ${formState.isEditing ? "opacity-0" : "opacity-100"} transition`}>
              <div className="h-full p-4 flex flex-col gap-4 items-center rounded-xl">
                <div className="w-20 aspect-square flex justify-center items-center bg-base-300 rounded-xl overflow-hidden">
                  {user.photoURL ? <img src={user.photoURL} /> : <FaUser className="text-6xl text-base-content/75" />}
                </div>
                <div className="w-full text-center">
                  <p className="text-xl font-semibold">{user.displayName}</p>
                  <p>{user.email}</p>
                </div>
                <button
                  onClick={() => setFormState((state) => ({ ...state, isEditing: true }))}
                  className="btn btn-neutral mt-auto"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className={`shrink-0 w-full ${formState.isEditing ? "opacity-100" : "opacity-0"} transition`}>
              <form onSubmit={handleSubmit} className="p-4 h-full flex flex-col gap-4 text-base-content/75">
                <label className="input input-bordered flex items-center gap-2">
                  <FaUser />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formState.fields.name ?? ""}
                    onChange={handleChange}
                    className="w-full"
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <FaImage />
                  <input
                    type="text"
                    name="photo-url"
                    placeholder="Photo URL"
                    value={formState.fields["photo-url"] ?? ""}
                    onChange={handleChange}
                    className="w-full"
                  />
                </label>
                <div className="mt-auto flex justify-end gap-4">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setFormState((state) => ({ ...state, isEditing: false }))}
                  >
                    Cancel
                  </button>
                  <button
                    className={`btn btn-primary ${formState.isSubmitted && "loading"}`}
                    disabled={!isDirty || formState.isSubmitted}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileRoute;
