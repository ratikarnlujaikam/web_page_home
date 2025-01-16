import React, { useState } from "react";
import { Url_HOME, Url_python } from "../../constants/index.jsx";

export default function Home() {
  const [hoverIndex, setHoverIndex] = useState(null);

  const cardContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px", // Adjust the gap between the cards
    justifyContent: "space-between",
  };

  const cardStyle = {
    padding: "20px",
    backgroundColor: "#f5f5f5", // สีพื้นหลังที่สดใส
    backgroundImage: "url('/path/to/fabric-pattern.png')", // ใช้ภาพพื้นผ้า
    backgroundSize: "cover", // ปรับขนาดพื้นผ้าให้เต็มกล่อง
    backgroundPosition: "center",
    borderRadius: "10px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    width: "calc(33.333% - 20px)", // Set width to 33% minus the gap, so 3 cards fit per row
    transition: "transform 0.3s ease-in-out",
  };

  const cardStyleHover = {
    ...cardStyle,
    transform: "scale(0.90)", // ขยายขนาดเล็กน้อย
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
    color: "#1d4ed8",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  const linkHoverStyle = {
    color: "#1e40af",
  };

  const imgStyle = {
    marginLeft: "10px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
  };

  const HOME_page = [
    { name: "Engineer", path: "Home_Engineer", icon: "/data-analysis.png" },
    { name: "Quality", path: "Home_Quality", icon: "/quality-control.png" },
    { name: "Production", path: "Home_Production", icon: "/production.png" },
    { name: "PCMC", path: "Home_PCMC", icon: "/monitor.png" },
    { name: "PE MM", path: "Home_PE_MM", icon: "/mechanic.png" },
    { name: "Data Analysis", path: "{Url_python}", icon: "/data-analysis (1).png" },
  ];

  const Url_1 = Url_HOME;

  return (
    
<div style={{ position: "relative", border: "2px solid #000", padding: "20px", borderRadius: "8px" }}>
  <img 
    src="main.jpg" // ใส่ URL ของรูปภาพที่คุณต้องการ
    alt="Description of image" // ใส่คำอธิบายรูปภาพ
    style={{ width: "100%", borderRadius: "8px" }} // กำหนดขนาดและปรับกรอบให้มีมุมมน
    
  />

  <div 
    style={{
      position: "absolute",
      top: "20px", // ระยะห่างจากด้านบนของรูป
      left: "20px", // ระยะห่างจากด้านซ้าย
      right: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.7)", // ให้พื้นหลังโปร่งใส
      borderRadius: "8px",
      padding: "203px",
      zIndex: "10", // ทำให้กล่องลอยอยู่เหนือรูปภาพ
    }}
  >
    <div style={cardContainerStyle}>
      <div className="card-body p-20">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "0px", // ปรับลดระยะห่างระหว่างกรอบ
          }}
        >
          {HOME_page.map((item, index) => (
            <React.Fragment key={index}>
              <a
                href={item.path.startsWith("http") ? item.path : `${Url_1}${item.path}`}
                className="block w-full mb-10"
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverStyle.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkStyle.color)}
                style={{ width: "33%", borderRadius: "8px" }} // กำหนดขนาดและปรับกรอบให้มีมุมมน
              >
                <div
                  className="card border border-blue-800 rounded-lg shadow-md bg-white p-20 flex flex-col items-center justify-center text-xl h-[200px]"
                  style={hoverIndex === index ? cardStyleHover : cardStyle}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="card-header bg-blue-100 p-3 rounded-t-lg w-full">
                    <h3 className="text-lg font-semibold text-blue-500">{item.name}</h3>
                  </div>
                  {item.icon && (
                    <img
                      src={item.icon.startsWith("http") ? item.icon : `${Url_1}${item.icon}`}
                      alt={item.name}
                      className="mt-5 w-[70px] h-[70px]"
                    />
                  )}
                </div>
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>



  
  );
}
