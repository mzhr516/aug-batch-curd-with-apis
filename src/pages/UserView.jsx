import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const UserView = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((responce) => {
        setUserDetail(responce.data);
      })
      .catch();
  }, []);
  const click = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>Name: {userDetail.name}</h1>
      <h2>Age: {userDetail.age}</h2>
      <h3>address: {userDetail.address}</h3>
      <h4>gender: {userDetail.gender}</h4>

      <Button onClick={click}>back</Button>
    </div>
  );
};
