import { BackendUrl } from "../config";

export const saveUserToDB = async (user) => {
  const res = await fetch(`${BackendUrl}/api/auth`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  });
  if (res.status !== 201) throw new Error("Failed to save user to database.");
};
