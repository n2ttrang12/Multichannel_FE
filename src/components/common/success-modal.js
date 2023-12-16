import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button, Modal } from "react-bootstrap";
export const SuccessModal = ({ handleCloseModal, message }) => {
  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <div
          style={{
            borderRadius: "999px",
            padding: "12px",
            background: "rgb(102 255 0 / 20%)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            fill="#19d001"
            viewBox="0 0 512 512"
          >
            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
          </svg>
        </div>
        <div
          style={{
            paddingLeft: "8px",
          }}
        >
          <Modal.Title>Thành công</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="gray" onClick={handleCloseModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
