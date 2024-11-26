import { useState } from "react";
import Modal from "./Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <>
      <h1>Welcome to Amex Take Home</h1>
      <button onClick={handleOpenModal}>Open Modal</button>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} title="My Modal">
          <p>Modal Content</p>
        </Modal>
      )}
    </>
  );
}

export default App;
