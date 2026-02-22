import { useEffect, useState } from "react";

type DeviceType = "desktop" | "mobile";

const useDeviceDetect = (): DeviceType => {
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    const detect = () => {
      const userAgent = navigator.userAgent;
      const mobileByUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const mobileByWidth = window.innerWidth <= 900;
      setDevice(mobileByUA || mobileByWidth ? "mobile" : "desktop");
    };

    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  return device;
};

export default useDeviceDetect;
