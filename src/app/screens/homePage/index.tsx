import React from "react";
import "../../../css/home.css";
import BrandRow from "./BrandRow";
import { MainHome } from "./MainHome";
import PopularVehicles from "./PopularVehicles";
import AboutUs from "./AboutUs";

export default function HomePage () {
  return <div className="homepage">
    <MainHome />
    <BrandRow />
    <PopularVehicles />
    <AboutUs />
  </div>
}