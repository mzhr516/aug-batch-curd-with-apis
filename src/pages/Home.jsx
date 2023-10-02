import React from "react";
import { UserTable } from "../components/userTable";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Home = (props) => {
  const navigate = useNavigate();
  const click = () => {
    navigate("create-user");
  };
  return (
    <div>
      <div style={{ marginTop: "8%", marginLeft: "90%" }}>
        <Button onClick={click}>Create user</Button>
      </div>
      <div style={{ marginTop: "5%" }}>
        <UserTable />
      </div>
    </div>
  );
};
