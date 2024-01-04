import { useEffect, useState } from "react";

export const useWindowDimensions = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateDimensions);

    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return [width, height];
};
