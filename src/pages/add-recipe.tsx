import NavigationBar from "@/components/NavigationBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    if (!tokenFromLS) {
      router.push("/login");
    }
  }, []);

  //function to handle submit

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const categoryChecked = {
      breakfast: event.currentTarget.breakfast.checked, //true
      lunch: event.currentTarget.lunch.checked, //false
      dinner: event.currentTarget.dinner.checked, // true
      dessert: event.currentTarget.dessert.checked, //faslse
    };

    const arrayCategoryChecked = Object.entries(categoryChecked)
      .filter(([key, value]) => value === true)
      .map(([key]) => {
        return {
          name: key,
        };
      });

    // console.log(arrayCategoryChecked);

    const formData = {
      name: event.currentTarget.recipeName.value,
      img_url: event.currentTarget.img.value,
      instructions: event.currentTarget.instructions.value,
      ingredients: event.currentTarget.ingredients.value,
      prep_time: event.currentTarget.prepTime.value,
      serves: event.currentTarget.servers.value,
      category: arrayCategoryChecked,
    };

    const tokenFromLS = localStorage.getItem("token");
    if (!tokenFromLS) {
      return;
    }
    console.log(tokenFromLS);

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/create-recipe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokenFromLS}`,
          },
        }
      );
      console.log(response);
      setError(null);
    } catch (error) {
      setError("Something went wrong");
    }
  }

  function cancelHandler() {
    router.push("/");
  }
  return (
    <>
      <NavigationBar />
      <div className="bg-[url('/bg-new-add-recipe-hero.png')] bg-cover bg-left h-[60vh]">
        <h1 className="text-6xl text-black text-center">Add New Recipe</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="add_recipe_form w-full md:w-[50vw] -mt-20 mb-10 mx-auto p-8 rounded-lg shadow-xl bg-white"
      >
        <label htmlFor="recipe-name">Recipe Name</label>
        <br />
        <input
          type="text"
          id="recipe-name"
          name="recipeName"
          className="w-full max-w-full mb-5 mt-2 p-3 border-2 border-solid border-gray-300 rounded-md"
        />
        <label htmlFor="instructions">Instructions</label>
        <br />
        <textarea
          id="instruction"
          name="instructions"
          rows={8}
          className="w-full max-w-full mb-5 p-3 border-2 border-solid border-gray-300 rounded-md"
        ></textarea>
        <label htmlFor="ingredients">Ingredients</label>
        <br />
        <textarea
          id="ingredients"
          name="ingredients"
          rows={5}
          className="w-full max-w-full mb-5 p-3 border-2 border-solid border-gray-300 rounded-md"
        ></textarea>
        <div className="mb-4 flex flex-col md:flex-row">
          <div className="add_recipe_form_prep w-full md:w-3/5 pr-4 mb-4 md:mb-0">
            <label htmlFor="prep_time">Prep Time</label>
            <br />
            <input
              type="number"
              id="prep_time"
              name="prepTime"
              className="w-full p-2 border-2 border-solid border-gray-300 rounded-md"
            />
          </div>

          <div className="add_recipe_form_serves w-full md:w-2/5 md:pl-4">
            <label htmlFor="serves">Serves</label>
            <br />
            <input
              type="number"
              id="serves"
              name="servers"
              className="w-full p-2 border-2 border-solid border-gray-300 rounded-md"
            />
          </div>
        </div>

        <label htmlFor="img">Img URL</label>
        <br />
        <input
          type="text"
          id="img"
          name="img"
          className="w-full max-w-full mb-5 p-3 border-2 border-solid border-gray-300 rounded-md"
        />
        <h3 className="add_recipe_form_category_heading mb-4">Category</h3>
        <div className="add_recipe_form_category flex flex-col items-start md:flex-row justify-between md:items-center">
          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              id="breakfast"
              name="breakfast"
              className="mr-2 h-4 w-4 text-[#febd2f]"
            />
            <label htmlFor="breakfast" className="">
              Breakfast
            </label>
          </div>
          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              id="lunch"
              name="lunch"
              className="mr-2 h-4 w-4 text-[#febd2f]"
            />
            <label htmlFor="lunch">Lunch</label>
          </div>
          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              id="dinner"
              name="dinner"
              className="mr-2 h-4 w-4 text-[#febd2f]"
            />
            <label htmlFor="dinner">Dinner</label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              id="dessert"
              name="dessert"
              className="mr-2 h-4 w-4 text-[#febd2f]"
            />
            <label htmlFor="dessert">Dessert</label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#febd2f] rounded-full py-2 px-6 text-white text-lg font-semibold hover:outline-black hover:border-2 hover:border-solid hover:border-black mt-4 ml-4 transition duration-300"
        >
          Save
        </button>
        <button
          onClick={cancelHandler}
          className="bg-gray-300 rounded-full py-2 px-6 text-black text-lg font-semibold hover:bg-gray-400 hover:outline-black hover:border-2 hover:border-solid hover:border-black mt-4 ml-4 transition duration-300"
        >
          Cancel
        </button>
      </form>
    </>
  );
}

// console.log(recipeName);
// console.log(ingredients);
// console.log(instructions);
// console.log(prepTime);
// console.log(servers);
// console.log(img);
// console.log(breakfastChecked);
// console.log(lunchChecked);
// console.log(dinnerChecked);
// console.log(dessertChecked);
