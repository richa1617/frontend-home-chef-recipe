import NavigationBar from "@/components/NavigationBar";
import axios from "axios";
import { use } from "react";

export default function Login() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userName = event.currentTarget.userName.value;
    const userPassword = event.currentTarget.userPassword.value;

    console.log(userName);
    console.log(userPassword);

    const response = await axios.post("http://localhost:3000/login", {
      username: userName,
      password: userPassword,
    });

    console.log(response.data.token);
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
      </form>
    </div>
  );
}
