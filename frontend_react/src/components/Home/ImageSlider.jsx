// เปลี่ยนชื่อไฟล์เป็น ImageSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ margin: '20px auto', width: '80%' }}>
      <Slider {...settings}>
        <div>
          <img
            src="main.jpg"
            alt="Description 1"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div>
          <img
            src="main.jpg"
            alt="Description 2"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div>
          <img
            src="main.jpg"
            alt="Description 3"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div>
          <img
            src="main.jpg"
            alt="Description 4"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
