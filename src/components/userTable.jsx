import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
export const UserTable = () => {
  const { register, handleSubmit, reset } = useForm();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [editUser, setEditUser] = useState({});

  useEffect(() => {
    setLoading(true);
    // axios
    //   .get("http://localhost:3000/users")
    //   .then((responce) => {
    //     setUsersData(responce.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });

    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users");
        console.log(res);
        setUsersData(res.data);
        setLoading(false);
      } catch {
        alert("something went wrong");
      }
    };
    getData();
  }, [refetch]);

  const onDelete = async (id) => {
    // axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
    //   if (res) {
    //     setRefetch(!refetch);
    //   }
    // });

    const res = await axios.delete(`http://localhost:3000/users/${id}`);
    if (res) {
      setRefetch(!refetch);
    }
  };

  const onEdit = (user) => {
    setEditUser(user);
    reset(user);
  };

  const submit = async (data) => {
    console.log(data);
    // axios
    //   .put(`http://localhost:3000/users/${editUser.id}`, data)
    //   .then((res) => {
    //     if (res) {
    //       setEditUser({});
    //       setRefetch(!refetch);
    //     }
    //   })
    //   .catch((error)=>alert(error));

    try {
      const responce = await axios.put(
        `http://localhost:3000/users/${editUser.id}`,
        data
      );
      if (responce) {
        setEditUser({});
        setRefetch(!refetch);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      {loading === true ? (
        <h1>Loading.....</h1>
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
              if (user.id === editUser.id) {
                return (
                  // edit row
                  <tr>
                    <td>{index + 1}</td>
                    <td colSpan="5">
                      <form onSubmit={handleSubmit(submit)}>
                        <td>
                          <input type="text" {...register("name")} />
                        </td>
                        <td>
                          <input type="age" {...register("age")} />
                        </td>
                        <td>
                          <input type="text" {...register("address")} />
                        </td>

                        <td>
                          <Button onClick={() => setEditUser({})}>
                            cancel
                          </Button>
                          {"  "}
                          <Button type="submit">save</Button>
                        </td>
                      </form>
                    </td>
                  </tr>
                );
              } else {
                return (
                  // view row
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`user-view/${user.id}`}>{user.name}</Link>{" "}
                    </td>
                    <td>{user.age}</td>
                    <td>{user.address}</td>
                    <td>{user.gender}</td>
                    <td>
                      <Button onClick={() => onDelete(user.id)}>Delete</Button>{" "}
                      <Button
                        onClick={() => {
                          onEdit(user);
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};
