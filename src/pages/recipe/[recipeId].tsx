import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import AddCommentForm from "@/components/AddCommentForm";

interface Recipe {
  id: Number;
  name: String;
  img_url: String;
  instructions: String;
  ingredients: String;
  prep_time: Number;
  serves: Number;
  userId: Number;
  category: Category;
}

interface Category {
  id: Number;
  name: String;
  emoji: String;
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
  return (
    <>
      <h1>{recipe.name}</h1>
      <h3>{/* {recipe.category.emoji} {recipe.category.name} */}</h3>
      <p>{recipe.name}'s</p>
      <p>Serves {servesAsString}</p>
      <p>Prep Time {prepTimeAsString}</p>
      <div>
        <h2>Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>
          <li>{recipe.ingredients}</li>
        </ul>
      </div>
      <AddCommentForm />
    </>
  );
};

export default RecipesPage;
