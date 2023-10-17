import Link from "next/link";
import { useEffect, useState } from "react";

const NavigationBar = () => {
  const [token, setToken] = useState<null | string>(null);
  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    if (tokenFromLS) {
      setToken(tokenFromLS);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
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
            {!token ? (
              <li>
                <Link
                  href="/login"
                  className="text-black hover:text-white hover: hover:duration-300 hover:ease-in-out"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-black hover:text-white hover: hover:duration-300 hover:ease-in-out"
                >
                  Log Out
                </button>
              </li>
            )}
            <li>
              <Link
                href="/dashboard"
                className="text-black hover:text-white hover: hover:duration-300 hover:ease-in-out"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default NavigationBar;
