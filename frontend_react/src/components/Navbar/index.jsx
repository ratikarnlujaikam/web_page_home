import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // ใช้ไอคอนจาก react-icons

export default function Navbar() {
  return (
    <div className="navbar fixed top-0 left-0 w-full z-10 bg-blue-500">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li className="flex items-center">
              <i className="fas fa-cog mr-2"></i> {/* ไอคอน Settings */}
              Settings ADMIN
            </li>
            <li>
              <Link to="/user_for_admin" className="nav-link">
                TABLE USER FOR ADMIN
              </Link>
            </li>
            <li>
              <Link to="/Add_Sidemenu" className="nav-link">
                Add Sidemenu
              </Link>
            </li>
            <li>
              <Link to="/Table_Temp" className="nav-link">
                UPDATE TABLE TEMP
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="navbar-center">
      {/* <h1 className="font-bold italic text-white">I-Spindle 4.0</h1> */}
      <h1 className="font-bold italic text-white" style={{ fontSize: "40px" }}>
  I-Spindle 4.0
</h1>


        {/* <img src="icon_SPD.png" alt="Logo" /> */}
      </div>
      {/* <div className="col-2">
      <div className="navbar-center">
        <img src="minebeamitsumi_logo_en.png" alt="Logo" />
      </div>
      </div> */}
    
      <div className="navbar-end">{/* Rest of your navbar code here */}</div>
      <div className="app-bar-content">
        <Link className="home-icon-link" to="/HOME">
          <FaHome size={24} />
        </Link>
      </div>
    </div>
  );
}
