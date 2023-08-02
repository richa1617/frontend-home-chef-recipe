const NavigationBar = () => {
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
          <button>
            <li>
              <a href="/login">Login</a>
            </li>
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default NavigationBar;
