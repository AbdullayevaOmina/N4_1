import { FormCheck } from "react-bootstrap";
import CreateUserModal from "./Components/CreateUserModal";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  function deleteUser(id) {
    axios
      .delete(`/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }

  function incrementCount(index) {
    const updatedUsers = [...users];
    updatedUsers[index].count++;
    setUsers(updatedUsers);
  }

  function decrementCount(index) {
    const updatedUsers = [...users];
    updatedUsers[index].count--;
    setUsers(updatedUsers);
  }

  return (
    <>
      <main>
        <div className="container my-3 d-flex justify-content-between align-items-center">
          <h1>Users</h1>
          <CreateUserModal />
        </div>
        <table className="table table-hover table-striped table-dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Active</th>
              <th>Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phone}</td>
                <td>
                  <FormCheck checked={user.active} />
                </td>
                <td className="d-flex gap-3">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => decrementCount(index)}
                  >
                    -
                  </button>
                  <h6>{user.count}</h6>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => incrementCount(index)}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-dash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                      <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
