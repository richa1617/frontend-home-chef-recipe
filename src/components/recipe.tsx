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
    <main className="recipe_main grid grid-cols-10 gap-10 mx-auto max-w-screen-xl mt-20 pl-10 pr-10">
      <h1 className="col-span-2">Recipe</h1>
      <input
        type="search"
        placeholder="Search For Recipes..."
        className="col-span-8 px-4 py-2 rounded-full border border-gray-300 bg-white bg-no-repeat bg-left-center pl-14"
      ></input>
      <div className="col-span-8 md:col-span-2 ">
        <div>
          <button
            className={`recipe_button w-full py-2 mb-2 border border-gray-300 rounded-full text-left cursor-pointer ${
              !activeCategory ? "bg-yellow-400" : ""
            }`}
            onClick={() => setActiveCategory(null)}
          >
            <span className="button_icons text-center w-10 h-10 border border-gray-300 rounded-full inline-block text-xl">
              🍴
            </span>{" "}
            All
          </button>
          {uniqueCategories.map((category) => {
            return (
              <button
                key={category}
                className={`recipe_button w-full py-2 mb-2 border border-gray-300 rounded-full text-left cursor-pointer ${
                  (activeCategory === category && "bg-yellow-400") || ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                <span className="button_icons text-center w-10 h-10 border border-gray-300 rounded-full inline-block text-xl">
                  {`${categoryIcons[category]}`}
                </span>{" "}
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="col-span-8 grid grid-cols-8 gap-10">
        {filteredRecipes.map((recipe) => {
          return (
            <section
              key={recipe.id}
              onClick={() => clickHandleForRecipeId(recipe.id)}
              className="col-span-8 md:col-span-4 flex max-w-2xl h-80 rounded-lg bg-white shadow-lg cursor-pointer transform transition-transform hover:translate-y-[-10px] hover:shadow-xl"
            >
              <div
                style={{
                  backgroundImage: `url(${recipe.img_url})`,
                }}
                className="recipe_img w-1/2 rounded-l-lg bg-cover bg-center"
              ></div>
              <div className="recipe_container_right w-1/2 p-5 flex flex-col justify-between">
                <h2 className="text-2xl font-semibold font-serif">
                  {recipe.name}
                </h2>
                <h1 className="text-xl font-semibold">
                  {
                    starIcon[
                      recipe.comment.length === 0
                        ? 0
                        : recipe.comment
                            .map((c) => c.rating)
                            .reduce((a, b) => a + b) / recipe.comment.length
                    ]
                  }
                </h1>
                <div className="recipe_bottom mt-auto flex justify-between">
                  <p className="recipe_bottom_heading text-gray-900">
                    Serves <br />
                    <span className="text-gray-400">
                      {serves[recipe.serves - 1]}
                    </span>
                  </p>
                  <div>|</div>
                  <p className="text-gray-900">
                    Prep time <br />
                    <span className="text-gray-400">
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
