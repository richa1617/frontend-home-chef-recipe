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
    <nav className="navbar">
      <ul className="navbar_list">
        <li>
          <p>🥘 HomeChefRecipes</p>
        </li>
        <div className="navbar_list_right">
          <li>
            <button>
              <a href="/">Home</a>
            </button>
          </li>
          {!token ? (
            <button>
              <li>
                <a href="/login">Login</a>
              </li>
            </button>
          ) : (
            <button onClick={handleLogout}>Log Out</button>
          )}
          <button>
            <a href="/dashboard">Dashboard</a>
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default NavigationBar;
