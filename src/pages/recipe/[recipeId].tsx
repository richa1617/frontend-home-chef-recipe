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
  category: Category;
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
  return (
    <>
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
          <span>Placeholder for Recipe Categories</span>
          <span>Placeholder for Star Rating</span>
          <span>⭐️⭐️⭐️⭐️⭐️(hardcoded)</span>
          <div className="blackOpacity"></div>
        </div>

        <div className="recipeContainer">
          <div className="recipeContainerHeader">
            <h2>{recipe.name}</h2>
            <div className="recipeContainerHeaderRightPart">
              <h2>Serves {servesAsString}</h2>
              <h2>Prep Time {prepTimeAsString}</h2>
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
        <div className="addCommentForm">
          <AddCommentForm />
        </div>
      </div>
      <div className="previousCommentsSection">
        <h2>CommentsPlaceholder for user comments</h2>
      </div>
    </>
  );
};

export default RecipesPage;
