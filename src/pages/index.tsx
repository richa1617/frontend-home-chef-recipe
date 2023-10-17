import Head from "next/head";

import NavigationBar from "@/components/NavigationBar";

import RecipeList, { Recipe } from "@/components/recipe";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./dashboard";

export default function Home() {
  const [recipes, setRecipes] = useState<null | Recipe[]>(null);
  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await axios.get("http://localhost:3000/recipe");
      setRecipes(response.data);
    };
    fetchRecipeData();
  }, []);

  const backgroundImageUrl = "/bg-homepage-hero.png";
  return (
    <>
      <main
        className="min-h-[60vh] w-full bg-cover bg-right bg-no-repeat  "
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <NavigationBar />{" "}
        <div className="max-w-[75vw] rounded-b-[50px] mx-auto ">
          <h1 className="hero_title text-6xl ml-10">
            Home <br /> Chef <br /> Recipe <br />
          </h1>
        </div>
      </main>

      {recipes && <RecipeList recipes={recipes} />}
      <div className="add_recipe_button bg-[url('/bg-homepage-button-new-recipe.png')] bg-center bg-cover bg-no-repeat w-[70vw] h-[40vh] rounded-3xl mx-auto my-40 flex justify-center items-center">
        <div className="add_recipe_text text-5xl">
          <a href="/add-recipe" className="text-black no-underline">
            Add <br /> New <br /> Recipe
          </a>
        </div>
      </div>
    </>
  );
}
