import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

export const UserTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/users")
      .then((responce) => {
        setUsersData(responce.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, [refetch]);

  const onDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
      if (res) {
        setRefetch(!refetch);
      }
    });
  };
  return (
    <div>
      {loading === true ? (
        "Loading....."
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.address}</td>
                  <td>{user.gender}</td>
                  <td>
                    <Button onClick={() => onDelete(user.id)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};
