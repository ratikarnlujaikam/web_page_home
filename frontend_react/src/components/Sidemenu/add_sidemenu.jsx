import React, { Component } from "react";
import { server } from "../../constants";
import { httpClient } from "../../utils/HttpClient";
import Swal from "sweetalert2";
import Select from "react-select";
import { loadIcons } from "../Sidemenu/loadIcons";
class add_sidemenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      Division: [],
      listdivition: [],
      Details: [],
      listdetails: [],
      path: "",
      name: "",
      updateby: "",
      isAdmin: false, // New state to check if 'Admin' is entered
      adminInput: "", // State to track input for admin check
      isDisable: false,
      iconOptions: loadIcons(),
      selectedIcon: null, // Track selected icon


      error: null,
      isLoggedIn: false,
      empNumber: "",
      password: "",
      pwType: "password",
      pwIcon: "fas fa-eye",
      searchQuery: "", // New state variable for search query
    };
  }

  componentDidMount = async () => {
    try {
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
      await this.getdropdown();
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false, data: [] });
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

  getdropdown = async () => {
    try {
      const response = await httpClient.get(server.DROPDOWN_DIVISION_URL);
      console.log("API Response:", response); // ตรวจสอบการตอบกลับจาก API

      const options = response.data.Division.map((d) => ({
        label: d.Division,
        value: d.Division, // เพิ่มค่า value ถ้าต้องการ
      }));
      console.log("options", options);

      this.setState({ listdivition: options });
      const options_details = response.data.Details.map((d) => ({
        label: d.Details,
        value: d.Details,
      }));
      this.setState({ listdetails: options_details });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  sentdata_to_insert = async () => {
    try {
      const dataToSend = {
        Division: this.state.Division ? this.state.Division.label : null,
        Details: this.state.Details ? this.state.Details.label : null,
        path: this.state.path,
        name: this.state.name,
        Icon: this.state.selectedIcon,
        updateby: this.state.updateby,
      };
      console.log(dataToSend);
  
      // Send data to the server
      let result = await httpClient.post(
        server.INSERT_SIDEMENU_URL,
        dataToSend
      );
      console.log(result);
  
      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Data has been inserted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
  
      // Optionally reset state or clear form, but stay on the same page
      this.setState({
        Division: null,
        Details: null,
        path: "",
        name: "",
        Icon: "",
      });
  
      console.log(result.data);
    } catch (error) {
      // Handle and display error
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "There was an error inserting the data.",
        icon: "error",
        confirmButtonText: "OK",
      });
  
      console.error("Error inserting data:", error);
    }
  };
  
  


  render() {
    const {
      selectedIcon,
      iconOptions,
    } = this.state;
    console.log(this.state.Division);
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
      <div className="content-wrapper border border-blue-100">
            <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">
              <ol className="breadcrumb-item">
                <a></a>
              </ol>
              <div className="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body">
                  <div className="form-control">
                    Add details sidemenu
                    <div className="space-y-4">
                      <div className="col-md-2">
                        <div className="form-group">
                          <label>Select Division</label>
                          <Select
                            value={this.state.Division}
                            onChange={(e) => {
                              this.setState({ Division: e });
                            }}
                            placeholder="Select Division"
                            options={this.state.listdivition}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group">
                          <label>Select Group</label>
                          <Select
                            value={this.state.Details}
                            onChange={(e) => {
                              this.setState({ Details: e });
                            }}
                            placeholder="Select Group"
                            options={this.state.listdetails}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <label>Input path</label>
                        <div className="form-group pt-1">
                          <input
                            type="text"
                            value={this.state.path}
                            onChange={(e) =>
                              this.setState({ path: e.target.value })
                            }
                            className="w-full p-2 rounded border border-gray-300"
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <label>Input name</label>
                        <div className="form-group pt-1">
                          <input
                            type="text"
                            value={this.state.name}
                            onChange={(e) =>
                              this.setState({ name: e.target.value })
                            }
                            className="w-full p-2 rounded border border-gray-300"
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group pt-1">
                          <label>Select Icon</label>
                          <Select
                            value={selectedIcon}
                            onChange={(e) =>
                              this.setState({ selectedIcon: e })
                            }
                            placeholder="Select Icon"
                            options={iconOptions}
                          />
          
                        </div>
                      </div>
                      <div className="col-md-2">
                        <label>Update by</label>
                        <div className="form-group pt-1">
                          <input
                            type="text"
                            value={this.state.updateby}
                            onChange={(e) =>
                              this.setState({ updateby: e.target.value })
                            }
                            className="w-full p-2 rounded border border-gray-300"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group pt-1">
                          <button
                            className="btn btn-primary"
                            disabled={this.state.isDisable}
                            onClick={this.sentdata_to_insert}
                          >
                            Insert to Database
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
 )};
   </div>
    );
  }
}

export default add_sidemenu;
