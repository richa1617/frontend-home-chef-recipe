import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

const RecipesPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <h1>
      Recipe Title {id}! <br />
      Add Categories <br />
      Add Rating <br />
      Add Ingredients and instructions
    </h1>
  );
};

export default RecipesPage;
