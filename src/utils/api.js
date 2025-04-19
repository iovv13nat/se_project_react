import { request } from "../components/App/App";

const baseUrl = "http://localhost:3001";

function getItems() {
  return request(`${baseUrl}/items`);
}

function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, { method: "DELETE" });
}

export { getItems, addItem, deleteItem };
