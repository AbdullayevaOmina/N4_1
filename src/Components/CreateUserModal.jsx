import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Modal, Container, Row, Col } from "react-bootstrap";

function CreateUserModal({ appendUser }) {
  axios.defaults.baseURL = "http://localhost:3000";

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    imgUrl: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const res = await axios.post("/users", formData);
      appendUser(res.data);
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        password: "",
        imgUrl: "",
      });
      console.log(formData.firstName, formData.lastName);
      handleClose();
    } catch (error) {
      console.error("Error creating user:", error);
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
              <Form.Label>Age:</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="bg-secondary-subtle"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                className="bg-secondary-subtle"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-secondary-subtle"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Img URL:</Form.Label>
              <Form.Control
                type="text"
                name="imgUrl"
                value={formData.imgUrl}
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
