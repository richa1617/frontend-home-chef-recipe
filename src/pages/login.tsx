import NavigationBar from "@/components/NavigationBar";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userName = event.currentTarget.userName.value;
    const userPassword = event.currentTarget.userPassword.value;

    console.log(userName);
    if (!userName && !userPassword) {
      return;
    }
    console.log(userPassword);
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: userName,
        password: userPassword,
      });
      // console.log(response.data.token); // we are getting the token
      setError(null);

      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } catch (error) {
      setError("Something went wrong");
    }
  }
  return (
    <div className="login-bg-img">
      <NavigationBar />

      <form onSubmit={handleSubmit} className="login_form">
        <h1>LOGIN</h1>
        <label htmlFor="username">Username</label> <br></br>
        <input type="text" id="username" name="userName" /> <br></br>
        <label htmlFor="password">Password</label> <br></br>
        <input type="password" id="password" name="userPassword" /> <br></br>
        <button type="submit" className="login_form_btn">
          Login
        </button>
        {error ? <p>Something went wrong</p> : ""}
      </form>
    </div>
  );
}
