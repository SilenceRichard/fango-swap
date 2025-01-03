import { NavLink } from "react-router";
import { ConnectKitButton } from "connectkit";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 border-b border-gray-300 bg-white">
      <div className="logo">Fango Swap</div>
      <nav>
        <NavLink to="/" className="mr-4">
          Swap
        </NavLink>
        <NavLink to="/pools">Pools</NavLink>
      </nav>
      <ConnectKitButton />
    </header>
  );
};

export default Header;
