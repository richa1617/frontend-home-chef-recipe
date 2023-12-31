import NavigationBar from "@/components/NavigationBar";

import RecipeList, { Recipe } from "@/components/recipe";
import { useEffect, useState } from "react";
import axios from "axios";
import AddNewRecipeButton from "@/components/AddNewRecipeButton";

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
    <section className="w-full bg-yellow-50">
      <main className="w-full">
        <NavigationBar />
        <div className="h-[30vh] md:h-[70vh] w-full bg-cover bg-center bg-no-repeat bg-[url('/hero.png')] flex items-center ">
          <div className="text-4xl md:text-6xl font-serif max-w-full w-[50vw] relative text-center pt-10">
            <div className=" flex flex-col">
              <span className="mr-3">Home</span>
              <span className="mr-3">Chef</span>
              <span>Recipe</span>
            </div>
          </div>
        </div>
      </main>

      <div className=" bg-yellow-50">
        {recipes && <RecipeList recipes={recipes} />}

        <AddNewRecipeButton />
      </div>
    </section>
  );
}
