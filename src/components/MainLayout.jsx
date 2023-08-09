import React, { useState } from "react";
import query from "../api";
import Button from "./Button";
import { ToastContainer, toast } from 'react-toastify';

function MainLayout() {
  const [recipe, setRecipe] = useState(null);
  const [chosenModel, setChosenModel] = useState(null);
  const [prompt, setPrompt] = useState("");

  const apiRequest = () => {
    
    query({ inputs: prompt +". title:", parameters: { max_length: 499 } }).then(
      (response) => {
        const recipeArray = Object.entries(response);
        const startIndex = recipeArray[0][1]?.generated_text.indexOf("##");
        if (startIndex !== -1) {
          const slicedText = recipeArray[0][1].generated_text.slice(0,startIndex);
          setRecipe(slicedText);
          console.log(slicedText);
        }
      }
    );
  };

  return (
    
    <div className="h-5/6 w-screen m-0 flex justify-center items-center flex-col">
      
      <div className="flex flex-wrap justify-center">
        <Button content={"GPT-2"} setChosenModel={setChosenModel} />
        <Button content={"GPT-2 Trained"} setChosenModel={setChosenModel} />
        <Button content={"GPT-3"} setChosenModel={setChosenModel} />
      </div>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border rounded p-2 m-2 w-2/6"
        placeholder="Enter your prompt here"
  
      />

      <button className="bg-emerald-700 w-30 h-10 m-5" onClick={apiRequest}>
        Generate
      </button>

      <div className="bg-white min-h-1/2  w-1/2 ">
        <p>{recipe}</p>
      </div>
    </div>
  );
}

export default MainLayout;
