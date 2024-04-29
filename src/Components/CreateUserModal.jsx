import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

function CreateUserModal({ appendUser }) {
  axios.defaults.baseURL = "http://localhost:3000";

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    active: false,
    count: 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === "active" ? value === "true" : value; // value boolean bo'lishi kerak
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const res = await axios.post("/users", formData);
      appendUser(res.data);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        active: false,
        count: 0,
      });
      handleClose();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      handleClose()
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title>New User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                autoFocus
                className="bg-secondary-subtle"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-secondary-subtle"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-secondary-subtle"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Active:</Form.Label>
              <Form.Select
                name="active"
                value={formData.active.toString()}
                onChange={handleInputChange}
                className="bg-secondary-subtle"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Count:</Form.Label>
              <Form.Control
                type="number"
                name="count"
                value={formData.count}
                onChange={handleInputChange}
                className="bg-secondary-subtle"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateUserModal;
