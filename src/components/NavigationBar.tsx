const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <p>🥘 HomeChefRecipes</p>
        </li>
        <li>
          <button className="navbar_home">
            <a href="/">Home</a>
          </button>
        </li>
        <button>
          <li>
            <a href="/login">Login</a>
          </li>
        </button>
      </ul>
    </nav>
  );
};

export default NavigationBar;
