import React from "react";
import "../../../css/home.css";
import BrandRow from "./BrandRow";
import { MainHome } from "./MainHome";
import PopularVehicles from "./PopularVehicles";
import AboutUs from "./AboutUs";
import { HowItWorks } from "./HowItWorks";

export default function HomePage () {
  return <div className="homepage">
    <MainHome />
    <HowItWorks />
    <BrandRow />
    <PopularVehicles />
    <AboutUs />
  </div>
}