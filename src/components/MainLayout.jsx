import React from "react";
import query from "../api";
import Button from "./Button";
const apiRequest = () => {
  query({ inputs: " title", parameters: { max_length: 499 } }).then(
    (response) => {
      console.log(JSON.stringify(response));
    }
  );
};

function MainLayout() {
  return (
    <div className="h-5/6 w-screen m-0 flex justify-center items-center flex-col">
      <div className="flex flex-wrap justify-center">
        <Button content={"GPT2"} />
        <Button content={"GPT-2 Trained"} />
        <Button content={"GPT-3"} />
      </div>
      <div className="bg-white  h-1/2 w-1/2 "></div>
      <button className="bg-emerald-700 w-30 h-10 m-5" onClick={apiRequest}>
        Generate
      </button>
    </div>
  );
}

export default MainLayout;