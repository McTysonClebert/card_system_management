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
    <nav className="bg-black text-white h-auto p-4 flex flex-col md:flex-row md:justify-between items-center gap-4">
      <Link
        to={"/"}
        className="flex flex-col justify-center items-center md:flex-row gap-2"
      >
        <div className="bg-white w-12 md:w-16  h-12 md:h-16  rounded-full overflow-hidden">
          <img
            src="/assets/logo.jpeg"
            alt=""
            className="w-12 md:w-16 h-12 md:h-16"
          />
        </div>
        <h1 className="font-bold text-2xl">MAVIE</h1>
      </Link>

      <ul className="flex-1 flex flex-col md:flex-row items-center justify-center w-full md:w-auto gap-4 md:gap-8 md:justify-end px-2 md:mx-10">
        {user && user.role === "admin" && (
          <>
            <Link
              to={"/register"}
              className="border-b-slate-700 border-b-4 text-lg px-1 w-full text-center rounded-lg md:w-auto cursor-pointer"
            >
              Add New User
            </Link>
            <Link
              to={"/register"}
              className="border-b-slate-700 border-b-4 text-lg px-1 w-full text-center rounded-lg md:w-auto cursor-pointer"
            >
              Change Password
            </Link>
          </>
        )}
      </ul>

      {user && (
        <div className="flex flex-col gap-2 items-center">
          <p className="capitalize text-center font-bold text-sky-400">
            {user.username}
          </p>
          <button
            className="bg-slate-900 text-lg p-1 px-8 w-full text-center rounded-lg md:w-auto cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
