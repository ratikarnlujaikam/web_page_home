import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/index";
import MasterItemNO from "./components/Engineer/MasterItemNO";
import Add_Sidemenu from "./components/Sidemenu/add_sidemenu";
import Engineer from "./components/Sidemenu/Engineer_database";
import Quality from "./components/Sidemenu/Quality_database";
import Production from "./components/Sidemenu/Production_database";
import PCMC from "./components/Sidemenu/PCMC_database";
import PEMM from "./components/Sidemenu/PEMM_database";
import Data_analysis from "./components/Sidemenu/Data_analysis_database"

import User_for_admin from "./components/user_for_admin/user";
import Table_Temp from "./components/Sidemenu/Table_Temp";
import Footer from "./components/footer/footer";
/** @jsxImportSource @emotion/react */


export default function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Navigate replace to="/Home"/>}></Route>
            <Route path="/masteritemno" element={<MasterItemNO />} />
            <Route path="/Add_Sidemenu" element={<Add_Sidemenu />} />
            <Route path="/Home_Engineer" element={<Engineer />} />
            <Route path="/Home_Quality" element={<Quality />} />
            <Route path="/Home_Production" element={<Production />} />
            <Route path="/Home_PCMC" element={<PCMC/>} />
            <Route path="/Home_PE_MM" element={<PEMM/>} />
            <Route path="/Home_Data_analysis" element={<Data_analysis/>} />
            <Route path="/user_for_admin" element={<User_for_admin />} />
            <Route path="/Table_Temp" element={<Table_Temp />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}


