import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Modal } from "react-bootstrap";
import { Loading } from "./loading";
export const LoadingModal = ({}) => {
  return (
    <div className="container">
      <Modal show={true} size="sm">
        {/* <Modal.Header><Modal.Title>Thông báo</Modal.Title></Modal.Header> */}
        <Modal.Body>
          <Loading></Loading>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button variant="danger" onClick={handleCloseModal}>
            Đóng
          </Button>
      </Modal.Footer> */}
      </Modal>
    </div>
  );
};
