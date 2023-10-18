import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import AddCommentForm from "@/components/AddCommentForm";
import NavigationBar from "@/components/NavigationBar";
import People from "@/components/People";

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
  comment: Comment[];
}

interface Comment {
  id: number;
  name: string;
  rating: number;
  message: string;
  created_at: string;
  recipeId: number;
}

interface Category {
  id: number;
  name: string;
  emoji: string;
}

const RecipesPage = () => {
  const router = useRouter();
  const idFromUrl = router.query.recipeId;

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (idFromUrl === undefined) {
      return;
    }

    const getRecipeFromApi = async () => {
      const recipe = await axios.get(
        `http://localhost:3000/recipe/${idFromUrl}`
      );

      setRecipe(recipe.data);
    };
    getRecipeFromApi();
  }, [idFromUrl]);

  if (!recipe) {
    // If recipe is still null, this means we are waiting for the request to complete (loading)
    return <div>Loading ...</div>;
  }

  // const servesAsString = String(recipe.serves);
  // const prepTimeAsString = String(recipe.prep_time);
  // const recipeCategories = recipe.category;

  return (
    <>
      <div className="w-full min-h-screen ">
        <div className=" bg-[#febd2f] relative z-10 w-full">
          <NavigationBar />
        </div>
        <div
          className="h-[60vh] w-full relative bg-cover bg-center bg-no-repeat flex flex-col justify-center overflow-hidden -mt-10 rounded-3xl"
          style={{ backgroundImage: `url(${recipe.img_url})` }}
          title={`picture of ${recipe.name}`}
        >
          <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
          <h1 className=" text-white text-center text-5xl font-semibold relative z-20">
            {recipe.name}
          </h1>
          <div className=" text-white text-center z-20 ">
            {recipe.category.map((c, index) => {
              const categoryName =
                index !== 0
                  ? "-" + c.name
                  : c.name.charAt(0).toUpperCase() + c.name.slice(1);

              return (
                <span
                  className={`text-base ${index !== 0 ? "ml-1" : ""}`}
                  key={c.name}
                >
                  {categoryName}
                </span>
              );
            })}
          </div>

          <div className="text-white text-center text-xl z-20 ">
            ⭐️⭐️⭐️⭐️⭐️
          </div>
        </div>

        <div className="w-full md:w-[60%] mx-auto bg-white rounded-[20px] shadow-lg relative z-100 -mt-10 py-4 px-6 border-2 flex flex-col h-[50vh] -mt-20px ">
          <div className="flex justify-between border-b-[1px] border-gray-700 pb-2 mb-2 border-dashed flex-col sm:flex-row">
            <h2
              id="recipeTitle"
              className="text-xl font-semibold text-[#febd2f]"
            >
              {recipe.name}
            </h2>
            <div className="flex flex-col sm:flex-row mt-2 sm:mt-0 ">
              <div className="flex items-center mb-2 sm:mb-0">
                <h2 className="font-semibold text-sm text-black mr-1">
                  Serves:
                </h2>
                <h2 className=" text-gray-400 mr-3 text-sm flex flex-row ">
                  <People count={recipe.serves} />
                </h2>
              </div>
              <div className="flex items-center md:ml-4">
                <h2 className="font-semibold text-black mr-1 text-sm">
                  Prep Time:
                </h2>
                <h2 className=" text-gray-400 text-sm">
                  {recipe.prep_time} min
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-10">
            <div className="w-full md:w-[40%]  mb-6">
              <h2 className="text-xl font-semibold">Instructions</h2>
              <p className="text-xs">{recipe.instructions}</p>
            </div>
            <div className=" w-full md:w-[40%] ">
              <h2 className="text-xl font-semibold">Ingredients</h2>
              <ul className="list-disc list-inside text-xs text-justify">
                {recipe.ingredients.split(", ").map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className=" mt-10">
          <div className=" text-center">
            <h1 className="text-3xl font-semibold">Add a Comment</h1>
          </div>
          <AddCommentForm />
        </div>

        <div className=" mt-10">
          <h1 className="text-3xl font-semibold mt-28 flex justify-center">
            Comments
          </h1>
          <div className=" flex flex-wrap mt-20">
            {recipe.comment.map((comment, index) => {
              return (
                <div
                  className="bg-white rounded-lg shadow-lg p-4 w-40vw h-20vh md:w-[40%] md:h-40vh md:mr-4"
                  key={index}
                >
                  <h3 className="text-xl font-semibold">{comment.name}</h3>
                  <p className="text-gray-500">{comment.created_at}</p>
                  <p>{comment.message}</p>
                  <p className="text-xl">{comment.rating}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipesPage;
