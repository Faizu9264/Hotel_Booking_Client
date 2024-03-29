import React from "react";
import { Autoplay, Pagination, Lazy, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/lazy";
import "./swiperMap.css";
import { useNavigate } from "react-router-dom";

interface PopupHotelProps {
  popupInfo: {
    properties: {
      hotelId: string;
      hotelName: string;
      minimumRent: number;
      hotelImage: string[];
      description: string;
    };
  };
}
interface CustomSwiperOptions {
  lazy?: boolean;
}

const PopupHotel: React.FC<PopupHotelProps> = ({ popupInfo }) => {
  const navigate = useNavigate();
  const { hotelId, hotelName, minimumRent, hotelImage, description } =
    popupInfo.properties;

  const handleHotelClick = () => {
    navigate(`/view-rooms?hotelId=${hotelId}`);
  };

  return (
    <div
      className="popup-hotel-container"
      style={{ paddingBottom: "0px" }}
      onClick={handleHotelClick}
    >
      <div className="popup-hotel-carousel">
        <Swiper
          modules={[Autoplay, Pagination, Lazy, Navigation]}
          autoplay
          lazy
          navigation
          pagination={{ clickable: true }}
          style={
            {
              width: "250px",
              height: "200px",
              "--swiper-pagination-color": "rgba(255,255,255,0.5)",
              "--swiper-pagination-bullet-active-color": "#ffffff",
              "--swiper-pagination-bullet-inactive-opacity": 0.5,
              "--swiper-navigation-color": "#fff",
              "--swiper-navigation-size": "25px",
            } as React.CSSProperties
          }
          {...({ lazy: true } as CustomSwiperOptions)}
        >
          {hotelImage.map((url: string) => (
            <SwiperSlide key={url}>
              <img
                src={url}
                alt="hotel"
                style={{
                  width: "100%",
                  height: "255px",
                  display: "block",
                  overflow: "hidden",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="popup-hotel-header" style={{ padding: 6, marginTop: 2 }}>
        <p style={{ fontWeight: "bold", fontSize: "13px" }}>{hotelName}</p>
        <p style={{ fontSize: "11px" }}>Rooms starts from</p>
        <h2 style={{ fontWeight: "bolder", fontSize: "18px", marginTop: 0 }}>
          {minimumRent === 0 ? "Free Stay" : `₹${minimumRent}`}
        </h2>
      </div>
    </div>
  );
};

export default PopupHotel;
