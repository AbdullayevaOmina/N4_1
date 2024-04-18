import CreateUserModal from "./Components/CreateUserModal";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
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
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </main>
    </>
  );
}

export default App;
