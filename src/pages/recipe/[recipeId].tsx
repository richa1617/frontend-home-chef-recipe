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
      <div className="recipeDetailsPage">
        <div className="navbarDetailPage">
          <NavigationBar />
        </div>
        <div className="recipeHeroAndBody">
          <div
            className="recipeHero"
            style={{
              backgroundImage: `url(${recipe.img_url})`,
            }}
            title={`picture of ${recipe.name}`}
          >
            <h1 className="recipeH1">{recipe.name}</h1>
            {/* <h3>{recipe.category.name}</h3> */}
            <div className="categoryH2">
              {recipe.category.map((c) => {
                return <h2>{c.name}</h2>;
              })}
            </div>
            <span>Placeholder for Star Rating</span>
            <span>⭐️⭐️⭐️⭐️⭐️(hardcoded)</span>
            <div className="blackOpacity"></div>
          </div>

          <div className="recipeContainer">
            <div className="recipeContainerHeader">
              <h2 id="recipeTitle">{recipe.name}</h2>
              <div className="servesAndPrepTime">
                <h2 id="u1">Serves </h2>
                <h2 id="b1">{servesAsString}</h2>

                <h2 id="u2">Prep Time </h2>
                <h2 id="b2">{prepTimeAsString}</h2>
              </div>
            </div>
            <div className="recipeContainerBody">
              <div className="containerInstructions">
                <h2>Instructions</h2>
                <p>{recipe.instructions}</p>
              </div>
              <div className="containerIngredients">
                <h2>Ingredients</h2>
                <p>{recipe.ingredients}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="addCommentSection">
          <div className="addCommentH1">
            <h1>Add a Comment</h1>
          </div>

          <AddCommentForm />
        </div>
        <div className="CommentsSection">
          <h1>Comments</h1>
          <div className="commentsGrid">
            {recipe.comment.map((comment) => {
              return (
                <div className="commentOne">
                  <h3>{comment.name}</h3>
                  <p>{comment.created_at}</p>
                  <p>{comment.message}</p>
                  <p>{comment.rating}</p>
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
