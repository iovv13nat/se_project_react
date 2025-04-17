import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirmation }) {
  console.log("DeleteConfirmationModal isOpen:", isOpen);
  if (!isOpen) return null;
  return (
    <div className={`modal modal_type_confirm ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirm">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <p className="modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__actions">
          <button
            className="modal__button modal__button_confirm"
            onClick={onConfirmation}
          >
            Yes, delete item.
          </button>
          <button
            className="modal__button modal__button_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
