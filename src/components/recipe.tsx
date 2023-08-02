import axios from "axios";
import { useRouter } from "next/router";
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
  const router = useRouter();
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
  ); //[breakd]
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

  // to get id of recipe which is clicked
  function clickHandleForRecipeId(id: Number) {
    router.push(`recipe/${id}`);
    console.log(id);
  }

  //recipe-servers-icon
  let serves = ["👤", "👤 👤", "👤 👤 👤", "👤 👤 👤 👤"];

  //category-icons

  const categoryIcons = {
    breakfast: "🍳",
    lunch: "🥯",
    dinner: "🥘",
    dessert: "🧁",
  } as any;

  return (
    <main className="recipe_main">
      <h1>Recipe</h1>
      <input
        type="search"
        placeholder="Search For Recipes"
        className="recipe_search"
      ></input>
      <div className="recipe_button_container">
        <button
          className={` recipe_button ${!activeCategory ? "active-button" : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          <span>🍴</span> All
        </button>
        {uniqueCategories.map((category) => {
          return (
            <button
              key={category}
              className={`recipe_button  
                ${activeCategory === category ? "active-button" : ""}
                `}
              onClick={() => clickHandler(category)}
            >
              <span>{`${categoryIcons[category]}`}</span> {category}
            </button>
          );
        })}
      </div>

      <div className="recipe_container">
        {filteredRecipes.map((recipe) => {
          return (
            <section
              key={recipe.id}
              onClick={() => clickHandleForRecipeId(recipe.id)}
              className="recipe_card"
            >
              <div className="recipe_img">
                <img src={recipe.img_url} className="img" />
              </div>
              <div className="recipe_container_right">
                <h2>{recipe.name}</h2>
                <div className="recipe_detail">
                  <p>
                    Serves <br></br> {`${serves[recipe.serves - 1]}`}
                  </p>
                  <p>
                    Prep_time <br></br>
                    {recipe.prep_time}
                  </p>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

export default RecipeList;
