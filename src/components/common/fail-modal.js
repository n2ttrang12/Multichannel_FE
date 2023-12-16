import { Button, Modal } from "react-bootstrap";

export const ErrorModal = ({ handleCloseModal, errorMessage }) => {
  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <div
          style={{
            borderRadius: "999px",
            padding: "12px",
            background: "#ff000036",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            width="24px"
            viewBox="0 0 512 512"
          >
            <path
              fill="#e30202"
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
            />
          </svg>
        </div>
        <div
          style={{
            paddingLeft: "8px",
          }}
        >
          <Modal.Title>Thất bại</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p>{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="gray" onClick={handleCloseModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
