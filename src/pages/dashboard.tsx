import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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

  //recipe-servers-icon
  let serves = ["👤", "👤 👤", "👤 👤 👤", "👤 👤 👤 👤"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDetails = async () => {
      const response = await axios.get("http://localhost:3000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      setuserRecipe(response.data);
    };

    userDetails();
  }, []);

  function editHandler(editId: Number) {
    router.push(`/edit/${editId}`);
  }

  if (!userRecipe) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1>Welcome</h1>
      <div>
        <div>
          {userRecipe.map((recipe) => {
            return (
              <section key={recipe.id}>
                <h1>{recipe.name}</h1>

                <p>Serves :{`${serves[recipe.serves - 1]}`}</p>
                <p>{recipe.prep_time}</p>
                <div>
                  <button
                    onClick={() => {
                      editHandler(recipe.id);
                    }}
                  >
                    Edit
                  </button>
                  <button>Delete</button>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

// const token = localStorage.getItem("token")
