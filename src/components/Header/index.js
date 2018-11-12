import React from "react";
import logo from "../../assets/images/logo.png";
// import NavMenu from './NavMenu';

const Header = () => (
  <nav className="bg-teal">
    <div className="flex flex-wrap items-center max-w-xl mx-auto p-4 md:p-8">
      <img
        alt="Logo"
        src={logo}
        height="54"
        width="54"
        style={{ margin: "0 10px" }}
      />
      <span className="text-5xl tracking-tight">Flight Matrix</span>
      {/* <NavMenu /> */}
    </div>
  </nav>
);

export default Header;
