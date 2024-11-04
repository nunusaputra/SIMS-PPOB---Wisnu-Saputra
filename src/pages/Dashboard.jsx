import React, { useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import { useDispatch, useSelector } from "react-redux";
import { bannerAction, serviceAction } from "../redux/Action/serviceAction";
import Loading from "../components/Loading";
import Services from "../components/Services";
import Banner from "../components/Banner";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, data, banner } = useSelector((state) => state.service);

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    dispatch(serviceAction(token));
    dispatch(bannerAction(token));
  }, [dispatch, token]);

  return (
    <div>
      <HeroBanner />
      <div className="container w-full">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex gap-4 flex-wrap justify-between">
              {data &&
                data.map((item, index) => <Services item={item} key={index} />)}
            </div>
            <div className="mt-20">
              <h1 className="text-xl font-semibold mb-5">
                Temukan promo menarik
              </h1>
              <div className="w-full">
                <Swiper
                  modules={[Pagination]}
                  className="mySwiper"
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 30,
                    },
                    768: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    1024: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1280: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                  }}
                >
                  {banner &&
                    banner.map((item, index) => (
                      <SwiperSlide key={index}>
                        <Banner item={item} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
