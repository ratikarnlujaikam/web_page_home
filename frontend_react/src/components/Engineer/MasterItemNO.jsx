import React, { Component } from "react";
import { key, server } from "../../constants/index";
import { httpClient } from "../../utils/HttpClient";
import Select from "react-select";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";

class MasterItemNO extends Component {
  constructor(props) {
    super(props);

    //set state
    this.state = {
      ItemNo: [],
      ModelGroup: [],
      report: [],
      reportGraph: [],

      Raw_Dat: [],
      listItemNo: [],
      listModelName: [],
      listModelGroup: [],

      optionSelected: null,
      isDisable: false,
    };
  }

  componentDidMount = async () => {
    try {
      await this.getModelGroup();
    } catch (error) {
      console.error("Error in componentDidMount:", error);
    }
  };

  doGetDataReport = async () => {
    const result = await httpClient.get(
      server.MASTER_URL +
        "/" +
        this.state.ModelGroup +
        "/" +
        this.state.ItemNo[0].label
    );

    let rawData = result.data.listRawData;
    console.log(rawData);
    console.log(rawData.length);
    for (let i = 1; i < rawData.length; i++) {
      rawData[0].push(...rawData[i]);
    }
    this.setState({ Raw_Dat: rawData[0] });
    console.log(this.state.Raw_Dat);

    this.setState({
      report: result.data.result,
      isDisable: false,
    });
  };
  getModelGroup = async () => {
    const array = await httpClient.get(server.MASTERGROUP_URL);
    const options = array.data.result.map((d) => ({
      label: d.ModelGroup,
    }));
    this.setState({ listModelGroup: options });
  };

  getItemNO = async () => {
    const array = await httpClient.get(
      server.MASTERITEMNO_URL + "/" + this.state.ModelGroup
    );
    const options = array.data.result.map((d) => ({
      label: d.ItemNo,
    }));
    this.setState({ listItemNo: options });
  };

  renderreport1 = () => {
    if (this.state.report != null) {
      if (this.state.report.length > 0) {
        return this.state.report.map((item) => (
          <tr key={item["Item_No"]} align="center">
            <td style={{ textAlign: "left", width: "150px", fontSize: "13px" }}>
              {item["Customer_Code"]}
            </td>
            <td style={{ textAlign: "left", width: "150px", fontSize: "13px" }}>
              {item["Model_Group"]}
            </td>
            <td style={{ textAlign: "left", width: "100px", fontSize: "13px" }}>
              {item["Item_No"]}
            </td>
            <td style={{ textAlign: "left", width: "200px", fontSize: "13px" }}>
              {item["Item_Name"]}
            </td>
            <td style={{ textAlign: "left", width: "200px", fontSize: "13px" }}>
              {item["Model_Name"]}
            </td>
            <td style={{ textAlign: "left", width: "150px", fontSize: "13px" }}>
              {item["WC_Code"]}
            </td>
            <td style={{ textAlign: "right", width: "150px", fontSize: "13px" }}>
              {Number(item["Lot_Size_Final"]).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </td>
            <td style={{ textAlign: "right", width: "150px", fontSize: "13px" }}>
              {Number(item["Lot_Size_QA"]).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </td>
            <td style={{ textAlign: "left", width: "150px", fontSize: "13px" }}>
              {item["QA_Code"]}
            </td>
            <td style={{ textAlign: "right", width: "150px", fontSize: "13px" }}>
              {Number(item["Tray_Per_QA"]).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </td>
            <td style={{ textAlign: "left", width: "150px", fontSize: "13px" }}>
              {item["Updater"]}
            </td>
            <td style={{ textAlign: "left", width: "200px", fontSize: "13px" }}>
              {item["Time_stamp"]}
            </td>
            <td style={{ textAlign: "left", width: "150px", fontSize: "13px" }}>
              {item["Bag_Color"]}
            </td>
            <td style={{ textAlign: "left", width: "150px", fontSize: "13px" }}>
              {item["End_Of_Life"]}
            </td>
          </tr>
        ));
      }
    }
  };
  

  render() {
    console.log(this.state.ModelGroup);
    console.log(this.state.ModelName);
    console.log(this.state.ItemNo);
    console.log(this.state.report);

    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col space-y-6">
        <h1> Item no. Master</h1>
       
          <div className="bg-white border border-gray-300 shadow-lg rounded-lg">
            <div className="rounded-t-lg border-b border-blue-500">
              <div className="p-4 rounded-t-lg">
                <h3 className="text-lg font-semibold">Select Parameter</h3>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-group">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Model Group
                  </label>
                  <Select
                    options={this.state.listModelGroup}
                    onChange={async (e) => {
                      await this.setState({ ModelGroup: e.label });
                      await this.getItemNO();
                      this.setState({ ItemNo: [{ label: "**ALL**" }] });
                    }}
                    placeholder="Select Model Group"
                  />
                </div>

                <div className="form-group">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Item No
                  </label>
                  <Select
                    options={this.state.listItemNo}
                    value={this.state.ItemNo[0]}
                    onChange={async (e) => {
                      await this.setState({
                        ItemNo: [{ label: e.label }],
                      });
                    }}
                    placeholder="Select Item No"
                  />
                </div>

                {/* Button Wrapper */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <button
                    disabled={this.state.isDisable}
                    onClick={async () => {
                      this.setState({ isDisable: true });
                      Swal.fire({
                        icon: "info",
                        title: "Loading Data",
                        timer: 60000,
                        allowOutsideClick: false,
                        didOpen: async () => {
                          Swal.showLoading();
                          await this.doGetDataReport();
                          Swal.close();
                        },
                      }).then(() => {
                        if (this.state.report.length > 0) {
                          if (this.state.report[0].Item_No.length > 0) {
                            Swal.fire({
                              icon: "success",
                              title: "Success",
                              text: "Data has been loaded successfully",
                            });
                          } else if (this.state.report[0].Item_No.length == 0) {
                            Swal.fire({
                              icon: "error",
                              title: "No production data",
                              text: "Please select other date",
                            });
                          }
                        } else {
                          Swal.fire({
                            icon: "error",
                            title:
                              "Data loading has encountered some error, please try again",
                          });
                        }
                      });
                    }}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-200 ease-in-out"
                  >
                    Submit
                  </button>

                  <CSVLink
                    data={this.state.Raw_Dat}
                    filename={"Reject_report.csv"}
                  >
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-200 ease-in-out"
                    >
                      Download
                    </button>
                  </CSVLink>

                  <a
                    href="/Home"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-200 ease-in-out"
                    role="button"
                    aria-pressed="true"
                  >
                    Back
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white border border-gray-300 shadow rounded-lg mt-6"
            style={{ height: 500, zIndex: "0" }}
          >
            <div
              className="overflow-x-auto"
              style={{ maxHeight: "100%", overflowY: "auto" }}
            >
              <table
                className="table table-xs"
                style={{ tableLayout: "fixed" }}
              >
                <thead
                  className="bg-gray-200"
                  style={{ position: "sticky", top: 0, zIndex: 1 }}
                >
                  <tr align="center">
                    <th width="100">Customer Code</th>
                    <th width="70">Model Group</th>
                    <th width="100">Item No</th>
                    <th width="100">Item Name</th>
                    <th width="100">Model Name</th>
                    <th width="70">WC Code</th>
                    <th width="70">Lot Size Final</th>
                    <th width="70">Lot Size QA</th>
                    <th width="70">QA Code</th>
                    <th width="70">Tray Per QA</th>
                    <th width="70">Updater</th>
                    <th width="70">Time stamp</th>
                    <th width="70">Bag Color</th>
                    <th width="70">End Of Life</th>
                  </tr>
                </thead>
                <tbody>{this.renderreport1()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MasterItemNO;
