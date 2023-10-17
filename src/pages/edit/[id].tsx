import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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
}

interface Category {
  id: number;
  name: string;
}
function Edit() {
  const router = useRouter();
  let id = Number(router.query.id);

  const [item, setItem] = useState<Recipe | null>(null);
  console.log(id);
  useEffect(() => {
    if (id === undefined) {
      return;
    }

    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/edit/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function cancelHandler() {
    router.push("/");
  }

  if (!item) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <NavigationBar />
      <div className="bg-[url('/bg-new-add-recipe-hero.png')] bg-cover bg-left h-[60vh]">
        <h1 className="text-6xl text-black text-center"> Edit Recipe</h1>
      </div>
      <h1>{id}</h1>
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
          value={item.name}
          className="w-full max-w-full mb-5 mt-2 p-3 border-2 border-solid border-gray-300 rounded-md"
        />
        <label htmlFor="instructions">Instructions</label>
        <br />
        <textarea
          id="instruction"
          name="instructions"
          value={item.instructions}
          rows={8}
          className="w-full max-w-full mb-5 p-3 border-2 border-solid border-gray-300 rounded-md"
        ></textarea>
        <label htmlFor="ingredients">Ingredients</label>
        <br />
        <textarea
          id="ingredients"
          name="ingredients"
          value={item.ingredients}
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
              value={item.prep_time}
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
              value={item.serves}
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
          value={item.img_url}
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
              checked={
                item?.category?.some(
                  (cat) => cat.name.toLowerCase() === "breakfast"
                ) || false
              }
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
              checked={
                item?.category?.some(
                  (cat) => cat.name.toLowerCase() === "dinner"
                ) || false
              }
            />
            <label htmlFor="dinner">Dinner</label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              id="dessert"
              name="dessert"
              className="mr-2 h-4 w-4 text-[#febd2f]"
              checked={
                item?.category?.some(
                  (cat) => cat.name.toLowerCase() === "dessert"
                ) || false
              }
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

export default Edit;
