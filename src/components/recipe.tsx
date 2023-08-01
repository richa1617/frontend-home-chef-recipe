import axios from "axios";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  emoji: string;
}

interface Recipe {
  id: number;
  name: string;
  img_url: string;
  instructions: string;
  ingredients: string;
  prep_time: number;
  serves: number;
  userId: number;
  category: Category[];
}

function RecipeList() {
  const [recipes, setRecipes] = useState<null | Recipe[]>(null);
  const [activeCategory, setActiveCategory] = useState<null | string>(null);

  // state: active filter

  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await axios.get("http://localhost:3000/recipe");
      setRecipes(response.data);
    };
    fetchRecipeData();
  }, []);

  if (recipes === null) {
    return <p>Loading</p>;
  }

  //Geting unique category
  let uniqueCategories = Array.from(
    new Set(
      recipes.flatMap((recipes) =>
        recipes.category.map((category) => category.name)
      )
    )
  );
  //console.log(uniqueCategories);

  const clickHandler = (category: string) => {
    setActiveCategory(category);
  };

  // Filter recipes based on activeCategory
  const filteredRecipes = activeCategory
    ? recipes.filter((recipe) =>
        recipe.category.some((category) =>
          category.name.includes(activeCategory)
        )
      )
    : recipes;

  return (
    <>
      <div>
        <button
          className={!activeCategory ? "active-button" : ""}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {uniqueCategories.map((category) => {
          return (
            <button
              key={category}
              className={activeCategory === category ? "active-button" : ""}
              onClick={() => clickHandler(category)}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredRecipes.map((recipe) => {
        return (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.instructions}</p>
            <p>{recipe.serves}</p>
          </div>
        );
      })}
    </>
  );
}

export default RecipeList;
