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

  return (
    <section className=" w-full">
      <main className="w-full">
        <NavigationBar />
        <div className="h-[30vh] md:h-[70vh] w-full bg-cover bg-center bg-no-repeat bg-[url('/hero.png')] ">
          <div className="text-2xl md:text-6xl font-serif max-w-full border-2 border-solid border-red-500 w-[50vw] relative md:top-[120px] text-center pt-10 ">
            <div className=" flex flex-row md:flex-col">
              <span className="mr-3">Home</span>
              <span className="mr-3">Chef</span>
              <span>Recipe</span>
            </div>
          </div>
        </div>
      </main>

      <div>
        {recipes && <RecipeList recipes={recipes} />}
        <div className="add_recipe_button bg-[url('/bg-homepage-button-new-recipe.png')] bg-center bg-cover bg-no-repeat w-[70vw] h-[40vh] rounded-3xl mx-auto my-40 flex justify-center items-center">
          <div className="add_recipe_text text-5xl">
            <a href="/add-recipe" className="text-black no-underline">
              Add <br /> New <br /> Recipe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
