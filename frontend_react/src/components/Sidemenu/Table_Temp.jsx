import React, { Component, useEffect, useState } from "react";
import { server } from "../../constants";
import { httpClient } from "../../utils/HttpClient";
import Swal from "sweetalert2";
import { loadIcons } from "../Sidemenu/loadIcons";
import "./TableStyles.css"; // Import your CSS file
const UpdateTable = ({ lable_process }) => {
  const [data, setData] = useState([]);

  // Function to fetch existing data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get(server.Table_Temp_result_URL);
        setData(response.data.data); // Assuming response.data.data is an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error fetching data',
          text: 'Unable to retrieve data from the server.',
        });
      }
    };

    fetchData();
  }, [lable_process]);

  // Function for updating data
// Function for updating data
const handleUpdate = async (updatedRow) => {
  try {
    // Send the PUT request to the server
    const response = await httpClient.put(`${server.Table_Temp_URL}/${updatedRow.id}`, updatedRow);

    // Check if the update was successful (based on your server's response structure)
    if (response.data.api_result === "ok") {
      console.log("Update successful:", response.data);

      // Perform any necessary UI updates or actions based on the updated data
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: 'The data has been successfully updated!',
      });

      // Optionally, update the local state or UI with the new data
      // e.g., updating a table row or refreshing the view
      // updateTableRow(response.data.updatedRecord); // Uncomment and implement as needed

    } else {
      // Handle the case where the update failed (e.g., record not found)
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: response.data.message || 'Unknown error occurred during update.',
      });
    }

  } catch (error) {
    // Handle errors from the PUT request
    console.error("Error updating data:", error);
    Swal.fire({
      icon: 'error',
      title: 'An error occurred while updating',
      text: error.message,
    });
  }
};



  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Update Table</h2>
      <table className="table table-head-fixed text-nowrap table-hover" >
        <thead>
          <tr>
            <th className="py-2 px-4 border border-black">Label Name</th>
            <th className="py-2 px-4 border border-black">Use Label</th>
            <th className="py-2 px-4 border border-black">Database Number</th>
            <th className="py-2 px-4 border border-black">Column Line</th>
            <th className="py-2 px-4 border border-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="py-2 px-4 border border-black">
                <input
                  type="text"
                  value={row.lable_process}
                  onChange={(e) => {
                    const newData = data.map(item =>
                      item.id === row.id ? { ...item, lable_process: e.target.value } : item
                    );
                    setData(newData);
                  }}
                  style={{ backgroundColor: '#D1D5DB', color: 'black' }} // Gray background, black text
                />
              </td>
              <td className="py-2 px-4 border border-black">
                <input
                  type="text"
                  value={row.use_lable}
                  onChange={(e) => {
                    const newData = data.map(item =>
                      item.id === row.id ? { ...item, use_lable: e.target.value } : item
                    );
                    setData(newData);
                  }}
                  style={{ backgroundColor: '#D1D5DB', color: 'black' }} // Gray background, black text
                />
              </td>
              <td className="py-2 px-4 border border-black">
                <input
                  type="text"
                  value={row.Database_Number}
                  onChange={(e) => {
                    const newData = data.map(item =>
                      item.id === row.id ? { ...item, Database_Number: e.target.value } : item
                    );
                    setData(newData);
                  }}
                  style={{ backgroundColor: '#D1D5DB', color: 'black' }} // Gray background, black text
                />
              </td>
              <td className="py-2 px-4 border border-black">
                <input
                  type="text"
                  value={row.column_line}
                  onChange={(e) => {
                    const newData = data.map(item =>
                      item.id === row.id ? { ...item, column_line: e.target.value } : item
                    );
                    setData(newData);
                  }}
                  style={{ backgroundColor: '#D1D5DB', color: 'black' }} // Gray background, black text
                />
              </td>
              <td className="py-2 px-4 border border-black">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleUpdate(row)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




class AddSideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // Initialize as an empty array
      isLoggedIn: false,
      empNumber: "",
      password: "",
      pwType: "password",
      pwIcon: "fas fa-eye",
    };
  }

  componentDidMount = async () => {
    try {
      if (this.state.isLoggedIn) {
        const response = await httpClient.get(server.User_URL);
        if (response.data && response.data.api_User) {
          this.setState({ data: response.data.api_User });
        } else {
          console.error("API response does not contain api_User field");
        }
      }

    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  doLogin = async () => {
    try {
      const result = await httpClient.post(server.User_login_URL, {
        empNumber: this.state.empNumber,
        password: this.state.password,
      });

      if (result.data.login_result === "pass") {
        this.setState({ isLoggedIn: true, empNumber: result.data.resultlogin.empNumber });
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
      if (response.data && response.data.api_User) {
        this.setState({ data: response.data.api_User });
      } else {
        console.error("API response does not contain api_User field");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  render() {
    return (
      <div className="content-wrapper border border-blue-100">
        {!this.state.isLoggedIn && (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
              <form onSubmit={(e) => { e.preventDefault(); this.doLogin(); }}>
                <div className="mb-4">
                  <label htmlFor="empNumber" className="block text-gray-700 text-sm font-medium mb-2">Employee No.</label>
                  <input
                    id="empNumber"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Employee No."
                    onChange={(e) => this.setState({ empNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                  <input
                    id="password"
                    type={this.state.pwType}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="Password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                    onClick={() => {
                      this.setState(prevState => ({
                        pwType: prevState.pwType === "password" ? "text" : "password",
                        pwIcon: prevState.pwType === "password" ? "fas fa-eye-slash" : "fas fa-eye"
                      }));
                    }}
                  >
                    <i className={this.state.pwIcon}></i>
                  </button>
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
        <div className="content-wrapper border border-blue-100">
        <div className="flex justify-center items-center min-h-screen">
        
            <UpdateTable lable_process={this.state.lable_process} />
          
        </div>
      </div>
      
        )}
      </div>
    );
  }
}

export default AddSideMenu;
