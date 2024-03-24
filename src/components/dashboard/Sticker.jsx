import { useState } from "react";
import PropTypes from "prop-types";
import StickerModal from "./StickerModal";
import { bgColorClasses } from "../../static/colors";

const Sticker = ({ paint }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div
        onClick={openModal}
        className={`cursor-pointer p-2 sm:p-4 rounded shadow ${
          bgColorClasses[paint.status] || "bg-gray-200"
        }`}
      >
        <p className="text-xs sm:text-sm font-medium">{`Quantity: ${paint.quantity}`}</p>
      </div>
      {isModalOpen && <StickerModal paint={paint} closeModal={closeModal} />}
    </>
  );
};

Sticker.propTypes = {
  paint: PropTypes.object.isRequired,
};

export default Sticker;
