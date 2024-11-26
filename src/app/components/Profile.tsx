"use client";

import React from "react";
import Spline from "@splinetool/react-spline";

const Profile: React.FC = () => {
  return (
    <div className="w-full h-screen touch-none">
      <Spline scene="/models/scene.splinecode" />
    </div>
  );
};
export default Profile;
