import { useEffect, useState } from "react";
import axios from "axios";

function dashboard() {
  useEffect(() => {
    const getDetails = async (token: string) => {
      const response = await axios.get("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
    };

    const token = localStorage.getItem("token");
    console.log(token);
    if (token === null) {
      return;
    }
    getDetails(token);
  }, []);

  return <div>Welcome</div>;
}

export default dashboard;
