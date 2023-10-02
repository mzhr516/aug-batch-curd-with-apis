import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export const CreateUser = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const onBackClick = () => {
    navigate(-1);
  };
  const submit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/users", data)
      .then((responce) => {
        if (responce) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div style={{ width: "50%", marginLeft: "20%", marginTop: "10%" }}>
      <Button onClick={onBackClick}>Back</Button>
      <h1>create users from hear</h1>

      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            {...register("name")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Password"
            {...register("age")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            {...register("address")}
          />
        </Form.Group>
        <Form.Select
          aria-label="Default select example"
          {...register("gender")}
        >
          <option value="">select gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </Form.Select>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
