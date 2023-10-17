import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import AddCommentForm from "@/components/AddCommentForm";
import NavigationBar from "@/components/NavigationBar";

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
  console.log(idFromUrl);
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
      console.log(recipe.data);
    };
    getRecipeFromApi();
  }, [idFromUrl]);

  if (!recipe) {
    // If recipe is still null, this means we are waiting for the request to complete (loading)
    return <div>Loading ...</div>;
  }

  const servesAsString = String(recipe.serves);
  const prepTimeAsString = String(recipe.prep_time);
  const recipeCategories = recipe.category;
  // const commentsFromRecipe = Recipe.comment.map(recipe) =>
  return (
    <>
      <div className="recipeDetailsPage bg-[#f5f3ef] min-h-screen">
        <div className="navbarDetailPage bg-[#febd2f] p-3 rounded-t-lg relative z-10">
          <NavigationBar />
        </div>
        <div
          className="recipeHero h-[60vh] w-full relative bg-cover bg-center bg-no-repeatborder-2 border-red-300 border-solid flex justify-center flex-col overflow-hidden -mt-10 rounded-3xl"
          style={{
            backgroundImage: `url(${recipe.img_url})`,
          }}
          title={`picture of ${recipe.name}`}
        >
          <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
          <h1 className="recipeH1 text-white text-center text-5xl font-semibold relative z-20">
            {recipe.name}
          </h1>
          <div className="categoryH2 text-white text-center relative z-20">
            {recipe.category.map((c) => {
              return (
                <h2 className="text-2xl" key={c.name}>
                  {c.name}
                </h2>
              );
            })}
          </div>
          <span className="text-white text-center text-xl absolute bottom-5 left-1/2 transform -translate-x-1/2">
            Placeholder for Star Rating
          </span>
          <span className="text-white text-center text-xl absolute bottom-0 left-1/2 transform -translate-x-1/2">
            ⭐️⭐️⭐️⭐️⭐️(hardcoded)
          </span>
        </div>

        <div className="recipeContainer w-[70%] mx-auto bg-white rounded-b-lg shadow-lg z-10 mt-10 p-10 border-2 border-green-500 border-solid flex flex-col h-[50vh]">
          <div className="recipeContainerHeader flex justify-between border-b border-gray-300 pb-4 mb-4">
            <h2 id="recipeTitle" className="text-xl font-semibold">
              {recipe.name}
            </h2>
            <div className="servesAndPrepTime flex">
              <div className="text-gray-500 mr-4">
                <h2 id="u1" className="font-semibold">
                  Serves
                </h2>
                <h2 id="b1" className="text-xl">
                  {servesAsString}
                </h2>
              </div>
              <div className="text-gray-500">
                <h2 id="u2" className="font-semibold">
                  Prep Time
                </h2>
                <h2 id="b2" className="text-xl">
                  {prepTimeAsString}
                </h2>
              </div>
            </div>
          </div>
          <div className="recipeContainerBody flex border-2 border-solid border-red-400">
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-semibold">Instructions</h2>
              <p className="text-xs">{recipe.instructions}</p>
            </div>
            <div className="containerIngredients w-full md:w-1/2">
              <h2 className="text-xl font-semibold">Ingredients</h2>
              <p className="text-xs">{recipe.ingredients}</p>
            </div>
          </div>
        </div>

        <div className="addCommentSection mt-10">
          <div className="addCommentH1 text-center">
            <h1 className="text-3xl font-semibold">Add a Comment</h1>
          </div>
          <AddCommentForm />
        </div>

        <div className="CommentsSection mt-10">
          <h1 className="text-3xl font-semibold mt-28 flex justify-center">
            Comments
          </h1>
          <div className="commentsGrid flex flex-wrap gap-4 mt-20">
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
