import React, { useEffect } from "react";
import BrandRow from "./BrandRow";
import { MainHome } from "./MainHome";
import PopularVehicles from "./PopularVehicles";
import AboutUs from "./AboutUs";
import { HowItWorks } from "./HowItWorks";
import { Events } from "./Events";
import { MobileAppDownload } from "./MobileDownload";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularVehicles } from "./slice";
import { Vehicle } from "../../../lib/types/vehicle";
import { retrievePopularVehicles } from "./selector";
import "../../../css/home.css";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularVehicles: (data: Vehicle[]) => dispatch(setPopularVehicles(data)),
});

const popularVehiclesRetriever = createSelector(
  retrievePopularVehicles,
  (popularVehicles) => ({ popularVehicles })
);

export default function HomePage () {
  const { setPopularVehicles } = actionDispatch(useDispatch());
  const { popularVehicles } = useSelector(popularVehiclesRetriever);
  // Selector: Store => Data

  useEffect(() => {
    // Backend server data request => Data
    // Slice: Data => Store
  }, []);

  return <div className="homepage">
    <MainHome />
    <HowItWorks />
    <BrandRow />
    <PopularVehicles />
    <Events />
    <AboutUs />
    <MobileAppDownload />
  </div>
}