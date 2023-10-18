import React from "react";

function AddNewRecipeButton() {
  return (
    <>
      <div className="add_recipe_button bg-[url('/bg-homepage-button-new-recipe.png')] bg-center bg-cover bg-no-repeat w-[70vw] h-[40vh] rounded-3xl mx-auto my-40 flex justify-center items-center">
        <div className="add_recipe_text text-5xl">
          <a href="/add-recipe" className="text-black no-underline">
            Add <br /> New <br /> Recipe
          </a>
        </div>
      </div>
    </>
  );
}

export default AddNewRecipeButton;
