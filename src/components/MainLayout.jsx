import React, { useState } from "react";
import query from "../api";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import { InfinitySpin } from "react-loader-spinner";

function MainLayout() {
  const [recipe, setRecipe] = useState(null);
  const [chosenModel, setChosenModel] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiRequest = () => {
    setIsLoading(true);
    let modelURL = ""; // Initialize with an empty URL

    if (chosenModel === "GPT-2 Trained") {
      modelURL =
        "https://api-inference.huggingface.co/models/MiriFur/gpt2-recipes";
    } else if (chosenModel === "GPT-2") {
      modelURL = "https://api-inference.huggingface.co/models/gpt2";
    } else if (chosenModel === "GPT-3") {
      modelURL = "URL for GPT-3 model"; // Replace with the actual URL
    }
    query(modelURL, {
      inputs: prompt + ". title:",
      parameters: { temperature: 2, max_length: 499 },
      options: { wait_for_model: true },
    }).then((response) => {
      try {
        const recipeArray = Object.entries(response);
        if (chosenModel === "GPT-2 Trained") {
          const startIndex = recipeArray[0][1]?.generated_text.indexOf("##");
          if (startIndex !== -1) {
            // Slice the end
            const slicedText = recipeArray[0][1].generated_text.slice(
              0,
              startIndex
            );
            const slicedFromBeginning = slicedText.slice(prompt.length + 8); // Slice the beginning
            setRecipe(slicedFromBeginning);
            console.log(slicedFromBeginning);
          }
        } else {
          setRecipe(recipeArray[0][1]?.generated_text);
          console.log(recipeArray[0][1]?.generated_text);
        }

        setPrompt("");
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="h-5/6 w-screen m-0 flex justify-center items-center flex-col">
      <div className="flex flex-wrap justify-center">
        <Button content={"GPT-2"} setChosenModel={setChosenModel} />
        <Button content={"GPT-2 Trained"} setChosenModel={setChosenModel} />
        <Button content={"GPT-3"} setChosenModel={setChosenModel} />
      </div>

      {chosenModel&&<p className="text-white">model used: {chosenModel}</p>}

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border rounded p-2 m-2 w-2/6"
        placeholder="Enter your prompt here"
      />

      <div className="flex">
        <button className="bg-emerald-700 w-30 h-10 m-5" onClick={apiRequest}>
          Generate
        </button>

        {isLoading && <InfinitySpin width="200" color="#4fa94d" />}
      </div>
      <div className="bg-white min-h-1/2 max-h-1/2  w-1/2 ">
        <p>{recipe}</p>
      </div>
    </div>
  );
}

export default MainLayout;
