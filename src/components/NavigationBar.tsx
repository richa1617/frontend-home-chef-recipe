import Link from "next/link";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NavigationBar = () => {
  const router = useRouter();
  const [token, setToken] = useState<null | string>(null);
  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    if (tokenFromLS) {
      setToken(tokenFromLS);
    }
  }, []);

  function handleLogout(event: React.MouseEvent) {
    event.preventDefault();
    localStorage.removeItem("token");
    setToken(null);

    router.push("/");
  }

  return (
    <nav className="bg-[#febd2f] py-4">
      <section className="w-[95vw] mx-auto">
        {" "}
        <div className="mx-auto flex justify-between items-center">
          <p className="text-black text-xs md:text-lg">🥘 HomeChefRecipes</p>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="text-black hover:text-white hover: hover:duration-300 hover:ease-in-out"
              >
                Home
              </Link>
            </li>

            {token ? (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-black hover:text-white hover: hover:duration-300 hover:ease-in-out"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    className="text-black hover:text-white hover: hover:duration-300 hover:ease-in-out"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="text-black hover:text-white hover: hover:duration-300 hover:ease-in-out"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-black hover:text-white hover: hover:duration-300 hover:ease-in-out"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default NavigationBar;

{
  /* <li>
<button
  onClick={handleLogout}
  className="text-black hover:text-white hover: hover:duration-300 hover:ease-in-out"
>
  Log Out
</button>
</li> */
}
