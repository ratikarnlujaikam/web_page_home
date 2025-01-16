import React, { useState } from "react";
import { Url_HOME, Url_python } from "../../constants/index.jsx";
// import ImageSlider from './ImageSlider'; // นำเข้า ImageSlider

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
  const [hoverIndex, setHoverIndex] = useState(null);



  const HOME_page = [
    {
      name: "Engineer",
      path: "Home_Engineer",
      icon: "/data-analysis.png",
      background: "/bg-engineer.jpg",
    },
    {
      name: "Quality",
      path: "Home_Quality",
      icon: "/quality-control.png",
      background: "/bg-quality.jpg",
    },
    {
      name: "Production",
      path: "Home_Production",
      icon: "/production.png",
      background: "/bg-production.jpg",
    },
    {
      name: "PCMC",
      path: "Home_PCMC",
      icon: "/monitor.png",
      background: "/bg-pcmc.JPG",
    },
    {
      name: "PE MM",
      path: "Home_PE_MM",
      icon: "/mechanic.png",
      background: "/bg-engineer-1.JPG",
    },
    {
      name: "Data Analysis",
      path: "Home_Data_analysis",
      icon: "/data-analysis (1).png",
      background: "/bg-data-analysis.JPG",
    },
  ];

  const Url_Home_1 = Url_HOME;

  return (
    
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "20px", // ระยะห่างระหว่างกล่อง
    justifyContent: "center",
    padding: "20px",
    // backgroundColor: "#f8f9fa", // สีพื้นหลังที่ดูสะอาดตา
    marginTop: "80px", // เพิ่มระยะห่างจากแถบด้านบน (สามารถปรับให้เหมาะสม)
  }}
>
<div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
  <h1
    style={{
      fontSize: "30px", // ขนาดตัวอักษรที่ใหญ่ขึ้น
      fontWeight: "700", // ความหนาของตัวอักษร
      color: "#333", // สีตัวอักษร
      textAlign: "center", // จัดข้อความให้ตรงกลาง
      textTransform: "uppercase", // ทำให้ข้อความเป็นตัวพิมพ์ใหญ่
      letterSpacing: "4px", // เว้นระยะระหว่างตัวอักษร
      marginBottom: "30px", // เว้นระยะห่างด้านล่าง
      marginTop: "60px", // เพิ่มระยะห่างจากด้านบน
      fontFamily: "'Arial', sans-serif", // เปลี่ยนฟอนต์
      width: "67%", // ทำให้ข้อความเต็มพื้นที่
  
      textShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)", // เงาใต้ตัวอักษร
      background: "linear-gradient(90deg, #007bff, #00bcd4)", // พื้นหลังแบบไล่สี
      color: "white", // เปลี่ยนสีตัวอักษรให้ตัดกับพื้นหลัง
      padding: "20px 0", // เพิ่มพื้นที่ภายใน
      borderRadius: "8px", // ขอบมน
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // เพิ่มเงาให้กับกล่อง
    }}
  >
    Menu
  </h1>
</div>

{HOME_page.map((item, index) => (
 <div
 key={index}
 style={{
   width: "calc(33.33% - 10px)", // กำหนดความกว้างให้กล่องในแต่ละแถว (3 กล่องในแถว)
   borderRadius: "12px",
   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // เพิ่มเงาให้ดูสวยงาม
   overflow: "hidden",
   backgroundColor: "#fff",
   transition: "transform 0.3s, box-shadow 0.3s", // เพิ่มเอฟเฟกต์เวลา hover
   cursor: "pointer",
 }}
 onMouseEnter={(e) => {
   e.currentTarget.style.transform = "scale(1.05)"; // ขยายกล่องเมื่อ hover
   e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)"; // เพิ่มเงาให้ดูเด่นขึ้น
 }}
 onMouseLeave={(e) => {
   e.currentTarget.style.transform = "scale(1)"; // กลับไปขนาดเดิมเมื่อออกจาก hover
   e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // กลับไปเงาเดิม
 }}
>

{item.background && (
  <div
    onClick={() => {
      window.location.href = item.path.startsWith("http") ? item.path : `${Url_Home_1}${item.path}`;
    }}
    style={{
      height: "200px",
      backgroundImage: `url(${item.background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      cursor: "pointer", // เปลี่ยนเคอร์เซอร์เป็น pointer เพื่อให้รู้ว่าเป็นลิงก์
    }}
  ></div>
)}
    <div
      style={{
        padding: "16px",
        display: "flex", // ทำให้เนื้อหาภายในเป็น Flexbox
        flexDirection: "column", // จัดเรียงเนื้อหาให้เป็นแนวตั้ง
        justifyContent: "flex-start", // จัดข้อความให้ชิดด้านบน
      }}
    >
      <h1
        style={{
          fontSize: "25px",
          fontWeight: "600",
          color: "#333",
          marginBottom: "10px",
          textAlign: "left", // ทำให้ข้อความอยู่ด้านซ้าย
        }}
      >
        {item.name}
      </h1>
    </div>
  </div>
))}
</div>

  );
}
