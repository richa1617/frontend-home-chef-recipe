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
      router.push("/");
    } catch (error) {
      setError("Something went wrong");
    }
  }
  return (
    <div className="bg-[url('/bg-login.png')] bg-center bg-cover h-screen">
      <NavigationBar />

      <form
        onSubmit={handleSubmit}
        className="login_form p-10 mx-auto mt-10 bg-white rounded-lg shadow-lg w-80 md:w-96"
      >
        <h1 className="text-3xl font-semibold mb-5 text-center">LOGIN</h1>
        <label htmlFor="username" className="text-base font-semibold">
          Username
        </label>
        <br />
        <input
          type="text"
          id="username"
          name="userName"
          className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />
        <label htmlFor="password" className="text-base font-semibold">
          Password
        </label>
        <br />
        <input
          type="password"
          id="password"
          name="userPassword"
          className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />
        <button
          type="submit"
          className="login_form_btn bg-[#febd2f] text-white rounded-lg py-2 px-4 font-medium hover:bg-[#febd2f] hover:outline-none transition duration-300 ease-in-out"
        >
          Login
        </button>
        {error ? <p className="text-red-500 mt-2">Something went wrong</p> : ""}
      </form>
    </div>
  );
}
