import React from "react";

function Navbar() {
  return (
    <div className="flex justify-around p-5">
        <div style={{ width: "150px" }}>
      <img src="/logo-no-background.png" ></img>
      </div>
      <div className="flex justify-between w-1/6">
        <button className="bg-emerald-700">Home</button>
        <button className="bg-emerald-700">About</button>
        <button className="bg-emerald-700">More</button>
      </div>
    </div>
  );
}

export default Navbar;
