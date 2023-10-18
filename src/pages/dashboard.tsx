import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NavigationBar from "@/components/NavigationBar";

interface Category {
  id: number;
  name: string;
  emoji: string;
}

interface Comment {
  id: number;
  name: string;
  rating: number;
  message: string;
  created_at: Date;
  recipeId: number;
}

export interface Recipe {
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

function Dashboard() {
  const [userRecipe, setuserRecipe] = useState<null | Recipe[]>(null);
  const router = useRouter();

  // Recipe serves icons
  let serves = ["👤", "👤 👤", "👤 👤 👤", "👤 👤 👤 👤"];

  useEffect(() => {
    const token = localStorage.getItem("token");

    const userDetails = async () => {
      const response = await axios.get("http://localhost:3000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setuserRecipe(response.data);
    };

    userDetails();
  }, []);

  function editHandler(editId: Number) {
    router.push(`/edit/${editId}`);
  }

  function deleteHandler(deleteId: Number) {
    router.push(`/delete/${deleteId}`);
  }

  if (!userRecipe) {
    return <p>Loading</p>;
  }

  return (
    <>
      <NavigationBar />
      <div className="bg-[url('/bg-new-add-recipe-hero.png')] bg-cover bg-left h-[60vh]">
        <h1 className="text-6xl text-black text-center">Dashboard</h1>
      </div>
      <div className="flex flex-col mx-atuo md:w-[70vw] -mt-20 mb-10 mx-auto p-8 rounded-lg shadow-xl bg-white">
        {userRecipe.map((recipe) => (
          <section key={recipe.id} className="w-full px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="text-[#0D0D0D] text-2xl font-semibold mb-4">
                  {recipe.name}
                </h1>
                <div className="flex flex-row">
                  <p className="text-[#0D0D0D] text-sm mb-2 mr-4">
                    Serves: {`${serves[recipe.serves - 1]}`}
                  </p>
                  <p className="text-[#0D0D0D] text-sm mb-2">
                    Prep Time: {recipe.prep_time}m
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <button
                  onClick={() => {
                    editHandler(recipe.id);
                  }}
                  className="bg-[#FEBD2F] text-[#000] text-sm font-semibold py-2 px-4 rounded-lg hover:bg-[#FEBD2F] hover:text-[#000] transition duration-300 ease-in-out mb-4"
                >
                  Edit
                </button>
                <button
                  className="bg-[#0D0D0D] text-[#FFF] text-sm font-semibold py-2 px-4 rounded-lg hover:bg-[#0D0D0D] hover:text-[#FFF] transition duration-300 ease-in-out"
                  onClick={() => {
                    deleteHandler(recipe.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
