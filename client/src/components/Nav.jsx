import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useUser } from "../hooks/useUser";

const Nav = () => {
  const { user } = useUserContext();
  const { logoutUser } = useUser();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="bg-black text-white h-auto p-4 md:p-8 flex flex-col md:flex-row md:justify-between items-center gap-4">
      <Link to={"/"}>
        <h1 className="font-bold text-2xl">Auth Card System</h1>
      </Link>
      <ul className="flex items-center justify-center w-full md:w-1/2 md:justify-end">
        {user && (
          <li
            className="bg-slate-900 text-lg p-1 px-8 w-full text-center rounded-lg md:w-auto cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
