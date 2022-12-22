import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useUser } from "../hooks/useUser";

const roles = ["admin", "user"];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const navigate = useNavigate();
  const { loginUser, isLoading, error } = useUser();
  const { user } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser({ username, password, role: selectedRole });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="bg-slate-800 text-white w-screen h-screen p-4 flex flex-col justify-center items-center">
      {error && (
        <p className="bg-red-100 text-red-900 p-4 text-center text-sm italic rounded-lg w-screen my-10 md:w-1/3">
          {error}
        </p>
      )}

      <h1 className="text-2xl font-bold my-3 text-center">Login</h1>
      <form className="flex flex-col gap-4 w-full md:w-1/3">
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="name">
            Username
          </label>
          <input
            required
            value={username}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="name">
            Password
          </label>
          <input
            required
            value={password}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            type="text"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="type">
            Role
          </label>
          <select
            defaultValue={selectedRole}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role.toLocaleUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-sky-300 text-slate-900 font-bold py-3 px-4 my-2 outline-none border-none rounded-lg text-xl"
          onClick={handleLogin}
          disabled={isLoading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
