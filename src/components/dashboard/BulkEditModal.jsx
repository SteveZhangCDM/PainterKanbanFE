import { useState } from "react";
import PropTypes from "prop-types";
import { useBulkUpdatePaintsMutation } from "../../services/paintsSlice";

const BulkEditModal = ({ closeModal }) => {
  const [bulkUpdatePaints] = useBulkUpdatePaintsMutation();
  const [inventories, setInventories] = useState({
    blue: "",
    grey: "",
    black: "",
    white: "",
    purple: "",
  });

  const handleInputChange = (color, value) => {
    setInventories((prevInventories) => ({
      ...prevInventories,
      [color]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = Object.entries(inventories).map(([color, quantity]) => ({
      color,
      quantity: parseInt(quantity, 10) || 0,
    }));

    try {
      await bulkUpdatePaints(updates).unwrap();
      closeModal();
    } catch (error) {
      console.error("Failed to bulk update:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="font-semibold text-lg mb-4">Bulk Edit Inventory</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(inventories).map((color) => (
            <div key={color} className="mb-4">
              <label
                htmlFor={`inventory-${color}`}
                className="block mb-2 capitalize"
              >
                {color} inventory:
              </label>
              <input
                id={`inventory-${color}`}
                type="number"
                value={inventories[color]}
                onChange={(e) => handleInputChange(color, e.target.value)}
                className="block w-full p-2 border rounded"
              />
            </div>
          ))}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BulkEditModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default BulkEditModal;
