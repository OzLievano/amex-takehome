import React, { useEffect } from "react";
import "./modal.css";
interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
  // Handle ESC key press
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  // Set up event listeners for ESC key press
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle click outside to close the modal
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
      className="modal-backdrop"
    >
      <div role="document" className="modal-box">
        <h2 id="modal-title">{title}</h2>
        <div>{children}</div>
        <button aria-label="Close" onClick={onClose} className="modal-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
