import React, { Component } from "react";
import { server } from "../../constants";
import { httpClient } from "../../utils/HttpClient";
import Swal from "sweetalert2";
import "./TableStyles.css"; // Import your CSS file

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoggedIn: false,
      data: [], // Assume this is populated with user data
      empNumber: "",
      password: "",
      pwType: "password",
      pwIcon: "fas fa-eye",
      searchQuery: "", // New state variable for search query
    };
  }

  componentDidMount = async () => {
    if (this.state.isLoggedIn) {
      try {
        const response = await httpClient.get(server.User_URL);
        console.log("API Response:", response.data); // Check response structure
        if (response.data && response.data.api_User) {
          this.setState({ data: response.data.api_User });
        } else {
          console.error("API response does not contain api_User field");
        }
      } catch (error) {
        console.error("Error fetching data", error);
        this.setState({ error: "Error fetching data" });
      }
    }
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false, data: [] });
  };

  handleDelete = async (empNumber) => {
    const { empNumber: loggedInUserId } = this.state; // assuming this.state.empNumber holds the logged-in user's ID

    // Show confirmation dialog
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // Check if the user confirmed
    if (confirmResult.isConfirmed) {
      try {
        console.log(
          `Deleting empNumber: ${empNumber} by user: ${loggedInUserId}`
        );

        // Pass the logged-in user ID along with the empNumber
        await httpClient.delete(`${server.User_delete_URL}/${empNumber}`, {
          data: { userId: loggedInUserId },
        });
        console.log(`${server.User_delete_URL}/${empNumber}`);

        // Update the state to remove the deleted item
        this.setState((prevState) => ({
          data: prevState.data.filter((item) => item.empNumber !== empNumber),
        }));

        // Show success message
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting data", error);
        this.setState({ error: "Error deleting data" });

        // Show error message
        Swal.fire("Error!", "There was an issue deleting the user.", "error");
      }
    }
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  doLogin = async () => {
    try {
      const result = await httpClient.post(server.User_login_URL, {
        empNumber: this.state.empNumber,
        password: this.state.password,
      });
      console.log(result.data);

      if (result.data.login_result === "pass") {
        const { empNumber } = result.data.resultlogin;
        console.log(empNumber);
        this.setState({ isLoggedIn: true, empNumber: empNumber });

        // Fetch user data only after successful login
        this.fetchUserData();
      } else {
        Swal.fire({
          icon: "error",
          title: "ID/Password is incorrect!!",
        });
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  fetchUserData = async () => {
    try {
      const response = await httpClient.get(server.User_URL);
      console.log("API Response:", response.data); // Check response structure
      if (response.data && response.data.api_User) {
        this.setState({ data: response.data.api_User });
      } else {
        console.error("API response does not contain api_User field");
      }
    } catch (error) {
      console.error("Error fetching data", error);
      this.setState({ error: "Error fetching data" });
    }
  };

  renderTable = () => {
    // Use the filtered data based on the search query
    const filteredData = this.getFilteredData();

    console.log("Rendering Table Data:", filteredData); // Check filtered data before rendering

    if (!filteredData.length) {
      return <p>No data available</p>;
    }

    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Employee No.</th>
              <th>Level</th>
              <th>Email</th>
              <th>Position</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.empNumber}>
                <td>{item.username}</td>
                <td>{item.empNumber}</td>
                <td>{item.levelUser}</td>
                <td>{item.email}</td>
                <td>{item.position}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(item.empNumber)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  getFilteredData() {
    const { data, searchQuery } = this.state;
    if (!searchQuery) {
      return data;
    }
    return data.filter((item) =>
      item.empNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  render() {
    const { error, isLoggedIn } = this.state;
    const userCount = this.getFilteredData().length; // Count filtered users

    return (
        <div className="content-wrapper border border-blue-100">
        {!this.state.isLoggedIn && (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  MinebeaMitsumi
                </h1>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.doLogin();
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="empNumber"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Employee No.
                  </label>
                  <input
                    id="empNumber"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Employee No."
                    onChange={(e) =>
                      this.setState({ empNumber: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={this.state.pwType}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="Password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                    onClick={() => {
                      if (this.state.pwType === "password") {
                        this.setState({
                          pwType: "text",
                          pwIcon: "fas fa-eye-slash",
                        });
                      } else {
                        this.setState({
                          pwType: "password",
                          pwIcon: "fas fa-eye",
                        });
                      }
                    }}
                  >
                    <i className={this.state.pwIcon}></i>
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-gray-700 text-sm"
                    >
                      Remember Me
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        )}

        {this.state.isLoggedIn && (
       <div>
       <button
         onClick={this.handleLogout}
         className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-colors"
       >
         Logout
       </button>
       <div className="flex items-center mt-4 space-x-4">
         <button
           className="bg-blue-500 text-white py-2 px-4 rounded-md"
           disabled
         >
           Total Users: {userCount}
         </button>
         <div className="flex-grow">
           <input
             type="text"
             placeholder="Search by Employee No."
             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
             value={this.state.searchQuery}
             onChange={this.handleSearchChange}
           />
         </div>
       </div>
       <div className="overflow-x-auto mt-4">
         {error && <p className="error-message text-red-500">{error}</p>}
         {this.renderTable()}
       </div>
     </div>
     
        )}
      </div>
    );
  }
}
export default MyComponent;
