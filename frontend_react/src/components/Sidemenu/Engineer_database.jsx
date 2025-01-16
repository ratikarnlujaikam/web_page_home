import React, { Component } from "react";
import { server } from "../../constants";
import { httpClient } from "../../utils/HttpClient";
import moment from "moment";
import { Url_eng, Url_python } from "../../constants/index.jsx";
class Engineer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }
  componentDidMount = async () => {
    try {
      let result = await httpClient.get(server.ENG_URL);
      console.log(result);
      this.setState({ data: result.data });
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, e.g., set an error state or show a message
    }
  };

  render() {
    const { data } = this.state;
    const Url_1 = `${Url_eng}`;
    const Url_2 = `${Url_python}`;

    const Traceability =
      data && data.api_Engineer
        ? data.api_Engineer.filter((item) => item.Details === "Traceability")
        : [];

    const Monitoring =
      data && data.api_Engineer
        ? data.api_Engineer.filter((item) => item.Details === "Monitoring")
        : [];

    const Report =
      data && data.api_Engineer
        ? data.api_Engineer.filter((item) => item.Details === "Report")
        : [];

    const Analysis_requester =
      data && data.api_Engineer
        ? data.api_Engineer.filter(
            (item) => item.Details === "Analysis_requester"
          )
        : [];

    if (!data) return <div>Loading...</div>;

    return (
      <div className="content-wrapper border border-blue-200 bg-white rounded-lg shadow-md p-6">
        {/* Breadcrumb */}
        <div className="flex items-center mb-4">
          <ol className="breadcrumb flex space-x-2">
            <li className="breadcrumb-item">
              <a
                href="/Home"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <i className="fa fa-arrow-left mr-1"></i> Home
              </a>
            </li>
          </ol>
        </div>

        <div className="w-full">
          <div className="card border border-blue-400 bg-blue-50 rounded-lg shadow-lg p-4">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Engineer</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Traceability Card */}
              <div className="card border border-blue-600 rounded-lg shadow-md bg-white">
                <div className="card-header bg-blue-100 p-3 rounded-t-lg">
                  <h3 className="text-lg font-semibold text-blue-800">
                    Traceability
                  </h3>
                </div>
                <div className="card-body p-4">
                  {Traceability.map((item, index) => (
                    <React.Fragment key={index}>
                      <a
                         href={
                          item.type.startsWith("H")
                            ? item.path                      // Case for "H"
                            : item.type.startsWith("P")
                            ? `${Url_2}${item.path}`          // Case for "P"
                            : item.type.startsWith("R")
                            ? `${Url_1}${item.path}`          // Case for "R"
                            : ''                              // Default case (if none match)
                        }
                        className="flex items-center mb-2 text-blue-600 hover:text-blue-800"
                      >
                        {item.name}
                        {item.icon && (
                          <img
                            src={`${Url_1}${item.icon}`}
                            alt={item.name}
                            className="ml-2 w-8 h-8"
                          />
                        )}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Monitoring Card */}
              <div className="card border border-blue-600 rounded-lg shadow-md bg-white">
                <div className="card-header bg-blue-100 p-3 rounded-t-lg">
                  <h3 className="text-lg font-semibold text-blue-800">
                    Monitoring
                  </h3>
                </div>
                <div className="card-body p-4">
                  {Monitoring.map((item, index) => (
                    <React.Fragment key={index}>
                      <a
                        href={
                          item.type.startsWith("H")
                            ? item.path                      // Case for "H"
                            : item.type.startsWith("P")
                            ? `${Url_2}${item.path}`          // Case for "P"
                            : item.type.startsWith("R")
                            ? `${Url_1}${item.path}`          // Case for "R"
                            : ''                              // Default case (if none match)
                        }
                        className="flex items-center mb-2 text-blue-600 hover:text-blue-800"
                      >
                        {item.name}
                        {item.icon && (
                          <img
                            src={`${Url_1}${item.icon}`}
                            alt={item.name}
                            className="ml-2 w-8 h-8"
                          />
                        )}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Report Card */}
              <div className="card border border-blue-600 rounded-lg shadow-md bg-white">
                <div className="card-header bg-blue-100 p-3 rounded-t-lg">
                  <h3 className="text-lg font-semibold text-blue-800">
                    Report
                  </h3>
                </div>
                <div className="card-body p-4">
                  {Report.map((item, index) => (
                    <React.Fragment key={index}>
                      <a
                          href={
                            item.type.startsWith("H")
                              ? item.path                      // Case for "H"
                              : item.type.startsWith("P")
                              ? `${Url_2}${item.path}`          // Case for "P"
                              : item.type.startsWith("R")
                              ? `${Url_1}${item.path}`          // Case for "R"
                              : ''                              // Default case (if none match)
                          }
                        className="flex items-center mb-2 text-blue-600 hover:text-blue-800"
                      >
                        {item.name}
                        {item.icon && (
                          <img
                            src={`${Url_1}${item.icon}`}
                            alt={item.name}
                            className="ml-2 w-8 h-8"
                          />
                        )}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Analysis Requester Card */}
              <div className="card border border-blue-600 rounded-lg shadow-md bg-white">
                <div className="card-header bg-blue-100 p-3 rounded-t-lg">
                  <h3 className="text-lg font-semibold text-blue-800">
                    Analysis Requester
                  </h3>
                </div>
                <div className="card-body p-4">
                  {Analysis_requester.map((item, index) => (
                    <React.Fragment key={index}>
                      <a
                           href={
                            item.type.startsWith("H")
                              ? item.path                      // Case for "H"
                              : item.type.startsWith("P")
                              ? `${Url_2}${item.path}`          // Case for "P"
                              : item.type.startsWith("R")
                              ? `${Url_1}${item.path}`          // Case for "R"
                              : ''                              // Default case (if none match)
                          }
                        className="flex items-center mb-2 text-blue-600 hover:text-blue-800"
                      >
                        {item.name}
                        {item.icon && (
                          <img
                            src={`${Url_1}${item.icon}`}
                            alt={item.name}
                            className="ml-2 w-8 h-8"
                          />
                        )}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Engineer;
