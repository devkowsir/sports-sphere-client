import { BackendUrl } from "../config";

export const addUser = async (user) => {
  const res = await fetch(`${BackendUrl}/api/auth`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const getEquipment = async (id) => {
  const res = await fetch(`${BackendUrl}/api/equipment/${id}`);
  return res.json();
};

export const getEquipments = async (opts = {}) => {
  const searchParams = new URLSearchParams(opts);
  console.log(opts);
  const res = await fetch(`${BackendUrl}/api/equipments?${searchParams.toString()}`);
  return res.json();
};

export const addEquipment = async (equipment) => {
  const res = await fetch(`${BackendUrl}/api/equipment`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(equipment),
  });
  return res.json();
};

export const editEquipment = async (id, equipment) => {
  const res = await fetch(`${BackendUrl}/api/equipment/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(equipment),
  });
  return res.json();
};

export const deleteEquipment = async (id) => {
  const res = await fetch(`${BackendUrl}/api/equipment/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
