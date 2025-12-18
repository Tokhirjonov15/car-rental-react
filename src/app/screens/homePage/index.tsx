import React from "react";
import "../../../css/home.css";
import BrandRow from "./BrandRow";
import { MainHome } from "./MainHome";
import PopularVehicles from "./PopularVehicles";
import AboutUs from "./AboutUs";
import { HowItWorks } from "./HowItWorks";
import { Events } from "./Events";
import { MobileAppDownload } from "./MobileDownload";
import { Footer } from "../../components/footer";

export default function HomePage () {
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