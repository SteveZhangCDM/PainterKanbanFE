import { useState } from "react";
import PropTypes from "prop-types";
import {
  useUpdatePaintStatusMutation,
  useUpdatePaintInventoryMutation,
} from "../../services/paintsSlice";

const StickerModal = ({ paint, closeModal }) => {
  const [updatePaintStatus] = useUpdatePaintStatusMutation();
  const [updatePaintInventory] = useUpdatePaintInventoryMutation();

  const [status, setStatus] = useState(paint.status);
  const [quantity, setQuantity] = useState(paint.quantity);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePaintStatus({ color: paint.color, status }).unwrap();
      await updatePaintInventory({ color: paint.color, quantity }).unwrap();

      closeModal();
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg">Edit {paint.color}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          >
            <option value="available">Available</option>
            <option value="running low">Running Low</option>
            <option value="out of stock">Out of Stock</option>
          </select>

          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="block w-full p-2 border rounded mb-4"
          />

          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button
            onClick={closeModal}
            type="button"
            className="py-2 px-4 bg-gray-500 text-white rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

StickerModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  paint: PropTypes.object.isRequired,
};

export default StickerModal;
