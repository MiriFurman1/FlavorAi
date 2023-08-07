import React from "react";
import Button from "./Button";
function Navbar() {
  return (
    <div className="flex justify-center md:justify-around flex-wrap p-5 m-0 max-w-screen">
      <div style={{ width: "150px" }}>
        <img src="/logo-no-background.png"></img>
      </div>
      <div className="flex justify-around flex-wrap sd:w-2/6">
        <Button content={"Home"} />
        <Button content={"About"} />
        <Button content={"More"} />
      </div>
    </div>
  );
}

export default Navbar;
