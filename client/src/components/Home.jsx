import React from "react";
import Slider from "./Slider";
import Services from "./Services";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import TopSellingProduct from "./TopSellingProduct";

const Home = () => {
  return (
    <div className="bg-sky-50">
      <Header />
      <Slider />
      <div className="mt-9">
        <p className="font-[Hedvig Letters Serif] font-normal text-[32px] leading-[42.88px] tracking-[0%] text-center">
          Sell your old devices for instant cash.
        </p>
        <p className="font-[IBM Plex Sans] text-[20px] text-center">
          Whether pristine or broken, secure the best deal from over 300+
          refurbishers.
        </p>
     <div className="max-w-7xl mx-auto">
        <div className="flex justify-around flex-wrap gap-4 mt-5 p-4 bg-white rounded-md">
          <div className="flex items-center text-center border border-gray-300 p-2 rounded-md">
            <img src="/vector.png" alt="Offer" className="w-8 h-8" />
            <p className="font-[IBM Plex Sans] font-normal text-[14px] leading-[42.88px] tracking-[0%] text-center ml-2">
              Highest offer guaranteed
            </p>
          </div>

          <div className="flex items-center text-center border border-gray-300 p-2 rounded-md">
            <img
              src="/universal_currency.png"
              alt="Offer"
              className="w-8 h-8"
            />
            <p className="font-[IBM Plex Sans] font-normal text-[14px] leading-[42.88px] tracking-[0%] text-center ml-2">
              Highest offer guaranteed
            </p>
          </div>

          <div className="flex items-center text-center border border-gray-300 p-2 rounded-md">
            <img src="/local_shiping.png" alt="Offer" className="w-8 h-8" />
            <p className="font-[IBM Plex Sans] font-normal text-[14px] leading-[42.88px] tracking-[0%] text-center ml-2">
              Highest offer guaranteed
            </p>
          </div>

          <div className="flex items-center text-center border border-gray-300 p-2 rounded-md">
            <img src="/check_circle.png" alt="Offer" className="w-8 h-8" />
            <p className="font-[IBM Plex Sans] font-normal text-[14px] leading-[42.88px] tracking-[0%] text-center ml-2">
              Highest offer guaranteed
            </p>
          </div>
        </div>
      </div>
      <Services />
      <TopSellingProduct />
      </div>
    </div>
  );
};

export default Home;
