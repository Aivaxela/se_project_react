function DeleteConfirmModal(isOpen) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <p>Are you sure you want to delete this item?</p>
      <p>This action is irreversible.</p>
      <p>Yes, delete item</p>
      <p>Cancel</p>
    </div>
  );
}

export default DeleteConfirmModal;
