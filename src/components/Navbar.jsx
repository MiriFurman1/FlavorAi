import React from "react";
import Button from "./Button";
function Navbar() {
  return (
    <div className="flex justify-center md:justify-around flex-wrap p-5">
        <div style={{ width: "150px" }}>
      <img src="/logo-no-background.png" ></img>
      </div>
      <div className="flex justify-between w-1/6">
      <Button content={"Home"}/>
      <Button content={"About"}/>
      <Button content={"More"}/>
      </div>
    </div>
  );
}

export default Navbar;
