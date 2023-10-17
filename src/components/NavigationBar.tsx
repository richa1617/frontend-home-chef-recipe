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
    <nav className="bg-[ #febd2f] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-black text-2xl">🥘 HomeChefRecipes</p>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-black hover:text-gray-300">
              Home
            </a>
          </li>
          {!token ? (
            <li>
              <a href="/login" className="text-black hover:text-gray-300">
                Login
              </a>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-black hover:text-gray-300"
              >
                Log Out
              </button>
            </li>
          )}
          <li>
            <a href="/dashboard" className="text-black hover:text-gray-300">
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
