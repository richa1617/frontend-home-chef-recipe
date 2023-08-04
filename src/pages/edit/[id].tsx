import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

function edit() {
  const router = useRouter();
  let id = Number(router.query.id);

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    const userDetails = async () => {
      const response = await axios.get(`http://localhost:3000/edit/${id}`);
      console.log(response.data);
    };

    userDetails();
  }, []);

  console.log(id);
  return (
    <div>
      <h1>Edit me {id}</h1>
    </div>
  );
}

export default edit;
