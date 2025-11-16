import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Feed from "./Feed";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
        <Feed />
      </div>
      <Footer />
    </div>
  );
};

export default Body;

