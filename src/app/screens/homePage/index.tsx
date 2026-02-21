import React, { useEffect } from "react";
import { HowItWorks } from "./HowItWorks";
import { Events } from "./Events";
import { MobileAppDownload } from "./MobileDownload";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPopularVehicles } from "./slice";
import { Vehicle } from "../../../lib/types/vehicle";
import VehicleService from "../../services/VehicleService";
import { MainHome } from "./mainHome";
import { AboutUs } from "./AboutUs";
import { PopularVehicles } from "./PopularVehicles";
import { BrandRow } from "./BrandRow";
import "../../../css/home.css";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularVehicles: (data: Vehicle[]) => dispatch(setPopularVehicles(data)),
});

export default function HomePage() {
  const { setPopularVehicles } = actionDispatch(useDispatch());
  // Selector: Store => Data

  useEffect(() => {
    // Backend server data request => Data
    const vehicle = new VehicleService();
    vehicle
      .getVehicles({
        page: 1,
        limit: 4,
      })
      .then((data) => {
        setPopularVehicles(data);
      })
      .catch((err) => console.log(err));
  }, [setPopularVehicles]);

  return (
    <div className="homepage">
      <MainHome />
      <HowItWorks />
      <BrandRow />
      <PopularVehicles />
      <Events />
      <AboutUs />
      <MobileAppDownload />
    </div>
  );
}
