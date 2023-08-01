import axios from "axios";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  emoji: string;
  recipe: Recipe[];
}

interface Recipe {
  id: number;
  name: string;
  img_url: string;
  instructions: string;
  ingredients: string;
  prep_time: number;
  serves: number;
  userId: number;
}
function CategoryButton() {
  const [categoryAll, setCateogryAll] = useState<null | Category[]>(null);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await axios.get("http://localhost:3000/category");
      setCateogryAll(response.data);
    };
    fetchRecipeData();
  }, []);
  return <div>
    
  </div>;
}

export default CategoryButton;
