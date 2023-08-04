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
      <div className="add-recipe-hero-img">
        <h1>Add New Recipe</h1>
      </div>
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
        <h3 className="add_recipe_form_category_heading">Category</h3>
        <div className="add_recipe_form_category">
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
            <label htmlFor="dessert">Dessert</label>
          </div>
        </div>
        <button type="submit">Save</button>
        <button onClick={cancelHandler}>Cancel</button>
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
