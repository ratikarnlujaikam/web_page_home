// App_Init
export const APP_INIT = "APP_INIT";
export const APP_TITLE = "NMB Covid19 command center";

// Login Page
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";

// Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED";

// Division code
export const HTTP_DIVCODE_FETCHING = "HTTP_DIVCODE_FETCHING";
export const HTTP_DIVCODE_SUCCESS = "HTTP_DIVCODE_SUCCESS";
export const HTTP_DIVCODE_FAILED = "HTTP_DIVCODE_FAILED";

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";




export const apiUrl = "http://localhost:2030/"; //localhost port 2010
export const Url_eng = "http://192.168.101.120:2032/"; //Port frontend
export const Url_Qulity = "http://192.168.101.67:3000/"; //Port frontend


// export const apiUrl = "http://192.168.101.120:2030/"; //localhost port 2010
// export const Url = "http://192.168.101.120:2032/"; //Port frontend

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const server = {
  MODEL_TBMASTER:`api/model_tbMasteritemNO/ModelGroup`,

  DROPDOWN_DIVISION_URL: `api/side_menu/dropdown_Division`,
  INSERT_SIDEMENU_URL: `api/side_menu/api_insert_sidemenu`,

  MASTERGROUP_URL: `api/MasterItemNO/ModelGroup`,
  MASTERITEMNO_URL: `api/MasterItemNO/ItemNo`,
  MASTER_URL: `api/MasterItemNO/Master`,

  ENG_URL: `api/side_menu/Engineer`,
  User_URL: `api/user_for_admin/User`,
  User_delete_URL: `api/user_for_admin/User_delete`,
  User_login_URL: `api/user_for_admin/login`,

  Table_Temp_result_URL :`api/Table_Temp/Table_Temp_result`,
  Table_Temp_URL :`api/Table_Temp/Table_Temp`,

};

export const key = {
  LOGIN_PASSED: `LOGIN_PASSED`,
  API_KEY: `API_KEY`,
  USER_LV: `USER_LV`,
  USER_NAME: "USER_NAME",
  USER_EMP: "USER_EMP",
  JWT_TOKEN: "JWT_TOKEN",
};
