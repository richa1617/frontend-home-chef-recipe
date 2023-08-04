import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  emoji: string;
}

interface Comment {
  id: number;
  name: string;
  rating: number;
  message: string;
  created_at: Date;
  recipeId: number;
}

export interface Recipe {
  id: number;
  name: string;
  img_url: string;
  instructions: string;
  ingredients: string;
  prep_time: number;
  serves: number;
  userId: number;
  category: Category[];
  comment: Comment[];
}

interface RecipeListProps {
  recipes: Recipe[];
}

function RecipeList(props: RecipeListProps) {
  const router = useRouter();
  const recipes = props.recipes;

  const [activeCategory, setActiveCategory] = useState<null | string>(null);

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
    //console.log(id);
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

  //star icon
  const starIcon = [
    "⭐️",
    "⭐️ ⭐️",
    "⭐️ ⭐️ ⭐️",
    "⭐️ ⭐️ ⭐️ ⭐️",
    "⭐️ ⭐️ ⭐️ ⭐️ ⭐️",
  ];

  return (
    <main className="recipe_main">
      <h1>Recipe</h1>
      <input
        type="search"
        placeholder="Search For Recipes..."
        className="recipe_search"
      ></input>
      <div className="recipe_button_container">
        <button
          className={` recipe_button ${!activeCategory ? "active-button" : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          <span className="button_icons">🍴</span> All
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
              <span className="button_icons">{`${categoryIcons[category]}`}</span>{" "}
              {category}
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
              <div
                style={{
                  backgroundImage: `url(${recipe.img_url})`,
                }}
                className="recipe_img"
              ></div>
              <div className="recipe_container_right">
                <h2>{recipe.name}</h2>

                <h1>
                  {
                    starIcon[
                      recipe.comment.length == 0
                        ? 0
                        : recipe.comment
                            .map((c) => c.rating) // [4.5]
                            .reduce((a, b) => a + b) / recipe.comment.length
                    ]
                  }
                </h1>
                <div className="recipe_bottom">
                  <p>
                    <span className="recipe_bottom_heading">Serves</span>{" "}
                    <br></br>
                    <span className="recipe_bottom_content">{`${
                      serves[recipe.serves - 1]
                    }`}</span>
                  </p>
                  <div>|</div>
                  <p>
                    <span className="recipe_bottom_heading">Prep time</span>{" "}
                    <br></br>
                    <span className="recipe_bottom_content">
                      {" "}
                      {recipe.prep_time} min
                    </span>
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
