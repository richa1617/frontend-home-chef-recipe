import NavigationBar from "@/components/NavigationBar";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import axios, { AxiosError } from "axios";

const formData = z.object({
  username: z.string().min(5),
  password: z.string().min(10),
});

type DataFromForm = z.infer<typeof formData>;

export default function Register() {
  const router = useRouter();
  const [userNameError, setUsernameError] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataFromForm>({
    resolver: zodResolver(formData),
  });

  async function handleFormSubmit(data: DataFromForm) {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3000/register", {
        username: data.username,
        password: data.password,
      });

      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          if (
            error.response.status === 400 &&
            error.response.data === "Please try a different username"
          ) {
            setUsernameError(
              "Username is already taken. Please choose another username."
            );
          }
        }
      } else {
        console.log("Something went wrong");
      }
    }
  }
  return (
    <div className="bg-[url('/bg-login.png')] bg-center bg-cover h-screen">
      <NavigationBar />

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="login_form p-10 mx-auto mt-10 bg-white rounded-lg shadow-lg w-80 md:w-96"
      >
        <h1 className="text-3xl font-semibold mb-5 text-center">REGISTER</h1>

        <label htmlFor="username" className="text-base font-semibold">
          Username
        </label>
        <br />
        <input
          type="text"
          id="username"
          {...register("username")}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />
        {errors.username && <p>{errors.username.message}</p>}

        <label htmlFor="password" className="text-base font-semibold">
          Password
        </label>
        <br />
        <input
          type="password"
          id="password"
          {...register("password")}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button
          type="submit"
          className="login_form_btn bg-[#febd2f] text-white rounded-lg py-2 px-4 font-medium hover:bg-[#febd2f] hover:outline-none transition duration-300 ease-in-out"
        >
          REGISTER
        </button>
        {userNameError && <p className="mt-4 text-red-500">{userNameError}</p>}
      </form>
    </div>
  );
}
