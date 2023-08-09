import React,{useState} from "react";
import query from "../api";
import Button from "./Button";

const MainLayout = () => {
  const [recipe,setRecipe] = useState(null);
  async function apiRequest() {
    const response = await query({ inputs: " title", parameters: { max_length: 499 } });
    const recipeArray = Object.entries(response);
    const recipe = recipeArray[0][1].generated_text;
    
    const recipeFormatted = {
      title: recipe.match(/title\s+(.*)/)[1],
      categories: recipe.match(/Categories:\s+(.*)/)[1].split(", "),
      servings: recipe.match(/Servings:\s+(.*)/)[1],
      ingredients: recipe.match(/Ingredients:\s+(.*)/)[1].split("\n"),
      directions: recipe.match(/Directions:\s+(.*)/)[1].split("\n"),
    };

    // Remove the ## from the end of the recipe
    const index = recipeFormatted.directions.indexOf("##");
    const slicedDirections = recipeFormatted.directions.slice(0, index);
  
    recipeFormatted.directions = slicedDirections;
    console.log(recipeFormatted);
    setRecipe(recipeFormatted);

  }

  return (
    <div className="h-5/6 w-screen m-0 flex justify-center items-center flex-col">
      <div className="flex flex-wrap justify-center">
        <Button content={"GPT2"} />
        <Button content={"GPT-2 Trained"} />
        <Button content={"GPT-3"} />
      </div>
      <div className="bg-white min-h-1/2  w-1/2 ">
        {recipe && <p>{recipe.title}</p>}
        {recipe && <ul>
          {recipe.categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>}
        {recipe && <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>}
        {recipe && <ol>
          {recipe.directions.map((direction, index) => (
            <li key={index}>{direction}</li>
          ))}
        </ol>}
      </div>
      <button className="bg-emerald-700 w-30 h-10 m-5" onClick={async () => {
        const formattedRecipe = await apiRequest();
        setRecipe(formattedRecipe);
      }}>
        Generate
      </button>
    </div>
  );
};

export default MainLayout;

