import { Button, Modal } from "react-bootstrap";

export const ErrorModal = ({ handleCloseModal, errorMessage }) => {
  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <svg
          class="icon-32"
          width="32"
          viewBox="0 0 24 24"
          fill="red"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            opacity="0.4"
            d="M12.086 22C11.9622 22 11.8393 21.9716 11.7276 21.9137L8.12627 20.0496C7.10336 19.5201 6.30397 18.9259 5.68076 18.2336C4.31353 16.7195 3.55441 14.776 3.54132 12.7599L3.50004 6.12426C3.495 5.35842 3.98833 4.67103 4.72732 4.41215L11.34 2.10679C11.7336 1.96656 12.1716 1.9646 12.5703 2.09992L19.2081 4.32684C19.9511 4.57493 20.4535 5.25742 20.4575 6.02228L20.4998 12.6628C20.5129 14.676 19.7799 16.6274 18.4349 18.1581C17.8167 18.8602 17.0253 19.4632 16.0135 20.0025L12.4444 21.9088C12.3337 21.9686 12.2098 21.999 12.086 22Z"
            fill="currentColor"
          ></path>{" "}
          <path
            d="M13.0679 11.7249L14.426 10.4021C14.721 10.1148 14.721 9.65001 14.426 9.3627C14.131 9.07539 13.6528 9.07539 13.3578 9.3627L11.9996 10.6845L10.6425 9.3627C10.3475 9.07539 9.86926 9.07539 9.57427 9.3627C9.27928 9.65001 9.27928 10.1148 9.57427 10.4021L10.9324 11.7249L9.57427 13.0478C9.27928 13.3351 9.27928 13.7999 9.57427 14.0872C9.72227 14.2313 9.91557 14.3029 10.1089 14.3029C10.3012 14.3029 10.4945 14.2313 10.6425 14.0872L11.9996 12.7653L13.3578 14.0872C13.5058 14.2313 13.6981 14.3029 13.8914 14.3029C14.0847 14.3029 14.278 14.2313 14.426 14.0872C14.721 13.7999 14.721 13.3351 14.426 13.0478L13.0679 11.7249Z"
            fill="currentColor"
          ></path>{" "}
        </svg>
        <p>{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseModal}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
