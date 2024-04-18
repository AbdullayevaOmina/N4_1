import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function EditUserModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formInputInfo = [
    { label: "First Name:" },
    { label: "Last Name:" },
    { label: "Age:", type: "number" },
    { label: "Email:", type: "email", placeholder: "name@example.com" },
    { label: "Password:", type: "password", placeholder: "a@34sD9/sdfk%@Jk" },
    { label: "Img URL:" },
  ];

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title>Edit User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            {formInputInfo.map((item) => {
              return (
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>{item.label}</Form.Label>
                  <Form.Control
                    placeholder={item?.placeholder}
                    type={item?.type}
                    autoFocus
                  />
                </Form.Group>
              );
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUserModal;
