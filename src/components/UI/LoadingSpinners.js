import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export const LoaderLarge = ({ color }) => (
  <div className="loader">
    <ThreeCircles
      color={color}
      height={50}
      width={50}
      wrapperStyle={{ justifyContent: "center", padding: "0.5rem" }}
    />
  </div>
);

export const LoaderSmall = ({ color }) => (
  <div className="loader">
    <ThreeCircles
      color={color}
      height={28}
      width={28}
      wrapperStyle={{ justifyContent: "center", padding: "0.5rem" }}
    />
  </div>
);
