import React, { useState } from "react";
import query from "../api";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import { InfinitySpin } from "react-loader-spinner";

function MainLayout() {
  const [recipe, setRecipe] = useState(null);
  const [chosenModel, setChosenModel] = useState("GPT-2 Trained");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiRequest = () => {
    setIsLoading(true);
    let modelURL = ""; // Initialize with an empty URL
    let finalPrompt=""
    
    if (chosenModel === "GPT-2 Trained") {
      modelURL =
        "https://api-inference.huggingface.co/models/MiriFur/gpt2-recipes";
        finalPrompt=prompt + ". title:"
        console.log(finalPrompt);
    
    } else if (chosenModel === "GPT-2") {
      modelURL = "https://api-inference.huggingface.co/models/gpt2";
      finalPrompt=prompt;
      console.log(finalPrompt);

    } else if (chosenModel === "GPT-3") {
      modelURL = "URL for GPT-3 model"; // Replace with the actual URL
    }

    query(modelURL, {
      inputs: finalPrompt,
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

      {chosenModel&&<p className="text-white">Model Used: {chosenModel}</p>}

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
      <div className="bg-slate-300   w-5/6 m-5 p-7 whitespace-pre-line	text-left border rounded	">

        <p>{recipe}</p>
      </div>
    </div>
  );
}

export default MainLayout;
