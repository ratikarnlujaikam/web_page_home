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
    };
  }

  componentDidMount = async () => {
    try {
      await this.getdropdown();
    } catch (error) {
      console.error("Error fetching data", error);
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
  
  
  handleAdminInput = (e) => {
    const value = e.target.value;
    this.setState({
      adminInput: value,
      isAdmin: value === "Admin", // Check if the input is 'Admin'
    });
  };

  render() {
    const {
      selectedIcon,
      iconOptions,
      Division,
      Details,
      path,
      name,
      updateby,
      isAdmin,
    } = this.state;
    console.log(this.state.Division);
    return (
      <div className="content-wrapper border border-blue-100">
     
          {!this.state.isAdmin ? (
            <div className="hero bg-base-200 min-h-screen">
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl font-bold"></h1>
                  <p className="py-6"></p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                  <form className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">EMP</span>
                      </label>
                      <input
                        type="text"
                        value={this.state.updateby}
                        onChange={(e) =>
                          this.setState({ updateby: e.target.value })
                        }
                        className="w-full p-2 rounded border border-gray-300"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="text"
                        value={this.state.adminInput}
                        onChange={this.handleAdminInput}
                        className="w-full p-2 rounded border border-gray-300"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
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
          
          )}
   
      </div>
    );
  }
}

export default add_sidemenu;
