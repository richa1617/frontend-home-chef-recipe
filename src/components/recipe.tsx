import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UtensilsCrossed } from "lucide-react";
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
    <main className="w-[90vw] grid grid-cols-10 mx-auto mt-20 ">
      <div className="col-span-3 md:col-span-2 col-start-2  ">
        <h1 className="flex items-center text-xl md:text-3xl lg:text-4xl font-serif text-[rgb(219,163,43)] col-start-3 md:col-start-1 ">
          Recipe{" "}
          <span className="ml-2">
            <UtensilsCrossed />
          </span>
        </h1>
      </div>
      <div className="mb-4 md:mb-8 col-span-5 md:col-span-8  col-start-5">
        <input
          type="search"
          placeholder="Search For Recipes..."
          className="w-full px-2 py-2 md:px-4 md:py-2 rounded-full border border-gray-300 bg-white bg-no-repeat bg-left-center md:pl-14"
        ></input>
      </div>
      <div className="col-span-8 md:col-span-2 md:mr-4  w-full mx-auto col-start-2 ">
        <div className="flex flex-col justify-center items-center md:items-start">
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
              className="col-span-8 md:ml-4 md:col-span-4 flex md:h-80 sm:h-[320px] rounded-lg bg-white shadow-lg cursor-pointer transform transition-transform hover:translate-y-[-10px] hover:shadow-xl col-start-2"
            >
              <div
                style={{
                  backgroundImage: `url(${recipe.img_url})`,
                }}
                className="recipe_img w-1/2 rounded-l-lg bg-cover bg-center"
              ></div>
              <div className="recipe_container_right w-1/2 p-5 flex flex-col justify-between">
                <h2 className="text-l md:text-2xl font-semibold font-serif">
                  {recipe.name}
                </h2>
                <h1 className="text-xs md:text-xl sm:text-sm sm:mb-4">
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

                <div className="md:mt-auto flex flex-col md:flex-row justify-center mt-4">
                  <div className="md:mb-0  flex flex-row md:flex-col">
                    <p className="text-xs mr-2 md:text-l text-gray-900">
                      Serves
                    </p>
                    <span className="text-gray-400 text-xs md:text-base">
                      {serves[recipe.serves - 1]}
                    </span>
                  </div>
                  {/* Separator visible on laptop screens */}
                  <div className="hidden md:block md:ml-2">
                    <span className="text-gray-900 text-xs md:text-base">
                      |
                    </span>
                  </div>
                  <div className="md:ml-2 flex flex-row md:flex-col">
                    <p className="text-xs mr-[4px] md:text-l text-gray-900">
                      Prep time
                    </p>
                    <span className="text-gray-400 text-xs md:text-base">
                      {recipe.prep_time} min
                    </span>
                  </div>
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
