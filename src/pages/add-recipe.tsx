import NavigationBar from "@/components/NavigationBar";
import { useState } from "react";

// interface FormData{
//   recipeName:string;
//   instructions :string;
//   ingredients:string;
//   prepTime :number;
//   servers:Number;
//   imgUrl:Number;
//   category :string[]
// }

export default function AddRecipe() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const recipeName = event.currentTarget.recipeName.value;
    const instructions = event.currentTarget.instructions.value;
    const ingredients = event.currentTarget.ingredients.value;
    const prepTime = event.currentTarget.prepTime.value;
    const servers = event.currentTarget.servers.value;
    const img = event.currentTarget.img.value;
    const breakfastChecked = event.currentTarget.breakfast.checked;
    const lunchChecked = event.currentTarget.lunch.checked;
    const dinnerChecked = event.currentTarget.dinner.checked;
    const dessertChecked = event.currentTarget.dessert.checked;

    console.log(recipeName);
    console.log(ingredients);
    console.log(instructions);
    console.log(prepTime);
    console.log(servers);
    console.log(img);
    console.log(breakfastChecked);
    console.log(lunchChecked);
    console.log(dinnerChecked);
    console.log(dessertChecked);

    event.preventDefault();
  }
  return (
    <>
      <NavigationBar />
      <div className="add-recipe-hero-img"></div>
      <form onSubmit={handleSubmit} className="add_recipe_form">
        <label htmlFor="recipe-name">Recipe-Name</label> <br></br>
        <input type="text" id="recipe-name" name="recipeName" /> <br></br>
        <label htmlFor="instructions">Instructions</label>
        <br></br>
        <textarea id="instruction" name="instructions" rows={8} />
        <br></br>
        <label htmlFor="ingredients">Ingredients</label> <br></br>
        <textarea id="ingredients" name="ingredients" rows={5} />
        <br></br>
        <div className="add_recipe_form_prep_serves">
          <div className="add_recipe_form_prep">
            <label htmlFor="prep_time">Prep_Time</label> <br></br>
            <input type="number" id="prep_time" name="prepTime" />
          </div>

          <div className="add_recipe_form_serves">
            <label htmlFor="serves">Serves</label> <br></br>
            <input type="number" id="serves" name="servers" />
          </div>
        </div>
        <label htmlFor="imgr">Img_url</label>
        <br></br>
        <input type="text" id="img" name="img" /> <br></br>
        <h3>Category</h3>
        <div className="add_recipe_category">
          <div>
            <input type="checkbox" id="breakfast" name="breakfast" />
            <label htmlFor="breakfast">Breakfast</label>
          </div>

          <div>
            <input type="checkbox" id="lunch" name="lunch" />
            <label htmlFor="lunch">Lunch</label>
          </div>

          <div>
            <input type="checkbox" id="dinner" name="dinner" />
            <label htmlFor="dinner">Dinner</label>{" "}
          </div>

          <div>
            <input type="checkbox" id="dessert" name="dessert" />
            <label htmlFor="dessert">Dinner</label>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
