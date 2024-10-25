import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MasterItemNO from "./components/Engineer/MasterItemNO";
import Add_Sidemenu from "./components/Sidemenu/add_sidemenu";
import Engineer from "./components/Sidemenu/Engineer_database";
import Quality from "./components/Sidemenu/Quality_database";
import User_for_admin from "./components/user_for_admin/user";
import Table_Temp from "./components/Sidemenu/Table_Temp";
/** @jsxImportSource @emotion/react */


export default function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* หน้าแรก */}
        <Route path="/masteritemno" element={<MasterItemNO />} /> {/* หน้า MasterItemNO */}
        <Route path="/Add_Sidemenu" element={<Add_Sidemenu />} /> {/* หน้า MasterItemNO */}
        <Route path="/Home_Engineer" element={<Engineer />} /> {/* หน้า MasterItemNO */}
        <Route path="/Home_Quality" element={<Quality />} /> {/* หน้า MasterItemNO */}
        <Route path="/user_for_admin" element={<User_for_admin />} /> {/* หน้า MasterItemNO */}
        <Route path="/Table_Temp" element={<Table_Temp />} /> {/* หน้า MasterItemNO */}
      </Routes>
    </Router>
    </>
  );
}


